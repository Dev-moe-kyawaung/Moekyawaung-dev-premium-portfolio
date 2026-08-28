/* =========================================================================
   GLOBAL STORE — language (my/en/th), currency (MMK/THB/USD), theme,
   motion + contrast preferences, and hash routing.
   Implemented with React context so every component can read it cheaply.
   ========================================================================= */
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
  type ReactNode,
} from "react";
import { FX, type Currency } from "./data";

export type Lang = "en" | "my" | "th";

/* ------------------------------------------------------------------ COPY */
type Dict = Record<string, { en: string; my: string; th: string }>;

export const T: Dict = {
  availability: { en: "Available for senior roles", my: "အလုပ်အကိုင် လက်ခံနေသည်", th: "เปิดรับงานระดับซีเนียร์" },
  viewWork: { en: "View selected work", my: "လက်ရာများကြည့်ရန်", th: "ดูผลงานที่คัดสรร" },
  downloadCv: { en: "Download resume", my: "ကိုယ်ရေးမှတ်တမ်း ဒေါင်းရန်", th: "ดาวน์โหลดเรซูเม่" },
  contactMe: { en: "Contact me", my: "ဆက်သွယ်ရန်", th: "ติดต่อฉัน" },
  viewProjects: { en: "View projects", my: "ပရောဂျက်များ", th: "ดูโปรเจกต์" },
  readCase: { en: "Read case study", my: "အသေးစိတ်ဖတ်ရန်", th: "อ่านกรณีศึกษา" },
  liveDemo: { en: "Live demo", my: "စမ်းသပ်ကြည့်ရန်", th: "เดโมสด" },
  source: { en: "Source", my: "ကုဒ်ကြည့်ရန်", th: "ซอร์สโค้ด" },
  heroTitle: {
    en: "I build premium mobile experiences that feel consistent, fast, and native-quality.",
    my: "တည်ငြိမ်၊ မြန်ဆန်ပြီး native အရည်အသွေးရှိသော မိုဘိုင်းအက်ပ်များကို ဖန်တီးပေးပါသည်။",
    th: "ผมสร้างประสบการณ์โมบายระดับพรีเมียม ที่สม่ำเสมอ รวดเร็ว และเทียบเท่าเนทีฟ",
  },
  heroSub: {
    en: "Senior Android & Flutter Developer focused on Kotlin, Dart, architecture, performance, shared codebases, and production delivery.",
    my: "Kotlin, Dart, ဖွဲ့စည်းပုံဒီဇိုင်း၊ စွမ်းဆောင်ရည်နှင့် ထုတ်လုပ်မှုအဆင့် ပို့ဆောင်ခြင်းအပေါ် အထူးပြုသော Senior Android & Flutter Developer ဖြစ်ပါသည်။",
    th: "นักพัฒนา Android & Flutter ระดับซีเนียร์ ที่เน้น Kotlin, Dart, สถาปัตยกรรม, ประสิทธิภาพ และการส่งมอบจริง",
  },
  heroSupport: {
    en: "I turn complex product ideas into cross-platform systems teams can confidently ship, maintain, and evolve.",
    my: "ရှုပ်ထွေးသော ထုတ်ကုန်အကြံဉာဏ်များကို အဖွဲ့များ ယုံကြည်စိတ်ချစွာ ထုတ်လုပ်၊ ထိန်းသိမ်း၊ တိုးတက်စေနိုင်သည့် စနစ်များအဖြစ် ပြောင်းလဲပေးပါသည်။",
    th: "ผมเปลี่ยนไอเดียผลิตภัณฑ์ที่ซับซ้อน ให้เป็นระบบข้ามแพลตฟอร์มที่ทีมส่งมอบและดูแลต่อได้อย่างมั่นใจ",
  },
  navMenu: { en: "Menu", my: "မီနူး", th: "เมนู" },
  formName: { en: "Your name", my: "အမည်", th: "ชื่อของคุณ" },
  formEmail: { en: "Email address", my: "အီးမေးလ်လိပ်စာ", th: "อีเมล" },
  formSubject: { en: "Subject", my: "ခေါင်းစဉ်", th: "หัวข้อ" },
  formMsg: { en: "Message", my: "မက်ဆေ့ချ်", th: "ข้อความ" },
  formSend: { en: "Send message", my: "မက်ဆေ့ချ် ပို့ရန်", th: "ส่งข้อความ" },
  errName: { en: "Please enter your name.", my: "ကျေးဇူးပြု၍ အမည် ထည့်သွင်းပါ။", th: "กรุณากรอกชื่อของคุณ" },
  errEmail: { en: "Please enter a valid email address.", my: "မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်ပါ။", th: "กรุณากรอกอีเมลที่ถูกต้อง" },
  errSubject: { en: "Subject must be at least 4 characters.", my: "ခေါင်းစဉ်သည် အနည်းဆုံး စာလုံး ၄ လုံး ရှိရမည်။", th: "หัวข้อต้องมีอย่างน้อย 4 ตัวอักษร" },
  errMsg: { en: "Message must be at least 20 characters.", my: "မက်ဆေ့ချ်သည် အနည်းဆုံး စာလုံး ၂၀ ရှိရပါမည်။", th: "ข้อความต้องมีอย่างน้อย 20 ตัวอักษร" },
  sent: { en: "Message sent — I reply within one business day.", my: "မက်ဆေ့ချ် ပို့ပြီးပါပြီ — ရုံးဖွင့်ရက် ၁ ရက်အတွင်း ပြန်လည်ဖြေကြားပါမည်။", th: "ส่งข้อความแล้ว — ตอบกลับภายใน 1 วันทำการ" },
  newsletter: { en: "Newsletter", my: "သတင်းလွှာ", th: "จดหมายข่าว" },
  subscribe: { en: "Subscribe", my: "စာရင်းသွင်းရန်", th: "สมัครรับข่าว" },
  subscribed: { en: "Subscribed. Welcome aboard.", my: "စာရင်းသွင်းပြီးပါပြီ။ ကြိုဆိုပါသည်။", th: "สมัครสำเร็จ ยินดีต้อนรับ" },
  backTop: { en: "Back to top", my: "အပေါ်သို့", th: "กลับขึ้นบน" },
  loading: { en: "Initialising system", my: "စနစ် စတင်နေသည်", th: "กำลังเริ่มระบบ" },
  quickLinks: { en: "Quick links", my: "အမြန်လင့်များ", th: "ลิงก์ด่วน" },
  hireMe: { en: "Hire me", my: "ငှားရမ်းရန်", th: "จ้างงาน" },
};

