# Accessibility Audit Report

**Task:** 9.2 Audit aksesibilitas komponen  
**Requirements:** 11.2, 11.3, 11.4  
**Date:** 2025  
**Status:** ✅ PASSED — No issues found

---

## Scope

Semua file komponen di `src/components/` diaudit terhadap kriteria aksesibilitas berikut:

1. Semua `<img>` memiliki atribut `alt` yang tidak kosong
2. Semua elemen interaktif keyboard-focusable dengan visible focus indicator
3. Semua elemen interaktif dan landmark memiliki `aria-label`, `aria-labelledby`, atau semantic role
4. `ThemeToggle` — `aria-label` deskriptif
5. Hamburger button — `aria-label` dan `aria-expanded`
6. Social links — `aria-label` pada setiap link
7. Form fields — `aria-required`, `aria-invalid`, `aria-describedby`

---

## Audit Results per Component

### ✅ `ui/ThemeToggle.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| Keyboard focusable | ✅ | `<button type="button">` — natively focusable |
| Visible focus indicator | ✅ | `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2` |
| Descriptive `aria-label` | ✅ | Dynamic: `'Aktifkan mode gelap'` / `'Aktifkan mode terang'` based on current theme |
| Icon `aria-hidden` | ✅ | `<Moon aria-hidden="true" />` / `<Sun aria-hidden="true" />` |

---

### ✅ `ui/ProjectCard.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| `<img>` alt attribute | ✅ | `alt={\`Thumbnail proyek ${project.title}\`}` — non-empty, descriptive |
| Fallback image | ✅ | `onError` sets placeholder; placeholder is a base64 SVG |
| Card keyboard focusable | ✅ | `tabIndex={0}` on `<motion.article>` |
| Card `role` + `aria-label` | ✅ | `role="button"` + `aria-label={\`Lihat detail proyek: ${project.title}\`}` |
| Card keyboard handler | ✅ | `onKeyDown` handles `Enter` and `Space` keys |
| Hover overlay `aria-hidden` | ✅ | `aria-hidden={!isHovered}` — hidden from AT when not visible |
| "Lihat Detail" button | ✅ | `aria-label={\`Lihat detail ${project.title}\`}` + `focus-visible:ring-2` |
| "Buka Tautan" link | ✅ | `aria-label={\`Buka tautan ${project.title}\`}` + `focus-visible:ring-2` |
| "Repositori" link | ✅ | `aria-label={\`Lihat repositori ${project.title}\`}` + `focus-visible:ring-2` |
| External links | ✅ | `target="_blank" rel="noopener noreferrer"` |
| `loading="lazy"` | ✅ | Applied to thumbnail image |

---

### ✅ `ui/CertificateCard.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| `<img>` alt attribute | ✅ | `alt={\`Sertifikat ${certificate.name} dari ${certificate.issuer}\`}` — descriptive |
| Fallback image | ✅ | `onError` sets placeholder SVG |
| Card keyboard focusable | ✅ | `tabIndex={0}` on `<motion.article>` |
| Card `role` + `aria-label` | ✅ | `role="button"` + `aria-label={\`Lihat sertifikat: ${certificate.name}\`}` |
| Card keyboard handler | ✅ | `onKeyDown` handles `Enter` and `Space` keys |
| Featured badge | ✅ | `aria-label="Sertifikat unggulan"` on badge `<span>` |
| Award icon `aria-hidden` | ✅ | `<Award aria-hidden="true" />` |
| "Verifikasi" link | ✅ | `aria-label={\`Verifikasi sertifikat ${certificate.name}\`}` + `focus-visible:ring-2` |
| External link | ✅ | `target="_blank" rel="noopener noreferrer"` |
| `loading="lazy"` | ✅ | Applied to certificate image |

---

### ✅ `ui/ContactForm.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| Form landmark | ✅ | `<form aria-label="Formulir kontak">` |
| Error banner | ✅ | `role="alert"` on error div — announced by screen readers |
| **Name field** | | |
| — `<label>` association | ✅ | `<label htmlFor="name">` linked to `id="name"` |
| — `aria-required` | ✅ | `aria-required="true"` |
| — `aria-invalid` | ✅ | `aria-invalid={!!errors.name}` — dynamic |
| — `aria-describedby` | ✅ | `aria-describedby="name-error"` when error exists |
| — Error message | ✅ | `id="name-error" role="alert"` |
| **Email field** | | |
| — `<label>` association | ✅ | `<label htmlFor="email">` linked to `id="email"` |
| — `aria-required` | ✅ | `aria-required="true"` |
| — `aria-invalid` | ✅ | `aria-invalid={!!errors.email}` — dynamic |
| — `aria-describedby` | ✅ | `aria-describedby="email-error"` when error exists |
| — Error message | ✅ | `id="email-error" role="alert"` |
| **Subject field** | | |
| — `<label>` association | ✅ | `<label htmlFor="subject">` linked to `id="subject"` |
| — `aria-required` | ✅ | `aria-required="true"` |
| — `aria-invalid` | ✅ | `aria-invalid={!!errors.subject}` — dynamic |
| — `aria-describedby` | ✅ | `aria-describedby="subject-error"` when error exists |
| — Error message | ✅ | `id="subject-error" role="alert"` |
| **Message textarea** | | |
| — `<label>` association | ✅ | `<label htmlFor="message">` linked to `id="message"` |
| — `aria-required` | ✅ | `aria-required="true"` |
| — `aria-invalid` | ✅ | `aria-invalid={!!errors.message}` — dynamic |
| — `aria-describedby` | ✅ | `aria-describedby="message-error"` when error exists |
| — Error message | ✅ | `id="message-error" role="alert"` |
| **Submit button** | | |
| — `aria-label` | ✅ | Dynamic: `'Mengirim pesan...'` / `'Kirim pesan'` |
| — `disabled` state | ✅ | `disabled={submitStatus === 'loading'}` |
| — Focus indicator | ✅ | `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2` |
| Required field indicator | ✅ | `<span aria-hidden="true">*</span>` — decorative asterisk hidden from AT |

