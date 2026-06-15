<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Calendar, Clock, Smile, Trash2, Check, ArrowRight, ExternalLink } from 'lucide-vue-next';
import { Booking, ServiceItem } from '../types';

const props = defineProps<{
  autofillData: {
    serviceRecommendation: string;
    estimatedWeight: number;
    notes: string;
  } | null;
}>();

const emit = defineEmits(['booking-success']);

// Service pricing dictionary
const servicesList: ServiceItem[] = [
  { id: "kiloan", name: "Daily Kiloan", description: "", category: "Kiloan", unit: "Kg", price: 8000, icon: "" },
  { id: "cuci_setrika", name: "Cuci & Setrika", description: "", category: "Kiloan", unit: "Kg", price: 12000, icon: "" },
  { id: "sepatu", name: "Laundry Sepatu", description: "", category: "Satuan", unit: "Pasang", price: 30000, icon: "" },
  { id: "tas", name: "Laundry Tas", description: "", category: "Satuan", unit: "Buah", price: 40000, icon: "" },
  { id: "karpet", name: "Laundry Karpet", description: "", category: "Satuan", unit: "M²", price: 15000, icon: "" },
  { id: "gorden", name: "Laundry Gorden", description: "", category: "Satuan", unit: "Kg", price: 12000, icon: "" },
  { id: "stroller", name: "Laundry Stroller", description: "", category: "Satuan", unit: "Buah", price: 50000, icon: "" },
  { id: "boneka", name: "Laundry Boneka", description: "", category: "Satuan", unit: "Buah", price: 20000, icon: "" }
];

// Form fields state
const namaLengkap = ref('');
const noWhatsapp = ref('');
const alamatPenjemputan = ref('');
const selectedServiceId = ref('kiloan');
const tanggalPenjemputan = ref('');
const jamPenjemputan = ref('');
const quantity = ref(1);
const isExpress = ref(false);
const notes = ref('');

// Reactive check for autofill changes
watch(() => props.autofillData, (newVal) => {
  if (newVal) {
    notes.value = newVal.notes;
    quantity.value = newVal.estimatedWeight;
    
    // Find matching service key
    const match = servicesList.find(s => 
      s.name.toLowerCase() === newVal.serviceRecommendation.toLowerCase() ||
      newVal.serviceRecommendation.toLowerCase().includes(s.name.toLowerCase())
    );
    if (match) {
      selectedServiceId.value = match.id;
    }
  }
}, { deep: true });

// Local bookings list representing local database
const bookings = ref<Booking[]>([]);

// Load bookings from localStorage
const loadBookings = () => {
  const stored = localStorage.getItem('cleanbox_bookings');
  if (stored) {
    try {
      bookings.value = JSON.parse(stored);
    } catch (e) {
      bookings.value = [];
    }
  }
};
loadBookings();

// Save bookings to localStorage
const saveBookings = () => {
  localStorage.setItem('cleanbox_bookings', JSON.stringify(bookings.value));
};

// Selected service object helper
const selectedService = computed(() => {
  return servicesList.find(s => s.id === selectedServiceId.value) || servicesList[0];
});

// Computes the unit string based on service selection
const serviceUnit = computed(() => {
  return selectedService.value.unit;
});

// Calculate Estimated Total Bill in Realtime
const calculatedTotal = computed(() => {
  const rate = selectedService.value.price;
  const qty = Math.max(1, quantity.value);
  const expressSurcharge = isExpress.value ? (selectedService.value.category === 'Kiloan' ? 10000 : 20000) : 0;
  
  return (rate + expressSurcharge) * qty;
});

const isFormValid = computed(() => {
  return (
    namaLengkap.value.trim().length > 0 &&
    noWhatsapp.value.trim().length >= 8 &&
    alamatPenjemputan.value.trim().length > 0 &&
    tanggalPenjemputan.value.value !== '' &&
    jamPenjemputan.value.trim().length > 0
  );
});

