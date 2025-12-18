
import { Module, ChecklistItem, SubstitutionItem, RotationWeek } from './types';

export const LEARNING_MODULES: Module[] = [
  {
    id: 1,
    title: "Konsep Halalan Thayyiban",
    description: "Memahami esensi makanan yang tidak hanya halal tapi juga baik untuk tubuh anak.",
    category: "Pondasi",
    content: "Islam memerintahkan kita mengonsumsi makanan yang 'Halal' (sah secara hukum agama) dan 'Thayyib' (baik, sehat, dan berkualitas). Bagi anak dengan kebutuhan khusus, Thayyib berarti menghindari zat yang memicu inflamasi seperti gluten dan kasein yang dapat mengganggu sistem pencernaan dan saraf mereka.",
    verse: {
      arabic: "يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا",
      translation: "Wahai manusia! Makanlah dari (makanan) yang halal dan baik yang terdapat di bumi.",
      reference: "QS. Al-Baqarah: 168"
    },
    keyTakeaway: "Pilihlah makanan yang menenangkan perut agar jiwa anak pun tenang."
  },
  {
    id: 6,
    title: "Niat Sebagai Pondasi Perubahan",
    description: "Mengapa niat yang lurus adalah kunci keberhasilan diet jangka panjang.",
    category: "Pondasi",
    content: "Setiap langkah dalam menyiapkan makanan GFCF adalah bentuk ketaatan kepada Allah dalam menjaga amanah (anak). Niat yang kuat akan menjaga konsistensi saat Bunda merasa lelah atau saat lingkungan kurang mendukung.",
    keyTakeaway: "Luruskan niat, kuatkan tekad, karena ini adalah perjalanan panjang ibadah."
  },
  {
    id: 2,
    title: "Gut-Brain Axis: Koneksi Usus & Otak",
    description: "Mengapa kondisi perut memengaruhi perilaku anak di sekolah atau rumah.",
    category: "Nutrisi",
    content: "Penelitian modern menunjukkan bahwa sistem pencernaan (usus) sering disebut sebagai 'otak kedua'. Sekitar 90% serotonin (hormon bahagia) diproduksi di usus. Jika usus anak bermasalah karena asupan gluten/susu, produksi neurotransmiter ini terganggu, yang memicu tantrum, hiperaktif, dan sulit fokus.",
    keyTakeaway: "Perbaiki pencernaan untuk memperbaiki konsentrasi."
  },
  {
    id: 3,
    title: "Efek Opioid dari Gluten & Kasein",
    description: "Mengenal peptida 'Gluteomorphin' dan 'Casomorphin'.",
    category: "Nutrisi",
    content: "Pada anak tertentu, protein gandum (gluten) dan susu sapi (kasein) tidak tercerna sempurna and berubah menjadi peptida yang strukturnya mirip morfin (opioid). Ini masuk ke otak dan membuat anak merasa 'teler', tertawa tanpa sebab, atau kehilangan kontak mata.",
    keyTakeaway: "Diet GFCF adalah cara memutus rantai 'kecanduan' zat pemicu tersebut."
  },
  {
    id: 4,
    title: "Sabar & Ihsan dalam Mengasuh",
    description: "Menjaga kewarasan mental orang tua melalui pendekatan spiritual.",
    category: "Spiritual",
    content: "Mendidik anak istimewa adalah jalan menuju surga jika dilakukan dengan penuh kesabaran. Allah menjanjikan pahala tanpa batas bagi mereka yang bersabar. Lakukanlah segala tugas—termasuk memasak menu diet—sebagai bentuk ibadah terbaik (Ihsan).",
    verse: {
      arabic: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ",
      translation: "Sesungguhnya hanya orang-orang yang bersabarlah yang dicukupkan pahala mereka tanpa batas.",
      reference: "QS. Az-Zumar: 10"
    },
    keyTakeaway: "Kesabaran Anda adalah kunci kesembuhan bertahap sang anak."
  },
  {
    id: 5,
    title: "Manajemen Sensori Saat Tantrum",
    description: "Langkah praktis menenangkan anak saat kewalahan sensori.",
    category: "Perilaku",
    content: "Tantrum sering terjadi karena overload sensori. Gunakan metode 'Deep Pressure' (pelukan erat jika anak mau), kurangi stimulasi suara/cahaya, dan gunakan suara yang tenang. Ingat, saat anak meledak, ia butuh 'Anchor' (jangkar), bukan ledakan kemarahan balasan.",
    keyTakeaway: "Jadilah tempat yang aman bagi anak saat dunianya terasa berisik."
  },
  {
    id: 7,
    title: "Komunikasi Ayah & Bunda",
    description: "Membangun kesepakatan pola asuh agar anak tidak bingung.",
    category: "Keluarga",
    content: "Keberhasilan diet GFCF sangat bergantung pada kekompakan Ayah dan Bunda. Jika Bunda melarang gandum tapi Ayah memberikan biskuit diam-diam, maka proses perbaikan usus akan terulang dari nol. Komunikasi terbuka tentang progres anak sangat krusial.",
    keyTakeaway: "Satu komando dalam aturan makan adalah bentuk cinta nyata untuk anak."
  },
  {
    id: 8,
    title: "Edukasi Keluarga Besar",
    description: "Menghadapi tantangan saat kumpul keluarga atau kunjungan ke kakek-nenek.",
    category: "Keluarga",
    content: "Seringkali tantangan datang dari keluarga besar yang merasa 'kasihan' jika anak dilarang makan tertentu. Jelaskan dengan santun bahwa ini bukan sekadar larangan, melainkan 'obat' untuk kenyamanan anak. Mintalah dukungan mereka untuk tidak memberikan makanan sembarangan.",
    keyTakeaway: "Keluarga besar adalah support system, edukasi mereka dengan kasih sayang."
  }
];

