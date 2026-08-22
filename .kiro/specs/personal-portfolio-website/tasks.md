# Implementation Plan: Personal Portfolio Website

## Overview

Implementasi web portofolio personal sebagai Single Page Application (SPA) berbasis React + Vite + TypeScript. Setiap task dibangun secara inkremental — mulai dari fondasi proyek, lalu komponen UI, section per section, hingga integrasi akhir dan pengujian.

---

## Tasks

- [x] 1. Setup proyek dan fondasi
  - Inisialisasi proyek dengan `npm create vite@latest` menggunakan template `react-ts`
  - Install dependensi: `tailwindcss`, `framer-motion`, `@tsparticles/react`, `@tsparticles/slim`, `emailjs-com`, `lucide-react`, `swiper`
  - Install dependensi dev: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jest-axe`, `fast-check`, `@types/jest-axe`
  - Konfigurasi Tailwind CSS dengan `tailwind.config.ts` — aktifkan `darkMode: 'class'`, definisikan CSS custom properties untuk color tokens
  - Buat `src/styles/globals.css` dengan definisi CSS variables untuk light mode dan dark mode (memenuhi kontras ≥ 4.5:1)
  - Konfigurasi `vitest.config.ts` dengan environment `jsdom` dan setup file
  - Buat `src/test/setup.ts` dengan import `@testing-library/jest-dom`, konfigurasi `jest-axe`, dan `fast-check` global `numRuns: 100`
  - Buat file `.env.example` dengan placeholder `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`
  - _Requirements: 11.1_

- [x] 2. Definisikan tipe data dan data statis
  - [x] 2.1 Buat `src/types/index.ts` dengan semua interface dan type
    - Definisikan `ProjectCategory`, `Project`, `SkillCategory`, `Skill`, `Certificate`, `NavItem`, `Theme`, `ThemeColors`, `PersonalInfo`
    - Aktifkan TypeScript strict mode di `tsconfig.json`
    - _Requirements: 4.1, 4.2, 5.1, 6.1_

  - [x] 2.2 Buat file data statis
    - Buat `src/data/personal.ts` dengan data pemilik (nama, titles, tagline, bio, foto, CV URL, email, sosial, stats, interests)
    - Buat `src/data/projects.ts` dengan minimal 6 proyek termasuk website yayasan dan TK/PAUD, masing-masing dengan semua field `Project`
    - Buat `src/data/skills.ts` dengan skill dikelompokkan ke 4 kategori: UI/UX Design, Web Development, Mobile/App Development, Artificial Intelligence
    - Buat `src/data/certificates.ts` dengan sertifikat dari Dicoding Indonesia dan penerbit lain
    - _Requirements: 4.1, 5.1, 6.1_

- [x] 3. Implementasi custom hooks
  - [x] 3.1 Buat `src/hooks/useTheme.ts`
    - Implementasikan logika: cek `localStorage` → fallback ke `prefers-color-scheme` → default `'light'`
    - `toggleTheme()` mengubah state, memperbarui class `dark` pada `document.documentElement`, dan menyimpan ke `localStorage`
    - Return `{ theme, toggleTheme }`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 3.2 Tulis property test untuk `useTheme`
    - **Property 10: Theme Toggle Correctness**
    - **Validates: Requirements 7.2, 7.3, 7.4**

  - [x] 3.3 Buat `src/hooks/useScrollProgress.ts`
    - Track posisi scroll sebagai persentase (0–100) menggunakan `window.scrollY` dan `document.body.scrollHeight`
    - Return `scrollProgress: number`
    - _Requirements: 8.1_

  - [x] 3.4 Buat `src/hooks/useActiveSection.ts`
    - Gunakan `IntersectionObserver` untuk mendeteksi section mana yang sedang aktif di viewport
    - Return `activeSection: string`
    - _Requirements: 1.2_

  - [x] 3.5 Buat `src/hooks/useIntersectionObserver.ts`
    - Hook generik yang menerima `ref` dan `options`, return `isIntersecting: boolean`
    - _Requirements: 8.1_

  - [x] 3.6 Buat `src/hooks/useCountingAnimation.ts`
    - Animasikan angka dari 0 ke `target` dalam `duration` ms (max 2000ms) menggunakan `requestAnimationFrame`
    - Return `currentValue: number`
    - _Requirements: 3.3, 3.4_

  - [x] 3.7 Tulis property test untuk `useCountingAnimation`
    - **Property 14: Counting Animation Correctness**
    - **Validates: Requirements 3.3, 3.4**

- [x] 4. Implementasi utilitas
  - [x] 4.1 Buat `src/utils/validationUtils.ts`
    - Implementasikan `validateContactForm(data: FormState): FormErrors`
    - Validasi: `name` (wajib, min 2 karakter), `email` (wajib, regex RFC 5322), `subject` (wajib, min 3 karakter), `message` (wajib, min 10 karakter)
    - _Requirements: 6.2, 6.3_

  - [x] 4.2 Tulis property test untuk `validateContactForm`
    - **Property 9: Contact Form Validation**
    - **Validates: Requirements 6.2, 6.3**

  - [x] 4.3 Buat `src/utils/scrollUtils.ts`
    - Implementasikan `scrollToSection(id: string)` yang memanggil `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`
    - _Requirements: 1.4_

  - [x] 4.4 Buat `src/utils/colorUtils.ts`
    - Implementasikan fungsi helper untuk membaca CSS custom properties dari tema aktif
    - _Requirements: 7.6, 10.2_

- [x] 5. Implementasi komponen UI dasar
  - [x] 5.1 Buat `src/components/ui/TypewriterEffect.tsx`
    - Implementasikan efek ketik dan hapus menggunakan `useState` dan `useEffect` dengan `setInterval`
    - Props: `texts`, `typingSpeed` (default 80ms), `deletingSpeed` (default 50ms), `pauseDuration` (default 2000ms)
    - Handle edge case: `texts` array kosong → tampilkan string kosong tanpa crash
    - _Requirements: 1.3_

  - [x] 5.2 Tulis property test untuk `TypewriterEffect`
    - **Property 1: Typewriter Cycle Completeness**
    - **Validates: Requirements 1.3**

  - [x] 5.3 Buat `src/components/ui/ParticleSystem.tsx`
    - Wrapper `@tsparticles/react` dengan konfigurasi: partikel kecil opacity rendah, interaksi `repulse` pada hover (response ≤ 100ms)
    - Fallback: jika tsParticles gagal inisialisasi, tampilkan gradient background statis
    - _Requirements: 1.5_

  - [x] 5.4 Buat `src/components/ui/ThemeToggle.tsx`
    - Tombol ikon (sun/moon dari Lucide React) yang memanggil `toggleTheme()` dari `useTheme`
    - Transisi warna smooth menggunakan Tailwind `transition-colors duration-300`
    - Accessible: `aria-label` yang deskriptif, keyboard-focusable
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 5.5 Buat `src/components/ui/SkillBar.tsx`
    - Render nama skill, ikon teknologi, dan indikator proficiency (progress bar atau badge)
    - Animasi `whileInView` dari Framer Motion saat masuk viewport
    - Tooltip saat hover menampilkan nama skill dan proficiency level
    - _Requirements: 3.2, 3.3, 3.4_

  - [x] 5.6 Tulis property test untuk `SkillBar`
    - **Property 4: Skill Data Rendering Completeness**
    - **Validates: Requirements 3.1, 3.2_**

  - [x] 5.7 Buat `src/components/ui/ProjectCard.tsx`
    - Render thumbnail (`loading="lazy"`), title, description, technologies
    - Hover overlay dengan tombol "Lihat Detail" dan "Buka Tautan"
    - Fallback gambar: placeholder dengan ikon dan teks "Gambar tidak tersedia" jika `onError`
    - Klik kartu/tombol detail: panggil `onOpenModal(project)`
    - _Requirements: 4.2, 4.5_

  - [x] 5.8 Tulis property test untuk `ProjectCard`
    - **Property 5: Project Card Rendering Completeness**
    - **Validates: Requirements 4.2_**

  - [x] 5.9 Buat `src/components/ui/ProjectModal.tsx`
    - Modal dengan full description, gallery gambar (Swiper carousel), technologies, link live/repo
    - Tutup dengan klik backdrop atau tombol close (keyboard: Escape)
    - Accessible: `role="dialog"`, `aria-modal="true"`, focus trap
    - _Requirements: 4.3_

  - [x] 5.10 Buat `src/components/ui/CertificateCard.tsx`
    - Render gambar sertifikat, nama, issuer, tahun
    - Tampilkan tombol "Verifikasi" hanya jika `verificationUrl` ada
    - Hover: efek lift/glow menggunakan Framer Motion `whileHover`
    - Fallback gambar jika gagal dimuat
    - _Requirements: 5.2, 5.3, 5.5_

  - [x] 5.11 Tulis property test untuk `CertificateCard`
    - **Property 8: Certificate Card Rendering Completeness**
    - **Validates: Requirements 5.1, 5.2_**

  - [x] 5.12 Buat `src/components/ui/CertificateLightbox.tsx`
    - Lightbox untuk menampilkan gambar sertifikat ukuran penuh atau link verifikasi
    - Tutup dengan klik backdrop atau tombol close (keyboard: Escape)
    - _Requirements: 5.3_

  - [x] 5.13 Buat `src/components/ui/AnimatedCounter.tsx`
    - Gunakan `useCountingAnimation` hook untuk animasi angka 0 → target
    - Render nilai dengan suffix opsional
    - Fallback: jika `target` bukan angka valid, tampilkan nilai langsung tanpa animasi
    - _Requirements: 3.3, 3.4_

  - [x] 5.14 Buat `src/components/ui/ContactForm.tsx`
    - Form dengan field: name, email, subject, message
    - Validasi client-side menggunakan `validateContactForm` — tampilkan error inline ≤ 200ms
    - Submit: kirim via EmailJS menggunakan env variables, tampilkan status `loading` → `success`/`error`
    - Error state: tampilkan pesan "Gagal mengirim pesan. Silakan coba lagi atau hubungi via email langsung."
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 5.15 Tulis unit test untuk `ContactForm`
    - Test validasi: email kosong, format email salah, semua field valid
    - Test submit: mock EmailJS, verifikasi pesan sukses/error ditampilkan
    - _Requirements: 6.2, 6.3_

- [x] 6. Checkpoint — Pastikan semua unit test dan property test lulus
  - Jalankan `npx vitest --run` dan pastikan semua test hijau sebelum melanjutkan.

- [x] 7. Implementasi komponen layout
  - [x] 7.1 Buat `src/components/layout/NavigationBar.tsx`
    - Sticky nav dengan logo/nama, nav links (dari `NAV_ITEMS`), dan `ThemeToggle`
    - `isScrolled`: tambahkan `backdrop-blur` dan `bg-opacity-90` saat scroll melewati Hero
    - Mobile (< 768px): sembunyikan nav links, tampilkan hamburger button; toggle `isMobileMenuOpen`
    - Setiap nav link memanggil `scrollToSection(id)` dan menandai `activeSection` dengan class aktif
    - _Requirements: 7.1, 9.3_

  - [x] 7.2 Tulis property test untuk `NavigationBar`
    - **Property 2: Navigation Completeness and Active State**
    - **Validates: Requirements 1.2, 9.3_**

  - [x] 7.3 Buat `src/components/layout/ScrollProgressIndicator.tsx`
    - Progress bar tipis di bagian atas halaman yang menggunakan `useScrollProgress`
    - _Requirements: 8.1_

  - [x] 7.4 Buat `src/components/layout/BackToTopButton.tsx`
    - Tombol yang muncul saat scroll > 300px, klik scroll ke atas dengan smooth behavior
    - Animasi masuk/keluar menggunakan Framer Motion `AnimatePresence`
    - _Requirements: 8.3_

  - [x] 7.5 Buat `src/components/layout/CustomCursor.tsx`
    - Custom cursor yang mengikuti posisi mouse menggunakan `mousemove` event
    - Sembunyikan di mobile/touch device
    - _Requirements: 8.3_

  - [x] 7.6 Buat `src/components/layout/Footer.tsx`
    - Tampilkan copyright dengan tahun dinamis: `new Date().getFullYear()`
    - Tampilkan social links dan nav links singkat
    - _Requirements: 10.2_

  - [x] 7.7 Tulis property test untuk `Footer`
    - **Property 13: Copyright Year Accuracy**
    - **Validates: Requirements 10.2_**

- [x] 8. Implementasi sections
  - [x] 8.1 Buat `src/components/sections/HeroSection.tsx`
    - Susun: `ParticleSystem` (background), foto profil, nama, `TypewriterEffect` (titles), tagline, CTA buttons, `SocialLinks`
    - CTA button: smooth scroll ke `#portfolio` atau `#contact`
    - Scroll indicator: ikon panah bawah dengan animasi bounce
    - Parallax background menggunakan Framer Motion `useScroll` + `useTransform`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 8.2_

  - [x] 8.2 Buat `src/components/sections/AboutSection.tsx`
    - Layout asimetris: foto profil di satu sisi, teks di sisi lain
    - Tampilkan bio, background profesional (UI/UX, Web, App, AI), stats (AnimatedCounter), interests
    - Tombol unduh CV: `<a href={cvUrl} download target="_blank">`
    - Scroll animation: `whileInView` fade-in/slide-in per content block
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 8.3 Buat `src/components/sections/SkillsSection.tsx`
    - Render `SkillBar` dikelompokkan per `SkillCategory` (4 kategori)
    - Scroll animation: staggered entrance menggunakan Framer Motion `staggerChildren`
    - Pastikan konsistensi visual dengan color palette
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 8.4 Buat `src/components/sections/PortfolioSection.tsx`
    - Render `FilterBar` (tombol filter per `ProjectCategory` + "Semua")
    - Filter state: tampilkan `ProjectCard` sesuai kategori aktif
    - Scroll animation: staggered entrance per kartu
    - Integrasikan `ProjectModal` dengan `AnimatePresence`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 8.5 Tulis property test untuk filter portofolio
    - **Property 6: Portfolio Filter Correctness**
    - **Validates: Requirements 4.6_**

  - [x] 8.6 Tulis property test untuk jumlah minimum proyek
    - **Property 7: Minimum Portfolio Count**
    - **Validates: Requirements 4.1_**

  - [x] 8.7 Buat `src/components/sections/CertificateSection.tsx`
    - Render `CertificateCard` dalam grid/carousel menggunakan Swiper.js
    - Tampilkan total jumlah sertifikat di section summary
    - Scroll animation: fade-in atau flip per kartu
    - Integrasikan `CertificateLightbox` dengan `AnimatePresence`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 8.8 Buat `src/components/sections/ContactSection.tsx`
    - Susun: `ContactForm` di satu sisi, `ContactInfo` (email, social links) di sisi lain
    - Social links: LinkedIn, GitHub, Instagram — semua `target="_blank" rel="noopener noreferrer"`
    - Tampilkan email profesional sebagai direct contact
    - _Requirements: 6.1, 6.4, 6.5, 6.6_