// Success message state
const showSuccessTicket = ref(false);
const latestBooking = ref<Booking | null>(null);

const handleBooking = () => {
  if (!isFormValid.value) return;

  const newBooking: Booking = {
    id: 'CB-' + Math.floor(100000 + Math.random() * 900000),
    customerName: namaLengkap.value,
    whatsapp: noWhatsapp.value,
    address: alamatPenjemputan.value,
    serviceId: selectedServiceId.value,
    date: tanggalPenjemputan.value,
    time: jamPenjemputan.value,
    totalAmount: calculatedTotal.value,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  // Add to bookings timeline
  bookings.value.unshift(newBooking);
  saveBookings();

  latestBooking.value = newBooking;
  showSuccessTicket.value = true;
  emit('booking-success');

  // Trigger WhatsApp API redirect with structured details
  const waMessage = encodeURIComponent(
    `*📋 RESERVASI PICKUP CLEANBOX LAUNDRY*\n` +
    `----------------------------------------\n` +
    `*Kode booking:* ${newBooking.id}\n` +
    `*Nama:* ${newBooking.customerName}\n` +
    `*WA:* ${newBooking.whatsapp}\n` +
    `*Layanan:* ${selectedService.value.name} (${isExpress.value ? 'Express 3 Jam' : 'Standar 24 Jam'})\n` +
    `*Jumlah:* ${quantity.value} ${selectedService.value.unit}\n` +
    `*Jadwal Pickup:* ${newBooking.date} pukul ${newBooking.time} WIB\n` +
    `*Alamat:* ${newBooking.address}\n` +
    `----------------------------------------\n` +
    `*Total Perkiraan Biaya:* Rp ${calculatedTotal.value.toLocaleString('id-ID')}\n\n` +
    `_Catatan tambahan:_\n${notes.value || '-'}\n\n` +
    `Mohon segera diproses ya CleanBox! Terima kasih.`
  );

  const waURL = `https://wa.me/6281334485889?text=${waMessage}`;
  
  // Open WhatsApp in a new window/tab safely
  setTimeout(() => {
    window.open(waURL, '_blank');
  }, 1000);
};

const clearSuccessTicket = () => {
  showSuccessTicket.value = false;
  latestBooking.value = null;
  
  // Clear only temporary input values
  namaLengkap.value = '';
  noWhatsapp.value = '';
  alamatPenjemputan.value = '';
  notes.value = '';
  quantity.value = 1;
  isExpress.value = false;
};

const deleteBooking = (id: string) => {
  if (confirm("Apakah Anda yakin ingin membatalkan/menghapus riwayat reservasi ini?")) {
    bookings.value = bookings.value.filter(b => b.id !== id);
    saveBookings();
  }
};

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};

const getServiceName = (id: string) => {
  return servicesList.find(s => s.id === id)?.name || id;
};
</script>

