<script setup lang="ts">
import { Zap, Truck, CreditCard, ChevronRight } from 'lucide-vue-next';

const emit = defineEmits(['start-booking', 'view-services']);

const imageSrc = '/images/hero_laundry_1781535828460.jpg'

const scrollToElement = (id: string) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <section 
    id="beranda" 
    class="relative bg-[#FFFFFF] border-b-[3px] border-[#0A0A0A] py-12 md:py-20 px-6 overflow-hidden"
  >
    <div class="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      <!-- Text / CTA Block (6 Columns) -->
      <div class="lg:col-span-7 flex flex-col items-start space-y-6">
        <!-- Eyebrow Tag -->
        <div class="bg-[#CCFF00] border-2 border-[#0A0A0A] font-display font-black text-xs md:text-sm px-3.5 py-1.5 uppercase tracking-wider text-[#0A0A0A] relative shadow-[2px_2px_0px_#0A0A0A]">
          ⚡ NO.1 LAUNDRY EXPRESS
        </div>
        
        <!-- Main Bold Headline -->
        <h1 class="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] leading-[1.05] tracking-tight">
          Cuci Bersih,<br />
          <span class="bg-[#FFE500] border-2 border-[#0A0A0A] px-2 inline-block shadow-neo transform -rotate-1">
            Beres Cepat.
          </span>
        </h1>
        
        <!-- Short Pitch -->
        <p class="font-sans font-medium text-base md:text-lg text-[#0A0A0A]/80 max-w-xl leading-relaxed">
          Jemput dalam <strong class="text-black font-extrabold decoration-[#FFE500] decoration-3 underline">30 menit</strong>. Selesai dalam <strong class="text-black font-extrabold decoration-[#CCFF00] decoration-3 underline">3 jam</strong>. Mulai dari Rp 8.000/Kg. Solusi laundry handal tanpa ribet untuk gaya hidup modern Anda yang aktif dan dinamis.
        </p>
        
        <!-- Hero CTAs -->
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            @click="scrollToElement('#reservasi')"
            class="bg-[#FFE500] text-[#0A0A0A] border-[3px] border-[#0A0A0A] px-8 py-4 font-display font-black text-base uppercase hover:bg-[#CCFF00] shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:shadow-neo-lg transition-all duration-100 cursor-pointer"
            id="hero-pickup-now"
          >
            Pickup Sekarang 🚚
          </button>
          
          <button 
            @click="scrollToElement('#layanan')"
            class="bg-[#FFFFFF] text-[#0A0A0A] border-[3px] border-[#0A0A0A] px-8 py-4 font-display font-black text-base uppercase hover:bg-[#0A0A0A]/5 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 cursor-pointer flex items-center justify-center gap-2"
            id="hero-view-services"
          >
            Lihat Layanan
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>

        <!-- Quick Highlight Badges -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-4">
          <div class="flex items-center gap-2 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-3 font-display font-heavy uppercase text-xs font-black shadow-[3px_3px_0px_#0A0A0A]">
            <div class="p-1 bg-[#FFE500] border-2 border-[#0A0A0A]">
              <Zap class="w-4 h-4 fill-current text-[#0A0A0A]" />
            </div>
            <span>Express 3 Jam</span>
          </div>
          
          <div class="flex items-center gap-2 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-3 font-display font-heavy uppercase text-xs font-black shadow-[3px_3px_0px_#0A0A0A]">
            <div class="p-1 bg-[#CCFF00] border-2 border-[#0A0A0A]">
              <Truck class="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <span>Pickup Gratis</span>
          </div>

          <div class="flex items-center gap-2 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-3 font-display font-heavy uppercase text-xs font-black shadow-[3px_3px_0px_#0A0A0A]">
            <div class="p-1 bg-[#00BCD4] border-2 border-[#0A0A0A] text-[#FFFFFF]">
              <CreditCard class="w-4 h-4 text-white" />
            </div>
            <span>10+ Metode Bayar</span>
          </div>
        </div>
      </div>

      <!-- Image & Stats Block (5 Columns) -->
      <div class="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
        <!-- Main Framed Image Container -->
        <div class="relative w-full max-w-[420px] aspect-[4/5] border-[3px] border-[#0A0A0A] shadow-neo bg-[#0A0A0A] overflow-hidden transform rotate-1">
          <img 
            :src="imageSrc" 
            alt="CleanBox Laundry Room" 
            class="w-full h-full object-cover grayscale-20 contrast-125 brightness-95"
            referrerpolicy="no-referrer"
          />
        </div>

        <!-- 50,000+ Customers Accent Card -->
        <div class="absolute -top-4 -right-4 sm:-right-8 bg-[#CCFF00] text-[#0A0A0A] border-[3px] border-[#0A0A0A] p-4 text-center z-10 shadow-neo transform -rotate-3 max-w-[150px]">
          <div class="font-display font-black text-2xl leading-none">50.000+</div>
          <div class="font-sans font-extrabold text-[9px] uppercase tracking-wider mt-1 text-[#0A0A0A]/70">Pelanggan Puas</div>
        </div>

        <!-- 10+ Years Experience Accent Card -->
        <div class="absolute -bottom-6 -left-4 sm:-left-8 bg-[#FFFFFF] text-[#0A0A0A] border-[3px] border-[#0A0A0A] p-4 text-center z-10 shadow-neo transform rotate-2 max-w-[150px]">
          <div class="font-display font-black text-2xl leading-none">10+ TAHUN</div>
          <div class="font-sans font-extrabold text-[9px] uppercase tracking-wider mt-1 text-[#0A0A0A]/70">Pengalaman Handal</div>
        </div>
      </div>

    </div>
  </section>
</template>
