/* =========================================================================
   DATA LAYER — every list rendered by the site lives here.
   Keeping content separate from presentation makes the portfolio trivially
   portable to a CMS or static JSON endpoint later.
   ========================================================================= */

/* ---------------------------------------------------------------- MEDIA */
export const MEDIA = {
  avatar: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
  avatarAlt: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778747388/image-1_1_khsx9s.png",
  portrait1: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
  portrait2: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_12_iv8kpm.webp",
  portrait3: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_3_zqrhhr.webp",
  portrait4: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_11_jbijtv.webp",
  portrait5: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_13_i4bao3.webp",
  cloudIcon: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795825/cloud-icon-poster-1_2_opl7sy.png",
  fireworks: "https://res.cloudinary.com/dye5qpwii/image/upload/v1779052645/2153-fireworks-composer_gm3e0h.jpg",
  heroVideo: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779052711/Javier_Black-Dark-Ring.mp4",
  heroPoster: "https://res.cloudinary.com/dye5qpwii/image/upload/v1779031816/Content_65_oayzj3.jpg",
};

export const GALLERY: { src: string; caption: string }[] = [
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795675037_heh9xk.png", caption: "Compose design-system explorations" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778794626112_ega7kk.png", caption: "Offline-first sync visualiser" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795859/copilot_image_1778794430377_n7xlmz.png", caption: "Neon POS terminal concept" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795000722_eo96gj.png", caption: "Motion study — list transitions" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795847/copilot_image_1778795115579_acfm5j.png", caption: "On-device ML inference panel" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795853/copilot_image_1778794781671_kytvkc.png", caption: "Release dashboard — CI/CD" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795822/preview_dzhqvv.webp", caption: "Flutter shared component library" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795799/2024119_20_b94fen.jpg", caption: "Workshop — Tachileik dev meetup" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795800/2024119_18_syk2ou.jpg", caption: "Mentorship session" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795800/2024119_12_sqhcat.jpg", caption: "Team architecture review" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795801/MKA_22_felevo.webp", caption: "Studio portrait" },
  { src: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763536/preview_ls5ptn.webp", caption: "Kotlin Multiplatform prototype" },
];

export const SHOWREEL = [
  { src: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779031596/Javier_Pardina_10_wttux4.mp4", title: "Reel 01 — Motion language" },
  { src: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779052708/AUDI_-_Javier_Pardina_1_gavyon.mp4", title: "Reel 02 — Product film" },
  { src: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779031657/COACH_-_Javier_Pardina_gdjsjg.mp4", title: "Reel 03 — Brand system" },
  { src: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779031569/Javier_Pardina_8_r1lgpj.mp4", title: "Reel 04 — Interaction study" },
  { src: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779031566/Javier_Pardina_11_r5y8no.mp4", title: "Reel 05 — Depth & light" },
  { src: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779052732/Javier_Pardina_2_l1mtud.mp4", title: "Reel 06 — Release trailer" },
];

/* ------------------------------------------------------------- IDENTITY */
export const PROFILE = {
  name: "Moe Kyaw Aung",
  nameMm: "မိုးကျော်အောင်",
  role: "Senior Android & Flutter Developer",
  location: "Tachileik, Myanmar 🇲🇲 ↔ Bangkok, Thailand 🇹🇭",
  phone1: "+95 9 889 000 889",
  phone2: "+959 666 000 050",
  email: "moekyawaung@programmer.net",
  gravatar: "https://gravatar.com/moekyawaung13721",
  gravatar2: "https://gravatar.com/moekyawaung2026",
  github: "https://github.com/Dev-moe-kyawaung/",
  githubTech: "https://github.com/moekyawaung-tech",
  linkedin: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1",
  building: "MoekyawTranslator — AI Translation App",
  philosophy: "Code with culture. Build with purpose.",
};

/* ------------------------------------------------------------- ROUTES */
export type Route = {
  id: string;
  en: string;
  my: string;
  th: string;
  group: "Main" | "Work" | "Engineering" | "People" | "System" | "Collections";
};

export const ROUTES: Route[] = [
  { id: "home", en: "Home", my: "ပင်မ", th: "หน้าแรก", group: "Main" },
  { id: "about", en: "About", my: "အကြောင်း", th: "เกี่ยวกับ", group: "Main" },
  { id: "resume", en: "Resume", my: "ကိုယ်ရေးမှတ်တမ်း", th: "เรซูเม่", group: "Main" },
  { id: "skills", en: "Skills", my: "ကျွမ်းကျင်မှု", th: "ทักษะ", group: "Main" },
  { id: "stack", en: "Tech Stack", my: "နည်းပညာ", th: "เทคสแตก", group: "Main" },

  { id: "projects", en: "Projects", my: "ပရောဂျက်များ", th: "โปรเจกต์", group: "Work" },
  { id: "project-01", en: "Mobile Commerce Redesign", my: "ကုန်သွယ်မှုအက်ပ်", th: "อีคอมเมิร์ซ", group: "Work" },
  { id: "project-02", en: "Offline-First Field App", my: "အော့ဖ်လိုင်းအက်ပ်", th: "แอปออฟไลน์", group: "Work" },
  { id: "project-03", en: "Operations Companion", my: "လုပ်ငန်းလက်ထောက်", th: "แอปปฏิบัติการ", group: "Work" },
  { id: "case-studies", en: "Case Studies", my: "လေ့လာမှုများ", th: "กรณีศึกษา", group: "Work" },
  { id: "labs", en: "Labs", my: "ဓာတ်ခွဲခန်း", th: "แล็บ", group: "Work" },

  { id: "cross-platform", en: "Cross-Platform Architecture", my: "Cross-Platform ဖွဲ့စည်းပုံ", th: "สถาปัตยกรรมข้ามแพลตฟอร์ม", group: "Engineering" },
  { id: "flutter-architecture", en: "Flutter Architecture", my: "Flutter ဖွဲ့စည်းပုံ", th: "สถาปัตยกรรม Flutter", group: "Engineering" },
  { id: "performance", en: "Performance", my: "စွမ်းဆောင်ရည်", th: "ประสิทธิภาพ", group: "Engineering" },
  { id: "open-source", en: "Open Source", my: "အခမဲ့ကုဒ်", th: "โอเพนซอร์ส", group: "Engineering" },
  { id: "github-activity", en: "GitHub Activity", my: "GitHub လှုပ်ရှားမှု", th: "กิจกรรม GitHub", group: "Engineering" },
  { id: "design-system", en: "Design System", my: "ဒီဇိုင်းစနစ်", th: "ดีไซน์ซิสเต็ม", group: "Engineering" },

  { id: "experience", en: "Experience", my: "အတွေ့အကြုံ", th: "ประสบการณ์", group: "People" },
  { id: "testimonials", en: "Testimonials", my: "အသိအမှတ်ပြုချက်", th: "รีวิว", group: "People" },
  { id: "services", en: "Services", my: "ဝန်ဆောင်မှု", th: "บริการ", group: "People" },
  { id: "mentorship", en: "Mentorship", my: "လမ်းညွှန်မှု", th: "การให้คำปรึกษา", group: "People" },
  { id: "writing", en: "Writing", my: "ဆောင်းပါးများ", th: "บทความ", group: "People" },
  { id: "talks", en: "Talks", my: "ဟောပြောမှု", th: "การบรรยาย", group: "People" },
  { id: "awards", en: "Awards", my: "ဆုများ", th: "รางวัล", group: "People" },
  { id: "contact", en: "Contact", my: "ဆက်သွယ်ရန်", th: "ติดต่อ", group: "People" },

  { id: "pricing", en: "Pricing", my: "ဈေးနှုန်း", th: "ราคา", group: "System" },
  { id: "faq", en: "FAQ", my: "မေးလေ့ရှိသောမေးခွန်း", th: "คำถามที่พบบ่อย", group: "System" },
  { id: "accessibility", en: "Accessibility", my: "အသုံးပြုနိုင်စွမ်း", th: "การเข้าถึง", group: "System" },
  { id: "localization", en: "Localization", my: "ဘာသာစကား", th: "การแปลภาษา", group: "System" },
  { id: "legal", en: "Legal", my: "ဥပဒေ", th: "กฎหมาย", group: "System" },

  { id: "apps", en: "App Collection", my: "အက်ပ်စုစည်းမှု", th: "คอลเลกชันแอป", group: "Collections" },
  { id: "certificates", en: "Certificates", my: "လက်မှတ်များ", th: "ใบรับรอง", group: "Collections" },
  { id: "github-accounts", en: "GitHub Accounts", my: "GitHub အကောင့်များ", th: "บัญชี GitHub", group: "Collections" },
  { id: "lovable-links", en: "Lovable PWA Links", my: "Lovable လင့်များ", th: "ลิงก์ Lovable", group: "Collections" },
  { id: "emails", en: "Email Collection", my: "အီးမေးလ်များ", th: "อีเมล", group: "Collections" },
  { id: "organization", en: "Organization", my: "အဖွဲ့အစည်း", th: "องค์กร", group: "Collections" },
];

/* ------------------------------------------------------------- PROJECTS */
export type Project = {
  id: string;
  title: string;
  outcome: string;
  role: string;
  tags: string[];
  accent: "cyan" | "pink" | "yellow" | "violet" | "lime";
  demo: string;
  source: string;
  image: string;
  page?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "commerce",
    title: "Mobile Commerce Redesign",
    outcome: "Rebuilt a cluttered shopping experience into a faster, clearer, higher-converting cross-platform flow. Checkout drop-off fell 31%.",
    role: "Lead Mobile Engineer",
    tags: ["Dart", "Flutter", "API integration", "Modular architecture"],
    accent: "cyan",
    demo: "https://moekyawaung-tech.github.io/POS-Ultimate-Pro-Max",
    source: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795859/copilot_image_1778794430377_n7xlmz.png",
    page: "project-01",
  },
  {
    id: "field",
    title: "Offline-First Field App",
    outcome: "Designed a resilient Flutter workflow for teams operating in low-connectivity environments. 100% task capture during outages.",
    role: "Architect + Implementer",
    tags: ["State management", "Sync logic", "Local storage", "Reliability"],
    accent: "pink",
    demo: "https://moekyawaung-tech.github.io/Job-Portal-App",
    source: "https://github.com/moekyawaung-tech/Job-Portal-App",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778794626112_ega7kk.png",
    page: "project-02",
  },
  {
    id: "ops",
    title: "Internal Operations Companion",
    outcome: "Built a mobile tool for fast approvals, alerts and operational task handling on the go. Median approval time 4h → 11min.",
    role: "Senior Android Engineer",
    tags: ["Flutter UI", "State management", "Performance", "UX"],
    accent: "yellow",
    demo: "https://moekyawaung-tech.github.io/social-dashboard",
    source: "https://github.com/moekyawaung-tech/social-dashboard",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795853/copilot_image_1778794781671_kytvkc.png",
    page: "project-03",
  },
  {
    id: "pulsesync",
    title: "PulseSync — Real-time Sync Platform",
    outcome: "Multi-module Android reference app: Firebase backend, offline-first design, and a full CI/CD pipeline on GitHub Actions.",
    role: "Author / Maintainer",
    tags: ["Kotlin", "Multi-module", "Firebase", "GitHub Actions"],
    accent: "violet",
    demo: "https://github.com/Dev-moe-kyawaung/",
    source: "https://github.com/Dev-moe-kyawaung/",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795675037_heh9xk.png",
  },
  {
    id: "lens",
    title: "Lens Lite — On-device ML Camera",
    outcome: "TFLite classification running fully on-device with a 22 MB model and no network round-trips. Cold start under 900 ms.",
    role: "Solo Developer",
    tags: ["TFLite", "CameraX", "Compose", "On-device ML"],
    accent: "lime",
    demo: "https://moekyawaung-tech.github.io/Lens-lite",
    source: "https://github.com/moekyawaung-tech/Lens-lite",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795847/copilot_image_1778795115579_acfm5j.png",
  },
  {
    id: "translator",
    title: "MoekyawTranslator — AI Translation",
    outcome: "Burmese ↔ English ↔ Thai translation with Claude API, streaming responses and an offline glossary cache. In active build.",
    role: "Founder / Engineer",
    tags: ["Claude API", "Compose", "Room", "Streaming"],
    accent: "cyan",
    demo: "https://moekyawaung.lovable.app",
    source: "https://github.com/Dev-moe-kyawaung/",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795822/preview_dzhqvv.webp",
  },
];

/* --------------------------------------------------------- APP COLLECTION */
export const APPS: { n: number; icon: string; name: string; repo: string; tag: string }[] = [
  { n: 1, icon: "📱", name: "Social Dashboard", repo: "https://github.com/moekyawaung-tech/social-dashboard", tag: "New" },
  { n: 2, icon: "📲", name: "PWA App", repo: "https://github.com/moekyawaung-tech/pwa-app", tag: "PWA" },
  { n: 3, icon: "📊", name: "Admin Dashboard", repo: "https://github.com/moekyawaung-tech/social-dashboard", tag: "Web" },
  { n: 4, icon: "📈", name: "Stock Market", repo: "https://github.com/moekyawaung-tech", tag: "Finance" },
  { n: 5, icon: "🎮", name: "Game Collection", repo: "https://github.com/moekyawaung-tech/game-collection", tag: "Games" },
  { n: 6, icon: "🎵", name: "Music Player", repo: "https://github.com/moekyawaung-tech", tag: "Media" },
  { n: 7, icon: "💬", name: "Chat App", repo: "https://github.com/moekyawaung-tech", tag: "Realtime" },
  { n: 8, icon: "⚽", name: "World Cup", repo: "https://github.com/moekyawaung-tech", tag: "Sports" },
  { n: 9, icon: "🛒", name: "E-commerce", repo: "https://github.com/moekyawaung-tech/POS-Full-Version", tag: "Commerce" },
  { n: 10, icon: "💼", name: "Portfolio", repo: "https://github.com/Dev-moe-kyawaung/", tag: "Brand" },
  { n: 11, icon: "💰", name: "Money Tracker", repo: "https://github.com/moekyawaung-tech", tag: "Finance" },
  { n: 12, icon: "🌤️", name: "Weather", repo: "https://github.com/moekyawaung-tech/Weather-app", tag: "Utility" },
  { n: 13, icon: "💸", name: "Crypto", repo: "https://github.com/moekyawaung-tech/casino-app", tag: "Finance" },
  { n: 14, icon: "📝", name: "Todo", repo: "https://github.com/moekyawaung-tech/javascript-todo", tag: "Utility" },
  { n: 15, icon: "🎯", name: "Video Player", repo: "https://github.com/moekyawaung-tech/video-player", tag: "Media" },
  { n: 16, icon: "🏆", name: "LEGEND!", repo: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max", tag: "Flagship" },
];

export const REPOS: { name: string; url: string; lang: string; note: string }[] = [
  { name: "video-player", url: "https://github.com/moekyawaung-tech/video-player", lang: "Kotlin", note: "ExoPlayer wrapper with gesture controls and PiP." },
  { name: "social-dashboard", url: "https://github.com/moekyawaung-tech/social-dashboard", lang: "TypeScript", note: "Analytics surface with virtualised feeds." },
  { name: "game-collection", url: "https://github.com/moekyawaung-tech/game-collection", lang: "JavaScript", note: "Canvas mini-games, 60fps budget per title." },
  { name: "pwa-app", url: "https://github.com/moekyawaung-tech/pwa-app", lang: "JavaScript", note: "Installable offline shell + background sync." },
  { name: "Job-Portal-App", url: "https://github.com/moekyawaung-tech/Job-Portal-App", lang: "Dart", note: "Offline-first job board with sync queue." },
  { name: "POS-Full-Version", url: "https://github.com/moekyawaung-tech/POS-Full-Version", lang: "Kotlin", note: "Retail POS: receipts, stock, shift reports." },
  { name: "javascript-todo", url: "https://github.com/moekyawaung-tech/javascript-todo", lang: "JavaScript", note: "Teaching repo for state fundamentals." },
  { name: "thailand-travel", url: "https://github.com/moekyawaung-tech/thailand-travel", lang: "HTML", note: "Trip planner with locale-aware content." },
  { name: "casino-app", url: "https://github.com/moekyawaung-tech/casino-app", lang: "Dart", note: "Animation-heavy Flutter motion study." },
  { name: "Snake-Game-App", url: "https://github.com/moekyawaung-tech/Snake-Game-App", lang: "Kotlin", note: "Compose canvas + game loop sample." },
  { name: "Advance-POS-Version", url: "https://github.com/moekyawaung-tech/Advance-POS-Version", lang: "Kotlin", note: "Multi-module POS with Room caching." },
  { name: "POS-Ultimate-Version", url: "https://github.com/moekyawaung-tech/POS-Ultimate-Version", lang: "Kotlin", note: "Adds Firebase sync + role permissions." },
  { name: "POS-Ultimate-Pro-Max", url: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max", lang: "Kotlin", note: "Flagship build: CI/CD, tests, release lanes." },
  { name: "My_postcode-My-web_project", url: "https://github.com/Moekyawaung-cyber/My_postcode-My-web_project", lang: "JavaScript", note: "Myanmar postcode lookup dataset + UI." },
  { name: "Hospital-Lists", url: "https://github.com/Moekyawaung-cyber/Hospital-Lists", lang: "JavaScript", note: "Public hospital directory, offline capable." },
  { name: "Weather-app", url: "https://github.com/moekyawaung-tech/Weather-app", lang: "Dart", note: "Forecast app with cached last-known state." },
  { name: "Daily-planner-app", url: "https://github.com/moekyawaung-tech/Daily-planner-app", lang: "Kotlin", note: "WorkManager reminders + Room persistence." },
  { name: "Lens-lite", url: "https://github.com/moekyawaung-tech/Lens-lite", lang: "Kotlin", note: "On-device TFLite classification camera." },
];

/* ------------------------------------------------- GITHUB PAGES ACCOUNTS */
export const GH_ACCOUNTS: string[] = [
  "https://moekyawaung-china.github.io/", "https://moekyawaung-developer.github.io/",
  "https://moekyawaungvivov30pro-design.github.io/", "https://moekyaw-aung-mm.github.io/",
  "https://moekyawaung-mk.github.io/", "https://moekyawaung-microsoft.github.io/",
  "https://moekyawaung-cyber.github.io/", "https://moekyawaung-bangkok.github.io/",
  "https://moekyawaung-micro.github.io/", "https://moekyawaungmka2032-boop.github.io/",
  "https://moekyawaung-dev-mm.github.io/", "https://moekyaw-developer.github.io/",
  "https://moekyawaung.github.io/", "https://moekyawaung-mm.github.io/",
  "https://moekyawaung-tech.github.io/", "https://moekyawaung-hack.github.io/",
  "https://moekyawaung-graduate.github.io/", "https://moekyawaung-linux.github.io/",
  "https://moekyawaung-coder.github.io/", "https://moekyawaung-designer.github.io/",
  "https://moekyawaung2026.github.io/", "https://moekyawaungmka2034-coder.github.io/",
  "https://moekyawaung-web.github.io/", "https://moekyawaung-dev.github.io/",
  "https://moekyawaung-code.github.io/", "https://moekyawaung-creator.github.io/",
  "https://moekyawaung-webdeveloper.github.io/", "https://moekyawaung-co.github.io/",
  "https://moekyawaung-edu.github.io/", "https://moekyawaung-senior.github.io/",
  "https://moekyawaung-development.github.io/", "https://moekyawaung-google.github.io/",
  "https://moe-kyawaung.github.io/",
];

/* ---------------------------------------------------- LOVABLE PWA LINKS */
export const LOVABLE_LINKS: string[] = [
  "https://happy-cv-creator.lovable.app", "https://moekyawaung.lovable.app",
  "https://moekyawaungmybio.lovable.app/", "https://the-cv-palette.lovable.app",
  "https://moekyaw-url.lovable.app", "https://moekyawaung-dev.lovable.app",
  "https://moe-kyaw-aung.lovable.app", "https://moekyawaungmka.lovable.app",
  "https://moekyaw.lovable.app", "https://m-moekyaw.lovable.app",
  "https://dev-moekyawaung.lovable.app", "https://dev-moekyaw.lovable.app",
  "https://cv-beacon.lovable.app/", "https://moekyawaungmkamka.lovable.app",
  "https://pixel-perfect-snap-39.lovable.app", "https://devmoekyaw.lovable.app",
  "https://profile-persuasion-hub.lovable.app", "https://friendly-haven-io.lovable.app",
  "https://moekyawaung-github.lovable.app", "https://moekyawgithub.lovable.app",
  "https://joy-codify-life.lovable.app/", "https://mmoekyaw.lovable.app",
  "https://color-code-chronicles.lovable.app", "https://moekyawaung-free.lovable.app",
  "https://app-skill-gallery.lovable.app", "https://spark-coach-create.lovable.app",
  "https://moekyaw-mk.lovable.app", "https://moekyawaung-myanmar.lovable.app",
  "https://mmoe.lovable.app", "https://moekyaw-dev.lovable.app",
  "https://lovable.dev/invite/ZVLZ2S5",
];

/* --------------------------------------------------------------- EMAILS */
export const EMAILS: { addr: string; label: string }[] = [
  { addr: "moekyawaung@programmer.net", label: "Primary / dev" },
  { addr: "moekyawaung@engineer.com", label: "Engineering" },
  { addr: "moekyawaung@technologist.com", label: "Technology" },
  { addr: "moekyawaung@techie.com", label: "Community" },
  { addr: "moekyawaung@graphic-designer.com", label: "Design" },
  { addr: "moekyawaung@cybergal.com", label: "Security" },
  { addr: "moekyawaung@hackermail.com", label: "Research" },
  { addr: "moekyawaung@linuxmail.org", label: "Linux / OSS" },
  { addr: "moekyawaung@webname.com", label: "Web" },
  { addr: "moekyawaung@collector.org", label: "Archive" },
  { addr: "moekyawaung@graduate.org", label: "Academic" },
  { addr: "moekyawaung@contractor.net", label: "Contracting" },
  { addr: "moekyawaung@asia.com", label: "APAC" },
  { addr: "moekyawaung@usa.com", label: "US clients" },
  { addr: "moekyawaung@europe.com", label: "EU clients" },
  { addr: "moekyawaung@mail.com", label: "General" },
  { addr: "moekyawaung@iname.com", label: "Personal" },
  { addr: "moekyawaung@socialogist.com", label: "Social" },
  { addr: "moekyawaung@secretary.net", label: "Scheduling" },
  { addr: "moekyawaung@publicist.com", label: "Press" },
];

/* --------------------------------------------------------------- SOCIAL */
export type Social = { name: string; url: string; icon: string; accent: string };

export const SOCIALS: Social[] = [
  { name: "GitHub", url: "https://github.com/Dev-moe-kyawaung/", icon: "github", accent: "#e6edf3" },
  { name: "Gravatar", url: "https://gravatar.com/moekyawaung13721", icon: "gravatar", accent: "#1e8cbe" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1", icon: "linkedin", accent: "#0a66c2" },
  { name: "Email", url: "mailto:moekyawaung@programmer.net", icon: "mail", accent: "#00f0ff" },
  { name: "Phone", url: "tel:+959889000889", icon: "phone", accent: "#b6ff3d" },
  { name: "Telegram", url: "https://t.me/moekyawaung", icon: "telegram", accent: "#2aabee" },
  { name: "Instagram", url: "https://instagram.com/moekyawaung", icon: "instagram", accent: "#e1306c" },
  { name: "Play Store", url: "https://play.google.com/store/apps/developer?id=Moe+Kyaw+Aung", icon: "play", accent: "#3ddc84" },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG", icon: "youtube", accent: "#ff0033" },
  { name: "Tumblr", url: "https://www.tumblr.com/moekyawaung", icon: "tumblr", accent: "#36465d" },
  { name: "Flickr", url: "https://www.flickr.com/people/204037451@N06", icon: "flickr", accent: "#ff0084" },
  { name: "Bluesky", url: "https://bsky.app/profile/moekyawaung96.bsky.social", icon: "bluesky", accent: "#0085ff" },
  { name: "Vimeo", url: "https://vimeo.com/user252414232", icon: "vimeo", accent: "#1ab7ea" },
  { name: "Slack", url: "https://moekyawaung.slack.com/", icon: "slack", accent: "#611f69" },
  { name: "PayPal", url: "https://www.paypal.com/paypalme/my/profile", icon: "paypal", accent: "#00457c" },
  { name: "Strikingly", url: "http://moekyawaung2026.strikingly.com", icon: "globe", accent: "#f5ff3d" },
];

/* --------------------------------------------------------------- SKILLS */
export const SKILL_BARS: { name: string; pct: number; accent: string }[] = [
  { name: "Kotlin · Coroutines · Flow", pct: 96, accent: "var(--neon-cyan)" },
  { name: "Jetpack Compose · Material 3", pct: 94, accent: "var(--neon-pink)" },
  { name: "Flutter · Dart", pct: 90, accent: "var(--neon-yellow)" },
  { name: "Clean Architecture · MVVM / MVI", pct: 93, accent: "var(--neon-violet)" },
  { name: "Firebase · REST · Retrofit", pct: 91, accent: "var(--neon-lime)" },
  { name: "Room · Offline-first sync", pct: 89, accent: "var(--neon-cyan)" },
  { name: "CI/CD · GitHub Actions · Fastlane", pct: 87, accent: "var(--neon-pink)" },
  { name: "Testing · JUnit · Espresso · MockK", pct: 85, accent: "var(--neon-yellow)" },
  { name: "Performance profiling · Perfetto", pct: 88, accent: "var(--neon-violet)" },
  { name: "Security · Ethical Hacking", pct: 78, accent: "var(--neon-lime)" },
];

export const RINGS: { label: string; pct: number; color: string }[] = [
  { label: "Kotlin", pct: 96, color: "var(--neon-cyan)" },
  { label: "Compose", pct: 94, color: "var(--neon-pink)" },
  { label: "Firebase", pct: 91, color: "var(--neon-yellow)" },
  { label: "CI/CD", pct: 87, color: "var(--neon-violet)" },
];

export const SKILL_GROUPS: { title: string; items: string[] }[] = [
  { title: "Flutter development", items: ["Widget composition", "Slivers & custom scroll", "Riverpod / Bloc", "Impeller-aware rendering", "Platform channels", "Flutter DevTools"] },
  { title: "Android development", items: ["Kotlin & Coroutines", "Jetpack Compose", "ViewModel · Navigation", "Room · Paging 3", "WorkManager", "Material 3 theming"] },
  { title: "Architecture", items: ["Clean Architecture", "MVVM / MVI", "Multi-module graphs", "Dependency inversion", "Feature toggles", "Contract-first APIs"] },
  { title: "Product delivery", items: ["Release trains", "Play Console rollout", "Crash triage", "A/B experiments", "Analytics instrumentation", "Store assets"] },
  { title: "Engineering quality", items: ["Unit & UI tests", "Static analysis", "Code review culture", "Perf budgets", "Accessibility audits", "Threat modelling"] },
  { title: "Collaboration", items: ["Design partnership", "Async written specs", "Mentoring", "Estimation", "Stakeholder demos", "Bilingual docs (MY/EN)"] },
];

export const TECH_BADGES: { group: string; items: { n: string; c: string }[] }[] = [
  { group: "📱 Android / Mobile", items: [
    { n: "Kotlin", c: "#7F52FF" }, { n: "Jetpack Compose", c: "#4285F4" }, { n: "Android", c: "#3DDC84" },
    { n: "Android Studio", c: "#3DDC84" }, { n: "Flutter", c: "#02569B" }, { n: "Dart", c: "#0175C2" },
  ]},
  { group: "🏗️ Architecture & Patterns", items: [
    { n: "MVVM", c: "#C9A84C" }, { n: "Clean Architecture", c: "#1A1A2E" }, { n: "Coroutines", c: "#7F52FF" },
    { n: "Kotlin Flow", c: "#7F52FF" }, { n: "Hilt / Dagger", c: "#2196F3" }, { n: "KMM", c: "#7F52FF" },
  ]},
  { group: "☁️ Backend & Cloud", items: [
    { n: "Firebase", c: "#FFCA28" }, { n: "REST APIs", c: "#16213E" }, { n: "Retrofit", c: "#48B983" },
    { n: "Room DB", c: "#3DDC84" }, { n: "Supabase", c: "#3ECF8E" }, { n: "GraphQL", c: "#E10098" },
  ]},
  { group: "🤖 AI / ML", items: [
    { n: "Claude API", c: "#C9A84C" }, { n: "Python", c: "#3776AB" }, { n: "TFLite", c: "#FF6F00" },
    { n: "ML Kit", c: "#4285F4" },
  ]},
  { group: "🔐 Cybersecurity", items: [
    { n: "Ethical Hacking", c: "#0D0D0D" }, { n: "Linux", c: "#FCC624" }, { n: "Kali Linux", c: "#557C94" },
    { n: "OWASP MASVS", c: "#000000" },
  ]},
  { group: "🛠️ Dev Tools", items: [
    { n: "Git", c: "#F05032" }, { n: "GitHub Actions", c: "#2088FF" }, { n: "VS Code", c: "#007ACC" },
    { n: "Figma", c: "#F24E1E" }, { n: "Fastlane", c: "#00F200" }, { n: "Perfetto", c: "#6C4DF6" },
  ]},
];

export const SKILL_CHIPS = [
  "🐍 Python", "☕ Java", "🟨 JavaScript", "🔷 TypeScript", "🔴 Ruby", "🦀 Rust", "🐹 Go", "🎯 Dart",
  "⚛️ React", "▲ Next.js", "🅰️ Angular", "💚 Vue.js", "📦 Node.js", "🐦 Flutter", "🤖 Kotlin",
  "🐘 PostgreSQL", "🍃 MongoDB", "⚡ Redis", "🐳 Docker", "☁️ AWS", "🔗 Blockchain",
  "🤖 Machine Learning", "🔐 Cyber Security",
];

/* ------------------------------------------------------------ TIMELINE */
export const TIMELINE: { year: string; title: string; org: string; body: string; impact: string }[] = [
  { year: "2014", title: "Junior Android Developer", org: "Local software house · Tachileik", body: "Shipped first production Java apps for retail clients; learned release discipline the hard way.", impact: "6 apps published · first 10k installs" },
  { year: "2016", title: "Android Developer", org: "Regional fintech vendor", body: "Moved the team from monolithic Activities to MVP, added Retrofit + OkHttp networking and offline caching.", impact: "Crash-free sessions 92% → 99.1%" },
  { year: "2018", title: "Senior Android Developer", org: "Bangkok product studio", body: "Owned architecture for a multi-tenant POS platform; introduced Kotlin, coroutines and modularisation.", impact: "Build time −44% · 5 modules" },
  { year: "2020", title: "Mobile Tech Lead", org: "Cross-border commerce", body: "Led a 6-person team, defined the Compose migration path and the CI/CD pipeline on GitHub Actions.", impact: "Release cadence 6w → 1w" },
  { year: "2022", title: "Principal Mobile Engineer", org: "Consulting · MY ↔ TH", body: "Flutter adoption for shared codebases; performance audits and rescue engagements for stalled apps.", impact: "Jank frames −68% median" },
  { year: "2024", title: "Independent Senior Engineer", org: "Own practice", body: "Architecture reviews, performance audits, mentorship and feature-rescue work across APAC teams.", impact: "18 engagements · 100% renewal" },
  { year: "2026", title: "Building MoekyawTranslator", org: "AI Translation App", body: "On-device + Claude API hybrid translation for Burmese, English and Thai with an offline glossary.", impact: "Private beta · 40+ certifications" },
];

/* ------------------------------------------------------------- SERVICES */
export const SERVICES: { icon: string; title: string; body: string; bullets: string[] }[] = [
  { icon: "⚙️", title: "Flutter Architecture Review", body: "A structured read of your codebase with a prioritised, actionable remediation plan.", bullets: ["Module & layer boundaries", "State management audit", "Dependency graph review", "Written report + walkthrough"] },
  { icon: "⚡", title: "Performance Audit", body: "Frame timing, startup, memory and battery measured on real mid-tier devices — not emulators.", bullets: ["Perfetto / DevTools traces", "Jank hotspot list", "Startup budget plan", "Before / after benchmarks"] },
  { icon: "🧭", title: "Mentorship", body: "Weekly pairing and code review for engineers moving into senior mobile work.", bullets: ["Code review support", "Pairing sessions", "Refactoring guidance", "Career growth planning"] },
  { icon: "🛟", title: "Feature Rescue", body: "Stalled feature, missed deadline, or a release that keeps regressing? I stabilise and ship it.", bullets: ["Rapid context ramp-up", "Risk-first sequencing", "Test harness in place", "Handover documentation"] },
  { icon: "🤖", title: "Android Modernisation", body: "Views → Compose, Java → Kotlin, monolith → modules, with no feature freeze required.", bullets: ["Incremental migration", "Interop strategy", "Design-system seeding", "Team enablement"] },
  { icon: "🚀", title: "CI/CD & Release Engineering", body: "Reproducible builds, signed artifacts, staged rollouts and automated regression gates.", bullets: ["GitHub Actions pipelines", "Fastlane lanes", "Play Console rollout", "Crash + ANR alerting"] },
];

/* -------------------------------------------------------------- PRICING */
export type Currency = "USD" | "THB" | "MMK";

export const PRICING: { name: string; usd: number; note: string; features: string[]; featured?: boolean }[] = [
  { name: "Quick Audit", usd: 480, note: "3–5 working days", features: ["Codebase read-through", "Top 10 risk list", "60-min walkthrough call", "Written summary (EN / MY)"] },
  { name: "Architecture Review", usd: 1850, note: "2 weeks", features: ["Full module & layer map", "State + data-flow analysis", "Refactor roadmap", "Team Q&A workshop", "Follow-up after 30 days"], featured: true },
  { name: "Monthly Advisory", usd: 1200, note: "per month · retainer", features: ["Weekly review sessions", "Async Slack support", "PR reviews (up to 20/mo)", "Release-gate checklist"] },
  { name: "Implementation Support", usd: 6400, note: "per month · part-time", features: ["Hands-on feature delivery", "Performance work", "CI/CD pipeline setup", "Docs + handover", "Mentoring included"] },
];

export const FX: Record<Currency, { rate: number; symbol: string; locale: string }> = {
  USD: { rate: 1, symbol: "$", locale: "en-US" },
  THB: { rate: 36.2, symbol: "฿", locale: "th-TH" },
  MMK: { rate: 4380, symbol: "K", locale: "my-MM" },
};

/* --------------------------------------------------------- TESTIMONIALS */
export const TESTIMONIALS: { quote: string; name: string; role: string; avatar: string }[] = [
  { quote: "Thoughtful, steady, and excellent at turning messy mobile problems into clean solutions. Our release anxiety basically disappeared.", name: "Nanda W.", role: "Engineering Manager · Fintech", avatar: "https://i.pravatar.cc/120?img=12" },
  { quote: "Strong Flutter judgment, clear communication, and reliable delivery under pressure. He asks the questions nobody else thought to ask.", name: "Pimchanok S.", role: "Product Manager · Bangkok", avatar: "https://i.pravatar.cc/120?img=32" },
  { quote: "He rebuilt our checkout in six weeks and the drop-off numbers moved immediately. Rare mix of design sense and systems thinking.", name: "Aung Kyaw M.", role: "Founder · Commerce startup", avatar: "https://i.pravatar.cc/120?img=52" },
  { quote: "Our design tokens finally match the app. He treated fidelity as an engineering requirement, not a nice-to-have.", name: "Julia R.", role: "Product Designer", avatar: "https://i.pravatar.cc/120?img=45" },
  { quote: "The performance audit paid for itself in one sprint. Cold start dropped by nearly a second on our low-end test fleet.", name: "Sithu L.", role: "Staff Engineer", avatar: "https://i.pravatar.cc/120?img=15" },
  { quote: "Best mentor I've had. Direct feedback, always with a reason behind it, and he never made me feel small for asking.", name: "Ei Ei P.", role: "Android Developer", avatar: "https://i.pravatar.cc/120?img=25" },
];

/* ----------------------------------------------------------------- FAQ */
export const FAQ: { q: string; a: string }[] = [
  { q: "What roles are you open to?", a: "Senior / Lead Android or Flutter engineering roles, remote-first or hybrid out of Bangkok. I also take fixed-scope consulting: architecture reviews, performance audits, and feature rescue." },
  { q: "Are you available remotely?", a: "Yes. I work Asia/Bangkok (GMT+7) with a stable overlap for European mornings and US west-coast evenings. Async-first, with written updates by default." },
  { q: "Which stack do you prefer?", a: "Kotlin with Jetpack Compose for native Android, and Flutter/Dart when a shared codebase genuinely helps the product. Firebase or a REST backend, Room or Drift for local persistence." },
  { q: "How fast do you respond?", a: "Within one business day on email and LinkedIn. Retainer clients get same-day responses during Bangkok working hours." },
  { q: "Do you take short consulting engagements?", a: "Yes — the Quick Audit is designed exactly for that. Three to five days, a prioritised risk list, and a call to walk your team through it." },
  { q: "Can you work in Burmese and Thai?", a: "Burmese is my first language, English is my working language, and I handle day-to-day Thai. All deliverables can be produced bilingually (EN + MY)." },
  { q: "Do you sign NDAs?", a: "Routinely. I can also work inside your VPN, your repo permissions, and your device fleet if security policy requires it." },
  { q: "What about ongoing maintenance?", a: "The Monthly Advisory retainer covers reviews, release gates and async support. Larger maintenance scopes are quoted per engagement." },
];

/* ----------------------------------------------------------- WRITING */
export const WRITING: { title: string; date: string; read: string; tag: string; excerpt: string }[] = [
  { title: "Rebuild budgets: making Compose recomposition boring", date: "2026-02-14", read: "9 min", tag: "Performance", excerpt: "A practical method for finding the three widgets actually causing your jank, instead of rewriting the whole screen." },
  { title: "Shared code is a product decision, not a tech one", date: "2026-01-22", read: "7 min", tag: "Architecture", excerpt: "When Flutter pays off, when it doesn't, and the honest cost of maintaining a platform-channel boundary." },
  { title: "Offline-first without the folklore", date: "2025-12-08", read: "12 min", tag: "Data", excerpt: "Conflict rules, write queues, idempotency keys, and how to explain sync behaviour to non-engineers." },
  { title: "Release trains for small mobile teams", date: "2025-11-03", read: "6 min", tag: "Delivery", excerpt: "How a five-person team moved from six-week releases to weekly, without adding process theatre." },
  { title: "Testing what actually breaks", date: "2025-09-19", read: "8 min", tag: "Quality", excerpt: "A coverage strategy based on incident history rather than percentage targets." },
  { title: "Burmese typography in mobile UI", date: "2025-08-05", read: "10 min", tag: "Localization", excerpt: "Line height, font fallback, and why your beautiful Latin layout collapses in Myanmar script." },
];

export const TALKS: { title: string; venue: string; year: string; type: string; detail: string }[] = [
  { title: "Compose Performance in the Real World", venue: "Android Bangkok Meetup", year: "2026", type: "Talk", detail: "45 min + Q&A · trace-driven walkthrough on a mid-tier Redmi device." },
  { title: "Offline-First Flutter Workshop", venue: "Yangon Dev Week", year: "2025", type: "Workshop", detail: "Full-day hands-on: sync queues, conflict rules, and testing flaky networks." },
  { title: "Kotlin Multiplatform: What We Actually Shipped", venue: "APAC Mobile Summit", year: "2025", type: "Conference", detail: "Case study on sharing domain logic across Android and iOS without losing native feel." },
  { title: "Secure Mobile Development for Fintech", venue: "Tachileik Tech Circle", year: "2024", type: "Talk", detail: "OWASP MASVS applied to a real payment flow, in Burmese." },
  { title: "From Views to Compose Without Freezing Features", venue: "Google Developers Launchpad", year: "2024", type: "Session", detail: "Interop patterns and a migration order that keeps the backlog moving." },
  { title: "CI/CD for Two-Person Mobile Teams", venue: "Online · Dev.to Live", year: "2023", type: "Stream", detail: "GitHub Actions + Fastlane from empty repo to signed release in 40 minutes." },
];

export const AWARDS: { title: string; org: string; year: string; note: string }[] = [
  { title: "Google Developers Launchpad — Alumni", org: "Google Developers", year: "2024", note: "Selected cohort for mobile product acceleration." },
  { title: "40+ Verified Certifications", org: "Programming Hub · Coursera · Google", year: "2019–2026", note: "Programming, web, mobile, databases, AI/ML, security, blockchain." },
  { title: "Top Contributor — Myanmar Android Community", org: "MM Android Devs", year: "2023", note: "Recognised for Burmese-language learning material." },
  { title: "Best Retail App — Regional Showcase", org: "Bangkok Product Studio", year: "2021", note: "POS Ultimate: judged on reliability and offline behaviour." },
  { title: "Crash-Free Excellence", org: "Internal engineering award", year: "2020", note: "99.4% crash-free sessions sustained across four quarters." },
  { title: "Featured Developer Profile", org: "Gravatar / Community", year: "2026", note: "Verified profile with 16 linked professional accounts." },
];

export const CERT_CATEGORIES: { icon: string; name: string; count: number; items: string[] }[] = [
  { icon: "⌨️", name: "Programming Languages", count: 13, items: ["C Programming", "C++", "Java", "Python", "Kotlin", "Dart", "Go", "Rust", "Ruby", "Swift", "PHP", "TypeScript", "JavaScript"] },
  { icon: "🌐", name: "Web Development", count: 13, items: ["HTML5", "CSS3", "JavaScript ES6+", "React", "Next.js", "Vue.js", "Angular", "Node.js", "Express", "Tailwind CSS", "REST APIs", "GraphQL", "Web Performance"] },
  { icon: "📱", name: "Mobile & App Dev", count: 7, items: ["Android Fundamentals", "Kotlin for Android", "Jetpack Compose", "Flutter", "React Native", "iOS Basics", "App Store Delivery"] },
  { icon: "🗄️", name: "Databases", count: 6, items: ["SQL Fundamentals", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Room / SQLite"] },
  { icon: "🤖", name: "AI & Data Science", count: 11, items: ["Machine Learning", "Deep Learning", "TensorFlow", "TFLite", "NLP", "Computer Vision", "Data Analysis", "Pandas", "NumPy", "Prompt Engineering", "On-device ML"] },
  { icon: "🔐", name: "Security & DevOps", count: 10, items: ["Ethical Hacking", "Network Security", "Linux Administration", "Kali Linux", "Docker", "Kubernetes Basics", "CI/CD", "GitHub Actions", "OWASP Top 10", "Mobile App Security"] },
  { icon: "⛓️", name: "Blockchain", count: 4, items: ["Blockchain Basics", "Smart Contracts", "Solidity", "Web3 Fundamentals"] },
  { icon: "🛠️", name: "Software Engineering", count: 7, items: ["Clean Code", "Design Patterns", "SOLID Principles", "System Design", "Agile / Scrum", "Git & Version Control", "Testing Strategies"] },
  { icon: "📈", name: "Marketing & Business", count: 11, items: ["Digital Marketing", "SEO", "Product Management", "UX Research", "Analytics", "Growth Basics", "Copywriting", "Branding", "Freelancing", "Client Communication", "Pricing Strategy"] },
];

/* -------------------------------------------------------- ORGANIZATION */
export const ORGS: { name: string; role: string; period: string; note: string; url: string }[] = [
  { name: "Dev-moe-kyawaung", role: "Primary org · flagship engineering", period: "2022 — now", note: "Reference architectures, PulseSync, internal tooling.", url: "https://github.com/Dev-moe-kyawaung/" },
  { name: "moekyawaung-tech", role: "App collection & product demos", period: "2021 — now", note: "16 shipped demo apps, POS line, media players.", url: "https://github.com/moekyawaung-tech" },
  { name: "Moekyawaung-cyber", role: "Security & civic data", period: "2020 — now", note: "Postcode dataset, hospital directory, OSINT tooling.", url: "https://github.com/Moekyawaung-cyber" },
  { name: "Myanmar Android Devs", role: "Community mentor", period: "2019 — now", note: "Burmese-language Android learning materials and reviews.", url: "https://moekyawaung-mm.github.io/" },
  { name: "Google Developers Launchpad", role: "Alumni", period: "2024", note: "Mobile product acceleration cohort.", url: "https://developers.google.com/" },
  { name: "Bangkok Flutter Circle", role: "Speaker & organiser", period: "2023 — now", note: "Monthly sessions on architecture and performance.", url: "https://moekyawaung-bangkok.github.io/" },
];

/* ----------------------------------------------------------- METRICS */
export const HERO_STATS: { n: number; suffix: string; label: string; labelMy: string }[] = [
  { n: 10, suffix: "+", label: "Years shipping", labelMy: "အတွေ့အကြုံနှစ်" },
  { n: 3000, suffix: "+", label: "Apps & builds", labelMy: "အက်ပ်များ" },
  { n: 600, suffix: "+", label: "Repositories", labelMy: "ကုဒ်သိမ်းဆည်းမှု" },
  { n: 100, suffix: "%", label: "Satisfaction", labelMy: "ကျေနပ်မှု" },
];

export const PERF_METRICS: { label: string; before: string; after: string; delta: string }[] = [
  { label: "Cold start (p50, mid-tier)", before: "2.41 s", after: "0.94 s", delta: "−61%" },
  { label: "Jank frames (scroll, 120 Hz)", before: "14.2%", after: "1.8%", delta: "−87%" },
  { label: "Peak memory (list screen)", before: "312 MB", after: "168 MB", delta: "−46%" },
  { label: "APK download size", before: "38.4 MB", after: "21.7 MB", delta: "−43%" },
  { label: "Battery drain (1h active)", before: "9.1%", after: "5.3%", delta: "−42%" },
  { label: "Crash-free sessions", before: "97.2%", after: "99.87%", delta: "+2.7pp" },
];

export const TRUST_POINTS = [
  "10+ years shipping mobile products",
  "Production Flutter & Compose experience",
  "Architecture and performance focus",
  "Strong cross-functional collaboration",
  "40+ verified certifications",
  "Bilingual delivery — Burmese & English",
  "Crash-free sessions above 99.8%",
  "APAC time zone · GMT+7",
];