export const t = (key: string, lang: Lang) => T[key]?.[lang] ?? key;

/* --------------------------------------------------------------- CONTEXT */
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (k: string) => string;
  cur: Currency;
  setCur: (c: Currency) => void;
  price: (usd: number) => string;
  theme: "dark" | "light";
  toggleTheme: () => void;
  route: string;
  go: (r: string, hash?: string) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [cur, setCur] = useState<Currency>("USD");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [route, setRoute] = useState<string>(() => window.location.hash.replace(/^#\/?/, "").split("#")[0] || "home");

  /* Keep <html lang> in sync for correct font stack + screen readers */
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /* Hash router — keeps the single-file build fully static & shareable */
  useEffect(() => {
    const onHash = () => {
      const raw = window.location.hash.replace(/^#\/?/, "");
      const [page, anchor] = raw.split("#");
      setRoute(page || "home");
      if (anchor) {
        requestAnimationFrame(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = useCallback((r: string, hash?: string) => {
    window.location.hash = `/${r}${hash ? `#${hash}` : ""}`;
    if (window.location.hash.replace(/^#\/?/, "").split("#")[0] === route && !hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [route]);

  const price = useCallback((usd: number) => {
    const { rate, symbol, locale } = FX[cur];
    const v = usd * rate;
    const rounded = cur === "MMK" ? Math.round(v / 1000) * 1000 : Math.round(v);
    return `${symbol}${new Intl.NumberFormat(locale).format(rounded)}`;
  }, [cur]);

  const value = useMemo<Ctx>(() => ({
    lang,
    setLang: setLangState,
    tr: (k: string) => t(k, lang),
    cur, setCur, price,
    theme,
    toggleTheme: () => setTheme((v) => (v === "dark" ? "light" : "dark")),
    route, go,
  }), [lang, cur, price, theme, route, go]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be used inside <AppProvider>");
  return c;
}
