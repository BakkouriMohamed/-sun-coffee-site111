'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, Instagram, Facebook, MapPin, Phone, Clock, ArrowRight, ArrowUpRight, Coffee, Sparkles } from 'lucide-react'

// ============================================================
// DATA
// ============================================================

const NAV_LINKS = [
  { label: 'Notre histoire', href: '#histoire' },
  { label: 'Spécialités', href: '#specialites' },
  { label: 'Menu', href: '#menu' },
  { label: 'Notre engagement', href: '#engagement' },
  { label: 'Nous trouver', href: '#contact' },
]

const TIMELINE = [
  { year: '2016', title: 'Première salle', text: "Sanae ouvre un petit café dans une rue de la Ville Nouvelle, à Fès. Une terrasse orientée plein est, où le soleil du matin arrive en premier." },
  { year: '2019', title: 'Notre torréfacteur', text: "Arrivée de notre propre torréfacteur. Les grains verts sont désormais travaillés sur place, café après café." },
  { year: '2022', title: 'Terrasse & coin lecture', text: "On agrandit : nouvelle terrasse et un coin lecture pour ceux qui restent, étudiants comme habitués du quartier." },
  { year: "Aujourd'hui", title: 'Toujours le même sourire', text: "CHAMSS COFFEE est devenu un point de rendez-vous. Le café est franc, les pâtisseries sont maison, et l'accueil n'a pas changé." },
]

const SIGNATURES = [
  {
    name: 'Frappé Chamss Coffee',
    desc: "Notre signature. Mousse épaisse, espresso torréfié maison, served bien glacé.",
    price: '38 MAD',
    image: '/images/iced-coffee.jpg',
    tag: 'Signature',
  },
  {
    name: 'Espresso',
    desc: "Simple ou double. Grains torréfiés sur place, crema dorée, profil franc.",
    price: '15 MAD',
    image: '/images/espresso.jpg',
    tag: 'Torréfié maison',
  },
  {
    name: 'Thé à la menthe',
    desc: "Menthe fraîche, servi à la tradition. Le geste marocain, dans la tasse Chamss.",
    price: '15 MAD',
    image: '/images/mint-tea.jpg',
    tag: 'Tradition',
  },
]

const MENU = {
  iced: {
    label: 'Cafés glacés',
    items: [
      { name: 'Iced Americano', desc: 'Espresso double, eau glacée', price: '25 MAD' },
      { name: 'Iced Latte', desc: 'Espresso, lait froid, glaçons', price: '30 MAD' },
      { name: 'Cold Brew', desc: 'Infusion à froid 16h', price: '32 MAD' },
      { name: 'Iced Caramel Macchiato', desc: 'Lait, vanille, caramel maison', price: '35 MAD' },
      { name: 'Iced Mocha', desc: 'Espresso, chocolat, lait froid', price: '35 MAD' },
      { name: 'Frappé Chamss Coffee', desc: 'Notre signature, mousse épaisse', price: '38 MAD', featured: true },
    ],
  },
  hot: {
    label: 'Cafés chauds',
    items: [
      { name: 'Espresso', desc: 'Simple ou double', price: '15 MAD' },
      { name: 'Cappuccino', desc: 'Mousse de lait onctueuse', price: '22 MAD' },
      { name: 'Café Latte', desc: 'Espresso, lait vapeur', price: '24 MAD' },
      { name: 'Café Noisette', desc: 'Espresso, nuage de lait', price: '18 MAD' },
      { name: 'Thé à la menthe', desc: 'Menthe fraîche, servi tradition', price: '15 MAD' },
      { name: 'Chocolat chaud', desc: 'Chocolat noir fondu, lait entier', price: '26 MAD' },
    ],
  },
  pastries: {
    label: 'Pâtisserie',
    items: [
      { name: 'Croissant beurre', desc: 'Fait maison chaque matin', price: '12 MAD' },
      { name: 'Cookie double chocolat', desc: 'Cœur fondant', price: '15 MAD' },
      { name: 'Cheesecake', desc: 'Coulis de fruits rouges', price: '28 MAD' },
      { name: 'Muffin myrtille', desc: 'Myrtilles fraîches', price: '18 MAD' },
    ],
  },
  others: {
    label: 'À boire',
    items: [
      { name: "Jus d'orange frais", desc: 'Orange pressée à la demande', price: '22 MAD' },
      { name: 'Mojito', desc: 'Menthe, citron vert, sucre, eau pétillante', price: '30 MAD' },
    ],
  },
} as const

