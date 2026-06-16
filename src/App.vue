<script setup lang="ts">
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Services from './components/Services.vue';
import AboutInfo from './components/AboutInfo.vue';
import WhyUs from './components/WhyUs.vue';
import AiEstimator from './components/AiEstimator.vue';
import BookingForm from './components/BookingForm.vue';
import Testimonials from './components/Testimonials.vue';
import Footer from './components/Footer.vue';

// Scroll animation composable
import { useScrollAnimation } from './composables/useScrollAnimation';
useScrollAnimation();

// State shared between AI Estimator / Service cards and the Booking Form
const autofillData = ref<{
  serviceRecommendation: string;
  estimatedWeight: number;
  notes: string;
} | null>(null);

// Shared action: handle service preset choice
const handleSelectService = (serviceId: string) => {
  let name = "Daily Kiloan";
  if (serviceId === 'cuci_setrika') name = "Cuci & Setrika";
  else if (serviceId === 'sepatu') name = "Laundry Sepatu";
  else if (serviceId === 'tas') name = "Laundry Tas";
  else if (serviceId === 'karpet') name = "Laundry Karpet";
  else if (serviceId === 'gorden') name = "Laundry Gorden";
  else if (serviceId === 'stroller') name = "Laundry Stroller";
  else if (serviceId === 'boneka') name = "Laundry Boneka";
  autofillData.value = {
    serviceRecommendation: name,
    estimatedWeight: 1,
    notes: `Dipilih langsung dari daftar menu utama.`
  };
};

// Shared action: handle raw input analysis from AI and autofill form
const handleAutoFill = (data: {
  serviceRecommendation: string;
  estimatedWeight: number;
  notes: string;
}) => {
  autofillData.value = data;
};
</script>

<template>
  <div class="min-h-screen bg-[#FFFFFF] font-sans text-[#0A0A0A] flex flex-col justify-between selection:bg-[#FFE500] selection:text-[#0A0A0A]">

    <!-- Accessible alert ticker -->
    <div class="bg-[#0A0A0A] text-white py-2 px-6 overflow-hidden border-b-[3px] border-[#0A0A0A]">
      <div class="max-w-[1280px] mx-auto flex items-center justify-between text-xs font-display font-black uppercase tracking-widest">
        <span class="flex items-center gap-1.5 animate-pulse">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#CCFF00]"></span>
          <span>PROMO BULAN JUNI: DISKON 15% UNTUK LAYANAN SATUAN SEPATU & TAS!</span>
        </span>
        <span class="hidden md:inline text-[#CCFF00]">📞 CS 24 JAM: +62 812-3456-7890</span>
      </div>
    </div>

    <!-- Header Navigation -->
    <Navbar />

    <!-- Core Page Content -->
    <main>

      <!-- Hero-->
      <Hero @select-service="handleSelectService" />

      <!-- Services -->
      <div data-aos="fade-up" data-aos-duration="700">
        <Services @select-service="handleSelectService" />
      </div>

      <!-- AboutInfo -->
      <div data-aos="fade-right" data-aos-duration="700">
        <AboutInfo />
      </div>

      <!-- WhyUs -->
      <div data-aos="fade-left" data-aos-duration="700">
        <WhyUs />
      </div>

      <!-- AI Estimator -->
      <div data-aos="zoom-in" data-aos-duration="600">
        <AiEstimator @auto-fill="handleAutoFill" />
      </div>

      <!-- Booking Form-->
      <div data-aos="fade-up" data-aos-duration="700">
        <BookingForm :autofillData="autofillData" />
      </div>

      <!-- Testimonials -->
      <div data-aos="fade-in" data-aos-duration="900">
        <Testimonials />
      </div>

    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>