<script setup lang="ts">
import { ref } from 'vue';
import { Menu, X, Calendar } from 'lucide-vue-next';

const isMenuOpen = ref(false);

const navLinks = [
  { name: 'Beranda', href: '#beranda' },
  { name: 'Layanan', href: '#layanan' },
  { name: 'Tentang Kami', href: '#tentang' },
  { name: 'Keunggulan', href: '#mengapa' },
  { name: 'Testimoni', href: '#testimoni' },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const scrollToSection = (id: string) => {
  isMenuOpen.value = false;
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <nav class="sticky top-0 z-50 bg-[#FFFFFF] border-b-[3px] border-[#0A0A0A]">
    <!-- Brand / Nav Container -->
    <div class="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
      <!-- Logo -->
      <a 
        href="#beranda" 
        @click.prevent="scrollToSection('#beranda')"
        class="flex items-center gap-2 font-display text-2xl font-black uppercase tracking-tight focus:outline-none"
        id="nav-logo"
      >
        <span class="bg-[#FFE500] border-2 border-[#0A0A0A] px-2 py-0.5 font-black flex items-center leading-none">C</span>
        <span>Clean<span class="text-[#FFE500] stroke-black text-shadow-solid font-black">Box</span></span>
      </a>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-8 font-sans font-semibold">
        <a 
          v-for="link in navLinks" 
          :key="link.name" 
          :href="link.href"
          @click.prevent="scrollToSection(link.href)"
          class="text-[#0A0A0A] hover:bg-[#FFE500] border-b-2 border-transparent hover:border-[#0A0A0A] px-2 py-1 transition-all duration-100"
          :id="`nav-link-${link.name.toLowerCase().replace(/\s/g, '-')}`"
        >
          {{ link.name }}
        </a>
      </div>

      <!-- Action Button (Desktop Only) -->
      <div class="hidden md:block">
        <a 
          href="#reservasi"
          @click.prevent="scrollToSection('#reservasi')"
          class="bg-[#FFE500] text-[#0A0A0A] border-2 border-[#0A0A0A] px-5 py-2.5 font-display font-black text-sm uppercase flex items-center gap-2 hover:bg-[#CCFF00] active:translate-x-1 active:translate-y-1 hover:shadow-none shadow-neo-btn-primary transition-all duration-100"
          id="btn-nav-reserve"
        >
          <Calendar class="w-4 h-4" />
          Reservasi Sekarang
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMenu"
        class="md:hidden p-2 border-2 border-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#FFE500] active:translate-x-0.5 active:translate-y-0.5 transition-all outline-none"
        aria-label="Toggle Navigation Menu"
        id="btn-mobile-menu"
      >
        <Menu v-if="!isMenuOpen" class="w-6 h-6 text-[#0A0A0A]" />
        <X v-else class="w-6 h-6 text-[#0A0A0A]" />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div 
      v-if="isMenuOpen" 
      class="md:hidden border-t-[3px] border-[#0A0A0A] bg-[#FFFFFF] flex flex-col font-sans font-semibold border-b-[3px]"
      id="mobile-drawer"
    >
      <a 
        v-for="link in navLinks" 
        :key="link.name" 
        :href="link.href"
        @click.prevent="scrollToSection(link.href)"
        class="border-b-2 border-[#0A0A0A]/10 px-6 py-4 hover:bg-[#FFE500] text-[#0A0A0A] block"
        :id="`nav-link-mobile-${link.name.toLowerCase().replace(/\s/g, '-')}`"
      >
        {{ link.name }}
      </a>
      <div class="p-6 bg-[#0A0A0A]/5">
        <a 
          href="#reservasi"
          @click.prevent="scrollToSection('#reservasi')"
          class="w-full bg-[#FFE500] text-[#0A0A0A] border-3 border-[#0A0A0A] px-4 py-3 font-display font-black text-center uppercase tracking-wider block"
          id="btn-nav-mobile-reserve"
        >
          🚀 Reservasi Sekarang
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.text-shadow-solid {
  text-shadow: 2px 2px 0px #0A0A0A;
}
</style>
