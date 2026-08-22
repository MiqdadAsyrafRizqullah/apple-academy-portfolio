# Requirements Document

## Introduction

Web portofolio personal ini dirancang untuk menampilkan identitas profesional pemilik sebagai seorang ahli UI/UX, Web Development, App Development, dan AI. Tujuan utamanya adalah mendukung personal branding dan menarik perhatian rekruter atau klien potensial. Website ini harus memberikan kesan pertama yang kuat melalui desain yang keren, interaktif, dan profesional, sekaligus menyampaikan informasi yang relevan secara jelas dan menarik.

---

## Glossary

- **Website**: Aplikasi web portofolio personal yang dibangun sebagai single-page application (SPA) atau multi-section page.
- **Visitor**: Pengguna yang mengakses website, termasuk rekruter, klien, atau siapapun yang ingin mengenal pemilik portofolio.
- **Owner**: Pemilik portofolio yang informasinya ditampilkan di website.
- **Hero_Section**: Bagian pertama yang terlihat saat halaman dibuka, berisi nama, tagline, dan CTA.
- **About_Section**: Bagian yang menampilkan cerita singkat, foto, dan kepribadian pemilik.
- **Skills_Section**: Bagian yang menampilkan keahlian pemilik secara visual.
- **Portfolio_Section**: Bagian yang menampilkan proyek-proyek yang pernah dikerjakan.
- **Certificates_Section**: Bagian yang menampilkan sertifikat yang dimiliki pemilik.
- **Contact_Section**: Bagian yang menyediakan form kontak dan tautan media sosial.
- **Theme_Toggle**: Komponen UI untuk beralih antara dark mode dan light mode.
- **Scroll_Animation**: Animasi yang dipicu saat elemen memasuki viewport saat di-scroll.
- **CTA**: Call-to-Action, tombol atau tautan yang mendorong visitor untuk melakukan tindakan tertentu.
- **Viewport**: Area tampilan layar yang terlihat oleh pengguna.
- **Color_Palette**: Kumpulan warna yang digunakan secara konsisten di seluruh website.
- **Contact_Form**: Formulir yang memungkinkan visitor mengirim pesan kepada pemilik.

---

## Requirements

### Requirement 1: Hero / Landing Section

**User Story:** As a visitor, I want to see a compelling introduction when I first open the website, so that I immediately understand who the owner is and what they do.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the owner's full name, a professional tagline, and at least one CTA button prominently above the fold.
2. WHEN a visitor lands on the website, THE Hero_Section SHALL be the first visible section without requiring any scrolling.
3. THE Hero_Section SHALL include an animated text effect (such as a typewriter or fade-in) for the tagline to create visual interest.
4. WHEN a visitor clicks the CTA button, THE Website SHALL smoothly scroll to the Portfolio_Section or Contact_Section as configured.
5. THE Hero_Section SHALL display a visually distinct background, such as a gradient, particle animation, or abstract graphic, that reflects a modern and professional aesthetic.
6. WHILE the visitor is on the Hero_Section, THE Website SHALL display a subtle scroll indicator to guide the visitor downward.

---

### Requirement 2: About Section

**User Story:** As a visitor, I want to learn about the owner's background and personality, so that I can decide whether they are the right person for my project or team.

#### Acceptance Criteria

1. THE About_Section SHALL display the owner's profile photo, a short personal story, and a brief description of their personality and work style.
2. THE About_Section SHALL present the owner's professional background, including experience in UI/UX, web development, app development, and AI.
3. WHEN the About_Section enters the viewport during scrolling, THE Scroll_Animation SHALL trigger a fade-in or slide-in animation for each content block.
4. THE About_Section SHALL include a downloadable CV or resume link that opens in a new tab.
5. THE About_Section SHALL use an asymmetric layout that places the photo and text in a visually dynamic arrangement rather than a standard centered layout.

---

### Requirement 3: Skills Section

**User Story:** As a visitor, I want to see the owner's technical skills displayed visually, so that I can quickly assess their expertise at a glance.