- [x] 9. Implementasi ErrorBoundary dan aksesibilitas global
  - [x] 9.1 Buat `src/components/ErrorBoundary.tsx`
    - React class component `ErrorBoundary` dengan `componentDidCatch`
    - Render `<SectionErrorFallback sectionName={...} />` sebagai fallback
    - _Requirements: 11.5_

  - [x] 9.2 Audit aksesibilitas komponen
    - Pastikan semua `<img>` memiliki `alt` yang tidak kosong
    - Pastikan semua interactive elements keyboard-focusable dengan visible focus indicator
    - Pastikan semua interactive elements dan landmark memiliki `aria-label` atau semantic role
    - Tambahkan `aria-label` pada `ThemeToggle`, hamburger button, social links, form fields
    - _Requirements: 11.2, 11.3, 11.4_

  - [x] 9.3 Tulis property test untuk aksesibilitas
    - **Property 12: Accessibility Properties**
    - **Validates: Requirements 11.2, 11.3, 11.4_**

- [x] 10. Wiring: Rakit App.tsx dan integrasi akhir
  - [x] 10.1 Buat `src/App.tsx`
    - Bungkus seluruh app dengan `ThemeProvider` (context dari `useTheme`)
    - Susun: `CustomCursor`, `NavigationBar`, `ScrollProgressIndicator`, semua sections dalam `<main>`, `Footer`, `BackToTopButton`
    - Bungkus setiap section dengan `ErrorBoundary`
    - Pastikan setiap section memiliki `id` yang sesuai dengan `NAV_ITEMS`
    - _Requirements: 1.1, 7.1, 11.2_

  - [x] 10.2 Implementasikan `prefers-reduced-motion`
    - Tambahkan CSS global: `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`
    - Pastikan Framer Motion menghormati `useReducedMotion()` hook
    - _Requirements: 8.5_

  - [x] 10.3 Implementasikan responsive layout dan optimasi aset
    - Verifikasi layout di breakpoint 320px, 768px, 1024px, 1440px — tidak ada horizontal overflow
    - Pastikan semua touch targets ≥ 44×44px di mobile
    - Tambahkan `srcSet` atau gunakan format WebP untuk gambar high-DPI
    - Pastikan semua gambar below-the-fold menggunakan `loading="lazy"`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 11.6_

  - [x] 10.4 Tulis property test untuk responsive layout
    - **Property 3: Responsive Layout at All Breakpoints**
    - **Validates: Requirements 9.1, 9.3_**

  - [x] 10.5 Konfigurasi tipografi, favicon, dan identitas visual
    - Import dua font family (heading + body) dari Google Fonts di `globals.css`
    - Definisikan typographic scale menggunakan Tailwind `fontSize` config
    - Definisikan spacing scale (multiples of 4px/8px) di Tailwind config
    - Tambahkan custom favicon dan `<title>` yang mencerminkan personal brand
    - _Requirements: 10.1, 10.2, 10.4, 10.5_

  - [x] 10.6 Tulis property test untuk konsistensi color palette
    - **Property 15: Color Palette Consistency**
    - **Validates: Requirements 10.2_**

  - [x] 10.7 Tulis property test untuk konsistensi ikon
    - **Property 11: Icon Library Consistency**
    - **Validates: Requirements 8.8_**