export const FULL_EBOOK_CONTENT = `
PANDUAN DIET GLUTEN FREE CASEIN FREE UNTUK ANAK AUTISME DAN ADHD
(Menyatukan Ilmu, Ikhtiar, dan Cinta Orang Tua)

Penulis: Trisnawaty, S.Psi., M.Psi., Psikolog

---
KATA PENGANTAR
Bismillāhirrāhmānirrāhīm.
Sebagai psikolog, dosen, dan orang tua, saya menyaksikan betapa besar perjuangan keluarga yang dianugerahi anak dengan autisme dan ADHD. Seringkali anak sulit tenang, tantrum, dan sulit fokus. E-book ini lahir dari gabungan data penelitian dan pengalaman klinis untuk menemani orang tua dalam ikhtiar diet GFCF.

---
BAB 1: MEMAHAMI ANAK KITA
Tantangan harian seperti tantrum, sulit fokus, dan hiperaktif bukan sekadar "nakal", tapi cara otak dan tubuh memproses dunia yang berbeda. 
- Tantrum: Ledakan dari hati yang kewalahan sensori (suara, cahaya, sentuhan).
- Fokus: Pikiran yang melompat-lompat karena terlalu banyak saluran yang menyala di otak.
- Hiperaktif: Tubuh yang terus bergerak untuk melepaskan ketegangan.
Tantrum adalah sinyal. Tugas kita mencari maknanya, bukan hanya mematikannya.

---
BAB 2: HUBUNGAN OTAK, USUS, DAN PERILAKU
Dikenal sebagai Gut-Brain Axis. Usus sering disebut "otak kedua" karena memproduksi serotonin (hormon bahagia).
- Leaky Gut (Usus Bocor): Dinding usus yang longgar membuat partikel makanan yang belum tercerna (seperti peptida gluten/kasein) masuk ke aliran darah.
- Dampak: Tubuh mengenali zat ini sebagai benda asing, memicu reaksi peradangan yang mempengaruhi mood dan perilaku.

---
BAB 3: MENGENAL DIET GFCF
Diet GFCF adalah menghapus total Gluten (protein gandum) dan Casein (protein susu sapi).
- Gluten: Terdapat di terigu, roti, mie, pasta, biskuit.
- Casein: Terdapat di susu sapi, keju, yoghurt, butter.
Teori Peptida Mirip Opioid menjelaskan bagaimana zat ini bisa menempel pada reseptor saraf dan membuat anak merasa "teler" atau kehilangan kontak mata.

---
BAB 4: LANDASAN SPIRITUAL & PSIKOLOGIS
Anak adalah amanah dan jalan pahala. 
"Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya." (QS. Al-Baqarah: 286).
- Spiritual Coping: Mengubah lelah menjadi ibadah dengan meluruskan niat setiap kali memasak dan merawat anak.
- Satu Tim: Peran Ayah sebagai tiang rumah yang suportif sangat krusial bagi ketenangan Ibu.

---
BAB 5: LANGKAH PRAKTIS MULAI DIET
1. Persiapan Medis: Konsultasi dengan dokter dan ahli gizi.
2. Baseline: Mencatat pola perilaku dan pencernaan awal sebagai titik banding.
3. Audit Dapur: Menandai bahan mengandung gluten/casein.
4. Komunikasi: Menjelaskan pada anak (sesuai usia) dan lingkungan sekolah/keluarga besar dengan bahasa yang lembut.

---
BAB 6: ROTASI BAHAN DAN MENU
Rotasi 4 minggu penting untuk:
- Mengurangi kebosanan anak.
- Menjaga kecukupan gizi yang seimbang.
- Mengurangi risiko munculnya sensitivitas baru pada bahan tertentu.

---
BAB 7: TANTANGAN LAPANGAN
- Picky Eater: Gunakan teknik "Lihat - Sentuh - Cicip". Jangan paksa, beri apresiasi pada setiap tahap kecil.
- Tantrum Makanan: Validasi emosi anak ("Mama tahu kamu sedih tidak boleh makan mie itu lagi"), tapi tetap konsisten dengan aturan.
- Burnout: Self-care yang realistis (15-30 menit waktu tenang) sangat penting bagi kesehatan mental orang tua.

---
BAB 8 & 9: MONITORING & PENUTUP
Monitor perubahan perilaku, kualitas tidur, dan pencernaan secara rutin melalui jurnal.
Diet GFCF adalah salah satu "jalan kecil" di antara banyak jalan ikhtiar. Lakukan dengan ilmu, dukungan, dan hati yang lembut.

---
LAMPIRAN: PANDUAN SUBSTITUSI
- Karbohidrat: Ganti terigu dengan tepung beras, sagu, ubi, atau singkong.
- Protein: Pilih daging/ikan segar, hindari nugget/sosis pabrikan.
- Susu: Ganti dengan susu kelapa, susu beras, atau air kaldu tulang (bone broth).

DOA PENGUAT HATI
"Rabbi isyrah li shadri wa yassir li amri"
(Ya Tuhanku, lapangkanlah dadaku, dan mudahkanlah urusanku).

---
© 2025 Trisnawaty. Diunduh via GFCF Monitor App.
`;

