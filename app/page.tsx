'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MapPin, Clock, Music, Heart, Mic, Camera, Gift, ChevronDown, Check, X, Navigation, Sparkles, Play, Calendar, Utensils, Baby, Volume2, VolumeX } from 'lucide-react';

// --- CONFIGURATION DU MARIAGE ---
const DATA = {
  couple: "Sophie & Thomas",
  date: "14 Août 2026",
  place: "Château de Chillon, Suisse",
  story: "Tout a commencé par un café renversé à la gare de Lausanne un matin d'hiver. Cinq ans, trois déménagements et mille éclats de rire plus tard, Thomas a posé un genou à terre au sommet des Diablerets.",
  musicUrl: "https://drive.google.com/file/d/1P9jmmVoROTieZFyu_CqmjhrnuN8huQ2p/view?usp=sharing", // Exemple de musique libre
  images: {
    hero: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop", 
    story: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop", 
    party: "https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=1920&auto=format&fit=crop", 
    
    // Galerie Mixte (Photos + Vocaux)
    galleryItems: [
      { type: 'photo', src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&h=600&fit=crop" },
      { type: 'audio', author: "Mamie Rose", duration: "0:42" },
      { type: 'photo', src: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=400&h=400&fit=crop" },
      { type: 'photo', src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=400&h=400&fit=crop" },
      { type: 'audio', author: "Les Cousins", duration: "1:15" },
      { type: 'photo', src: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=400&h=600&fit=crop" }
    ]
  }
};

export default function WeddingPage() {
  // --- GESTION MOT DE PASSE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const SECRET_PASS = "AMOUR2026"; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput.toUpperCase() === SECRET_PASS) {
      setIsAuthenticated(true);
    } else {
      setErrorMsg("Ce n'est pas le bon mot de passe.");
    }
  };

  // --- ÉTATS DU SITE ---
  const [isRsvpOpen, setRsvpOpen] = useState(false);
  const containerRef = useRef(null);

  // Effet Confetti au chargement (une fois authentifié)
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 }, colors: ['#fbbf24', '#ffffff'] });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // SI PAS CONNECTÉ -> ÉCRAN LOGIN
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full">
          <p className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-6 animate-pulse">Espace Privé</p>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-8">{DATA.couple}</h1>
          <p className="mt-12 text-slate-2000 text-xs">Indice : Mot de passe démo: AMOUR2026</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-center text-white focus:border-amber-500 outline-none transition-colors tracking-widest placeholder:text-slate-600"
              placeholder="Mot de passe invité"
            />
            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
            <button className="w-full bg-amber-500 text-black font-bold py-4 rounded-full hover:bg-amber-400 transition-colors uppercase tracking-widest text-xs">
              Entrer
            </button>
          </form>
          <p className="mt-12 text-slate-600 text-xs">Indice : Regardez sur votre invitation</p>
        </div>
      </div>
    );
  }

  // SI CONNECTÉ -> LE SITE
  return (
    <div ref={containerRef} className="bg-slate-950 text-slate-200 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden relative">
      
      {/* Ajout des particules scintillantes globales */}
      <SparklesOverlay />
      
      {/* Lecteur Audio Flottant */}
      <MusicPlayer />

      <Hero />
      
      {/* COMPTE A REBOURS ICI */}
      <Countdown />
      
      <SectionSeparator />

      {/* --- NOTRE HISTOIRE --- */}
      <section className="py-32 bg-white text-slate-900 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
               <div className="absolute top-4 -left-4 w-full h-full border-2 border-amber-500 z-0" />
               <motion.img 
                 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                 src={DATA.images.story} 
                 className="relative z-10 w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                 alt="Notre Histoire"
               />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
               <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4 block">L'Origine</span>
               <h2 className="text-4xl md:text-5xl font-serif mb-8">Comment tout a commencé</h2>
               <p className="text-lg leading-loose text-slate-600 font-serif italic mb-8">"{DATA.story}"</p>
               <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                 <div className="h-px w-20 bg-amber-500" />
                 <Heart className="w-6 h-6 text-amber-500 fill-amber-500" />
                 <div className="h-px w-20 bg-amber-500" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LE PROGRAMME --- */}
      <section className="py-24 bg-slate-900 relative border-t border-slate-800 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse pointer-events-none" />
         
         <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <SectionTitle subtitle="Déroulement" title="Le Programme" light={true} />
            <div className="mt-16 space-y-12">
               <TimelineItem time="14:00" title="Cérémonie Laïque" desc="Échange des vœux dans les jardins." icon={<Heart />} delay={0} />
               <TimelineItem time="16:30" title="Vin d'Honneur" desc="Cocktails, musique live & coucher de soleil." icon={<Music />} delay={0.2} />
               <TimelineItem time="19:00" title="Dîner de Gala" desc="Repas gastronomique & discours." icon={<Utensils />} delay={0.4} />
               <TimelineItem time="23:00" title="Soirée Dansante" desc="Ouverture de bal & fête jusqu'à l'aube." icon={<Sparkles />} delay={0.6} />
            </div>
         </div>
      </section>

      {/* --- IMAGE PARALLAX --- */}
      <ParallaxSection image={DATA.images.party} text="Une nuit inoubliable" />

      {/* --- GALERIE MIXTE --- */}
      <section className="py-32 bg-slate-950 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionTitle subtitle="Participation" title="Live Gallery & Livre d'Or" light={true} />
          
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            <ActionCard icon={<Mic className="w-8 h-8" />} title="Laissez un Vocal" desc="Un mot doux, une anecdote ou une chanson." label="Enregistrer" />
            <ActionCard icon={<Camera className="w-8 h-8" />} title="Partagez vos Photos" desc="Envoyez vos selfies et vidéos de la soirée." label="Uploader" />
          </div>

          <div className="columns-2 md:columns-4 gap-4 space-y-4">
            {DATA.images.galleryItems.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                className="break-inside-avoid rounded-lg overflow-hidden group relative mb-4"
              >
                {item.type === 'photo' ? (
                  <>
                    <img src={item.src} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Heart className="text-white fill-white" />
                    </div>
                  </>
                ) : (
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-amber-500 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black">
                        <Play size={12} fill="currentColor" />
                      </div>
                      <Volume2 size={16} className="text-slate-500" />
                    </div>
                    <div className="h-6 flex items-center gap-0.5 mb-2">
                         {[...Array(15)].map((_,j) => (
                           <div key={j} className="w-1 bg-amber-500/50" style={{height: Math.random() * 100 + '%'}} />
                         ))}
                    </div>
                    <p className="text-xs font-bold text-white">{item.author}</p>
                    <p className="text-[10px] text-slate-400">{item.duration}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INFO LIEU --- */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-center">
         <MapPin className="w-10 h-10 text-amber-500 mx-auto mb-6" />
         <h2 className="text-3xl font-serif text-white mb-2">{DATA.place}</h2>
         <p className="text-slate-400 mb-8">Route du Lac 12, 1820 Veytaux, Suisse</p>
         
         {/* BOUTON GPS FONCTIONNEL */}
         <button 
           onClick={() => window.open("https://www.google.com/maps/dir/?api=1&destination=Château+de+Chillon,Veytaux,Suisse", "_blank")}
           className="px-8 py-3 bg-white border border-slate-300 rounded-full hover:border-amber-500 hover:text-amber-500 transition-colors flex items-center gap-2 mx-auto uppercase text-xs font-bold tracking-widest shadow-sm text-black"
         >
           <Navigation size={14} /> Lancer le GPS
         </button>
      </section>

      {/* --- RSVP STICKY BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 flex justify-center pointer-events-none">
        <motion.button 
          initial={{ y: 100 }} animate={{ y: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setRsvpOpen(true)}
          className="pointer-events-auto bg-amber-500 text-black px-10 py-4 rounded-full shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center gap-3 font-bold uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors"
        >
          <Check className="w-5 h-5" /> Confirmer ma présence
        </motion.button>
      </div>

      <footer className="bg-black py-24 text-center border-t border-white/10 pb-32">
        <h1 className="font-serif text-4xl text-white mb-4">{DATA.couple}</h1>
        <p className="text-slate-600 text-xs uppercase tracking-widest">Design par NeoCard</p>
      </footer>

      <AnimatePresence>
        {isRsvpOpen && <RsvpOverlay onClose={() => setRsvpOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

// Nouveau: Lecteur Musique
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} loop src={DATA.musicUrl} />
      <button 
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-500 hover:bg-white/20 hover:scale-110 transition-all shadow-lg"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}

// Nouveau: Particules Scintillantes
function SparklesOverlay() {
  const particles = Array.from({ length: 25 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-amber-200 rounded-full opacity-0"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 500]);

  // Plus de confetti spécifiques au Hero
  useEffect(() => {
    const end = Date.now() + 1500; // Durée du tir
    const colors = ['#fbbf24', '#ffffff', '#f59e0b'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-70">
        <img src={DATA.images.hero} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </motion.div>
      <div className="relative z-20 text-center px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }}>
           <div className="inline-block border border-amber-500/50 px-4 py-1 rounded-full mb-6 bg-black/30 backdrop-blur-md">
             <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-bold">{DATA.date}</span>
           </div>
           <h1 className="text-6xl md:text-9xl font-serif font-thin text-white mb-6 tracking-tight">
             Sophie <span className="text-amber-500 italic font-serif">&</span> Thomas
           </h1>
           <p className="text-slate-300 font-serif italic text-xl">Rejoignez-nous pour le grand jour</p>
        </motion.div>
      </div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-12 text-white/50 z-20"><ChevronDown /></motion.div>
    </div>
  );
}

function SectionSeparator() {
  return (
    <div className="py-12 bg-slate-900 flex justify-center items-center overflow-hidden">
      <div className="h-px bg-white/10 w-full max-w-xs" />
      <div className="mx-4 text-amber-500 text-2xl font-serif italic">Notre Histoire</div>
      <div className="h-px bg-white/10 w-full max-w-xs" />
    </div>
  );
}

function SectionTitle({ subtitle, title, light = false }) {
  return (
    <div className="text-center mb-16">
      <span className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-2 block">{subtitle}</span>
      <h2 className={`text-4xl md:text-6xl font-serif ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    </div>
  );
}

function TimelineItem({ time, title, desc, icon, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay }}
      className="flex items-center gap-8 group"
    >
       <div className="w-16 h-16 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:border-amber-500 transition-all duration-500 flex-shrink-0 relative z-10">
         {icon}
       </div>
       <div>
          <span className="text-amber-500 font-mono text-lg block mb-1">{time}</span>
          <h4 className="text-2xl font-serif text-white mb-1">{title}</h4>
          <p className="text-slate-400 text-sm">{desc}</p>
       </div>
    </motion.div>
  );
}

function ParallaxSection({ image, text }) {
  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
       <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${image})` }}>
         <div className="absolute inset-0 bg-black/50" />
       </div>
       <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-20">
         <h3 className="text-5xl md:text-8xl font-serif text-white italic text-center drop-shadow-2xl opacity-90">"{text}"</h3>
       </motion.div>
    </div>
  );
}

function ActionCard({ icon, title, desc, label }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-xl text-center hover:bg-white/10 transition-colors group cursor-pointer">
      <div className="w-14 h-14 mx-auto mb-6 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-6 text-sm">{desc}</p>
      <span className="text-amber-500 text-xs font-bold uppercase tracking-widest border-b border-amber-500/30 pb-1 group-hover:border-amber-500 transition-colors">{label}</span>
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDate = new Date("2026-08-14T14:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-12 bg-slate-900 border-y border-amber-500/20">
      <div className="flex flex-wrap justify-center gap-4 md:gap-12 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-xl border border-amber-500/30 flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl md:text-4xl font-serif text-white font-bold tabular-nums">
                {value < 10 ? `0${value}` : value}
              </span>
            </div>
            <span className="text-amber-500 text-xs uppercase tracking-widest mt-3 font-bold">
              {unit === 'days' ? 'Jours' : unit === 'hours' ? 'Heures' : unit === 'minutes' ? 'Min' : 'Sec'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RsvpOverlay({ onClose }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  // États pour la confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Fermeture automatique après 2.5 secondes
      setTimeout(() => {
        onClose();
      }, 2500);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl relative min-h-[400px] flex flex-col">
        {/* EN TETE */}
        <div className="bg-[#1a1a1a] p-8 flex justify-between items-center text-white sticky top-0 z-10 border-b border-amber-500/30">
          <div>
            <h3 className="font-serif text-2xl text-amber-500">Confirmation de Présence</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Merci de répondre avant le 1er Juin</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
        </div>

        {/* CONTENU MODAL AVEC ETAT SUCCES */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-2">Réponse enregistrée !</h3>
              <p className="text-slate-500">Nous avons hâte de vous voir.</p>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="p-8 space-y-10 max-h-[80vh] overflow-y-auto bg-slate-50"
            >
              <section className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 border-b border-amber-200 pb-2">1. Vos Coordonnées</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Prénom</label>
                    <input type="text" className="w-full border border-slate-200 rounded-lg p-3 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="Jean" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Nom</label>
                    <input type="text" className="w-full border border-slate-200 rounded-lg p-3 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="Dupont" />
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                   <input type="email" className="w-full border border-slate-200 rounded-lg p-3 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="jean.dupont@email.com" />
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 border-b border-amber-200 pb-2">2. Nombre d'invités</h4>
                <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                   <div>
                     <span className="block font-bold text-slate-800 text-lg">Adultes</span>
                     <span className="text-xs text-slate-400">Au dessus de 12 ans</span>
                   </div>
                   <div className="flex items-center gap-4 bg-slate-100 rounded-full p-1">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full bg-white border shadow-sm text-slate-600 hover:text-amber-600 font-bold transition-colors">-</button>
                      <span className="font-serif text-xl w-8 text-center text-slate-900 font-bold">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full bg-slate-900 text-amber-500 shadow-sm hover:bg-black font-bold transition-colors">+</button>
                   </div>
                </div>
                <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Baby size={20} /></div>
                     <div>
                       <span className="block font-bold text-slate-800 text-lg">Enfants</span>
                       <span className="text-xs text-slate-400">Moins de 12 ans</span>
                     </div>
                   </div>
                   <div className="flex items-center gap-4 bg-slate-100 rounded-full p-1">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-full bg-white border shadow-sm text-slate-600 hover:text-amber-600 font-bold transition-colors">-</button>
                      <span className="font-serif text-xl w-8 text-center text-slate-900 font-bold">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-full bg-slate-900 text-amber-500 shadow-sm hover:bg-black font-bold transition-colors">+</button>
                   </div>
                </div>
                <AnimatePresence>
                  {children > 0 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                       <input type="text" className="w-full border border-amber-300 bg-amber-50 rounded-lg p-4 text-sm focus:outline-none text-slate-900" placeholder="Prénoms et âges des enfants..." />
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              <section className="space-y-4">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 border-b border-amber-200 pb-2">3. Participation</h4>
                 <div className="space-y-3">
                    {["Cérémonie & Vin d'Honneur (14h)", "Dîner de Gala (19h)", "Brunch du lendemain (11h)"].map((event, i) => (
                      <label key={i} className="flex items-center gap-4 p-4 border border-slate-200 bg-white rounded-xl cursor-pointer hover:border-amber-400 transition-all shadow-sm">
                         <div className="relative flex items-center">
                           <input type="checkbox" defaultChecked className="peer w-6 h-6 border-2 border-slate-300 rounded-md checked:bg-amber-500 checked:border-amber-500 appearance-none transition-all cursor-pointer" />
                           <Check className="absolute text-white w-4 h-4 pointer-events-none opacity-0 peer-checked:opacity-100 left-1 top-1" />
                         </div>
                         <span className="text-sm font-bold text-slate-700">{event}</span>
                      </label>
                    ))}
                 </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 border-b border-amber-200 pb-2">4. Préférences</h4>
                <textarea className="w-full border border-slate-200 rounded-lg p-4 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none h-24 text-sm text-slate-900" placeholder="Allergies alimentaires, régime spécial..." />
              </section>

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white font-bold py-5 rounded-xl hover:bg-black transition-all shadow-lg uppercase tracking-widest text-sm border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 disabled:opacity-50"
              >
                {isSubmitting ? "Envoi en cours..." : "Valider ma réponse"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}