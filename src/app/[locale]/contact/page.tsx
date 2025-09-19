"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Star, Users, Shield, Heart, MessageCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ContactPage() {
  const { locale } = useParams() as { locale: string };
  const isRu = locale === 'ru';
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', interest: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const tr = {
    connectL: isRu ? 'Свяжитесь с' : 'Conectează-te cu', connectR: isRu ? 'нами' : 'Noi',
    location: isRu ? 'Локация' : 'Locația', phone: isRu ? 'Телефон' : 'Telefon', email: isRu ? 'Электронная почта' : 'Email', schedule: isRu ? 'График' : 'Program',
    phoneDetail: isRu ? 'Звонки и WhatsApp' : 'Apeluri și WhatsApp', emailDetail: isRu ? 'Ответ в течение 24ч' : 'Răspunsuri în 24h', scheduleDetail: isRu ? 'Гибкий график' : 'Program flexibil',
    sendL: isRu ? 'Отправьте нам' : 'Trimite-ne un', sendR: isRu ? 'Сообщение' : 'Mesaj',
    lead: isRu ? 'Заполните форму, и мы свяжемся как можно скорее, чтобы обсудить ' : 'Completează formularul și te vom contacta în cel mai scurt timp pentru a discuta despre ',
    leadHi: isRu ? 'ваши цели в фитнесе' : 'obiectivele tale de fitness',
    fullName: isRu ? 'Полное имя *' : 'Nume Complet *', fullNamePh: isRu ? 'Введите ваше имя' : 'Introdu numele tău',
    phoneLabel: isRu ? 'Телефон *' : 'Telefon *', emailLabel: isRu ? 'Электронная почта' : 'Email',
    interested: isRu ? 'Интересуюсь' : 'Interesat de', select: isRu ? 'Выберите опцию' : 'Selectează o opțiune',
    optM: isRu ? 'Абонемент фитнес' : 'Abonament Fitness', optPT: isRu ? 'Персональные тренировки' : 'Antrenament Personal', optG: isRu ? 'Групповые занятия' : 'Clase de Grup', optSpa: isRu ? 'Бассейн & СПА' : 'Bazin & SPA', optCorp: isRu ? 'Корпоративный абонемент' : 'Abonament Corporativ', optOther: isRu ? 'Другое' : 'Altceva',
    yourMsg: isRu ? 'Ваше сообщение' : 'Mesajul tău', yourMsgPh: isRu ? 'Расскажите нам больше о ваших целях...' : 'Spune-ne mai multe despre obiectivele tale...',
    submit: isRu ? 'Отправить сообщение' : 'Trimite Mesajul',
    reqNote: isRu ? '* Обязательные поля. Данные обрабатываются согласно политике конфиденциальности.' : '* Câmpurile obligatorii. Datele tale sunt procesate conform politicii de confidențialitate.',
    whyL: isRu ? 'Почему' : 'De ce să', whyR: isRu ? 'выбирают нас?' : 'Ne Alegi?',
    b1t: isRu ? 'Бесплатная консультация для новых членов' : 'Consultare gratuită pentru noi membri', b1d: isRu ? 'Полная оценка и персональный план' : 'Evaluare completă și plan personalizat',
    b2t: isRu ? 'Пробная тренировка включена' : 'Antrenament de probă inclus', b2d: isRu ? 'Протестируйте возможности перед решением' : 'Testează facilitățile înainte să te decizi',
    b3t: isRu ? 'Без скрытых платежей' : 'Fără taxe ascunse', b3d: isRu ? 'Прозрачность во всех услугах' : 'Transparență completă în toate serviciile',
    b4t: isRu ? 'Поддержка 7/7' : 'Echipă de suport 7/7', b4d: isRu ? 'Проф. тренеры рядом' : 'Antrenori profesioniști aproape',
    b5t: isRu ? 'Мотивирующее сообщество' : 'Comunitate motivantă', b5d: isRu ? 'Более 5000 членов' : 'Peste 5000 membri',
    ctaL: isRu ? 'Готовы' : 'Gata să-ți', ctaR: isRu ? 'изменить свою жизнь?' : 'Transformi Viața?',
    ctaDesc: isRu ? 'Присоединяйся к тысячам довольных членов' : 'Alătură-te miilor de membri mulțumiți',
    cta1: isRu ? 'Записаться сейчас!' : 'Înscrie-te Acum!', cta2: isRu ? 'Посмотреть услуги' : 'Vezi Facilitățile',
  } as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="py-24 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-20" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <motion.h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              {tr.connectL}{' '}<span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.connectR}</span>
            </motion.h2>
            <motion.div className="w-24 h-1 bg-gradient-to-r from-[#00b4ff] to-[#ffd700] mx-auto mb-8 rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { I: MapPin, t: tr.location, info: 'Ion Creangă 49, Chișinău', d: isRu ? 'Бесплатная парковка доступна' : 'Parcare gratuită disponibilă', c: '#00b4ff' },
              { I: Phone, t: tr.phone, info: '+373 (78) 171700\n(022) 999 555', d: tr.phoneDetail, c: '#ffd700' },
              { I: Mail, t: tr.email, info: 'contact@fitnessflacara.md', d: tr.emailDetail, c: '#00b4ff' },
              { I: Clock, t: tr.schedule, info: 'L-V: 7:00-22:00\nS: 8:00-21:00\nD: 8:00-19:00', d: tr.scheduleDetail, c: '#ffd700' },
            ].map((b, i) => (
              <div key={i} className="text-center p-8 bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 rounded-2xl border border-white/10">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border" style={{ background: `linear-gradient(45deg, ${b.c}20, ${b.c}10)`, borderColor: `${b.c}30` }}>
                  <b.I className="w-10 h-10" style={{ color: b.c }} />
                </div>
                <h3 className="text-2xl font-suisse font-bold text-white mb-4">{b.t}</h3>
                <p className="text-gray-300 whitespace-pre-line mb-2 leading-relaxed">{b.info}</p>
                <p className="text-gray-500 text-sm">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-8">{tr.sendL}{' '}<span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.sendR}</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00b4ff] to-[#ffd700] mb-8 rounded-full" />
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{tr.lead}<span className="text-[#00b4ff] font-semibold">{tr.leadHi}</span></p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-suisse font-semibold text-gray-300 mb-2">{tr.fullName}</label>
                  <input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-[#1a1a1a]/60 border border-white/20 rounded-lg focus:border-[#00b4ff] text-white placeholder-gray-500" placeholder={tr.fullNamePh} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-suisse font-semibold text-gray-300 mb-2">{tr.phoneLabel}</label>
                  <input id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-[#1a1a1a]/60 border border-white/20 rounded-lg focus:border-[#00b4ff] textWhite placeholder-gray-500" placeholder="+373 xxx xxx xxx" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-suisse font-semibold text-gray-300 mb-2">{tr.emailLabel}</label>
                <input id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-[#1a1a1a]/60 border border-white/20 rounded-lg focus:border-[#00b4ff] text-white placeholder-gray-500" placeholder="adresa@email.com" />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-suisse font-semibold text-gray-300 mb-2">{tr.interested}</label>
                <select id="interest" name="interest" value={formData.interest} onChange={handleChange} className="w-full px-4 py-3 bg-[#1a1a1a]/60 border border-white/20 rounded-lg focus:border-[#00b4ff] text-white">
                  <option value="">{tr.select}</option>
                  <option value="membership">{tr.optM}</option>
                  <option value="personal-training">{tr.optPT}</option>
                  <option value="group-classes">{tr.optG}</option>
                  <option value="pool-spa">{tr.optSpa}</option>
                  <option value="corporate">{tr.optCorp}</option>
                  <option value="other">{tr.optOther}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-suisse font-semibold text-gray-300 mb-2">{tr.yourMsg}</label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-[#1a1a1a]/60 border border-white/20 rounded-lg focus:border-[#00b4ff] text-white placeholder-gray-500" placeholder={tr.yourMsgPh} />
              </div>
              <button type="submit" className="group relative w-full bg-gradient-to-r from-[#00b4ff] to-[#0080cc] text-white px-8 py-4 rounded-lg font-suisse font-semibold text-lg border border-[#00b4ff]/30 flex items-center justify-center">
                <Send className="w-5 h-5 mr-3" />{tr.submit}
              </button>
              <p className="text-sm text-gray-500">{tr.reqNote}</p>
            </form>
          </div>
          <div>
            <h3 className="text-4xl font-suisse font-bold text-white mb-8">{tr.whyL}{' '}<span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.whyR}</span></h3>
            <div className="space-y-6 mb-12">
              {[
                { I: CheckCircle, t: tr.b1t, d: tr.b1d, c: '#00b4ff' },
                { I: Star, t: tr.b2t, d: tr.b2d, c: '#ffd700' },
                { I: Shield, t: tr.b3t, d: tr.b3d, c: '#00b4ff' },
                { I: Users, t: tr.b4t, d: tr.b4d, c: '#ffd700' },
                { I: Heart, t: tr.b5t, d: tr.b5d, c: '#00b4ff' },
              ].map((b, i) => (
                <div key={i} className="flex items-start space-x-4 p-6 bg-gradient-to-br from-[#1a1a1a]/60 to-[#0a0a0a]/60 rounded-xl border border-white/10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(45deg, ${b.c}20, ${b.c}10)`, border: `1px solid ${b.c}30` }}>
                    <b.I className="w-6 h-6" style={{ color: b.c }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-suisse font-semibold text-white mb-2">{b.t}</h4>
                    <p className="text-gray-400">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <a href="tel:+37378171700" className="group flex items-center justify-center bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black px-8 py-4 rounded-lg font-suisse font-semibold">
                <Phone className="w-5 h-5 mr-3" />{isRu ? 'Позвонить сейчас — мгновенный ответ' : 'Sună Acum - Răspuns Imediat'}
              </a>
              <a href="https://wa.me/37378171700" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center bg-[#25d366] text-white px-8 py-4 rounded-lg font-suisse font-semibold">
                <MessageCircle className="w-5 h-5 mr-3" />{isRu ? 'WhatsApp — быстрые ответы' : 'WhatsApp - Răspunsuri Rapide'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#00b4ff]/10 via-[#0a0a0a] to-[#ffd700]/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6">{tr.ctaL}{' '}<span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">{tr.ctaR}</span></h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">{tr.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black px-10 py-4 rounded-full text-lg font-suisse font-semibold">{tr.cta1}</button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-suisse font-semibold">{tr.cta2}</button>
          </div>
        </div>
      </section>
    </div>
  );
}


