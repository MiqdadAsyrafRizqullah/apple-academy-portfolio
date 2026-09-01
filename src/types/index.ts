// ============================================================
// Type Definitions — Personal Portfolio Website
// ============================================================

// ------------------------------------------------------------
// Project Types
// ------------------------------------------------------------

export type ProjectCategory = 'Web' | 'UI/UX' | 'App' | 'AI';

export interface Project {
  id: string;
  title: string;
  /** Deskripsi singkat untuk kartu proyek */
  description: string;
  /** Deskripsi lengkap untuk modal detail */
  fullDescription: string;
  category: ProjectCategory;
  /** URL gambar pratinjau */
  thumbnail: string;
  /** Array URL gambar untuk galeri modal */
  gallery: string[];
  /** Daftar teknologi yang digunakan */
  technologies: string[];
  /** URL live project (opsional) */
  projectUrl?: string;
  /** URL repositori (opsional) */
  repoUrl?: string;
  impact: string;
  learnings: string;
  /** Status Tim: Individual Project atau Group Project */
  teamStatus?: string;
  /** Peran spesifik dalam proyek */
  role?: string;
  /** Konteks proyek: Class Assignment, Client Project, atau Self-initiated */
  context?: string;
  /** Apakah ditampilkan di tampilan awal */
  featured: boolean;
}

// ------------------------------------------------------------
// Skill Types
// ------------------------------------------------------------

export type SkillCategory =
  | 'UI/UX Design'
  | 'Web Development'
  | 'Mobile Development'
  | 'Artificial Intelligence';

export interface Skill {
  id: string;
  name: string;
  /** URL ikon teknologi (devicons atau custom) */
  icon: string;
  /** Tingkat kemahiran: 0–100 */
  proficiency: number;
  category: SkillCategory;
  /** Deskripsi tambahan untuk tooltip */
  tooltip?: string;
}

// ------------------------------------------------------------
// Certificate Types
// ------------------------------------------------------------

export interface Certificate {
  id: string;
  name: string;
  /** Nama penerbit, e.g. "Dicoding Indonesia" */
  issuer: string;
  year: number;
  /** URL gambar sertifikat */
  image: string;
  /** URL verifikasi resmi (opsional) */
  verificationUrl?: string;
  /** Apakah ditampilkan secara prominan */
  featured: boolean;
}

// ------------------------------------------------------------
// Navigation Types
// ------------------------------------------------------------

export interface NavItem {
  /** ID section yang dituju, e.g. "hero", "about" */
  id: string;
  /** Teks yang ditampilkan di navigasi */
  label: string;
}

/** Daftar item navigasi yang terdefinisi */
export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

// ------------------------------------------------------------
// Theme Types
// ------------------------------------------------------------

export type Theme = 'light' | 'dark';

/** CSS Custom Properties yang terdefinisi dalam tema */
export interface ThemeColors {
  '--color-primary': string;
  '--color-background': string;
  '--color-surface': string;
  '--color-text-primary': string;
  '--color-text-secondary': string;
  '--color-border': string;
}

// ------------------------------------------------------------
// Personal Info Types
// ------------------------------------------------------------

export interface PersonalInfo {
  name: string;
  /** Daftar jabatan untuk TypewriterEffect */
  titles: string[];
  tagline: string;
  bio: string;
  /** Path ke foto profil */
  profileImage: string;
  /** Path ke file PDF CV */
  cvUrl: string;
  email: string;
  /** Format: +62xxx */
  whatsapp: string;
  social: {
    linkedin: string;
    github: string;
    /** Platform lain yang relevan */
    [key: string]: string;
  };
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    clients: number;
  };
  interests: Array<{
    label: string;
    icon: string;
  }>;
}

// ------------------------------------------------------------
// Contact Form Types
// ------------------------------------------------------------

export interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';
