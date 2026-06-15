import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } else {
      console.warn("⚠️ GEMINI_API_KEY has not been configured yet. Falling back to local heuristic estimation.");
    }
  }
  return aiClient;
}

// Service Rates Table
const SERVICES_PRICING = [
  { id: "kiloan", name: "Daily Kiloan", unit: "Kg", price: 8000, desc: "Cuci + kering + lipat rapi" },
  { id: "cuci_setrika", name: "Cuci & Setrika", unit: "Kg", price: 12000, desc: "Cuci + kering + setrika uap premium" },
  { id: "sepatu", name: "Laundry Sepatu", unit: "Pasang", price: 30000, desc: "Deep cleaning sepatu" },
  { id: "tas", name: "Laundry Tas", unit: "Buah", price: 40000, desc: "Perawatan tas eksklusif" },
  { id: "karpet", name: "Laundry Karpet", unit: "M²", price: 15000, desc: "Pencucian karpet higienis" },
  { id: "gorden", name: "Laundry Gorden", unit: "Kg", price: 12000, desc: "Penanganan gorden tebal" },
  { id: "stroller", name: "Laundry Stroller", unit: "Buah", price: 50000, desc: "Sanitasi stroller bayi aman" },
  { id: "boneka", name: "Laundry Boneka", unit: "Buah", price: 20000, desc: "Pencucian boneka lembut & wangi" },
];

// Fallback estimation handler
function getLocalFallbackEstimation(userInput: string) {
  const text = userInput.toLowerCase();
  let estimatedWeightKg = 1.0;
  let matches = 0;

  // Simple heuristic checks
  if (text.match(/(sepatu|alas kaki|sneakers)/)) {
    return {
      success: true,
      serviceRecommendation: "Laundry Sepatu",
      estimatedPrice: 30000,
      breakdown: "• 1 Pasang Sepatu (Heuristic Match)\n• Estimasi waktu: 1-2 hari\n\n*Catatan: Ini adalah estimasi lokal karena Gemini API Key belum siap.*"
    };
  }

  if (text.match(/(tas|backpack|ransel)/)) {
    return {
      success: true,
      serviceRecommendation: "Laundry Tas",
      estimatedPrice: 40000,
      breakdown: "• 1 Buah Tas (Heuristic Match)\n• Estimasi waktu: 2-3 hari\n\n*Catatan: Ini adalah estimasi lokal karena Gemini API Key belum siap.*"
    };
  }

  // Count words to guess weight approximation
  const words = text.split(/\s+/).length;
  estimatedWeightKg = Math.max(1, Math.min(10, Math.round(words / 4)));
  const cost = estimatedWeightKg * 12000;

  return {
    success: true,
    serviceRecommendation: "Cuci & Setrika",
    estimatedWeightKg,
    estimatedPrice: cost,
    breakdown: `• Cuci & Setrika Kiloan (~${estimatedWeightKg} Kg)\n• Estimasi harga per Kg: Rp 12.000\n• Estimasi pakaian Anda: Kaos/celana campur\n\n*Catatan: Ini adalah estimasi lokal karena Gemini API Key belum siap.*`
  };
}

// API: AI Laundry Estimator
app.post("/api/estimate", async (req, res) => {
  const { input } = req.body;
  if (!input || input.trim().length === 0) {
    return res.status(400).json({
      success: false,
      serviceRecommendation: "Sedang menunggu...",
      estimatedPrice: 0,
      breakdown: "Masukkan daftar pakaian Anda di atas untuk memulai estimasi kilat!"
    });
  }

  try {
    const ai = getGeminiClient();
    if (!ai) {
      // Fallback
      const result = getLocalFallbackEstimation(input);
      return res.json(result);
    }

    const systemInstruction = `
      Anda adalah "AI CleanBox Estimator", asisten laundry profesional di Indonesia.
      Tugas Anda adalah membaca daftar pakaian yang ingin dicuci oleh pelanggan (ditulis dalam Bahasa Indonesia santai atau formal)
      lalu memberikan analisis harga perkiraan dan rekomendasi layanan yang tepat.

      Layanan CleanBox:
      1. Daily Kiloan: Rp 8.000 / Kg. (Selesai 24 jam. Pilihan untuk pakaian sehari-hari lecek tidak masalah)
      2. Cuci & Setrika: Rp 12.000 / Kg. (Selesai 24 jam. Pakaian kerja, kemeja, kaos rapi)
      3. Laundry Sepatu: Rp 30.000 / pasang.
      4. Laundry Tas: Rp 40.000 / buah.
      5. Laundry Karpet: Rp 15.000 / m². (Isi berat atau luas standar 4m² = Rp 60.000 jika luas tidak disebut)
      6. Laundry Stroller: Rp 50.000 / buah.
      7. Laundry Boneka: Rp 20.000 / buah.

      Aturan Penilaian Berat (Estimasi Kiloan):
      - 1 Kaos/Kemeja = ±0.2 Kg
      - 1 Celana Panjang = ±0.4 Kg
      - 1 Jaket/Hoodie = ±0.6 Kg
      - 1 Sprei/Bedcover = ±1.5 Kg s/d 2.5 Kg
      - Total berat minimal dihitung 1 Kg. Bulatkan ke angka berat terdekat.

      Anda harus membalas dalam format JSON yang valid dengan properti berikut:
      - "success": true (selalu true jika barang terdeteksi)
      - "serviceRecommendation": nama layanan utama yang direkomendasikan (misalnya "Daily Kiloan", "Cuci & Setrika", "Laundry Sepatu", dll)
      - "estimatedWeightKg": angka perkiraan berat total pakaian (jika layanan kiloan, isi null atau abaikan jika khusus satuan)
      - "estimatedPrice": angka total harga (tanpa Rp atau titik, contoh: 24000)
      - "breakdown": string penjelasan detail rincian perhitungan dalam bahasa Indonesia yang ramah, sopan, dan jelas (Gunakan baris baru \\n dan bullet points '•'). Contoh rincian barang yang Anda deteksi dan perkiraan beratnya.

      Pastikan output yang dikembalikan HANYA JSON.
    `;

    const prompt = `Estimasikan daftar cucian ini: "${input}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["success", "serviceRecommendation", "estimatedPrice", "breakdown"],
          properties: {
            success: { type: Type.BOOLEAN },
            serviceRecommendation: { type: Type.STRING },
            estimatedWeightKg: { type: Type.NUMBER },
            estimatedPrice: { type: Type.NUMBER },
            breakdown: { type: Type.STRING },
          },
        },
      },
    });

    const textOutput = response.text;
    if (textOutput) {
      const parsed = JSON.parse(textOutput.trim());
      return res.json(parsed);
    } else {
      throw new Error("Empty text output from Gemini");
    }
  } catch (error: any) {
    console.error("Gemini pricing estimation error:", error);
    // Return fallback in case of errors so the application is completely robust
    const fallbackVal = getLocalFallbackEstimation(input);
    return res.json(fallbackVal);
  }
});

// Host and routes config
async function startServer() {
  // Vite integrated middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 [CleanBox Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