<template>
  <section 
    id="reservasi" 
    class="bg-[#0A0A0A]/5 border-b-[3px] border-[#0A0A0A] py-16 md:py-24 px-6 relative"
  >
    <div class="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      <!-- Right Side Sidebar / Recent Bookings Log (5 Columns in Grid) -->
      <div class="lg:col-span-5 order-last lg:order-first space-y-6">
        <div class="bg-[#FFFFFF] border-[3px] border-[#0A0A0A] p-6 shadow-neo">
          <h3 class="font-display font-black text-lg uppercase tracking-tight text-[#0A0A0A] border-b-2 border-[#0A0A0A] pb-3 mb-4 flex items-center justify-between">
            <span>Riwayat Reservasi Saya</span>
            <span class="text-xs font-sans font-bold bg-[#CCFF00] border border-[#0A0A0A] px-2 py-0.5 shadow-[1px_1px_0px_#0A0A0A]">
              {{ bookings.length }} Reservasi
            </span>
          </h3>

          <!-- Booking items list -->
          <div v-if="bookings.length === 0" class="text-center py-10 space-y-2">
            <span class="text-3xl block">🧺</span>
            <p class="font-sans font-bold text-sm text-[#0A0A0A]/50">Belum ada pemesanan tersimpan di browser ini.</p>
          </div>

          <div v-else class="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            <div 
              v-for="booking in bookings" 
              :key="booking.id"
              class="border-2 border-[#0A0A0A] bg-[#fcf8f8] p-4 flex flex-col justify-between relative shadow-[2.5px_2.5px_0px_#0A0A0A] hover:bg-neutral-50 transition-colors"
            >
              
              <!-- Cancel Trigger Button -->
              <button 
                @click="deleteBooking(booking.id)"
                class="absolute top-3 right-3 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-600 p-1 transition-colors"
                title="Batalkan Booking"
              >
                <Trash2 class="w-4 h-4" />
              </button>

              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-black text-[#0A0A0A] bg-[#FFE500] border border-[#0A0A0A] px-1.5 py-0.5 leading-none">
                    {{ booking.id }}
                  </span>
                  <span class="text-[10px] font-sans font-bold text-[#0A0A0A]/60">
                    {{ new Date(booking.createdAt).toLocaleDateString('id-ID') }}
                  </span>
                </div>
                
                <h4 class="font-display font-black text-sm uppercase text-[#0A0A0A] pt-1">
                  {{ getServiceName(booking.serviceId) }}
                </h4>
                
                <p class="text-xs font-sans text-[#0A0A0A]/70 leading-relaxed font-semibold">
                  Jadwal: {{ booking.date }} pukul {{ booking.time }} WIB
                </p>
                
                <p class="text-xs font-sans text-[#0A0A0A]/70 leading-none pb-2">
                  Atas Nama: {{ booking.customerName }}
                </p>
              </div>

              <div class="border-t border-[#0A0A0A]/10 pt-2.5 mt-2 flex items-center justify-between">
                <span class="text-[10px] font-sans font-bold tracking-widest text-[#0A0A0A]/40 uppercase">TOTAL tagihan</span>
                <span class="font-display font-black text-sm text-[#0A0A0A]">
                  {{ formatRupiah(booking.totalAmount) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-[#CCFF00] border-[3px] border-[#0A0A0A] p-4 flex items-start gap-3 shadow-neo">
          <span class="text-xl">ℹ️</span>
          <p class="font-sans font-bold text-[11px] text-[#0A0A0A] leading-relaxed">
            Semua riwayat pemesanan Anda disimpan secara aman secara lokal di browser ini menggunakan standard LocalStorage. Data pendaftaran Anda tidak akan hilang saat halaman ditutup atau disegarkan.
          </p>
        </div>
      </div>

      <!-- Main Pickup Booking Form Block (7 Columns in Grid) -->
      <div class="lg:col-span-7 space-y-6">
        
        <div v-if="!showSuccessTicket" class="bg-[#FFFFFF] border-[3px] border-[#0A0A0A] p-6 sm:p-10 shadow-neo">
          
          <!-- Heading -->
          <div class="space-y-2 mb-8">
            <h3 class="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0A0A0A] leading-none">
              Cucian Numpuk Di Rumah?
            </h3>
            <p class="font-sans font-medium text-sm text-[#0A0A0A]/70 leading-relaxed">
              Isi form di bawah ini dan kurir sigap kami akan segera meluncur ke lokasi Anda dalam 30 menit. Beres cepat, harga bersahabat!
            </p>
          </div>

          <!-- The Physical Form -->
          <form @submit.prevent="handleBooking" class="space-y-5">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Full Name -->
              <div>
                <label for="full-name" class="block font-display font-black text-xs uppercase text-[#0A0A0A] tracking-wider mb-1.5">
                  Nama Lengkap *
                </label>
                <input 
                  type="text" 
                  id="full-name"
                  v-model="namaLengkap"
                  placeholder="John Doe"
                  required
                  class="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] p-3 text-sm font-sans font-semibold placeholder-[#0A0A0A]/40 outline-none focus:border-[#FFE500] focus:shadow-[2px_2px_0px_#0A0A0A] transition-all"
                />
              </div>

              <!-- Whatsapp Number -->
              <div>
                <label for="whatsapp-no" class="block font-display font-black text-xs uppercase text-[#0A0A0A] tracking-wider mb-1.5">
                  No. Whatsapp *
                </label>
                <input 
                  type="tel" 
                  id="whatsapp-no"
                  v-model="noWhatsapp"
                  placeholder="08123456789"
                  required
                  class="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] p-3 text-sm font-sans font-semibold placeholder-[#0A0A0A]/40 outline-none focus:border-[#FFE500] focus:shadow-[2px_2px_0px_#0A0A0A] transition-all"
                />
              </div>
            </div>

            <!-- Pickup Address -->
            <div>
              <label for="pickup-address" class="block font-display font-black text-xs uppercase text-[#0A0A0A] tracking-wider mb-1.5">
                Alamat Lengkap Penjemputan *
              </label>
              <textarea 
                id="pickup-address"
                v-model="alamatPenjemputan"
                rows="2"
                placeholder="Tulis alamat penjemputan lengkap..."
                required
                class="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] p-3 text-sm font-sans font-semibold placeholder-[#0A0A0A]/40 outline-none focus:border-[#FFE500] focus:shadow-[2px_2px_0px_#0A0A0A] transition-all"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Services Selector -->
              <div>
                <label for="service-selector" class="block font-display font-black text-xs uppercase text-[#0A0A0A] tracking-wider mb-1.5">
                  Jenis Layanan *
                </label>
                <select 
                  id="service-selector"
                  v-model="selectedServiceId"
                  class="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] p-3 text-sm font-sans font-bold outline-none focus:border-[#FFE500] transition-colors"
                >
                  <option v-for="s in servicesList" :key="s.id" :value="s.id">
                    {{ s.name }} ({{ formatRupiah(s.price) }}/{{ s.unit }})
                  </option>
                </select>
              </div>

              <!-- Weight / Item quantity estimator -->
              <div>
                <label for="quantity-est" class="block font-display font-black text-xs uppercase text-[#0A0A0A] tracking-wider mb-1.5">
                  Estimasi Jumlah ({{ serviceUnit }}) *
                </label>
                <div class="flex items-center">
                  <button 
                    type="button"
                    @click="quantity = Math.max(1, quantity - 1)"
                    class="bg-[#FFFFFF] border-2 border-r-0 border-[#0A0A0A] px-3.5 py-3 font-bold hover:bg-[#FFE500] active:bg-[#CCFF00]"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    id="quantity-est"
                    v-model.number="quantity"
                    min="1"
                    class="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] p-3 text-center text-sm font-sans font-bold outline-none"
                  />
                  <button 
                    type="button"
                    @click="quantity = quantity + 1"
                    class="bg-[#FFFFFF] border-2 border-l-0 border-[#0A0A0A] px-3.5 py-3 font-bold hover:bg-[#FFE500] active:bg-[#CCFF00]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Pickup Date -->
              <div>
                <label for="pickup-date" class="block font-display font-black text-xs uppercase text-[#0A0A0A] tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar class="w-4 h-4" />
                  Tanggal Penjemputan *
                </label>
                <input 
                  type="date" 
                  id="pickup-date"
                  v-model="tanggalPenjemputan"
                  required
                  class="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] p-3 text-sm font-sans font-bold outline-none"
                />
              </div>

              <!-- Pickup Time Slot -->
              <div>
                <label for="pickup-time" class="block font-display font-black text-xs uppercase text-[#0A0A0A] tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock class="w-4 h-4" />
                  Jam Penjemputan *
                </label>
                <select 
                  id="pickup-time"
                  v-model="jamPenjemputan"
                  required
                  class="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] p-3 text-sm font-sans font-bold outline-none"
                >
                  <option value="" disabled>Pilih jam pickup...</option>
                  <option value="08:00 - 10:00">08:00 - 10:00 (Pagi)</option>
                  <option value="10:00 - 12:00">10:00 - 12:00 (Pagi)</option>
                  <option value="12:00 - 14:00">12:00 - 14:00 (Siang)</option>
                  <option value="14:00 - 16:00">14:00 - 16:00 (Siang)</option>
                  <option value="16:00 - 18:00">16:00 - 18:00 (Sore)</option>
                  <option value="18:00 - 20:00">18:00 - 20:00 (Malam)</option>
                </select>
              </div>
            </div>

            <!-- Notes additional comments -->
            <div>
              <label for="booking-notes" class="block font-display font-black text-xs uppercase text-[#0A0A0A] tracking-wider mb-1.5">
                Catatan Tambahan / Detail Pakaian
              </label>
              <textarea 
                id="booking-notes"
                v-model="notes"
                rows="2"
                placeholder="Misal: Ambil jam 9 saja, ada noda kecap di kerah kemeja..."
                class="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] p-3 text-sm font-sans font-semibold placeholder-[#0A0A0A]/40 outline-none focus:border-[#FFE500] transition-all"
              ></textarea>
            </div>

            <!-- Express Delivery Switch -->
            <div class="border-2 border-[#0A0A0A] bg-[#fcf8f8] p-4 flex items-center justify-between shadow-[2.5px_2.5px_0px_#0A0A0A]">
              <div class="space-y-0.5 max-w-[80%]">
                <span class="font-display font-black text-xs uppercase tracking-wider text-[#0A0A0A] block flex items-center gap-1">
                  ⚡ OPSI EXPRESS 3 JAM SELESAI
                </span>
                <p class="font-sans text-[11px] font-bold text-[#0A0A0A]/60 leading-relaxed">
                  Tambah biaya Rp 10.000 / Kg (Kiloan) atau Rp 20.000 / unit (Satuan). Baju bersih wangi kembali siap pakai dalam 3 jam!
                </p>
              </div>
              <input 
                type="checkbox" 
                v-model="isExpress"
                class="w-5 h-5 accent-[#FFE500] cursor-pointer"
              />
            </div>

            <!-- Price Breakdown Box -->
            <div class="border-[3px] border-[#0A0A0A] bg-[#0A0A0A]/5 p-5 flex flex-col justify-between sm:flex-row items-center gap-4">
              <div>
                <span class="text-[10px] font-display font-black text-[#0A0A0A]/50 tracking-widest uppercase block">Estimasi billing</span>
                <span class="font-display font-black text-2xl text-[#0A0A0A] tracking-tight">
                  {{ formatRupiah(calculatedTotal) }}
                </span>
                <span class="text-[10px] font-sans font-bold block text-[#0A0A0A]/40 mt-0.5">
                  ({{ quantity }} {{ serviceUnit }} @ {{ formatRupiah(selectedService.price) }} / {{ serviceUnit }} {{ isExpress ? '+ Express' : '' }})
                </span>
              </div>
              <button 
                type="submit"
                :disabled="!isFormValid"
                class="w-full sm:w-auto bg-[#FFE500] disabled:bg-[#0A0A0A]/10 text-[#0A0A0A] border-2 border-[#0A0A0A] px-10 py-4 font-display font-black uppercase text-sm tracking-wider disabled:opacity-40 shadow-neo hover:bg-[#CCFF00] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] active:translate-x-[1.5px] active:translate-y-[1.5px] cursor-pointer"
                id="btn-pickup-submit"
              >
                PICKUP NOW 🚚
              </button>
            </div>

          </form>
        </div>

        <!-- Success Ticket Receipt Rendering -->
        <div 
          v-else 
          class="bg-[#FFFFFF] border-[4px] border-[#0A0A0A] p-6 sm:p-10 shadow-neo-lg space-y-6 relative border-t-[10px] border-t-[#CCFF00]"
          id="success-ticket"
        >
          <!-- Success Stamp -->
          <div class="flex items-center justify-between border-b-[3px] border-dashed border-[#0A0A0A] pb-4">
            <div>
              <span class="text-xs font-display font-black text-green-600 uppercase tracking-widest block">STATUS RESERVASI</span>
              <span class="font-display font-black text-2xl uppercase tracking-tight text-[#0A0A0A] flex items-center gap-2">
                🟢 BERHASIL DIPESAN
              </span>
            </div>
            <div class="text-center bg-[#CCFF00] border-2 border-[#0A0A0A] p-2 leading-none font-display font-black shadow-neo-sm transform rotate-3 text-xs select-none uppercase">
              SUKSES
            </div>
          </div>

          <p class="font-sans font-semibold text-sm text-[#0A0A0A]/80 leading-relaxed bg-[#fcf8f8] p-4 border-2 border-[#0A0A0A]">
            🎉 Hore! Reservasi penjemputan berhasil terdaftar. Rincian booking Anda di bawah telah kami format dan **kami sedang mengarahkan Anda ke WhatsApp** CS CleanBox untuk koordinasi pickup langsung oleh kurir.
          </p>

          <!-- Ticket breakdown details -->
          <div v-if="latestBooking" class="space-y-3 font-sans font-semibold text-sm text-[#0A0A0A]">
            <div class="grid grid-cols-2 py-1 border-b border-[#0A0A0A]/5">
              <span class="text-[#0A0A0A]/50">Kode Booking</span>
              <span class="font-mono font-black text-[#0A0A0A]">{{ latestBooking.id }}</span>
            </div>
            
            <div class="grid grid-cols-2 py-1 border-b border-[#0A0A0A]/5">
              <span class="text-[#0A0A0A]/50">Nama Pelanggan</span>
              <span>{{ latestBooking.customerName }}</span>
            </div>

            <div class="grid grid-cols-2 py-1 border-b border-[#0A0A0A]/5">
              <span class="text-[#0A0A0A]/50">Pilihan Layanan</span>
              <span>{{ getServiceName(latestBooking.serviceId) }} ({{ quantity }} {{ serviceUnit }})</span>
            </div>

            <div class="grid grid-cols-2 py-1 border-b border-[#0A0A0A]/5">
              <span class="text-[#0A0A0A]/50">Jadwal Penjemputan</span>
              <span class="text-amber-600">{{ latestBooking.date }} pukul {{ latestBooking.time }} WIB</span>
            </div>

            <div class="grid grid-cols-2 py-1 border-b border-[#0A0A0A]/5">
              <span class="text-[#0A0A0A]/50">Alamat Penjemputan</span>
              <span class="text-xs truncate" :title="latestBooking.address">{{ latestBooking.address }}</span>
            </div>

            <div class="grid grid-cols-2 py-2 border-t-2 border-dashed border-[#0A0A0A] font-display font-black text-lg pt-3">
              <span>TOTAL ESTIMASI</span>
              <span class="text-right">{{ formatRupiah(latestBooking.totalAmount) }}</span>
            </div>
          </div>

          <!-- Actions inside success page -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              @click="clearSuccessTicket"
              class="w-full sm:w-1/2 bg-[#FFFFFF] hover:bg-neutral-50 text-[#0A0A0A] border-3 border-[#0A0A0A] py-3.5 font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Cek Riwayat Booking Saya
            </button>
            <a 
              :href="`https://wa.me/6281234567890?text=${encodeURIComponent('Halo CleanBox, mau follow up booking ' + latestBooking?.id)}`"
              target="_blank"
              class="w-full sm:w-1/2 bg-[#FFE500] hover:bg-[#CCFF00] text-[#0A0A0A] border-3 border-[#0A0A0A] py-3.5 font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer"
            >
              <span>Hubungi CS di WA</span>
              <ExternalLink class="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
