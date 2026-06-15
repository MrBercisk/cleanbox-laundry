<script setup lang="ts">
import { ref } from 'vue';
import { Sparkles, Loader2, ArrowRight, HelpCircle, CheckCircle } from 'lucide-vue-next';
import { GeminiEstimateResponse } from '../types';

const emit = defineEmits(['auto-fill']);

const userInput = ref('');
const isLoading = ref(false);
const estimateResult = ref<GeminiEstimateResponse | null>(null);
const errorMessage = ref('');

const samplePrompts = [
  "5 kemeja kantor, 3 celana panjang hitam, 2 kaos oblong santai",
  "1 pasang sepatu kets kotor bersol putih gembung & 1 tas ransel kanvas",
  "1 bedcover ukuran kasur king & 2 sprei katun motif bunga"
];

const useSample = (prompt: string) => {
  userInput.value = prompt;
};

const handleEstimate = async () => {
  if (!userInput.value.trim()) {
    errorMessage.value = "Ketik dulu pakaian Anda sebelum mengestimasi!";
    return;
  }
  
  errorMessage.value = '';
  isLoading.value = true;
  estimateResult.value = null;

  try {
    const res = await fetch("/api/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: userInput.value })
    });

    if (!res.ok) {
      throw new Error("Gagal mengambil estimasi dari server.");
    }

    const data: GeminiEstimateResponse = await res.json();
    estimateResult.value = data;
  } catch (error: any) {
    console.error("AI estimation fetch error:", error);
    errorMessage.value = "Terjadi masalah teknis. Pastikan koneksi server tersambung dengan baik.";
  } finally {
    isLoading.value = false;
  }
};

const autofillBookingForm = () => {
  if (!estimateResult.value) return;
  emit('auto-fill', {
    serviceRecommendation: estimateResult.value.serviceRecommendation,
    estimatedWeight: estimateResult.value.estimatedWeightKg || 1,
    notes: `AI Estimate Result:\n${estimateResult.value.breakdown.replace(/\n•/g, '\n-')}\nOriginal input: ${userInput.value}`
  });

  // Scroll to booking form
  const form = document.querySelector('#reservasi');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' });
  }
};

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};
</script>

