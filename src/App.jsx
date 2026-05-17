import React, { useRef, useState, useEffect } from 'react'
import { init, send } from '@emailjs/browser'

export default function App() {
  const formRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error' | null

  useEffect(() => {
    const pubKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (pubKey) init(pubKey)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formRef.current) return
    setSending(true)
    setStatus(null)

    const form = new FormData(formRef.current)
    const templateParams = {
      from_name: form.get('name'),
      from_email: form.get('email'),
      message: form.get('project')
    }

    try {
      const useServer = import.meta.env.VITE_USE_SERVER_EMAIL === 'true'
      if (useServer) {
        // POST to our server endpoint
        const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'
        const resp = await fetch(`${serverUrl}/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: templateParams.from_name, email: templateParams.from_email, project: templateParams.message })
        })
        if (!resp.ok) throw new Error('Server email send failed')
        setStatus('success')
        formRef.current.reset()
      } else {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        if (!serviceId || !templateId) throw new Error('EmailJS service/template not configured')

        await send(serviceId, templateId, templateParams, publicKey)
        setStatus('success')
        formRef.current.reset()
      }
    } catch (err) {
      console.error('Email send error', err)
      setStatus('error')
    } finally {
      setSending(false)
      setTimeout(() => setStatus(null), 5000)
    }
  }
  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-card border-x-0 border-t-0 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-nexusAccent rounded-lg flex items-center justify-center text-nexusDark font-bold">N</div>
          <span className="text-xl font-bold tracking-wider text-white">NEXUS</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a className="hover:text-nexusAccent transition-colors" href="#about">About</a>
          <a className="hover:text-nexusAccent transition-colors" href="#tech">Tech</a>
          <a className="hover:text-nexusAccent transition-colors" href="#portfolio">Projects</a>
          <a className="hover:text-nexusAccent transition-colors" href="#contact">Contact</a>
        </nav>
        <a className="px-6 py-2 bg-nexusAccent text-nexusDark font-semibold rounded-full hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all" href="#contact">Hire Me</a>
      </header>

      <main>
        <section id="about" className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-24 py-20 gap-12 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-nexusAccent/10 rounded-full blur-[100px] -z-10"></div>
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h2 className="text-nexusAccent font-medium tracking-[0.2em] uppercase">Digital Architect</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">I'm <span className="text-gradient">Nur Adnan</span>,<br />Problem Solver</h1>
            <div className="flex flex-wrap gap-4 pt-8 justify-center md:justify-start">
              <div className="glass-card p-4 rounded-2xl min-w-[140px] text-center">
                <span className="block text-2xl font-bold text-nexusAccent">120+</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Problems Solved</span>
              </div>
              <div className="glass-card p-4 rounded-2xl min-w-[140px] text-center">
                <span className="block text-2xl font-bold text-nexusAccent">3+ Years</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Experience</span>
              </div>
              <div className="glass-card p-4 rounded-2xl min-w-[140px] text-center">
                <span className="block text-2xl font-bold text-nexusAccent">150+</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Projects</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="hero-blob w-full h-full glow-accent">
                <img alt="Nur Adnan Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCghHqoH_MXcvq6FiphQzifkRvevntV5VRKf2hU8bw7eT24L5g08eedeK6MrfIRPIchx_e_HF--P2eblzIdrL02MFy3aO-AxEJhdC0OwQWkV9FiZ19GHaBdMzK3x76X1U7rju2buq-RjplP1BnQcykBj1PFFof-S8lvTL1oWluXLHhQPlfx9wbxKUw4dfYm0Jhc2hMUFqH-z5thAf_BvuVWQ9DDq0H7g5_akSelbcQhhUSvQvpb8YtG2RYccqioRvH6UNVuzMpPTVze" />
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-xl border-nexusAccent/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-medium">Available for Work</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tech" className="py-24 px-6 md:px-24 bg-black/20">
          <div className="text-center mb-16">
            <h3 className="text-nexusAccent uppercase tracking-widest text-sm mb-4">Tech Ecosystem</h3>
            <h2 className="text-4xl font-bold text-white">Tools &amp; Technologies</h2>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 mb-20 max-w-5xl mx-auto">
            {['JS','TS','RE','NX','ND','TW','FG','GT'].map((t, i) => (
              <div className="group flex flex-col items-center gap-2" key={i}>
                <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-nexusAccent/10">
                  <span className="text-nexusAccent font-bold">{t}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-500">{['JavaScript','TypeScript','React','Next.js','Node.js','Tailwind','Figma','Git'][i]}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-nexusAccent/5 rounded-full group-hover:scale-150 transition-transform"></div>
              <h4 className="text-xl font-bold text-white mb-6">Frontend Architect</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm"><span className="text-nexusAccent">✔</span> Responsive Web Design</li>
                <li className="flex items-center gap-3 text-sm"><span className="text-nexusAccent">✔</span> State Management (Redux/Zustand)</li>
                <li className="flex items-center gap-3 text-sm"><span className="text-nexusAccent">✔</span> Animation (Framer Motion)</li>
                <li className="flex items-center gap-3 text-sm"><span className="text-nexusAccent">✔</span> Performance Optimization</li>
              </ul>
            </div>
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-nexusAccent/5 rounded-full group-hover:scale-150 transition-transform"></div>
              <h4 className="text-xl font-bold text-white mb-6">Backend Engineer</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm"><span className="text-nexusAccent">✔</span> RESTful API Development</li>
                <li className="flex items-center gap-3 text-sm"><span className="text-nexusAccent">✔</span> Database Management (SQL/NoSQL)</li>
                <li className="flex items-center gap-3 text-sm"><span className="text-nexusAccent">✔</span> Authentication &amp; Security</li>
                <li className="flex items-center gap-3 text-sm"><span className="text-nexusAccent">✔</span> Server-side Logic</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-24">
          <div className="text-center mb-16">
            <h3 className="text-nexusAccent uppercase tracking-widest text-sm mb-4">Milestones</h3>
            <h2 className="text-4xl font-bold text-white">Qualification</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="space-y-8">
              <h4 className="text-2xl font-semibold text-white flex items-center gap-3">
                <svg className="w-6 h-6 text-nexusAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
                Education
              </h4>
              <div className="border-l border-nexusBorder pl-8 space-y-12">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-nexusAccent rounded-full border-4 border-nexusDark"></div>
                  <h5 className="text-lg font-bold text-white">Computer Science &amp; Engineering</h5>
                  <p className="text-nexusAccent text-sm font-medium mt-1">Leading University • 2020 - 2024</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-nexusAccent/40 rounded-full border-4 border-nexusDark"></div>
                  <h5 className="text-lg font-bold text-white">Higher Secondary Certificate</h5>
                  <p className="text-nexusAccent text-sm font-medium mt-1">Science College • 2018 - 2020</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-2xl font-semibold text-white flex items-center gap-3">
                <svg className="w-6 h-6 text-nexusAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Experience
              </h4>
              <div className="border-l border-nexusBorder pl-8 space-y-12">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-nexusAccent rounded-full border-4 border-nexusDark"></div>
                  <h5 className="text-lg font-bold text-white">Full Stack Developer</h5>
                  <p className="text-nexusAccent text-sm font-medium mt-1">Tech Solutions Inc • 2023 - Present</p>
                  <p className="text-xs text-gray-500 mt-2">Developing scalable web applications using MERN stack.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-nexusAccent/40 rounded-full border-4 border-nexusDark"></div>
                  <h5 className="text-lg font-bold text-white">Junior Web Developer</h5>
                  <p className="text-nexusAccent text-sm font-medium mt-1">Creative Agency • 2022 - 2023</p>
                  <p className="text-xs text-gray-500 mt-2">Specialized in responsive UI and interactive elements.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-24 px-6 md:px-24 bg-black/20">
          <div className="text-center mb-16">
            <h3 className="text-nexusAccent uppercase tracking-widest text-sm mb-4">Portfolio</h3>
            <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <article className="glass-card rounded-3xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img alt="GameHub Project" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN8czu5xWs9PTZVLf8ShZp6r_fHbcfMVH3jtYVsU6B1o6sD3WYYnNdoatsSuLYnFOQV_8Lh9uiH_kiIPqYYYxOMvZY_7z14d-2m38XTjXDENtciB7BjO_SxgK2VeMzwDrrw-Agc0KZIGSw4BJsi-c1HNMyUDJDBuz9egbY0nFDmeGWXVRCKTSBOK6QOM5i-1_TnjkeuGKnxqx4PPGGj1q7Q6uBy2bM28Ouj0H3jZTcCbKrImBcjaeHGG-OPI35BMbZMDkKRnlLNofK" />
                <div className="absolute inset-0 bg-nexusDark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-4 py-2 bg-nexusAccent text-nexusDark rounded-full text-xs font-bold">View Case Study</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-nexusAccent/10 text-nexusAccent rounded font-bold">REACT</span>
                  <span className="text-[10px] px-2 py-1 bg-nexusAccent/10 text-nexusAccent rounded font-bold">API</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">GameHub</h4>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">A comprehensive game discovery platform using RAWG API.</p>
                <div className="flex justify-between items-center">
                  <a className="text-nexusAccent text-sm font-bold hover:underline" href="#">Live Demo →</a>
                  <div className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-nexusAccent"></span>
                    <span className="w-2 h-2 rounded-full bg-nexusAccent/30"></span>
                    <span className="w-2 h-2 rounded-full bg-nexusAccent/30"></span>
                  </div>
                </div>
              </div>
            </article>
            <article className="glass-card rounded-3xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img alt="Google Docs 2.0" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzgtri1HUo2Onoc4Tz3wWOlel3h9lVX__dVznc8tPJ-t2zGDF43QrUr-m5hskixUpZUk7kXSQ7KBoZ25XV312nGw7pRUmLRp6_3UfRmwMAmsRralXY7ZDctRtBMWh37R2upEE_XQQ0a_YzY-7m_Hge51IMsx1PoVhtB4o6o073-_tfGuZAcBeyyRLk0N9ZKc1Oe7zgJheWWxcYw-iwmAj3YWm-am8fknN97YOpC20ixiPf7QvF8awRdK0EKd8BFX5EQoGa5DEwEwHC" />
                <div className="absolute inset-0 bg-nexusDark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-4 py-2 bg-nexusAccent text-nexusDark rounded-full text-xs font-bold">View Case Study</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-nexusAccent/10 text-nexusAccent rounded font-bold">NEXT.JS</span>
                  <span className="text-[10px] px-2 py-1 bg-nexusAccent/10 text-nexusAccent rounded font-bold">DRAFTS</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Google Docs 2.0</h4>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">Full-stack real-time document editor with Next.js &amp; Firebase.</p>
                <div className="flex justify-between items-center">
                  <a className="text-nexusAccent text-sm font-bold hover:underline" href="#">Live Demo →</a>
                  <div className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-nexusAccent"></span>
                    <span className="w-2 h-2 rounded-full bg-nexusAccent"></span>
                    <span className="w-2 h-2 rounded-full bg-nexusAccent/30"></span>
                  </div>
                </div>
              </div>
            </article>
            <article className="glass-card rounded-3xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img alt="Google Drive Clone" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO2fHFJyUcyOSkdahlyiapNJ3-CbfcmcLPHsa0LcAmSouoaBsP2nyCPBOB824zwpHEkjpwosacavFhmMBrce_l2CokHkiWhYQcfyckFfjyHQNVEwVjN4zs3U4kD7-ax1nv-ePrXpMZLmQPi7LQfsRsTfWCCdDRB4BiWNJcgaCKdTJwUh6DYih0iSvU1Ly7KVhgsJwcdwSjbLk-MoPtYaHxHtFqZzCW9BnNbvPXH96eFhGuQg5crLcuGp4_UOfxxPt_CbYLFUvQVnJo" />
                <div className="absolute inset-0 bg-nexusDark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-4 py-2 bg-nexusAccent text-nexusDark rounded-full text-xs font-bold">View Case Study</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-nexusAccent/10 text-nexusAccent rounded font-bold">NODE</span>
                  <span className="text-[10px] px-2 py-1 bg-nexusAccent/10 text-nexusAccent rounded font-bold">AWS</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Google Drive Clone</h4>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">Cloud storage application with secure file upload system.</p>
                <div className="flex justify-between items-center">
                  <a className="text-nexusAccent text-sm font-bold hover:underline" href="#">Live Demo →</a>
                  <div className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-nexusAccent"></span>
                    <span className="w-2 h-2 rounded-full bg-nexusAccent"></span>
                    <span className="w-2 h-2 rounded-full bg-nexusAccent"></span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="py-24 px-6 md:px-24">
          <div className="text-center mb-16">
            <h3 className="text-nexusAccent uppercase tracking-widest text-sm mb-4">Get In Touch</h3>
            <h2 className="text-4xl font-bold text-white">Contact Me</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-white mb-4">Talk to me</h4>
              <div className="glass-card p-6 rounded-2xl flex items-center gap-6">
                <div className="w-12 h-12 bg-nexusAccent/10 rounded-xl flex items-center justify-center text-nexusAccent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 font-bold">Email</p>
                  <p className="text-white font-medium">devrase@gmail.com</p>
                  <a className="text-nexusAccent text-xs hover:underline mt-1 inline-block" href="mailto:devrase@gmail.com">Write me →</a>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl flex items-center gap-6">
                <div className="w-12 h-12 bg-nexusAccent/10 rounded-xl flex items-center justify-center text-nexusAccent">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 font-bold">LinkedIn</p>
                  <p className="text-white font-medium">MD-Rasel-profile</p>
                  <a className="text-nexusAccent text-xs hover:underline mt-1 inline-block" href="https://www.linkedin.com/in/mohammadraselwp/" target="_blank" rel="noopener noreferrer">Connect →</a>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl flex items-center gap-6">
                <div className="w-12 h-12 bg-nexusAccent/10 rounded-xl flex items-center justify-center text-nexusAccent">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 font-bold">GitHub</p>
                  <p className="text-white font-medium">adnan-git-repos</p>
                  <a className="text-nexusAccent text-xs hover:underline mt-1 inline-block" href="#">View Code →</a>
                </div>
              </div>
            </div>

              <div className="glass-card p-10 rounded-[40px]">
              <h4 className="text-2xl font-bold text-white mb-8">Write me your project</h4>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Name</label>
                  <input name="name" required className="w-full bg-nexusDark border border-nexusBorder rounded-2xl px-6 py-4 focus:border-nexusAccent focus:ring-0 text-white placeholder-gray-600 transition-colors" placeholder="Insert your name" type="text" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Mail</label>
                  <input name="email" required className="w-full bg-nexusDark border border-nexusBorder rounded-2xl px-6 py-4 focus:border-nexusAccent focus:ring-0 text-white placeholder-gray-600 transition-colors" placeholder="Insert your email" type="email" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Project</label>
                  <textarea name="project" required className="w-full bg-nexusDark border border-nexusBorder rounded-2xl px-6 py-4 focus:border-nexusAccent focus:ring-0 text-white placeholder-gray-600 transition-colors" placeholder="Write your project details" rows="4"></textarea>
                </div>
                <button disabled={sending} className="w-full py-4 bg-nexusAccent text-nexusDark font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-3 group" type="submit">
                  {sending ? 'Sending...' : 'Send Message'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
                {status === 'success' && <p className="text-sm text-green-400 mt-2">Message sent — I will reply soon.</p>}
                {status === 'error' && <p className="text-sm text-red-400 mt-2">Failed to send. Please try again later.</p>}
              </form>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-nexusBorder px-6 md:px-24">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-nexusAccent rounded-md flex items-center justify-center text-nexusDark text-xs font-bold">N</div>
              <span className="text-lg font-bold text-white tracking-widest">NEXUS</span>
            </div>
            <p className="text-sm text-gray-500">© 2024 Nur Adnan. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="text-gray-400 hover:text-nexusAccent transition-colors" href="#">Facebook</a>
              <a className="text-gray-400 hover:text-nexusAccent transition-colors" href="#">Instagram</a>
              <a className="text-gray-400 hover:text-nexusAccent transition-colors" href="#">Twitter</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
