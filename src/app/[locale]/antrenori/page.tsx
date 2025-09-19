"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Users, Award, Calendar, Heart, CheckCircle, MessageCircle, Phone } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function TrainersPage() {
  const { locale } = useParams() as { locale: string };
  const isRu = locale === 'ru';
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const tr = {
    teamL: isRu ? 'Команда' : 'Echipa', teamR: isRu ? 'экспертов' : 'de Experți',
    heroTop: isRu ? 'Сертифицированные тренеры, которые проведут вас по' : 'Antrenori certificați internațional, dedicați să te ghideze în',
    heroBottom: isRu ? 'пути к успеху и полной трансформации' : 'călătoria ta către succes și transformare completă',
    scroll: isRu ? 'Команда' : 'Echipa',
    perfL: isRu ? 'Достижения' : 'Performanțe', perfR: isRu ? 'выдающиеся' : 'de Excepție',
    know: isRu ? 'Познакомьтесь' : 'Cunoaște', trainers: isRu ? 'Тренерами' : 'Antrenorii',
    teamIntro: isRu ? 'Каждый член нашей команды приносит уникальный опыт и страсть к фитнесу' : 'Fiecare membru al echipei noastre aduce experiență unică și pasiune pentru fitness',
    specialization: isRu ? 'Специализация' : 'Specializare',
    certs: isRu ? 'Сертификаты' : 'Certificări',
    langs: isRu ? 'Языки' : 'Limbi vorbite',
    program: isRu ? 'График:' : 'Program:',
    book: isRu ? 'Записаться на сессию с' : 'Programează Sesiune cu',
    membership: isRu ? 'Абонементы' : 'Abonamente', premium: isRu ? 'Премиум' : 'Premium',
    plansIntro: isRu ? 'Гибкие планы, которые подходят вашему образу жизни и целям' : 'Planuri flexibile concepute să se potrivească stilului tău de viață și obiectivelor de fitness',
    popular: isRu ? 'ПОПУЛЯРНЫЙ' : 'CEL MAI POPULAR',
    choosePlan: isRu ? 'Выбрать план' : 'Alege Planul',
    ctaL: isRu ? 'Начни тренировки с' : 'Începe Antrenamentul cu', ctaR: isRu ? 'Нашей Командой' : 'Echipa Noastră',
    ctaDesc: isRu ? 'Каждый тренер поможет вам достичь целей и превзойти себя' : 'Fiecare antrenor te ajută să-ți atingi obiectivele',
    ctaPrimary: isRu ? 'Записаться на бесплатную консультацию' : 'Programează Consultație Gratuită',
    ctaSecondary: isRu ? 'Посмотреть услуги' : 'Vezi Facilitățile',
  } as const;

  const trainers = [
    {
      id: 1,
      name: 'Alexandru Popescu',
      role: isRu ? 'Главный тренер & менеджер фитнеса' : 'Antrenor Principal & Manager Fitness',
      specialization: isRu ? 'Функциональный тренинг, Пауэрлифтинг, Реабилитация' : 'Antrenament funcțional, Powerlifting, Reabilitare sportivă',
      experience: isRu ? '12 лет опыта' : '12 ani experiență',
      certifications: ['ACSM Certified', 'NASM Personal Trainer', 'CrossFit Level 2'],
      image: '/images/optimized/person1.webp',
      description: isRu ? 'Специалист по функциональным тренировкам и спортивной реабилитации.' : 'Specialist în antrenamente funcționale și reabilitare sportivă.',
      languages: isRu ? ['Румынский', 'Английский', 'Русский'] : ['Română', 'Engleză', 'Rusă'],
      schedule: isRu ? 'Пн-Пт: 08:00-20:00' : 'Luni-Vineri: 08:00-20:00',
      color: '#00b4ff',
      quote: isRu ? 'Успех — это не только сила, но и упорство' : 'Succesul nu e doar forță, ci perseverență'
    },
    {
      id: 2,
      name: 'Maria Ionescu',
      role: isRu ? 'Инструктор групп & йоги' : 'Instructor Clase de Grup & Yoga',
      specialization: isRu ? 'Йога, Пилатес, Аэробика, Танцевальный фитнес' : 'Yoga, Pilates, Aerobic, Dans fitness',
      experience: isRu ? '8 лет опыта' : '8 ani experiență',
      certifications: ['Yoga Alliance RYT-500', 'Pilates Mat Certification', 'Zumba Instructor'],
      image: '/images/optimized/person3.webp',
      description: isRu ? 'Эксперт по йоге и пилатесу с холистическим подходом.' : 'Expertă în yoga și pilates cu o abordare holistică.',
      languages: isRu ? ['Румынский', 'Французский'] : ['Română', 'Franceză'],
      schedule: isRu ? 'Пн-Сб: 09:00-21:00' : 'Luni-Sâmbătă: 09:00-21:00',
      color: '#ffd700',
      quote: isRu ? 'Йога — это путь к внутреннему равновесию.' : 'Yoga e despre echilibrul interior.'
    },
    {
      id: 3,
      name: 'Dmitri Volkov',
      role: isRu ? 'Инструктор по плаванию & аква фитнесу' : 'Instructor Înot & Aqua Fitness',
      specialization: isRu ? 'Спортивное плавание, Аква-аэробика, Техника' : 'Înot competitiv, Aqua aerobic, Tehnici de înot',
      experience: isRu ? '10 лет опыта' : '10 ani experiență',
      certifications: ['Swimming Coach Level 3', 'Water Safety Instructor', 'Aqua Fitness Specialist'],
      image: '/images/optimized/person2.webp',
      description: isRu ? 'Бывший профессиональный пловец, специализация — техника и аква фитнес.' : 'Fost înotător profesionist, specializat în tehnici de înot și aqua fitness.',
      languages: isRu ? ['Румынский', 'Русский', 'Английский'] : ['Română', 'Rusă', 'Engleză'],
      schedule: isRu ? 'Вт-Вс: 10:00-22:00' : 'Marți-Duminică: 10:00-22:00',
      color: '#00b4ff',
      quote: isRu ? 'Вода — пространство свободы и восстановления.' : 'Apa e un spațiu de libertate și regenerare.'
    },
    {
      id: 4,
      name: 'Elena Sandu',
      role: isRu ? 'Персональный тренер & нутрициолог' : 'Antrenor Personal & Nutriționist',
      specialization: isRu ? 'Трансформация тела, Спортивное питание, Женский фитнес' : 'Transformare corporală, Nutriție sportivă, Antrenament femei',
      experience: isRu ? '6 лет опыта' : '6 ani experiență',
      certifications: ['ISSA Personal Trainer', 'Sports Nutrition Specialist', 'Pre/Post Natal Exercise'],
      image: '/images/optimized/person4.webp',
      description: isRu ? 'Комплексный подход к здоровому образу жизни и трансформации.' : 'Abordare completă pentru un stil de viață sănătos.',
      languages: isRu ? ['Румынский', 'Итальянский'] : ['Română', 'Italiană'],
      schedule: isRu ? 'Пн-Пт: 07:00-19:00' : 'Luni-Vineri: 07:00-19:00',
      color: '#ffd700',
      quote: isRu ? 'Истинная трансформация начинается изнутри.' : 'Transformarea adevărată începe din interior.'
    },
    {
      id: 5,
      name: 'Andrei Mihai',
      role: isRu ? 'Специалист по CrossFit & функциональному тренингу' : 'Specialist CrossFit & Antrenament Funcțional',
      specialization: isRu ? 'CrossFit, Стронгмен, Военный фитнес, HIIT' : 'CrossFit, Strongman, Antrenament militar, HIIT',
      experience: isRu ? '9 лет опыта' : '9 ani experiență',
      certifications: ['CrossFit Level 3 Trainer', 'Strongman Coach', 'Military Fitness Instructor'],
      image: '/images/optimized/person5.webp',
      description: isRu ? 'Высокоинтенсивные тренировки и CrossFit — безопасно и эффективно.' : 'Antrenamente HIIT și CrossFit în siguranță și eficient.',
      languages: isRu ? ['Румынский', 'Английский'] : ['Română', 'Engleză'],
      schedule: isRu ? 'Пн-Сб: 06:00-18:00' : 'Luni-Sâmbătă: 06:00-18:00',
      color: '#00b4ff',
      quote: isRu ? 'Пределы — только в голове.' : 'Nu există limite, doar bariere mentale.'
    },
    {
      id: 6,
      name: 'Svetlana Petrov',
      role: isRu ? 'Терапевт-массажист & SPA' : 'Maseur Terapeutic & Specialist SPA',
      specialization: isRu ? 'Терапевтический массаж, Спортивный массаж, Рефлексотерапия' : 'Masaj terapeutic, Masaj sportiv, Reflexoterapie',
      experience: isRu ? '15 лет опыта' : '15 ani experiență',
      certifications: ['Licensed Massage Therapist', 'Sports Massage Specialist', 'Aromatherapy Certification'],
      image: '/images/optimized/person6.webp',
      description: isRu ? 'Восстановление после тренировок и глубокая релаксация.' : 'Recuperare post-antrenament și relaxare profundă.',
      languages: isRu ? ['Румынский', 'Русский', 'Английский'] : ['Română', 'Rusă', 'Engleză'],
      schedule: isRu ? 'Вт-Вс: 11:00-20:00' : 'Marți-Duminică: 11:00-20:00',
      color: '#ffd700',
      quote: isRu ? 'Восстановление так же важно, как тренировка.' : 'Recuperarea e la fel de importantă ca antrenamentul.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <motion.section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <motion.div className="absolute inset-0 z-0" style={{ y: yBg }} />
        <motion.div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto" style={{ opacity }}>
          <motion.h1 className="text-6xl md:text-8xl font-suisse font-bold mb-8 leading-tight" initial={{ y: 50, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3 }}>
            <span className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">{tr.teamL}</span>{' '}
            <span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.teamR}</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            <span className="font-light">{tr.heroTop}</span>
            <br />
            <span className="text-[#00b4ff] font-semibold">{tr.heroBottom}</span>
          </motion.p>
        </motion.div>
      </motion.section>

      <section className="py-24 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6">
              {tr.perfL}{' '}<span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.perfR}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { number: 25, suffix: "+", label: isRu ? 'Сертифицированные тренеры' : 'Antrenori Certificați', icon: Users, color: "#00b4ff" },
              { number: 150, suffix: "+", label: isRu ? 'Международные сертификаты' : 'Certificări Internaționale', icon: Award, color: "#ffd700" },
              { number: 98, suffix: "%", label: isRu ? 'Удовлетворенность клиентов' : 'Satisfacția Clienților', icon: Heart, color: "#00b4ff" },
              { number: 8, suffix: "", label: isRu ? 'Средний опыт (лет)' : 'Ani Experiență Medie', icon: Calendar, color: "#ffd700" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border" style={{ background: `linear-gradient(45deg, ${stat.color}20, ${stat.color}10)`, borderColor: `${stat.color}30` }}>
                  <stat.icon className="w-10 h-10" style={{ color: stat.color }} />
                </div>
                <div className="text-5xl font-suisse font-bold text-white mb-2">{stat.number}{stat.suffix}</div>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6">
              {tr.know}{' '}<span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.trainers}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">{tr.teamIntro}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {trainers.map((t, index) => (
              <motion.div
                key={t.id}
                className="group bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden"
                initial={{ 
                  x: index % 2 === 0 ? -150 : 150,
                  y: Math.floor(index / 2) * 80,
                  opacity: 0,
                  scale: 0.85,
                  rotateY: index % 2 === 0 ? -15 : 15
                }}
                whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: (index % 2) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative h-96 overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black rounded-full text-sm font-suisse font-bold shadow-lg">{t.experience}</div>
                </div>
                <div className="p-6 pb-4">
                  <h3 className="text-3xl font-suisse font-bold mb-2 text-white">{t.name}</h3>
                  <p className="font-semibold text-lg mb-6" style={{ color: t.color }}>{t.role}</p>
                </div>
                <div className="px-6 pb-8">
                  <blockquote className="text-gray-300 italic text-lg mb-6 leading-relaxed border-l-4 pl-4" style={{ borderColor: t.color }}>
                    "{t.quote}"
                  </blockquote>
                  <div className="mb-6">
                    <h4 className="text-lg font-suisse font-bold text-white mb-2">{tr.specialization}</h4>
                    <p className="text-gray-400">{t.specialization}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="font-suisse font-semibold text-white mb-3">{tr.certs}</h5>
                      <ul className="space-y-2">
                        {t.certifications.map((c, idx) => (
                          <li key={idx} className="text-sm text-gray-400 flex items-center"><CheckCircle className="w-4 h-4 mr-2" style={{ color: t.color }} />{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-suisse font-semibold text-white mb-3">{tr.langs}</h5>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {t.languages.map((l, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm border border-white/20">{l}</span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-400">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        <span className="font-medium">{tr.program}</span> {t.schedule}
                      </div>
                    </div>
                  </div>
                  <button className="relative w-full bg-gradient-to-r from-[#00b4ff] to-[#0080cc] text-white px-6 py-4 rounded-lg font-suisse font-semibold border border-[#00b4ff]/30 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-3" />{tr.book} {t.name.split(' ')[0]}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#00b4ff]/10 via-[#0a0a0a] to-[#ffd700]/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6">
            {tr.ctaL}{' '}<span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.ctaR}</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">{tr.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black px-10 py-4 rounded-full text-lg font-suisse font-semibold"><Users className="w-5 h-5 mr-3 inline" />{tr.ctaPrimary}</button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-suisse font-semibold"><Phone className="w-5 h-5 mr-3 inline" />{tr.ctaSecondary}</button>
          </div>
        </div>
      </section>
    </div>
  );
}