export const FOOD_SUBSTITUTIONS: SubstitutionItem[] = [
  {
    category: "Karbohidrat Pokok",
    avoid: ["Roti tawar terigu", "Mie instan terigu", "Sereal gandum", "Nasi instan berbumbu"],
    replace: ["Nasi putih/merah/cokelat", "Bihun beras", "Soun", "Singkong/Ubi rebus", "Tepung Beras/Sagu"],
    notes: "Pilih beras tanpa bumbu instan."
  },
  {
    category: "Produk Susu & Turunan",
    avoid: ["Susu sapi (Cair/Bubuk/UHT)", "Yoghurt susu sapi", "Keju/Butter/Krim"],
    replace: ["Susu beras", "Susu kedelai (jika toleran)", "Susu kelapa", "Air kaldu tulang"],
    notes: "Konsultasikan kebutuhan kalsium dengan ahli gizi."
  },
  {
    category: "Protein Hewani",
    avoid: ["Sosis/Nugget pabrik", "Ayam goreng tepung komersial", "Ikan goreng tepung resto"],
    replace: ["Daging/Ikan/Ayam segar dimasak sendiri", "Bakso rumahan tepung non-gluten", "Telur (jika tidak alergi)"],
    notes: "Banyak produk olahan mengandung gluten sebagai pengisi."
  },
  {
    category: "Bumbu & Saus",
    avoid: ["Kecap manis mengandung terigu", "Saus tiram kemasan", "Kaldu bubuk mengandung ekstrak gandum"],
    replace: ["Kecap manis bebas gluten", "Kecap asin bebas gluten", "Kaldu rumahan (rebusan ayam/ikan/sapi)"],
    notes: "Beberapa merk mencantumkan status gluten/gandum."
  }
];