#### Acceptance Criteria

1. THE Skills_Section SHALL display skills grouped into four categories: UI/UX Design, Web Development, App Development, and Artificial Intelligence.
2. WHEN the Skills_Section enters the viewport, THE Scroll_Animation SHALL trigger animated skill indicators (such as progress bars, skill cards, or icon grids) for each skill item.
3. THE Skills_Section SHALL use icons or visual badges to represent each skill or technology, making the section scannable without reading dense text.
4. WHEN a visitor hovers over a skill card or badge, THE Skills_Section SHALL display a tooltip or expanded detail showing the skill name and proficiency level.
5. THE Skills_Section SHALL maintain visual consistency with the overall Color_Palette and typography of the website.

---

### Requirement 4: Portfolio / Projects Section

**User Story:** As a visitor, I want to browse the owner's past projects, so that I can evaluate the quality and range of their work.

#### Acceptance Criteria

1. THE Portfolio_Section SHALL display at least the following projects: a website for a foundation (yayasan) and a website for a kindergarten/early childhood education center (TK/PAUD).
2. EACH project card SHALL display a project thumbnail, project title, short description, and the technologies used.
3. WHEN a visitor clicks on a project card, THE Portfolio_Section SHALL open a modal or navigate to a detail view showing a full project description, screenshots, and a link to the live site or repository if available.
4. WHEN the Portfolio_Section enters the viewport, THE Scroll_Animation SHALL trigger a staggered entrance animation for each project card.
5. WHEN a visitor hovers over a project card, THE Portfolio_Section SHALL display a hover overlay effect with a brief call-to-action such as "View Project".
6. THE Portfolio_Section SHALL support filtering projects by category (e.g., Web, App, UI/UX) so that visitors can find relevant work quickly.

---

### Requirement 5: Certificates Section

**User Story:** As a visitor, I want to see the owner's certifications, so that I can verify their credentials and commitment to professional development.

#### Acceptance Criteria

1. THE Certificates_Section SHALL display all certificates owned by the owner, including those from Dicoding Indonesia and any other issuing organizations.
2. EACH certificate card SHALL display the certificate name, issuing organization, and the year it was obtained.
3. WHEN a visitor clicks on a certificate card, THE Certificates_Section SHALL open a modal or new tab showing the full certificate image or a link to the official verification page.
4. WHEN the Certificates_Section enters the viewport, THE Scroll_Animation SHALL trigger a fade-in or flip animation for each certificate card.
5. WHEN a visitor hovers over a certificate card, THE Certificates_Section SHALL apply a subtle lift or glow effect to indicate interactivity.

---

### Requirement 6: Contact Section

**User Story:** As a visitor, I want to easily get in touch with the owner, so that I can discuss potential collaboration or job opportunities.

#### Acceptance Criteria

1. THE Contact_Section SHALL include a Contact_Form with fields for the visitor's name, email address, and message.
2. WHEN a visitor submits the Contact_Form with all required fields filled in correctly, THE Contact_Form SHALL send the message and display a success confirmation to the visitor.
3. IF a visitor submits the Contact_Form with one or more required fields empty or with an invalid email format, THEN THE Contact_Form SHALL display an inline validation error message for each invalid field without refreshing the page.
4. THE Contact_Section SHALL display links to the owner's social media profiles, including at least LinkedIn, GitHub, and Instagram.
5. WHEN a visitor clicks a social media link, THE Website SHALL open the corresponding profile in a new browser tab.
6. THE Contact_Section SHALL display the owner's professional email address as a direct contact option alongside the Contact_Form.

---

### Requirement 7: Dark / Light Mode