---

### ✅ `layout/NavigationBar.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| `<nav>` landmark | ✅ | `<nav aria-label="Navigasi utama">` |
| Logo button | ✅ | `aria-label="Kembali ke beranda"` + `focus-visible:ring-2` |
| Nav links list | ✅ | `<ul role="list">` with `<li>` items |
| Active nav link | ✅ | `aria-current="page"` on active section button |
| Hamburger button | ✅ | `aria-label` dynamic: `'Tutup menu'` / `'Buka menu'` |
| `aria-expanded` | ✅ | `aria-expanded={isMobileMenuOpen}` |
| `aria-controls` | ✅ | `aria-controls="mobile-menu"` linked to `id="mobile-menu"` |
| Menu/X icons | ✅ | `aria-hidden="true"` on both icons |
| Focus indicators | ✅ | `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]` on all buttons |

---

### ✅ `layout/Footer.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| Footer landmark | ✅ | `<footer>` semantic element |
| Footer nav | ✅ | `<nav aria-label="Footer navigation">` |
| Nav links list | ✅ | `<ul>` with `<li>` items |
| Social links | ✅ | `aria-label={\`Kunjungi profil ${label} saya\`}` on each link |
| Social icons | ✅ | `aria-hidden="true"` on all icons |
| Focus indicators | ✅ | `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]` |
| Heart icon | ✅ | `aria-hidden="true"` |
| External links | ✅ | `target="_blank" rel="noopener noreferrer"` |

---

### ✅ `layout/BackToTopButton.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| Button type | ✅ | `type="button"` |
| `aria-label` | ✅ | `aria-label="Kembali ke atas"` |
| Icon `aria-hidden` | ✅ | `<ArrowUp aria-hidden="true" />` |
| Focus indicator | ✅ | `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2` |

---

### ✅ `layout/ScrollProgressIndicator.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| ARIA role | ✅ | `role="progressbar"` |
| ARIA values | ✅ | `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}` |
| `aria-label` | ✅ | `aria-label="Progres scroll halaman"` |

---

### ✅ `ui/SkillBar.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| `<img>` alt attribute | ✅ | `alt={\`${name} icon\`}` — descriptive |
| Keyboard focusable | ✅ | `tabIndex={0}` on container |
| `role` + `aria-label` | ✅ | `role="listitem"` + `aria-label={\`${name}: ${clampedProficiency}% proficiency\`}` |
| Tooltip | ✅ | `role="tooltip"` on tooltip div |
| Focus/blur handlers | ✅ | `onFocus` / `onBlur` show/hide tooltip |
| Progress bar | ✅ | `role="progressbar"` + `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` |

---

### ✅ `ui/ProjectModal.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| Dialog role | ✅ | `role="dialog" aria-modal="true"` |
| Dialog label | ✅ | `aria-labelledby="modal-title"` linked to `<h2 id="modal-title">` |
| Close button | ✅ | `aria-label="Tutup modal"` + `focus-visible:ring-2` |
| Focus management | ✅ | `closeButtonRef.current?.focus()` on open |
| Escape key | ✅ | `keydown` listener closes on `Escape` |
| Backdrop | ✅ | `aria-hidden="true"` on backdrop overlay |
| Gallery images | ✅ | `alt={\`${project.title} screenshot ${i + 1}\`}` |
| External links | ✅ | `aria-label` on live site and repo links |
| Body scroll lock | ✅ | `document.body.style.overflow = 'hidden'` when open |

---

### ✅ `ui/CertificateLightbox.tsx`

| Check | Status | Detail |
|-------|--------|--------|
| Dialog role | ✅ | `role="dialog" aria-modal="true"` |
| Dialog label | ✅ | `aria-labelledby="lightbox-title"` linked to `<h2 id="lightbox-title">` |
| Close button | ✅ | `aria-label="Tutup lightbox"` + `focus-visible:ring-2` |
| Focus management | ✅ | `closeButtonRef.current?.focus()` on open |
| Escape key | ✅ | `keydown` listener closes on `Escape` |
| Backdrop | ✅ | `aria-hidden="true"` on backdrop overlay |
| Certificate image | ✅ | `alt={\`Sertifikat ${certificate.name} dari ${certificate.issuer}\`}` |
| Verification link | ✅ | `aria-label={\`Verifikasi sertifikat ${certificate.name}\`}` |
| Body scroll lock | ✅ | `document.body.style.overflow = 'hidden'` when open |

---

## Summary

**Total components audited:** 10  
**Issues found:** 0  
**Issues fixed:** 0 (all components were already compliant)

All components fully comply with Requirements 11.2, 11.3, and 11.4:

- **Req 11.2** — All `<img>` elements have non-empty, descriptive `alt` attributes. Decorative icons use `aria-hidden="true"`.
- **Req 11.3** — All interactive elements are keyboard-focusable (native `<button>` / `<a>` elements, or `tabIndex={0}` with `onKeyDown` handlers). All have visible focus indicators via `focus-visible:ring-*` Tailwind classes.
- **Req 11.4** — All interactive elements and landmarks have appropriate `aria-label`, `aria-labelledby`, or semantic roles. Form fields use `aria-required`, `aria-invalid`, and `aria-describedby`. Dialogs use `role="dialog"` with `aria-modal` and `aria-labelledby`. Navigation uses `aria-label` on `<nav>` landmarks.
