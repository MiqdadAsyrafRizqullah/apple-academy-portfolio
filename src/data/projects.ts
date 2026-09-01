import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'project-labirin',
    title: 'Labirin Children Center Website',
    description: 'A child development and therapy clinic website in Kendari that provides inclusive health and education services.',
    fullDescription: `This project was initiated to help a child development clinic provide a structured digital platform for education and information. The main goal was to create a fun yet highly educational digital space for children and parents.

As a result, the website has successfully become the primary information hub, blending educational mini-games with an engaging interface. This transformation significantly increased user engagement and made it much easier for parents to access children's activity schedules.

Through this project, I learned how to make web interactions feel "alive" without compromising performance. I gained valuable insights into optimizing CSS animations and implementing efficient JavaScript interaction logic.`,
    category: 'Web',
    thumbnail: '/assets/images/projects/labirin.png',
    gallery: [
      '/assets/images/projects/labirin.png',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    projectUrl: 'https://labirinchildrencenter.com/Oke1/frontend/index.html',
    repoUrl: 'https://github.com/MiqdadAsyrafRizqullah/labirin-children-center',
    impact: 'Significantly increased user engagement and streamlined the process for parents to access clinic information and schedules.',
    learnings: 'I gained valuable insights into optimizing CSS animations and implementing efficient JavaScript interaction logic for web performance.',
    teamStatus: 'Group Project',
    role: 'Lead Fullstack Developer',
    context: 'Client Project',
    featured: true,
  },
  {
    id: 'project-setara',
    title: 'Setara Kids School Website',
    description: 'The official website of Setara Kids School Kendari featuring core learning programs, facilities, and educator profiles.',
    fullDescription: `This website was built to address the school's urgent need to digitize the student enrollment process and simplify access to information for parents, which was previously handled manually.

The final product is an interactive educational platform that not only accelerates school administration but also delivers a very child-friendly user experience. The school now benefits from a centralized online registration system that is highly informative for parents.

This project taught me the importance of balancing visual design aesthetics (such as bright colors and appropriate typography) with serious information system functionality behind the scenes.`,
    category: 'Web',
    thumbnail: '/assets/images/projects/setara.png',
    gallery: [
      '/assets/images/projects/setara.png',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    projectUrl: 'https://setarakidsschool.sch.id',
    repoUrl: 'https://github.com/MiqdadAsyrafRizqullah/setara-kids-school',
    impact: 'Successfully centralized the online registration system, accelerating school administration and improving parent communication.',
    learnings: 'I learned how to balance vibrant, child-friendly visual aesthetics with robust backend information system functionality.',
    teamStatus: 'Group Project',
    role: 'Lead Fullstack Developer',
    context: 'Client Project',
    featured: true,
  },
  {
    id: 'project-sirekap',
    title: 'Thesis Supervision Management System',
    description: 'A web-based application for managing and tracking university student thesis supervisions.',
    fullDescription: `This system was born directly from a real problem I encountered on campus: the highly unorganized, easily misplaced, and hard-to-track thesis supervision process. I set out to create a digital solution to untangle the complex bureaucracy between Students, Lecturers, and the Head of Department.

The impact has been tremendous as the website successfully streamlined the entire supervision workflow. Students can now schedule supervision online, lecturers can input grades directly into the system, and the Head of Department has a dedicated dashboard to monitor everyone's progress.

This project significantly trained my backend architecture skills. I learned how to design relational databases from scratch, manage complex role-based access controls, and translate real user needs into system logic.`,
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
    impact: 'Digitized and streamlined the entire academic supervision workflow, drastically cutting down bureaucratic time for students and lecturers.',
    learnings: 'I matured my backend architecture skills, specifically in designing relational databases and implementing Role-Based Access Control (RBAC).',
    teamStatus: 'Individual Project',
    role: 'Solo Fullstack Developer',
    context: 'Class Assignment',
    featured: true,
  },
  {
    id: 'project-sultramarine',
    title: 'SultraMarine: Deep Learning Fish Classification',
    description: 'A web-based AI application designed to classify economic fish species in Southeast Sulawesi using EfficientNetV2B0.',
    fullDescription: `This project stemmed from my desire to explore the potential of Artificial Intelligence in marine fisheries, specifically in Southeast Sulawesi. Recognizing the real challenge in classifying economic fish species accurately and efficiently, I took the initiative to design a Deep Learning model that automatically classifies 9 key economic fish species.

The final result is SultraMarine, a Machine Learning model utilizing the EfficientNetV2B0 architecture integrated into an interactive web interface. Not only did the system achieve high accuracy in recognizing the 9 species, but the project also led to the publication of an academic scientific journal ("SULTRAMARINE-NET DEEP LEARNING CLASSIFICATION OF ECONOMIC FISH").

This development process was a massive leap in my Artificial Intelligence learning journey. I learned everything from dataset collection and data augmentation techniques to model training in Jupyter Notebook, and finally deploying the AI model into a React web application for public use.`,
    category: 'AI',
    thumbnail: '/assets/images/projects/sultramarine.png',
    gallery: [
      '/assets/images/projects/sultramarine.png',
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Machine Learning'],
    projectUrl: 'https://sultramarine.vercel.app',
    repoUrl: 'https://github.com/MiqdadAsyrafRizqullah/sultramarine',
    impact: 'Delivered an instant, highly accurate fish classification tool that assists local fishermen and led to an academic journal publication.',
    learnings: 'I honed my technical intuition by connecting advanced Computer Vision processing with a responsive frontend user interface.',
    teamStatus: 'Group Project (Sole Contributor)',
    role: 'Lead AI & Web Developer',
    context: 'Class Assignment',
    featured: true,
  }
];
