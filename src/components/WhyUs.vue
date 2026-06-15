<script setup lang="ts">
import { Award, Users, Zap, Check } from 'lucide-vue-next';

const keyPoints = [
  {
    icon: Award,
    title: "Merk Terpercaya",
    desc: "Lebih dari 50.000 pelanggan setia yang mempercayakan pakaiannya kepada tim handal kami setiap bulan.",
    color: "#FFE500"
  },
  {
    icon: Users,
    title: "Tim Profesional",
    desc: "Staff terlatih dengan standar SOP ketat untuk memastikan zero pakaian hilang, tertukar, ataupun rusak.",
    color: "#CCFF00"
  },
  {
    icon: Zap,
    title: "Express 3 Jam",
    desc: "Layanan super kilat andalan perkotaan. Baju kotor Anda disulap bersih wangi rapi hanya dalam 3 jam.",
    color: "#00BCD4"
  }
];

const paymentPartners = [
  { name: "BCA", color: "text-[#0066AE] hover:bg-[#0066AE] hover:text-white" },
  { name: "DANA", color: "text-[#108EE9] hover:bg-[#108EE9] hover:text-white" },
  { name: "GOPAY", color: "text-[#00AED6] hover:bg-[#00AED6] hover:text-white" },
  { name: "QRIS", color: "text-[#E61C24] hover:bg-[#E61C24] hover:text-white" },
  { name: "Livin'", color: "text-[#0F5EA2] hover:bg-[#0F5EA2] hover:text-white" },
];
</script>

<template>
  <section 
    id="mengapa" 
    class="bg-[#0A0A0A] border-b-[3px] border-[#0A0A0A] py-16 md:py-24 px-6 text-[#FFFFFF]"
  >
    <div class="max-w-[1280px] mx-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col items-center text-center space-y-3 mb-16">
        <div class="bg-[#CCFF00] text-[#0A0A0A] border-2 border-[#0A0A0A] font-sans font-bold text-xs px-3 py-1 uppercase tracking-widest shadow-neo-sm transform rotate-1 inline-block select-none">
          특장점 • OUR STRENGTHS
        </div>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
          Mengapa Harus CleanBox?
        </h2>
        <div class="w-24 h-[4px] bg-[#FFE500]"></div>
      </div>

      <!-- Hero Key Strengths Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="point in keyPoints" 
          :key="point.title"
          class="bg-[#FFFFFF] text-[#0A0A0A] border-[3px] border-[#0A0A0A] p-6 shadow-neo-card-yellow hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo transition-all duration-150 flex flex-col items-start"
          :id="`whyus-card-${point.title.toLowerCase().replace(/\s/g, '-')}`"
        >
          <!-- Custom Icon Container with Offset Shadows on dark elements -->
          <div 
            class="w-14 h-14 border-2 border-[#0A0A0A] flex items-center justify-center mb-6 shadow-[3px_3px_0px_#0A0A0A]"
            :style="{ backgroundColor: point.color }"
          >
            <component :is="point.icon" class="w-7 h-7 text-[#0A0A0A]" />
          </div>

          <h3 class="font-display font-black text-xl uppercase tracking-tight mb-2">
            {{ point.title }}
          </h3>
          
          <p class="font-sans font-medium text-sm text-[#0A0A0A]/70 leading-relaxed">
            {{ point.desc }}
          </p>
        </div>
      </div>

      <!-- Quick Delivery Marquee Block -->
      <div class="mt-16 bg-[#00BCD4] border-3 border-[#0A0A0A] text-[#0A0A0A] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-neo-card-lime">
        <div class="space-y-1">
          <h4 class="font-display font-black text-lg md:text-xl uppercase tracking-tight leading-none text-white">
            ANTAR JEMPUT MAKSIMAL 30 MENIT 🚀
          </h4>
          <p class="font-sans font-bold text-xs text-[#0A0A0A]/75">
            Kurir express siaga menjemput dan mengantar cucian di mana saja, kapan saja tanpa minimal berat!
          </p>
        </div>
        <a 
          href="https://wa.me/6281234567890?text=Halo%20CleanBox%20laundry%20saya%20mau%20request%20penjemputan%20cucian%20express"
          target="_blank"
          class="whitespace-nowrap bg-[#FFE500] hover:bg-[#CCFF00] text-[#0A0A0A] border-2 border-[#0A0A0A] px-6 py-3 font-display font-black uppercase text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
        >
          ORDER VIA WHATSAPP ➔
        </a>
      </div>

      <!-- Payment Gateway Highlight Row -->
      <div class="mt-20 pt-12 border-t-[3px] border-dashed border-[#FFFFFF]/25">
        <div class="text-center mb-10 space-y-2">
          <span class="text-xs font-display font-black tracking-widest text-[#CCFF00] uppercase block">Dukungan Transaksi Terlengkap</span>
          <h4 class="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white leading-none">
            Bayar Laundry, Semudah Ngomong
          </h4>
        </div>

        <!-- Payment Partner Brand Slots Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div 
            v-for="partner in paymentPartners" 
            :key="partner.name"
            class="bg-[#FFFFFF] border-2 border-[#0A0A0A] py-3.5 text-center font-display font-black uppercase text-sm select-none shadow-[3px_3px_0px_#FFE500] transition-all duration-100 transform active:translate-x-0.5 active:translate-y-0.5"
            :class="partner.color"
          >
            {{ partner.name }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
