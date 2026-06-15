<script setup lang="ts">
import { ref } from 'vue';
import { 
  Shirt, 
  WashingMachine, 
  Footprints, 
  Briefcase, 
  Grid, 
  Columns3, 
  Baby, 
  Smile,
  CheckCircle,
  HelpCircle
} from 'lucide-vue-next';
import { ServiceItem } from '../types';

const emit = defineEmits(['select-service']);

const services: ServiceItem[] = [
  {
    id: "kiloan",
    name: "Daily Kiloan",
    description: "Cuci + kering kering putar + lipat rapi. Ideal untuk pakaian santai/kaos harian Anda.",
    category: "Kiloan",
    unit: "Kg",
    price: 8000,
    icon: "Shirt"
  },
  {
    id: "cuci_setrika",
    name: "Cuci & Setrika",
    description: "Cuci + kering + setrika uap presisi agar baju kerja, kemeja, dan pakaian formal wangi sempurna.",
    category: "Kiloan",
    unit: "Kg",
    price: 12000,
    icon: "WashingMachine"
  },
  {
    id: "sepatu",
    name: "Laundry Sepatu",
    description: "Deep clean menyeluruh untuk mengangkat noda membandel & bakteri di sol luar, dalam, dan tali.",
    category: "Satuan",
    unit: "Pasang",
    price: 30000,
    icon: "Footprints"
  },
  {
    id: "tas",
    name: "Laundry Tas",
    description: "Pembersihan intensif, pelembab bahan kulit/kanvas, serta sterilisasi bagian dalam tas.",
    category: "Satuan",
    unit: "Buah",
    price: 40000,
    icon: "Briefcase"
  },
  {
    id: "karpet",
    name: "Laundry Karpet",
    description: "Pemberantasan debu, noda kuah, tungau gatal, dan bau apek dengan sabun higienis khusus.",
    category: "Satuan",
    unit: "M²",
    price: 15000,
    icon: "Grid"
  },
  {
    id: "gorden",
    name: "Laundry Gorden",
    description: "Metode cuci handal gorden tipis atau tebal agar rumah segar bebas debu pemicu alergi.",
    category: "Satuan",
    unit: "Kg",
    price: 12000,
    icon: "Columns3"
  },
  {
    id: "stroller",
    name: "Laundry Stroller",
    description: "Sanitasi stroller, car seat, atau baby bouncer bayi menggunakan deterjen hypoallergenic aman gatal.",
    category: "Satuan",
    unit: "Buah",
    price: 50000,
    icon: "Baby"
  },
  {
    id: "boneka",
    name: "Laundry Boneka",
    description: "Mengembalikan kelenturan dakron boneka kesayangan, wangi semerbak, bersih luar dalam.",
    category: "Satuan",
    unit: "Buah",
    price: 20000,
    icon: "Smile"
  }
];

// Helper to resolve icon component names dynamically 
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Shirt': return Shirt;
    case 'WashingMachine': return WashingMachine;
    case 'Footprints': return Footprints;
    case 'Briefcase': return Briefcase;
    case 'Grid': return Grid;
    case 'Columns3': return Columns3;
    case 'Baby': return Baby;
    case 'Smile': return Smile;
    default: return HelpCircle;
  }
};

const activeDetails = ref<ServiceItem | null>(null);

const viewDetails = (service: ServiceItem) => {
  activeDetails.value = service;
};

const closeDetails = () => {
  activeDetails.value = null;
};