<template>
  <section 
    id="ai-estimator" 
    class="bg-[#FFFFFF] border-b-[3px] border-[#0A0A0A] py-16 px-6"
  >
    <div class="max-w-[850px] mx-auto border-[3px] border-[#0A0A0A] bg-[#fcf8f8] p-6 md:p-10 shadow-neo relative">
      
      <!-- Logo AI Tag -->
      <div class="absolute -top-4 left-6 bg-[#00BCD4] text-[#FFFFFF] border-2 border-[#0A0A0A] font-sans font-bold text-xs px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#0A0A0A]">
        <Sparkles class="w-4 h-4 fill-current text-white" />
        AI LAUNDRY ASSISTANT
      </div>

      <!-- Header Intro -->
      <div class="space-y-3 mb-8 pt-2">
        <h3 class="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0A0A0A]">
          Bayar Laundry, Semudah Ngomong
        </h3>
        <p class="font-sans font-medium text-sm text-[#0A0A0A]/70 leading-relaxed">
          Ketik daftar kain atau barang apa saja yang ingin Anda cuci (misalnya: <em class="font-bold text-black bg-[#CCFF00]/40 px-1">"Ada 4 jersey bola, 2 rok batik, 1 hijab halus, dan sepasang sepatu converse kotor"</em>) dan AI kami akan langsung memperluas rincian beratnya, merekomendasikan tipe servis, dan meramalkan taksiran harganya seketika!
        </p>
      </div>

      <!-- Input Form Box -->
      <div class="space-y-4">
        <div>
          <label for="ai-list-input" class="block font-display font-black text-xs uppercase text-[#0A0A0A] tracking-wider mb-2">
            📋 Daftar Baju / Barang Cucian Anda:
          </label>
          <textarea
            id="ai-list-input"
            v-model="userInput"
            rows="3"
            placeholder="Ketik rincian pakaian Anda di sini..."
            class="w-full bg-[#FFFFFF] border-3 border-[#0A0A0A] p-4 text-sm font-sans font-semibold placeholder-[#0A0A0A]/40 outline-none focus:border-[#FFE500] focus:shadow-[3px_3px_0px_#0A0A0A] transition-all"
            :disabled="isLoading"
          ></textarea>
        </div>

        <!-- Sample Prompts Badges -->
        <div class="flex flex-wrap items-center gap-2 pt-1">
          <span class="text-xs font-sans font-bold text-[#0A0A0A]/55">Contoh Cepat:</span>
          <button
            v-for="(sample, idx) in samplePrompts"
            :key="idx"
            @click="useSample(sample)"
            class="text-[11px] font-sans font-bold bg-[#FFFFFF] hover:bg-[#FFE500] border-2 border-[#0A0A0A] px-2.5 py-1 transition-colors outline-none cursor-pointer"
            :disabled="isLoading"
          >
            {{ sample.substring(0, 30) }}...
          </button>
        </div>

        <!-- Action Button -->
        <div class="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <button
            @click="handleEstimate"
            class="w-full sm:w-auto bg-[#FFE500] text-[#0A0A0A] border-[3px] border-[#0A0A0A] px-8 py-3.5 font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#CCFF00] shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-50 cursor-pointer"
            id="btn-ai-estimate"
            :disabled="isLoading"
          >
            <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin text-[#0A0A0A]" />
            <Sparkles v-else class="w-4 h-4 text-[#0A0A0A]" />
            {{ isLoading ? 'Menganalisis Cucian...' : 'Hitung Estimasi Harga AI 🤖' }}
          </button>

          <span v-if="errorMessage" class="text-xs font-sans font-bold text-red-600">
            ⚠ {{ errorMessage }}
          </span>
        </div>
      </div>

      <!-- AI Analysis Result Area (Neobrutalism Design) -->
      <div 
        v-if="estimateResult" 
        class="mt-8 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-6 shadow-neo animate-in fade-in-50 duration-200"
        id="ai-estimate-result"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-[#0A0A0A] pb-4 mb-4">
          <div>
            <span class="text-xs font-display font-black text-[#0A0A0A]/60 uppercase tracking-widest block">REKOMENDASI SERVIS</span>
            <span class="bg-[#CCFF00] border border-[#0A0A0A] px-2.5 py-1 text-sm font-display font-black uppercase inline-block mt-1">
              {{ estimateResult.serviceRecommendation }}
            </span>
          </div>

          <div class="text-left sm:text-right">
            <span class="text-xs font-display font-black text-[#0A0A0A]/60 uppercase tracking-widest block">ESTIMASI TOTAL BIAYA</span>
            <span class="font-display font-black text-2xl text-[#0A0A0A]">
              {{ formatRupiah(estimateResult.estimatedPrice) }}
            </span>
            <span v-if="estimateResult.estimatedWeightKg" class="text-xs text-[#0A0A0A]/50 font-bold block mt-0.5">
              (~{{ estimateResult.estimatedWeightKg }} Kg berat)
            </span>
          </div>
        </div>

        <div class="space-y-2 mb-6">
          <span class="text-xs font-display font-black text-[#0A0A0A]/60 uppercase tracking-widest block">RINCIAN TAKSIRAN BARANG</span>
          <div class="font-sans font-semibold text-sm text-[#0A0A0A]/90 whitespace-pre-line leading-relaxed bg-[#fcf8f8] p-4 border-2 border-[#0A0A0A]">
            {{ estimateResult.breakdown }}
          </div>
        </div>

        <!-- Action Button: Copy into booking form -->
        <button
          @click="autofillBookingForm"
          class="w-full bg-[#0A0A0A] hover:bg-[#FFE500] text-[#FFFFFF] hover:text-[#0A0A0A] border-3 border-[#0A0A0A] py-3.5 font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Gunakan Estimasi Ini di Form Booking di Bawah ⬇</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

    </div>
  </section>
</template>