type MenuKey = keyof typeof MENU

// ============================================================
// MAIN PAGE
// ============================================================

export default function Home() {
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<MenuKey>('iced')

  // Scroll listener for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Apply dark mode class to <html>
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <div className="min-h-screen flex flex-col bg-cream text-coffee dark:bg-[#1A1108] dark:text-[#F8EFDE] transition-colors duration-500">
      <AnnouncementBar />
      <Navbar
        scrolled={scrolled}
        dark={dark}
        onToggleDark={() => setDark(v => !v)}
        onOpenMobile={() => setMobileOpen(true)}
      />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="flex-1">
        <Hero />
        <QuoteBand />
        <Story />
        <Timeline />
        <Signatures />
        <MenuSection activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <Commitment />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}

// ============================================================
// ANNOUNCEMENT BAR
// ============================================================

function AnnouncementBar() {
  const items = [
    'TORRÉFACTION MAISON',
    'PÂTISSERIES DU JOUR',
    'DEPUIS 2016',
    'FÈS · MAROC',
    'CAFÉ DE QUARTIER',
    'GRAINS VERTS TRAVAILLÉS SUR PLACE',
  ]
  const loop = [...items, ...items]
  return (
    <div className="bg-coffee text-cream dark:bg-[#24170F] dark:text-[#F8EFDE] overflow-hidden border-b border-line">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {loop.map((t, i) => (
          <span key={i} className="text-[11px] tracking-luxe font-sans font-medium mx-8 inline-flex items-center gap-3">
            <span className="opacity-60">✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// NAVBAR
// ============================================================

function Navbar({
  scrolled,
  dark,
  onToggleDark,
  onOpenMobile,
}: {
  scrolled: boolean
  dark: boolean
  onToggleDark: () => void
  onOpenMobile: () => void
}) {
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 dark:bg-[#1A1108]/95 backdrop-blur-md border-b border-line py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto max-w-[1280px] px-5 md:px-8 flex items-center justify-between">
        {/* Left: mobile burger + desktop links */}
        <div className="flex items-center gap-6 flex-1">
          <button
            onClick={onOpenMobile}
            className="md:hidden p-1.5 -ml-1.5"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:flex items-center gap-7 text-[12.5px] tracking-wide-luxe font-sans font-medium uppercase">
            {NAV_LINKS.slice(0, 2).map(l => (
              <a key={l.href} href={l.href} className="hover:text-rust dark:hover:text-[#D8A26A] transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Center: logo */}
        <a href="#top" className="flex flex-col items-center text-center group">
          <span className="font-display text-[22px] md:text-[28px] leading-none tracking-[0.18em] font-medium">
            CHAMSS
          </span>
          <span className="font-sans text-[8.5px] md:text-[9.5px] tracking-luxe mt-1 opacity-70">
            COFFEE · FÈS · 2016
          </span>
        </a>

        {/* Right: links + dark toggle */}
        <div className="flex items-center gap-5 flex-1 justify-end">
          <div className="hidden md:flex items-center gap-7 text-[12.5px] tracking-wide-luxe font-sans font-medium uppercase">
            {NAV_LINKS.slice(2).map(l => (
              <a key={l.href} href={l.href} className="hover:text-rust dark:hover:text-[#D8A26A] transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <button
            onClick={onToggleDark}
            aria-label="Basculer le thème"
            className="p-2 rounded-full border border-coffee/30 dark:border-[#F8EFDE]/30 hover:bg-coffee hover:text-cream dark:hover:bg-[#F8EFDE] dark:hover:text-[#1A1108] transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>
    </header>
  )
}

// ============================================================
// MOBILE MENU
// ============================================================

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div className="absolute inset-0 bg-coffee/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-cream dark:bg-[#24170F] p-6 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between mb-12">
          <span className="font-display text-xl tracking-[0.18em]">CHAMSS</span>
          <button onClick={onClose} aria-label="Fermer" className="p-1.5">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="font-display text-3xl py-3 border-b border-line/60 flex items-center justify-between group"
            >
              <span>{l.label}</span>
              <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:text-rust dark:group-hover:text-[#D8A26A] transition-all" />
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <p className="text-[11px] tracking-luxe font-sans uppercase opacity-60 mb-2">Suivez-nous</p>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 border border-line rounded-full"><Instagram className="w-4 h-4" /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 border border-line rounded-full"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// HERO
// ============================================================

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="relative z-10 order-2 lg:order-1">
            <p className="text-[12px] tracking-luxe font-sans uppercase text-rust dark:text-[#D8A26A] mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-rust dark:bg-[#D8A26A]" />
              Café de quartier · Fès, Maroc
            </p>
            <h1 className="font-display font-medium text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
              Brew the
              <br />
              <span className="italic font-light">moroccan</span>
              <br />
              sun.
            </h1>
            <p className="mt-8 max-w-md font-baskerville text-[17px] leading-relaxed text-coffee-soft dark:text-[#C9B39A]">
              Chamss Coffee, c'est un espresso torréfié maison, des cafés glacés qui durent, et des pâtisseries cuites chaque matin. Une adresse où l'on vient pour cinq minutes — ou pour y rester des heures.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#menu"
                className="group inline-flex items-center justify-center gap-3 bg-coffee dark:bg-[#F8EFDE] text-cream dark:text-[#1A1108] px-8 py-4 text-[12.5px] tracking-luxe font-sans uppercase font-medium hover:bg-rust dark:hover:bg-[#D8A26A] transition-colors"
              >
                Voir le menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 border border-coffee dark:border-[#F8EFDE] px-8 py-4 text-[12.5px] tracking-luxe font-sans uppercase font-medium hover:bg-coffee hover:text-cream dark:hover:bg-[#F8EFDE] dark:hover:text-[#1A1108] transition-colors"
              >
                Nous trouver
              </a>
            </div>
            {/* Tiny stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: '2016', v: 'Établi' },
                { k: '100%', v: 'Torréfié maison' },
                { k: '7j/7', v: '8h – 22h' },
              ].map(s => (
                <div key={s.v}>
                  <p className="font-display text-2xl md:text-3xl leading-none">{s.k}</p>
                  <p className="text-[10.5px] tracking-wide-luxe font-sans uppercase opacity-60 mt-2">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="/images/hero.jpg"
                alt="Terrasse du café Chamss Coffee à Fès au lever du jour"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee/30 via-transparent to-transparent" />
            </div>
            {/* Floating tag */}
            <div className="absolute -bottom-6 -left-6 md:-left-10 bg-cream dark:bg-[#24170F] p-5 max-w-[230px] shadow-xl border border-line">
              <p className="font-display italic text-base leading-snug">
                "Le soleil du matin arrive en premier sur toute la rue."
              </p>
              <p className="mt-3 text-[10.5px] tracking-wide-luxe font-sans uppercase opacity-60">
                L'origine du nom · Chamss
              </p>
            </div>
            {/* Sun ornament */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full border border-rust/30 dark:border-[#D8A26A]/30 flex items-center justify-center animate-slow-spin pointer-events-none">
              <span className="text-[9px] tracking-luxe font-sans uppercase text-rust dark:text-[#D8A26A]">
                ✦ Since 2016 ✦
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// QUOTE BAND
// ============================================================

function QuoteBand() {
  return (
    <section className="bg-coffee dark:bg-[#24170F] text-cream dark:text-[#F8EFDE] py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 text-center">
        <Sparkles className="w-5 h-5 mx-auto mb-6 opacity-60" />
        <p className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.25] tracking-[-0.01em] text-balance">
          Un café franc, bien torréfié, servi avec le sourire. C'est tout ce qu'on voulait offrir en 2016 — c'est toujours tout ce qu'on offre aujourd'hui.
        </p>
        <p className="mt-8 text-[11.5px] tracking-luxe font-sans uppercase opacity-60">
          Sanae · Fondatrice de Chamss Coffee
        </p>
      </div>
    </section>
  )
}

// ============================================================
// STORY
// ============================================================

function Story() {
  return (
    <section id="histoire" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image side */}
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/images/interior.jpg"
              alt="Intérieur du café Chamss Coffee à Fès"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 md:-right-8 bg-cream-2 dark:bg-[#2B1D12] p-6 max-w-[260px] border border-line">
            <p className="font-display text-5xl leading-none">2016</p>
            <p className="mt-2 text-[11px] tracking-wide-luxe font-sans uppercase opacity-70">Année de naissance</p>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="text-[12px] tracking-luxe font-sans uppercase text-rust dark:text-[#D8A26A] mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-rust dark:bg-[#D8A26A]" />
            Notre histoire
          </p>
          <h2 className="font-display font-medium text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] mb-8 text-balance">
            Un café qui ressemble à ce qu'on boit <span className="italic font-light">chez soi.</span>
          </h2>
          <div className="space-y-5 font-baskerville text-[16px] leading-[1.75] text-coffee-soft dark:text-[#C9B39A]">
            <p>
              Tout a commencé en 2016 dans une petite rue de Fès, quand Sanae a décidé d'ouvrir un café qui ressemble à ce qu'elle aimait boire chez elle : un café franc, bien torréfié, servi avec le sourire.
            </p>
            <p>
              Le nom <em className="not-italic font-baskerville italic">"Chamss Coffee"</em> vient de la terrasse orientée plein est, où le soleil du matin arrive en premier sur toute la rue. Depuis, l'équipe a grandi, mais l'idée n'a pas changé : travailler avec des grains verts qu'on torréfie sur place, cuire les pâtisseries maison chaque matin, et garder ce coin de table où les habitués retrouvent toujours les mêmes visages.
            </p>
            <p>
              Aujourd'hui, Chamss Coffee est devenu un point de rendez-vous pour étudiants, freelances et voisins — un café où l'on vient pour cinq minutes ou pour y rester des heures.
            </p>
          </div>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-3 text-[12px] tracking-luxe font-sans uppercase font-medium border-b border-coffee dark:border-[#F8EFDE] pb-1 hover:text-rust dark:hover:text-[#D8A26A] hover:border-rust dark:hover:border-[#D8A26A] transition-colors"
          >
            Visiter le café
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// TIMELINE
// ============================================================

function Timeline() {
  return (
    <section className="py-24 md:py-32 bg-cream-2/60 dark:bg-[#24170F]/40 border-y border-line">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[12px] tracking-luxe font-sans uppercase text-rust dark:text-[#D8A26A] mb-4">
            Une décennie en quatre dates
          </p>
          <h2 className="font-display font-medium text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-balance">
            Dix ans, <span className="italic font-light">toujours le même café.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line dark:bg-[#F8EFDE]/10 border border-line">
          {TIMELINE.map((t, i) => (
            <div
              key={t.year}
              className="bg-cream dark:bg-[#1A1108] p-8 md:p-10 flex flex-col group hover:bg-cream-2 dark:hover:bg-[#24170F] transition-colors"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-display text-[3.5rem] leading-none font-light">{t.year}</span>
                <span className="text-[10px] tracking-luxe font-sans uppercase opacity-40">0{i + 1}</span>
              </div>
              <h3 className="font-display text-xl mb-3 font-medium">{t.title}</h3>
              <p className="font-baskerville text-[14.5px] leading-[1.7] text-coffee-soft dark:text-[#C9B39A]">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// SIGNATURES
// ============================================================

function Signatures() {
  return (
    <section id="specialites" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[12px] tracking-luxe font-sans uppercase text-rust dark:text-[#D8A26A] mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-rust dark:bg-[#D8A26A]" />
              Nos signatures
            </p>
            <h2 className="font-display font-medium text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-balance">
              Trois tasses, <span className="italic font-light">un seul savoir-faire.</span>
            </h2>
          </div>
          <a
            href="#menu"
            className="inline-flex items-center gap-3 text-[12px] tracking-luxe font-sans uppercase font-medium border-b border-coffee dark:border-[#F8EFDE] pb-1 hover:text-rust dark:hover:text-[#D8A26A] hover:border-rust dark:hover:border-[#D8A26A] transition-colors w-fit"
          >
            Tout le menu
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {SIGNATURES.map((s) => (
            <article
              key={s.name}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-5">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-cream dark:bg-[#24170F] text-coffee dark:text-[#F8EFDE] px-3 py-1.5 text-[9.5px] tracking-luxe font-sans uppercase">
                  {s.tag}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="font-display text-2xl font-medium leading-tight">{s.name}</h3>
                <span className="font-display text-lg whitespace-nowrap">{s.price}</span>
              </div>
              <p className="font-baskerville text-[14.5px] leading-[1.65] text-coffee-soft dark:text-[#C9B39A]">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// MENU
// ============================================================

function MenuSection({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: MenuKey
  setActiveMenu: (k: MenuKey) => void
}) {
  const tabs = Object.entries(MENU).map(([k, v]) => ({ key: k as MenuKey, label: v.label }))
  const current = MENU[activeMenu]

  return (
    <section id="menu" className="py-24 md:py-32 bg-coffee dark:bg-[#24170F] text-cream dark:text-[#F8EFDE]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="text-center mb-14">
          <p className="text-[12px] tracking-luxe font-sans uppercase text-[#D8A26A] mb-4">
            Carte du café
          </p>
          <h2 className="font-display font-medium text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-balance">
            Nos spécialités, <span className="italic font-light">à Fès.</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveMenu(t.key)}
              className={`px-5 md:px-7 py-3 text-[11.5px] tracking-wide-luxe font-sans uppercase font-medium border transition-colors ${
                activeMenu === t.key
                  ? 'bg-cream text-coffee border-cream dark:bg-[#F8EFDE] dark:text-[#1A1108] dark:border-[#F8EFDE]'
                  : 'border-cream/30 dark:border-[#F8EFDE]/30 text-cream/80 dark:text-[#F8EFDE]/80 hover:border-cream dark:hover:border-[#F8EFDE]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-7">
          {current.items.map((item, i) => (
            <div
              key={item.name}
              className={`flex items-baseline gap-4 pb-6 border-b border-cream/15 dark:border-[#F8EFDE]/15 ${
                'featured' in item && item.featured ? 'md:col-span-2' : ''
              }`}
            >
              <span className="text-[10px] tracking-luxe font-sans uppercase opacity-40 mt-1.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="font-display text-xl md:text-2xl font-medium">
                    {item.name}
                    {'featured' in item && item.featured && (
                      <span className="ml-3 text-[9.5px] tracking-luxe font-sans uppercase text-[#D8A26A]">
                        Signature
                      </span>
                    )}
                  </h3>
                  <span className="font-display text-lg md:text-xl whitespace-nowrap">{item.price}</span>
                </div>
                <p className="font-baskerville text-[14.5px] italic text-cream/70 dark:text-[#F8EFDE]/70">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-[11px] tracking-wide-luxe font-sans uppercase opacity-50">
          Prix en dirhams marocains (MAD) · Carte non contractuelle
        </p>
      </div>
    </section>
  )
}

// ============================================================
// COMMITMENT
// ============================================================

function Commitment() {
  const pillars = [
    {
      icon: Coffee,
      title: 'Torréfaction maison',
      text: "Nos grains verts sont travaillés sur place, à Fès. Chaque tasse goûte le café qu'on a choisi de torréfier, pas un mélange standardisé.",
    },
    {
      icon: Sparkles,
      title: 'Pâtisseries du jour',
      text: "Croissants, cookies, cheesecakes : tout est cuit chaque matin, en petite quantité. Quand c'est fini, c'est fini — on recommence le lendemain.",
    },
    {
      icon: MapPin,
      title: 'Un café de quartier',
      text: "Étudiants, freelances, voisins : on garde ce coin de table où les habitués retrouvent toujours les mêmes visages. Pour cinq minutes ou pour des heures.",
    },
  ]
  return (
    <section id="engagement" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="text-center mb-16">
          <p className="text-[12px] tracking-luxe font-sans uppercase text-rust dark:text-[#D8A26A] mb-4">
            Notre engagement
          </p>
          <h2 className="font-display font-medium text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-balance max-w-3xl mx-auto">
            Trois promesses qu'on tient depuis <span className="italic font-light">2016.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-full border border-rust/30 dark:border-[#D8A26A]/30 flex items-center justify-center text-rust dark:text-[#D8A26A]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-[10px] tracking-luxe font-sans uppercase opacity-40 mb-3">0{i + 1}</p>
                <h3 className="font-display text-2xl font-medium mb-4">{p.title}</h3>
                <p className="font-baskerville text-[15px] leading-[1.7] text-coffee-soft dark:text-[#C9B39A] max-w-xs mx-auto">
                  {p.text}
                </p>
              </div>
            )
          })}
        </div>

        {/* Editorial split image */}
        <div className="mt-20 grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="aspect-[4/3] overflow-hidden">
            <img src="/images/roasting.jpg" alt="Torréfaction artisanale chez Chamss Coffee" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[4/3] overflow-hidden">
            <img src="/images/pastries.jpg" alt="Pâtisseries maison du jour chez Chamss Coffee" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// VISIT
// ============================================================

function Visit() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-cream-2/60 dark:bg-[#24170F]/40 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: info */}
          <div>
            <p className="text-[12px] tracking-luxe font-sans uppercase text-rust dark:text-[#D8A26A] mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-rust dark:bg-[#D8A26A]" />
              Venez nous voir
            </p>
            <h2 className="font-display font-medium text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] mb-10 text-balance">
              On vous attend, <span className="italic font-light">à Fès.</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div>
                <div className="flex items-center gap-2 text-rust dark:text-[#D8A26A] mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[11px] tracking-luxe font-sans uppercase">Adresse</span>
                </div>
                <p className="font-baskerville text-[15.5px] leading-relaxed">
                  12 Avenue Hassan II<br />
                  Ville Nouvelle, Fès<br />
                  Maroc
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-rust dark:text-[#D8A26A] mb-3">
                  <Phone className="w-4 h-4" />
                  <span className="text-[11px] tracking-luxe font-sans uppercase">Téléphone</span>
                </div>
                <p className="font-baskerville text-[15.5px] leading-relaxed">
                  <a href="tel:0600000000" className="hover:text-rust dark:hover:text-[#D8A26A] transition-colors">
                    06 00 00 00 00
                  </a>
                  <br />
                  <span className="text-[13px] opacity-70">Réservations & informations</span>
                </p>
              </div>
            </div>

            <div className="border-t border-line pt-8">
              <div className="flex items-center gap-2 text-rust dark:text-[#D8A26A] mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-[11px] tracking-luxe font-sans uppercase">Horaires d'ouverture</span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 max-w-md font-baskerville text-[15px]">
                <span>Lundi — Samedi</span>
                <span className="text-right">8h00 – 22h00</span>
                <span>Dimanche</span>
                <span className="text-right">9h00 – 21h00</span>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 flex items-center justify-center border border-line rounded-full hover:bg-coffee hover:text-cream dark:hover:bg-[#F8EFDE] dark:hover:text-[#1A1108] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 flex items-center justify-center border border-line rounded-full hover:bg-coffee hover:text-cream dark:hover:bg-[#F8EFDE] dark:hover:text-[#1A1108] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: map placeholder */}
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px] bg-coffee dark:bg-[#1A1108] overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-cream dark:text-[#F8EFDE] p-8 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#D8A26A] flex items-center justify-center mb-6 animate-pulse">
                <MapPin className="w-6 h-6 text-[#D8A26A]" />
              </div>
              <p className="font-display text-2xl mb-3">Chamss Coffee · Fès</p>
              <p className="font-baskerville text-[14px] italic opacity-70 max-w-xs mb-6">
                12 Avenue Hassan II, Ville Nouvelle — à deux pas du centre.
              </p>
              <a
                href="https://maps.google.com/?q=12+Avenue+Hassan+II+Fes+Maroc"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-cream/30 dark:border-[#F8EFDE]/30 px-5 py-2.5 text-[11px] tracking-luxe font-sans uppercase hover:bg-cream hover:text-coffee dark:hover:bg-[#F8EFDE] dark:hover:text-[#1A1108] transition-colors"
              >
                Ouvrir dans Google Maps
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            {/* Decorative grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
              <div className="h-full w-full" style={{
                backgroundImage: 'linear-gradient(#F8EFDE 1px, transparent 1px), linear-gradient(90deg, #F8EFDE 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// FOOTER
// ============================================================

function Footer() {
  return (
    <footer className="bg-coffee dark:bg-[#1A1108] text-cream dark:text-[#F8EFDE] mt-auto">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-display text-3xl tracking-[0.18em] mb-4">CHAMSS</p>
            <p className="text-[9.5px] tracking-luxe font-sans uppercase opacity-60 mb-6">
              Coffee · Fès · 2016
            </p>
            <p className="font-baskerville text-[14.5px] leading-[1.7] opacity-80 max-w-sm">
              Café de quartier à Fès. Espresso torréfié maison, cafés glacés, pâtisseries du jour. Une adresse conviviale, depuis 2016.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="text-[11px] tracking-luxe font-sans uppercase opacity-50 mb-5">Explorer</p>
            <ul className="space-y-3">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="font-baskerville text-[14.5px] hover:text-[#D8A26A] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="text-[11px] tracking-luxe font-sans uppercase opacity-50 mb-5">Contact</p>
            <address className="not-italic font-baskerville text-[14.5px] leading-[1.85] opacity-90">
              12 Avenue Hassan II<br />
              Ville Nouvelle, Fès, Maroc<br />
              <a href="tel:0600000000" className="hover:text-[#D8A26A] transition-colors">06 00 00 00 00</a>
            </address>
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center border border-cream/20 rounded-full hover:bg-cream hover:text-coffee transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center border border-cream/20 rounded-full hover:bg-cream hover:text-coffee transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-[11px] tracking-wide-luxe font-sans uppercase opacity-50">
            © {new Date().getFullYear()} Chamss Coffee — Fès, Maroc
          </p>
          <p className="text-[11px] tracking-wide-luxe font-sans uppercase opacity-50">
            Torréfié maison · Pâtisseries du jour
          </p>
        </div>
      </div>
    </footer>
  )
}
