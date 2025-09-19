"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Users, Award, Heart, Calendar, Target, TrendingUp, Shield, MapPin, Phone, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';

function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count}{suffix}</span>;
}

export default function AboutPage() {
  const { locale } = useParams() as { locale: string };
  const isRu = locale === 'ru';

  const tr = {
    numbersL: isRu ? 'Наши' : 'Cifrele',
    numbersR: isRu ? 'Цифры' : 'Noastre',
    stat1: isRu ? 'Активные участники' : 'Membri Activi',
    stat2: isRu ? 'Лет опыта' : 'Ani Experiență',
    stat3: isRu ? 'Профессиональные тренеры' : 'Antrenori Profesioniști',
    stat4: isRu ? 'Удовлетворенность клиентов' : 'Satisfacția Clienților',
    storyL: isRu ? 'Наша' : 'Povestea',
    storyR: isRu ? 'История' : 'Noastră',
    p1a: isRu ? 'Тренировки формируют наш ежедневный стиль' : 'Antrenamentele cultivă stilul nostru zilnic',
    p1b: isRu ? 'через дисциплину и здоровый образ жизни. Мы начали с простой идеи: создать пространство, где люди преодолевают свои пределы.' : 'prin disciplină și regimul de viață sănătos. Am început această călătorie cu o viziune simplă: să creăm un spațiu unde oamenii să-și depășească limitele.',
    p2a: isRu ? 'Тренировки в зале не только улучшают здоровье и настроение, но и' : 'Antrenamentele în sala de forță nu numai îmbunătățesc starea de sănătate și starea de spirit, dar și',
    p2b: isRu ? 'способствуют достижению множества личных целей!' : 'contribuie la atingerea multor obiective personale!',
    p3: isRu ? 'Плавание тренирует дыхательную и нервную систему, сердце, сосуды и мышцы, снижая эмоциональный стресс.' : 'Antrenamentul în piscină antrenează sistemul respirator și nervos, inima, vasele și mușchii, reducând stresul.',
    valuesL: isRu ? 'Наши' : 'Valorile',
    valuesR: isRu ? 'Ценности' : 'Noastre',
    v1t: isRu ? 'Стремление к совершенству' : 'Excelență', v1d: isRu ? 'Высочайшие стандарты во всем' : 'Urmărim standardele cele mai înalte',
    v2t: isRu ? 'Безопасность' : 'Siguranță', v2d: isRu ? 'Безопасная среда и современное оборудование' : 'Mediu sigur și echipamente moderne',
    v3t: isRu ? 'Сообщество' : 'Comunitate', v3d: isRu ? 'Единая семья мотивированных людей' : 'Construim o familie unită',
    v4t: isRu ? 'Прогресс' : 'Progres', v4d: isRu ? 'Помогаем достигать цели шаг за шагом' : 'Te sprijinim pas cu pas',
    joinL: isRu ? 'Присоединяйся' : 'Alătură-te', joinR: isRu ? 'к Нашей Семье' : 'Familiei Noastre',
    joinD: isRu ? 'Ощути разницу с преданной командой и мировым уровнем условий' : 'Descoperă diferența făcută de o echipă dedicată și facilități de clasă mondială',
    cta1: isRu ? 'Записаться сейчас!' : 'Înscrie-te Acum!', cta2: isRu ? 'Контакты' : 'Contacte',
    loc: isRu ? 'Локация' : 'Locația', tel: isRu ? 'Телефон' : 'Telefon', sch: isRu ? 'График' : 'Program',
    telD: isRu ? 'Звонки и WhatsApp' : 'Apeluri și WhatsApp', schD: isRu ? 'Гибкий график' : 'Program flexibil'
  } as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Numbers */}
      <section className="py-24 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-20" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <motion.h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
              {tr.numbersL}{" "}
              <motion.span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent" animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} style={{ backgroundSize: "200% 200%" }}>
                {tr.numbersR}
              </motion.span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: 5000, s: "+", l: tr.stat1, I: Users, c: "#00b4ff" },
              { n: 15, s: "", l: tr.stat2, I: Calendar, c: "#ffd700" },
              { n: 25, s: "+", l: tr.stat3, I: Award, c: "#00b4ff" },
              { n: 98, s: "%", l: tr.stat4, I: Heart, c: "#ffd700" }
            ].map((stat, i) => (
              <motion.div key={i} className="text-center p-8 bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-[#00b4ff]/30 shadow-2xl hover:shadow-[#00b4ff]/20 transition-all duration-500" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border" style={{ background: `linear-gradient(45deg, ${stat.c}20, ${stat.c}10)`, borderColor: `${stat.c}30` }}>
                  <stat.I className="w-10 h-10" style={{ color: stat.c }} />
                </div>
                <div className="text-5xl font-bold text-white mb-2"><AnimatedCounter end={stat.n} suffix={stat.s} /></div>
                <p className="text-gray-400 font-medium">{stat.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-8">
              {tr.storyL}{" "}
              <span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.storyR}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00b4ff] to-[#ffd700] mb-8 rounded-full" />
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              <span className="text-white font-semibold">{tr.p1a}</span> {tr.p1b}
            </p>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              {tr.p2a} <span className="text-[#00b4ff] font-semibold">{tr.p2b}</span>
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">{tr.p3}</p>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl">
              <img src="/images/optimized/gym3.webp" alt="Fitness Flacăra Interior" className="w-full h-[600px] object-cover shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6">
              {tr.valuesL}{" "}
              <span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.valuesR}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { I: Target, t: tr.v1t, d: tr.v1d, c: "#00b4ff" },
              { I: Shield, t: tr.v2t, d: tr.v2d, c: "#ffd700" },
              { I: Users, t: tr.v3t, d: tr.v3d, c: "#00b4ff" },
              { I: TrendingUp, t: tr.v4t, d: tr.v4d, c: "#ffd700" }
            ].map((v, i) => (
              <div key={i} className="text-center p-8 bg-gradient-to-br from-[#1a1a1a]/60 to-[#0a0a0a]/60 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border" style={{ background: `linear-gradient(45deg, ${v.c}20, ${v.c}10)`, borderColor: `${v.c}30` }}>
                  <v.I className="w-10 h-10" style={{ color: v.c }} />
                </div>
                <h3 className="text-2xl font-suisse font-bold text-white mb-4">{v.t}</h3>
                <p className="text-gray-400 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join/Contact */}
      <section className="py-24 bg-gradient-to-br from-[#00b4ff]/10 via-[#0a0a0a] to-[#ffd700]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6">
              {tr.joinL}{" "}
              <span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.joinR}</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">{tr.joinD}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black px-10 py-4 rounded-full text-lg font-semibold">{tr.cta1}</button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold">{tr.cta2}</button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-white">
            {[
              { I: MapPin, t: tr.loc, info: "Ion Creangă 49, Chișinău", d: isRu ? 'Бесплатная парковка доступна' : 'Parcare gratuită disponibilă' },
              { I: Phone, t: tr.tel, info: "+373 (78) 171700\n(022) 999 555", d: tr.telD },
              { I: Clock, t: tr.sch, info: "Luni-Vineri: 7:00-22:00\nSâmbătă: 8:00-21:00\nDuminică: 8:00-19:00", d: tr.schD }
            ].map((c, i) => (
              <div key={i} className="text-center p-8 bg-gradient-to-br from-[#1a1a1a]/60 to-[#0a0a0a]/60 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00b4ff]/20 to-[#ffd700]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <c.I className="w-8 h-8 text-[#00b4ff]" />
                </div>
                <h3 className="font-suisse font-semibold mb-3 text-[#00b4ff] text-xl">{c.t}</h3>
                <p className="text-gray-300 whitespace-pre-line mb-2">{c.info}</p>
                <p className="text-gray-500 text-sm">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