const bookThisService = (id: string) => {
  emit('select-service', id);
  closeDetails();
  // Scroll directly to booking form
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
    id="layanan" 
    class="bg-[#fcf8f8] border-b-[3px] border-[#0A0A0A] py-16 md:py-24 px-6 relative"
  >
    <div class="max-w-[1280px] mx-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col items-start space-y-3 mb-12">
        <div class="bg-[#00BCD4] text-white border-2 border-[#0A0A0A] font-sans font-bold text-xs px-3 py-1 uppercase tracking-widest shadow-[2px_2px_0px_#0A0A0A]">
           OUR SERVICES
        </div>
        <h2 class="font-display font-black text-3xl sm:text-4xl text-[#0A0A0A] uppercase tracking-tight">
          Layanan Kami
        </h2>
        <div class="w-20 h-[3px] bg-[#0A0A0A]"></div>
      </div>

      <!-- Services Grid Layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="bg-[#FFFFFF] border-[3px] border-[#0A0A0A] p-6 shadow-neo hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo transition-all duration-150 flex flex-col justify-between group cursor-pointer"
          @click="viewDetails(service)"
          :id="`service-card-${service.id}`"
        >
          <div>
            <!-- Icon Frame -->
            <div class="w-14 h-14 bg-[#FFE500] border-2 border-[#0A0A0A] flex items-center justify-center shadow-[3px_3px_0px_#0A0A0A] group-hover:bg-[#CCFF00] mb-6 transition-colors">
              <component :is="getIconComponent(service.icon)" class="w-7 h-7 text-[#0A0A0A]" />
            </div>

            <!-- Title & Description -->
            <h3 class="font-display font-black text-xl text-[#0A0A0A] uppercase tracking-tight mb-2 group-hover:text-amber-600 transition-colors">
              {{ service.name }}
            </h3>
            
            <p class="font-sans font-medium text-sm text-[#0A0A0A]/70 leading-relaxed mb-6">
              {{ service.description }}
            </p>
          </div>

          <!-- Price Tag & CTA -->
          <div class="border-t-2 border-[#0A0A0A] pt-4 flex items-center justify-between mt-auto">
            <span class="font-display font-black text-base text-[#0A0A0A]">
              {{ formatRupiah(service.price) }} / {{ service.unit }}
            </span>
            <span class="text-xs bg-[#0A0A0A] text-[#FFFFFF] font-sans font-bold px-2 py-1 border border-[#0A0A0A]">
              Detail ➔
            </span>
          </div>
        </div>
      </div>

      <!-- Quick QRIS Info Row -->
      <div class="mt-12 bg-[#CCFF00] border-[3px] border-[#0A0A0A] p-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center shadow-neo">
        <span class="text-lg">💳</span>
        <p class="font-display font-black text-sm uppercase tracking-wide text-[#0A0A0A]">
          PEMBAYARAN SUPER MUDAH DENGAN QRIS & SEMUA DOMPET DIGITAL UTAMA (OVO, DANA, GOPAY, LINKAJA)!
        </p>
      </div>

    </div>

    <!-- Interactive Service Detail Overlay/Modal (Neobrutalism Style) -->
    <div 
      v-if="activeDetails" 
      class="fixed inset-0 z-50 bg-[#0A0A0A]/60 flex items-center justify-center p-4 backdrop-blur-xs cursor-default"
      @click.self="closeDetails"
    >
      <div class="bg-[#FFFFFF] border-[4px] border-[#0A0A0A] shadow-neo-lg w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-100">
        
        <!-- Cross Button -->
        <button 
          @click="closeDetails"
          class="absolute top-4 right-4 bg-[#FFFFFF] hover:bg-[#FFE500] border-2 border-[#0A0A0A] w-8 h-8 flex items-center justify-center font-bold text-lg active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Tutup detail layanan"
        >
          ✕
        </button>

        <!-- Header -->
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 bg-[#CCFF00] border-2 border-[#0A0A0A] flex items-center justify-center shadow-[3px_3px_0px_#0A0A0A]">
            <component :is="getIconComponent(activeDetails.icon)" class="w-7 h-7 text-[#0A0A0A]" />
          </div>
          <div>
            <div class="text-xs font-semibold bg-[#FFE500] border border-[#0A0A0A] px-2 py-0.5 inline-block uppercase font-sans mb-1 shadow-[1px_1px_0px_#0A0A0A]">
              Kategori: {{ activeDetails.category }}
            </div>
            <h3 class="font-display font-black text-2xl uppercase tracking-tight text-[#0A0A0A]">
              {{ activeDetails.name }}
            </h3>
          </div>
        </div>

        <!-- Description -->
        <p class="font-sans font-medium text-base text-[#0A0A0A] leading-relaxed mb-6">
          {{ activeDetails.description }}
        </p>

        <!-- Detailed Key Benefits List -->
        <div class="bg-[#fcf8f8] border-2 border-[#0A0A0A] p-4 mb-6">
          <h4 class="font-display font-black text-sm uppercase tracking-wide mb-3 text-[#0A0A0A]">
            Keunggulan Layanan Ini:
          </h4>
          <ul class="space-y-2 text-sm font-sans font-semibold text-[#0A0A0A]/90">
            <li class="flex items-start gap-2">
              <CheckCircle class="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span>Dicuci terpisah per pelanggan (higienis terjamin)</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle class="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span>Deterjen premium wangi tahan lama 5 hari</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle class="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span>Setrika uap profesional anti gosong (untuk Cuci-Setrika)</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle class="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span>Garansi cuci ulang gratis jika kurang bersih</span>
            </li>
          </ul>
        </div>

        <!-- Price Panel -->
        <div class="flex items-center justify-between border-t-3 border-dashed border-[#0A0A0A] pt-4 mb-6">
          <div>
            <span class="text-xs font-bold uppercase text-[#0A0A0A]/60 block font-display">TARIF STANDAR</span>
            <span class="font-display font-black text-2xl text-[#0A0A0A]">
              {{ formatRupiah(activeDetails.price) }} <span class="text-sm font-sans font-bold">/ {{ activeDetails.unit }}</span>
            </span>
          </div>
          <div>
            <span class="text-xs font-bold uppercase text-[#0A0A0A]/60 block font-display text-right">DURASI</span>
            <span class="font-display font-black text-lg text-amber-600">24 Jam Selesai</span>
          </div>
        </div>

        <!-- Confirm Selection CTA Button -->
        <button 
          @click="bookThisService(activeDetails.id)"
          class="w-full bg-[#FFE500] text-[#0A0A0A] border-3 border-[#0A0A0A] py-3.5 font-display font-black text-base uppercase tracking-wide hover:bg-[#CCFF00] shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 cursor-pointer"
        >
          Pilih & Booking Layanan Ini 🚚
        </button>

      </div>
    </div>

  </section>
</template>
