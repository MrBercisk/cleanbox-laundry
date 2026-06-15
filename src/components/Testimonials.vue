<script setup lang="ts">
import { ref } from 'vue';
import { Star, Quote, Heart } from 'lucide-vue-next';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: "review-1",
    stars: 5,
    text: "Layanan tercepat yang pernah saya coba. Jam 8 pagi dijemput, jam 11 siang sudah balik dalam keadaan wangi dan rapi banget!",
    author: "Siska Amelia",
    role: "Wiraswasta",
    avatar: "SA"
  },
  {
    id: "review-2",
    stars: 5,
    text: "Sepatu basket saya yang tadinya dekil jadi seperti baru lagi. Harganya juga masuk akal dibanding laundry sepatu spesialis lain.",
    author: "Andi Wijaya",
    role: "Pegawai Swasta",
    avatar: "AW"
  },
  {
    id: "review-3",
    stars: 5,
    text: "Proses pickupnya on-time banget. Kurirnya ramah dan helpful. Rincian tagihan transparan ngebantu buat estimasi pengeluaran bulanan.",
    author: "Rina Putri",
    role: "Ibu Rumah Tangga",
    avatar: "RP"
  }
];
</script>

<template>
  <section 
    id="testimoni" 
    class="bg-[#FFFFFF] border-b-[3px] border-[#0A0A0A] py-16 md:py-24 px-6 overflow-hidden"
  >
    <div class="max-w-[1280px] mx-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col items-center text-center space-y-3 mb-16">
        <div class="bg-[#CCFF00] text-[#0A0A0A] border-2 border-[#0A0A0A] font-sans font-bold text-xs px-3 py-1 uppercase tracking-widest shadow-neo-sm transform -rotate-1 inline-block select-none">
          리뷰 • CUSTOMER STORIES
        </div>
        <h2 class="font-display font-black text-3xl sm:text-4xl uppercase text-[#0A0A0A] tracking-tight">
          Apa Kata Pelanggan Setia Kami?
        </h2>
        <div class="w-20 h-[3px] bg-[#0A0A0A]"></div>
      </div>

      <!-- Testimonials Grid Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="item in testimonials" 
          :key="item.id"
          class="bg-[#FFFFFF] border-[3px] border-[#0A0A0A] p-6 shadow-neo-card-yellow hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo transition-all duration-150 flex flex-col justify-between relative mt-4 md:mt-0"
          :id="`testimoni-card-${item.author.toLowerCase().replace(/\s/g, '-')}`"
        >
          <!-- Corner Quote Mark Badge -->
          <div class="absolute -top-4 -right-2 bg-[#FFE500] border-2 border-[#0A0A0A] p-2 leading-none shadow-neo-sm transform rotate-6 select-none text-white">
            <Quote class="w-4 h-4 fill-current text-[#0A0A0A]" />
          </div>

          <div class="space-y-4">
            <!-- Stars -->
            <div class="flex items-center gap-1">
              <Star 
                v-for="s in item.stars" 
                :key="s"
                class="w-5 h-5 fill-current text-[#FFE500] stroke-black stroke-2" 
              />
            </div>

            <!-- Quote Text -->
            <p class="font-sans font-semibold text-sm text-[#0A0A0A]/95 leading-relaxed italic">
              "{{ item.text }}"
            </p>
          </div>

          <!-- Author Bio Block -->
          <div class="border-t-2 border-[#0A0A0A]/10 pt-4 mt-6 flex items-center gap-3">
            <!-- Round Cyan Badge representation from mockup -->
            <div class="w-10 h-10 rounded-full bg-[#00BCD4] border-2 border-[#0A0A0A] flex items-center justify-center font-display font-black text-xs text-white uppercase shadow-[2px_2px_0px_#0A0A0A]">
              {{ item.avatar }}
            </div>
            
            <div class="leading-none">
              <h4 class="font-display font-black text-sm uppercase tracking-tight text-[#0A0A0A]">
                {{ item.author }}
              </h4>
              <span class="font-sans text-[10px] font-bold text-[#0A0A0A]/50 uppercase tracking-widest mt-0.5 block">
                {{ item.role }}
              </span>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer Review Badge callout -->
      <div class="mt-16 text-center">
        <div class="inline-flex items-center gap-2 border-[2.5px] border-[#0A0A0A] bg-[#fcf8f8] px-5 py-3 font-display text-xs font-black shadow-neo">
          <span>❤️</span>
          <span class="uppercase tracking-wider">MEMBERSIHKAN DENGAN CINTA SEJAK 2014 UNTUK LEBIH DARI 50K+ RUMAH TANGGA INDONESIA!</span>
        </div>
      </div>

    </div>
  </section>
</template>
