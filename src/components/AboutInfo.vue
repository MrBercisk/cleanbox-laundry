<script setup lang="ts">
import { Sparkles, HelpingHand } from 'lucide-vue-next';

const washerImg = '/images/industrial_washers_1781535848917.jpg'


const scrollToBooking = () => {
  const form = document.querySelector('#reservasi');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <section 
    id="tentang" 
    class="bg-[#FFFFFF] border-b-[3px] border-[#0A0A0A] py-16 md:py-24 px-6 overflow-hidden"
  >
    <div class="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      <!-- Visual Washer Banner (5 Columns) -->
      <div class="lg:col-span-5 flex justify-center order-last lg:order-first">
        <div class="relative w-full max-w-[420px] aspect-[4/5] border-[3px] border-[#0A0A0A] shadow-neo bg-[#0A0A0A] overflow-hidden transform -rotate-1">
          <!-- Custom industrial laundry machine photo -->
          <img 
            :src="washerImg" 
            alt="CleanBox Industrial Laundry Row" 
            class="w-full h-full object-cover contrast-125 brightness-90 grayscale-10"
            referrerpolicy="no-referrer"
          />
          
          <div class="absolute inset-0 bg-[#0A0A0A]/10 mix-blend-overlay"></div>
        </div>
      </div>

      <!-- Description Content Block (7 Columns) -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Eyebrow tagline -->
        <div class="flex items-center gap-2">
          <div class="bg-[#FFE500] text-[#0A0A0A] border-[2px] border-[#0A0A0A] px-2.5 py-1 text-xs font-black uppercase font-display select-none">
            INTRODUCTION
          </div>
          <span class="font-sans font-bold text-xs text-[#0A0A0A]/50 tracking-wider">EST. 2014</span>
        </div>

        <!-- Big Bold Title -->
        <h2 class="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A] leading-tight uppercase tracking-tight">
          Bersih, Wangi, Higienis & Tepat Waktu
        </h2>

        <!-- Separator -->
        <div class="w-16 h-1 w- bg-[#0A0A0A]"></div>

        <!-- Story text -->
        <div class="space-y-4 font-sans font-medium text-base text-[#0A0A0A]/85 leading-relaxed">
          <p>
            Sejak <strong class="text-black font-bold">2014</strong>, CleanBox hadir memberikan standar baru dalam industri laundry profesional di seluruh Indonesia. Kami memahami bahwa pakaian kesayangan Anda menuntut ketelitian, kebersihan mutlak, serta keharuman yang menenangkan suasana hati.
          </p>
          <p>
            Kami tidak sekadar mencuci pakaian harian secara massal. Dengan sistem <strong class="text-[#00BCD4] font-black">Satu Pelanggan Satu Mesin</strong>, sterilisasi air ultraviolet, deterjen hypoallergenic ramah kulit, serta tim berpengalaman profesional, kami merawat serat kain Anda agar awet prima dan tampak cemerlang gres.
          </p>
        </div>

        <!-- Inline Badges -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
          <div class="border-2 border-[#0A0A0A] p-4 bg-[#fcf8f8] flex items-center gap-3">
            <span class="text-3xl text-amber-500 font-bold">10+</span>
            <div>
              <h4 class="font-display font-black text-xs uppercase text-[#0A0A0A] leading-tight">Tahun Pengalaman</h4>
              <p class="text-xs text-[#0A0A0A]/60 font-sans mt-0.5">Berdiri tangguh sejak 2014 melayani Indonesia.</p>
            </div>
          </div>
          
          <div class="border-2 border-[#0A0A0A] p-4 bg-[#fcf8f8] flex items-center gap-3 align-middle">
            <span class="text-3xl">🫧</span>
            <div>
              <h4 class="font-display font-black text-xs uppercase text-[#0A0A0A] leading-tight font-black">Proses Higienis</h4>
              <p class="text-xs text-[#0A0A0A]/60 font-sans mt-0.5">Satu pelanggan satu mesin cuci steril.</p>
            </div>
          </div>
        </div>

        <!-- Urgent warning button panel -->
        <div class="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <button 
            @click="scrollToBooking"
            class="w-full sm:w-auto bg-[#CCFF00] text-[#0A0A0A] border-[3px] border-[#0A0A0A] px-6 py-4 font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 hover:bg-[#FFE500] shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 cursor-pointer"
            id="about-stop-self-wash"
          >
            <span>🖐️ STOP MENCUCI SENDIRI</span>
          </button>
          
          <span class="text-xs font-sans font-semibold text-[#0A0A0A]/60 text-center sm:text-left">
            Waktumu terlalu berharga untuk mencuci. Serahkan saja pada CleanBox!
          </span>
        </div>

      </div>

    </div>
  </section>
</template>