export const FOUR_WEEK_ROTATION: RotationWeek[] = [
  {
    weekNumber: 1,
    days: {
      "Senin": { pagi: "Nasi putih + telur dadar tipis", siang: "Nasi merah + ikan kuah kuning", sore: "Pepaya potong", malam: "Bubur beras putih + suwiran ayam" },
      "Selasa": { pagi: "Bubur beras merah + pisang", siang: "Nasi putih + ayam panggang", sore: "Pisang rebus", malam: "Nasi putih + tahu kukus" },
      "Rabu": { pagi: "Nasi putih + ikan goreng (tanpa tepung)", siang: "Nasi merah + tumis tempe", sore: "Semangka", malam: "Nasi tim + ayam suwir" },
      "Kamis": { pagi: "Ubi rebus + telur rebus", siang: "Nasi putih + ikan bakar", sore: "Jeruk", malam: "Bubur jagung (tanpa susu)" },
      "Jumat": { pagi: "Lontong beras + telur pindang", siang: "Nasi putih + tumis daging sapi", sore: "Pisang + air kelapa", malam: "Nasi merah + pepes ikan" }
    }
  },
  {
    weekNumber: 2,
    days: {
      "Senin": { pagi: "Singkong rebus + parutan kelapa", siang: "Nasi putih + ikan pindang", sore: "Pisang kukus", malam: "Nasi merah + ayam tumis" },
      "Selasa": { pagi: "Nasi putih + telur ceplok", siang: "Nasi putih + ikan kukus", sore: "Pepaya potong", malam: "Bubur beras merah + tempe kukus" },
      "Rabu": { pagi: "Bubur jagung + pisang", siang: "Nasi putih + ayam bakar", sore: "Melon", malam: "Nasi putih + ikan goreng" },
      "Kamis": { pagi: "Ubi ungu rebus", siang: "Nasi putih + daging cincang tumis", sore: "Mandarin", malam: "Nasi tim + ayam suwir" },
      "Jumat": { pagi: "Nasi putih + tahu goreng", siang: "Nasi merah + ikan kuah asam", sore: "Pisang + kacang rebus", malam: "Bubur beras putih + ayam rebus" }
    }
  }
];

export const IMPLEMENTATION_CHECKLIST: ChecklistItem[] = [
  { id: 'p1', label: 'Membaca ringkasan GFCF & tujuannya', completed: false, category: 'Persiapan' },
  { id: 'p2', label: 'Diskusi & sepakat dengan pasangan', completed: false, category: 'Persiapan' },
  { id: 'p3', label: 'Konsultasi dengan Dokter Anak', completed: false, category: 'Medis' },
  { id: 'p4', label: 'Mengisi baseline awal perilaku & BAB', completed: false, category: 'Monitoring' },
  { id: 'p5', label: 'Audit Dapur: Tandai bahan mengandung gluten/kasein', completed: false, category: 'Teknis' },
  { id: 'p6', label: 'Menyiapkan bahan pengganti GFCF', completed: false, category: 'Teknis' },
];

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: 'd1', label: 'Sarapan GFCF', completed: false, category: 'Menu' },
  { id: 'd2', label: 'Makan Siang GFCF', completed: false, category: 'Menu' },
  { id: 'd3', label: 'Makan Malam GFCF', completed: false, category: 'Menu' },
  { id: 'd4', label: 'Cek Label Snack', completed: false, category: 'Pengecekan' },
  { id: 'd5', label: 'Minum Air Putih Cukup', completed: false, category: 'Hidrasi' },
  { id: 'd6', label: 'Catat Jurnal Perilaku', completed: false, category: 'Monitoring' },
];

export const MOCK_PROGRESS_DATA = [
  { name: 'Sen', score: 80 },
  { name: 'Sel', score: 95 },
  { name: 'Rab', score: 70 },
  { name: 'Kam', score: 85 },
  { name: 'Jum', score: 90 },
  { name: 'Sab', score: 75 },
  { name: 'Min', score: 85 },
];

export const SPIRITUAL_GEMS = [
  {
    verse: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    ref: "QS. Al-Baqarah: 286",
    meaning: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
    note: "Anak istimewa bukan beban, tapi amanah yang kekuatannya sudah Allah siapkan dalam diri kita."
  },
  {
    verse: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    ref: "QS. Asy-Syarh: 5",
    meaning: "Karena sesungguhnya sesudah kesulitan itu ada kemudahan.",
    note: "Kesulitan merawat anak istimewa selalu disertai kemudahan: pintu ilmu, orang-orang baik, dan momen kecil yang menghangatkan hati."
  },
  {
    verse: "ادْعُونِي أَسْتَجِبْ لَكُمْ",
    ref: "QS. Ghafir: 60",
    meaning: "Berdoalah kepada-Ku, niscaya Aku kabulkan.",
    note: "Jadikan doa sebagai tempat pulang saat hati lelah."
  }
];