- [ ] 11. Checkpoint akhir — Pastikan semua test lulus
  - Jalankan `npx vitest --run` dan pastikan semua test hijau.
  - Jalankan `npx tsc --noEmit` untuk memastikan tidak ada TypeScript error.
  - Jalankan `npm run build` untuk memastikan build produksi berhasil tanpa error.

---

## Notes

- Task bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirements spesifik untuk traceability
- Property test menggunakan **fast-check** dengan minimal 100 iterasi per property
- Unit test menggunakan **Vitest** + **React Testing Library** + **jest-axe**
- Semua environment variable EmailJS disimpan di `.env` (tidak di-commit ke repo)
- Jalankan test dengan: `npx vitest --run`

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1"] },
    { "id": 1, "tasks": ["2.2", "3.1", "3.3", "3.4", "3.5", "3.6", "4.1", "4.3", "4.4"] },
    { "id": 2, "tasks": ["3.2", "3.7", "4.2", "5.1", "5.3", "5.4", "5.5", "5.13"] },
    { "id": 3, "tasks": ["5.2", "5.6", "5.7", "5.9", "5.10", "5.12", "5.14", "7.3", "7.4", "7.5", "7.6"] },
    { "id": 4, "tasks": ["5.8", "5.11", "5.15", "7.1", "7.7"] },
    { "id": 5, "tasks": ["7.2", "8.1", "8.2", "8.3", "8.4", "8.7", "8.8", "9.1"] },
    { "id": 6, "tasks": ["8.5", "8.6", "9.2"] },
    { "id": 7, "tasks": ["9.3", "10.1"] },
    { "id": 8, "tasks": ["10.2", "10.3", "10.5"] },
    { "id": 9, "tasks": ["10.4", "10.6", "10.7"] }
  ]
}
```
