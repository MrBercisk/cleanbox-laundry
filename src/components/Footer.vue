<script setup lang="ts">
import { Instagram, Twitter, MessageSquare, Mail, Phone, MapPin } from 'lucide-vue-next';

const socialIcons = [
  { icon: Instagram, href: "https://instagram.com", name: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", name: "Twitter" },
  { icon: MessageSquare, href: "https://wa.me/6281234567890", name: "WhatsApp" }
];

const scrollToSection = (id: string) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <footer class="bg-[#fcf8f8] border-t-[3px] border-[#0A0A0A] pt-16 pb-8 px-6">
    <div class="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b-2 border-[#0A0A0A] pb-12 mb-8">
      
      <!-- Brand & Socials (5 Cols) -->
      <div class="md:col-span-5 space-y-6">
        <a 
          href="#beranda" 
          @click.prevent="scrollToSection('#beranda')"
          class="flex items-center gap-2 font-display text-2xl font-black uppercase tracking-tight focus:outline-none"
        >
          <span class="bg-[#FFE500] border-2 border-[#0A0A0A] px-2 py-0.5 font-black flex items-center leading-none">C</span>
          <span>CleanBox</span>
        </a>

        <p class="font-sans font-medium text-sm text-[#0A0A0A]/70 max-w-sm leading-relaxed">
          Solusi layanan laundry urban masa kini. Cepat, tepat, higienis, dan terpercaya penuh sejak tahun 2014 untuk merawat serat kain berharga Anda.
        </p>

        <!-- Social Media Rounded/Square Boxes -->
        <div class="flex items-center gap-3">
          <a 
            v-for="social in socialIcons" 
            :key="social.name"
            :href="social.href"
            target="_blank"
            class="w-10 h-10 bg-[#FFFFFF] hover:bg-[#FFE500] border-2 border-[#0A0A0A] flex items-center justify-center transition-colors shadow-[2px_2px_0px_#0A0A0A] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] active:translate-x-0.5 active:translate-y-0.5 outline-none"
            :aria-label="social.name"
          >
            <component :is="social.icon" class="w-5 h-5 text-[#0A0A0A]" />
          </a>
        </div>
      </div>

      <!-- Navigation Menu links (3 Cols) -->
      <div class="md:col-span-3 space-y-4">
        <h4 class="font-display font-black text-sm uppercase tracking-wider text-[#0A0A0A]">
          Menu Utama
        </h4>
        <ul class="space-y-2.5 font-sans font-semibold text-sm">
          <li>
            <a href="#beranda" @click.prevent="scrollToSection('#beranda')" class="text-[#0A0A0A]/80 hover:text-black hover:underline">
              Beranda
            </a>
          </li>
          <li>
            <a href="#layanan" @click.prevent="scrollToSection('#layanan')" class="text-[#0A0A0A]/80 hover:text-black hover:underline">
              Layanan Kami
            </a>
          </li>
          <li>
            <a href="#tentang" @click.prevent="scrollToSection('#tentang')" class="text-[#0A0A0A]/80 hover:text-black hover:underline">
              Tentang Kami
            </a>
          </li>
          <li>
            <a href="#mengapa" @click.prevent="scrollToSection('#mengapa')" class="text-[#0A0A0A]/80 hover:text-black hover:underline">
              Keunggulan Kami
            </a>
          </li>
          <li>
            <a href="#reservasi" @click.prevent="scrollToSection('#reservasi')" class="text-[#0A0A0A]/80 hover:text-black hover:underline">
              Booking Pickup
            </a>
          </li>
        </ul>
      </div>

      <!-- Contact Info Section (4 Cols) -->
      <div class="md:col-span-4 space-y-4">
        <h4 class="font-display font-black text-sm uppercase tracking-wider text-[#0A0A0A]">
          Hubungi Kami
        </h4>
        <ul class="space-y-3.5 font-sans font-semibold text-sm text-[#0A0A0A]/85">
          <li class="flex items-center gap-2.5">
            <Mail class="w-4 h-4 text-[#00BCD4] shrink-0" />
            <a href="mailto:hello@cleanbox.id" class="hover:underline">hello@cleanbox.id</a>
          </li>
          <li class="flex items-center gap-2.5">
            <Phone class="w-4 h-4 text-green-600 shrink-0" />
            <a href="tel:+6281334485889" class="hover:underline">+62 812-3456-7890</a>
          </li>
          <li class="flex items-start gap-2.5">
            <MapPin class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190</span>
          </li>
        </ul>
      </div>

    </div>

    <!-- Bottom copyrights row -->
    <div class="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sans font-bold text-xs text-[#0A0A0A]/50">
      <span>
        © {{ new Date().getFullYear() }} CLEANBOX LAUNDRY. ALL RIGHTS RESERVED.
      </span>

    </div>
  </footer>
</template>