**User Story:** As a visitor, I want to toggle between dark and light mode, so that I can view the website comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Website SHALL provide a Theme_Toggle component that is visible and accessible from all sections of the page.
2. WHEN a visitor activates the Theme_Toggle, THE Website SHALL switch between dark mode and light mode without reloading the page.
3. WHEN a visitor activates the Theme_Toggle, THE Website SHALL apply a smooth color transition animation across all elements rather than an abrupt change.
4. THE Website SHALL persist the visitor's theme preference in local storage so that the selected theme is applied on subsequent visits.
5. WHEN a visitor visits the website for the first time without a stored preference, THE Website SHALL apply the theme that matches the visitor's operating system preference using the `prefers-color-scheme` media query.
6. THE Color_Palette SHALL define distinct, accessible color tokens for both dark mode and light mode that maintain a minimum contrast ratio of 4.5:1 for body text.

---

### Requirement 8: Animations and Visual Interactions

**User Story:** As a visitor, I want to experience smooth and engaging animations throughout the website, so that the browsing experience feels polished and memorable.

#### Acceptance Criteria

1. THE Website SHALL implement Scroll_Animation for all major sections so that content animates into view as the visitor scrolls down the page.
2. THE Website SHALL implement parallax scrolling effects on at least the Hero_Section background to create a sense of depth.
3. WHEN a visitor hovers over interactive elements such as buttons, links, and cards, THE Website SHALL apply a hover effect (such as scale, color shift, or shadow) within 150ms.
4. THE Website SHALL use consistent easing curves and animation durations across all animated elements to maintain a cohesive feel.
5. WHERE a visitor has enabled the `prefers-reduced-motion` accessibility setting, THE Website SHALL disable or minimize non-essential animations to respect the visitor's preference.
6. THE Website SHALL ensure that all animations run at a smooth frame rate without causing layout shifts or degrading page performance.

---

### Requirement 9: Responsive Design

**User Story:** As a visitor, I want the website to look and function correctly on any device, so that I can access it from my phone, tablet, or desktop.

#### Acceptance Criteria

1. THE Website SHALL render correctly and maintain full functionality on screen widths ranging from 320px (small mobile) to 2560px (large desktop).
2. THE Website SHALL use a responsive layout that adapts the number of columns, font sizes, and spacing based on the current viewport width.
3. WHEN viewed on a mobile device, THE Website SHALL display a hamburger menu or equivalent navigation pattern that provides access to all sections.
4. THE Website SHALL ensure that all touch targets (buttons, links, cards) have a minimum size of 44x44 CSS pixels on mobile viewports.
5. THE Website SHALL optimize images and assets for different screen densities to ensure sharp visuals on high-DPI displays.

---

### Requirement 10: Typography and Visual Identity

**User Story:** As a visitor, I want the website to have a strong and consistent visual identity, so that it feels professional and memorable.

#### Acceptance Criteria

1. THE Website SHALL use a defined typographic scale with a maximum of two font families: one for headings and one for body text.
2. THE Website SHALL apply the Color_Palette consistently across all sections, using the same primary, secondary, accent, and neutral color tokens throughout.
3. THE Website SHALL use an asymmetric and dynamic layout in at least two sections to create visual interest beyond a standard centered grid.
4. THE Website SHALL maintain consistent spacing using a defined spacing scale (e.g., multiples of 4px or 8px) across all sections and components.
5. THE Website SHALL display a custom favicon and browser tab title that reflect the owner's personal brand.

---

### Requirement 11: Performance and Accessibility

**User Story:** As a visitor, I want the website to load quickly and be accessible, so that I can use it regardless of my connection speed or assistive technology.

#### Acceptance Criteria

1. THE Website SHALL achieve a Lighthouse performance score of at least 85 on both mobile and desktop.
2. THE Website SHALL use semantic HTML elements (such as `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`) to ensure proper document structure for screen readers.
3. THE Website SHALL provide descriptive `alt` text for all images, including the profile photo and project thumbnails.
4. THE Website SHALL ensure all interactive elements are keyboard-navigable and display a visible focus indicator.
5. IF a page resource fails to load, THEN THE Website SHALL display a fallback state (such as a placeholder image or error message) rather than a broken layout.
6. THE Website SHALL lazy-load images and non-critical assets that are below the fold to reduce initial page load time.
