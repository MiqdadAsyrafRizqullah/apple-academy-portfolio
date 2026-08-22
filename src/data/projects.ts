import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'project-labirin',
    title: 'Website Labirin Children Center',
    description: 'Klinik Tumbuh Kembang & Terapi Anak di Kendari yang menyediakan layanan kesehatan dan pendidikan inklusi.',
    fullDescription: `Proyek ini saya inisiasi untuk membantu sebuah klinik tumbuh kembang anak dalam menyediakan sarana edukasi dan informasi yang terstruktur secara digital. Tujuan utamanya adalah menciptakan ruang digital yang menyenangkan namun tetap mengedepankan nilai edukasi bagi anak dan orang tua.

Hasilnya, website ini sukses menjadi pusat informasi utama yang memadukan elemen permainan edukatif dengan antarmuka yang sangat menarik. Perubahan ini secara signifikan meningkatkan keterlibatan pengunjung dan mempermudah orang tua untuk mendapatkan jadwal kegiatan anak.

Melalui proyek ini, saya mendapatkan pelajaran berharga tentang cara membuat interaksi web terasa "hidup" tanpa mengorbankan performa. Saya belajar banyak tentang optimasi animasi CSS dan penerapan logika interaksi JavaScript yang efisien.`,
    category: 'Web',
    thumbnail: '/assets/images/projects/labirin.png',
    gallery: [
      '/assets/images/projects/labirin.png',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    projectUrl: 'https://labirinchildrencenter.com/Oke1/frontend/index.html',
    repoUrl: 'https://github.com/MiqdadAsyrafRizqullah/labirin-children-center',
    challenges: 'Membangun elemen interaktif (seperti mini-game/kuis) yang tidak memberatkan kinerja website, serta merancang struktur navigasi yang logis untuk dua target pengguna yang berbeda (anak-anak dan orang tua).',
    solutions: 'Saya menggunakan pendekatan Vanilla JS murni untuk interaktivitas guna menghindari overhead dari framework berat, dan merancang arsitektur informasi yang memisahkan area publik (informasi) dengan area interaktif secara jelas.',
    teamStatus: 'Group Project',
    role: 'Lead Fullstack Developer',
    context: 'Client Project',
    featured: true,
  },
  {
    id: 'project-setara',
    title: 'Website Setara Kids School',
    description: 'Website resmi Setara Kids School Kendari dengan informasi program belajar unggulan, fasilitas, dan profil pendidik.',
    fullDescription: `Web ini mulai dibangun ketika saya melihat adanya kebutuhan mendesak dari pihak sekolah untuk mendigitalkan proses pendaftaran siswa baru, serta mempermudah akses informasi bagi orang tua murid yang sebelumnya masih serba manual.

Hasil akhirnya adalah sebuah platform pendidikan interaktif yang tidak hanya mempercepat proses administrasi sekolah, tetapi juga memberikan pengalaman pengguna yang sangat ramah anak. Sekolah kini memiliki sistem pendaftaran online terpusat yang sangat informatif bagi orang tua.

Proyek ini menyadarkan saya tentang betapa pentingnya menyeimbangkan estetika desain visual (seperti penggunaan warna cerah dan tipografi yang tepat) dengan fungsionalitas sistem informasi yang serius di belakangnya.`,
    category: 'Web',
    thumbnail: '/assets/images/projects/setara.png',
    gallery: [
      '/assets/images/projects/setara.png',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    projectUrl: 'https://setarakidsschool.sch.id',
    repoUrl: 'https://github.com/MiqdadAsyrafRizqullah/setara-kids-school',
    challenges: 'Bagaimana mendesain antarmuka (UI/UX) yang disukai anak-anak namun tetap profesional dan mudah dinavigasi oleh orang tua yang gaptek, serta mengoptimalkan performa halaman karena banyaknya aset visual.',
    solutions: 'Saya melakukan riset mendalam terkait psikologi warna untuk pendidikan, lalu menerapkan palet warna cerah namun tidak menyilaukan. Untuk performa, saya mengimplementasikan teknik kompresi gambar modern dan lazy-loading agar website tetap super cepat.',
    teamStatus: 'Group Project',
    role: 'Lead Fullstack Developer',
    context: 'Client Project',
    featured: true,
  },
  {
    id: 'project-sirekap',
    title: 'Sistem Informasi Rekap Bimbingan',
    description: 'Aplikasi berbasis web untuk manajemen dan rekapitulasi bimbingan skripsi mahasiswa.',
    fullDescription: `Sistem ini lahir langsung dari permasalahan nyata yang saya temui di kampus: proses bimbingan skripsi yang sangat tidak teratur, sering tercecer, dan sulit dilacak. Saya bertekad menciptakan solusi digital yang mampu memecahkan masalah birokrasi rumit antara Mahasiswa, Dosen, dan Kaprodi.

Dampaknya sangat luar biasa karena website ini berhasil merapikan seluruh alur bimbingan. Kini, mahasiswa dapat menjadwalkan bimbingan secara online, dosen dapat merekap nilai langsung di sistem, dan Kaprodi memiliki dashboard khusus untuk memantau kemajuan seluruh mahasiswa.

Ini adalah proyek yang sangat melatih kemampuan arsitektur backend saya. Saya belajar merancang relasi database dari nol, mengatur hak akses pengguna yang kompleks (role-based access control), serta cara menerjemahkan kebutuhan pengguna asli ke dalam logika sistem.`,
    category: 'Web',
    thumbnail: '/assets/images/projects/sirekap.png',
    gallery: [
      '/assets/images/projects/sirekap.png',
      '/assets/images/projects/sirekap-gallery/beranda-admin.png',
      '/assets/images/projects/sirekap-gallery/beranda-kaprodi.png',
      '/assets/images/projects/sirekap-gallery/beranda-dosen.png',
      '/assets/images/projects/sirekap-gallery/beranda-mahasiswa.png',
      '/assets/images/projects/sirekap-gallery/pengajuan-judul-skripsi-mahasiswa.png',
      '/assets/images/projects/sirekap-gallery/persetujuan-judul-skripsi-kaprodi.png',
      '/assets/images/projects/sirekap-gallery/penetapan-pembimbing-kaprodi.png',
      '/assets/images/projects/sirekap-gallery/pengajuan-bimbingan-mahasiswa.png',
      '/assets/images/projects/sirekap-gallery/jadwal-skripsi-admin.png',
      '/assets/images/projects/sirekap-gallery/status-kelayakan-sidang-mahasiswa.png',
      '/assets/images/projects/sirekap-gallery/cetak-arsip-admin.png'
    ],
    technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    projectUrl: 'http://si-rekap-bimbingan.infinityfreeapp.com',
    repoUrl: 'https://github.com/MiqdadAsyrafRizqullah/sirekap-bimbingan',
    challenges: 'Merancang alur sistem terintegrasi yang melibatkan berbagai peran (Mahasiswa, Dosen, Kaprodi) dengan hak akses dan fitur yang berbeda-beda.',
    solutions: 'Membuat rancangan basis data relasional (MySQL) yang kokoh dan memecah logika bisnis menggunakan PHP native untuk mengelola status pengajuan judul dan riwayat bimbingan.',
    teamStatus: 'Individual Project',
    role: 'Solo Fullstack Developer',
    context: 'Class Assignment',
    featured: true,
  },
  {
    id: 'project-sultramarine',
    title: 'SultraMarine: Deep Learning Fish Classification',
    description: 'Aplikasi AI berbasis web untuk mengklasifikasikan jenis ikan ekonomis di Sulawesi Tenggara menggunakan EfficientNetV2B0.',
    fullDescription: `Proyek ini lahir dari keinginan saya mengeksplorasi potensi kecerdasan buatan (AI) di bidang perikanan kelautan, khususnya di daerah Sulawesi Tenggara. Saya melihat tantangan nyata dalam mengklasifikasikan jenis ikan secara akurat dan efisien, sehingga saya berinisiatif merancang model Deep Learning yang dapat mengklasifikasikan 9 jenis ikan ekonomis penting secara otomatis.

Hasil akhirnya adalah SultraMarine, sebuah model Machine Learning dengan arsitektur EfficientNetV2B0 yang diintegrasikan ke dalam antarmuka web interaktif. Sistem ini tidak hanya berhasil mengenali ke-9 spesies ikan tersebut dengan akurasi tinggi, tetapi proyek ini juga menghasilkan jurnal ilmiah akademik ("SULTRAMARINE-NET DEEP LEARNING CLASSIFICATION OF ECONOMIC FISH").

Proses pengembangan ini merupakan lompatan besar dalam perjalanan belajar saya di bidang Artificial Intelligence. Saya belajar banyak hal mulai dari pengumpulan dataset (ratusan gambar ikan), teknik augmentasi data, pelatihan model di Jupyter Notebook, hingga bagaimana melakukan penerapan (deployment) model AI tersebut ke dalam aplikasi web (React) agar bisa digunakan oleh masyarakat umum.`,
    category: 'AI',
    thumbnail: '/assets/images/projects/sultramarine.png',
    gallery: [
      '/assets/images/projects/sultramarine.png',
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Machine Learning'],
    projectUrl: 'https://sultramarine.vercel.app',
    repoUrl: 'https://github.com/MiqdadAsyrafRizqullah/sultramarine',
    challenges: 'Melatih model Machine Learning dari nol membutuhkan data gambar ikan yang sangat besar dan berkualitas. Selain itu, mengintegrasikan file model berukuran besar ke dalam aplikasi web agar responsif juga merupakan tantangan teknis tersendiri.',
    solutions: 'Saya melakukan preprocessing dan augmentasi data yang intensif untuk memperkaya dataset. Untuk mengatasi kendala deployment, saya memisahkan backend pemrosesan AI (FastAPI) dari frontend (React) sehingga aplikasi tetap berjalan dengan cepat dan lancar di browser.',
    teamStatus: 'Group Project (Sole Contributor)',
    role: 'Lead AI & Web Developer',
    context: 'Class Assignment',
    featured: true,
  }
];
