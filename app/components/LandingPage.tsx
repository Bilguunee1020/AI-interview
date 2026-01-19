"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

export default function LandingPage() {
  const { openSignIn } = useClerk();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Remove class when out of view to trigger animation again next time
          entry.target.classList.remove('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <div className="bg-[#030304] text-slate-400 antialiased overflow-x-hidden">
        {/* Background (component) added by Aura */}
        <div className="aura-background-component fixed top-0 w-full h-screen -z-10" data-alpha-mask="80" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)' }}>
          <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
            <div data-us-project="ILgOO23w4wEyPQOKyLO4" className="absolute w-full h-full left-0 top-0 -z-10"></div>
            <script type="text/javascript">
              {`!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();`}
            </script>
          </div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#030304]/80 backdrop-blur-md transition-all duration-300 reveal active">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-semibold tracking-tighter">I</div>
              <span className="text-white font-medium tracking-tight text-sm group-hover:opacity-80 transition-opacity">INTERVUE</span>
            </a>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#features" className="hover:text-white transition-colors">Coaching</a>
              <a href="#demo" className="hover:text-white transition-colors">Simulation</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="hidden sm:block text-xs font-medium hover:text-white transition-colors">Sign in</a>
              <button onClick={() => openSignIn()} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-full border border-white/10 transition-all duration-300 backdrop-blur-sm">
                Start Practice
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-radial-gradient(circle_at_center,_var(--tw-gradient-stops)) from-indigo-900/15 via-transparent to-transparent opacity-60"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[11px] font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Real-time speech analysis active
              </div>

              <h1 className="reveal delay-100 text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                Ace Your Next <br className="hidden md:block" /> Interview with AI.
              </h1>

              <p className="reveal delay-200 text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
                Practice with realistic AI avatars, get instant feedback on your answers, body language, and tone. Land the job you deserve.
              </p>

              <div className="reveal delay-300 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                  <span role="img" aria-label="play">▶️</span>
                  View Sample Report
                </button>
              </div>
            </div>

            {/* Abstract 3D Interview Mockup */}
            <div className="mt-20 relative perspective-[2000px] group reveal delay-300">
              <div className="relative w-full max-w-5xl mx-auto glass-panel rounded-xl p-1 shadow-2xl transition-transform duration-700 ease-out transform rotate-x-12 group-hover:rotate-x-0 overflow-hidden border-t border-white/10">
                <div className="bg-[#0A0A0C] rounded-lg overflow-hidden border border-white/5 h-[450px] md:h-[650px] flex">
                  {/* Sidebar */}
                  <div className="w-16 md:w-64 border-r border-white/5 flex flex-col p-4 bg-[#050507]">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white border border-white/10">
                        <span role="img" aria-label="user">👤</span>
                      </div>
                      <div className="hidden md:block">
                        <div className="text-xs text-white font-medium">John Doe</div>
                        <div className="text-[10px] text-slate-500">Product Manager</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 w-full bg-white/5 rounded flex items-center px-3 border border-white/5">
                        <span role="img" aria-label="video record" className="text-indigo-400">📹</span>
                        <span className="hidden md:block ml-3 text-xs text-white">Live Session</span>
                      </div>
                      <div className="h-8 w-full rounded flex items-center px-3 hover:bg-white/5 transition-colors cursor-pointer opacity-60">
                        <span role="img" aria-label="graph">📊</span>
                        <span className="hidden md:block ml-3 text-xs">Analytics</span>
                      </div>
                      <div className="h-8 w-full rounded flex items-center px-3 hover:bg-white/5 transition-colors cursor-pointer opacity-60">
                        <span role="img" aria-label="history">🕐</span>
                        <span className="hidden md:block ml-3 text-xs">History</span>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <div className="hidden md:block text-xs text-slate-400">Recording...</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-6 md:p-8 overflow-hidden relative flex flex-col">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] mb-2">
                          <span role="img" aria-label="stopwatch">⏱️</span>
                          Question 3/5
                        </div>
                        <h3 className="text-sm md:text-base font-medium text-white">"Tell me about a time you managed a conflict."</h3>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 px-3 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-[10px] text-slate-300">
                          <span role="img" aria-label="microphone">🎤</span>
                          Audio On
                        </div>
                      </div>
                    </div>

                    {/* Video / Waveform Area */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
                      {/* AI Interviewer */}
                      <div className="glass-panel rounded-lg p-1 relative flex items-center justify-center bg-black/40">
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/50 rounded text-[10px] text-slate-400">AI Interviewer</div>
                        <div className="w-24 h-24 rounded-full bg-gradient-to-t from-slate-800 to-slate-700 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full border border-white/10"></div>
                          <span role="img" aria-label="user speak" className="text-slate-400 text-4xl">🗣️</span>
                          {/* Voice animation rings */}
                          <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                        </div>
                      </div>

                      {/* User Camera / Analysis */}
                      <div className="glass-panel rounded-lg p-4 relative flex flex-col border border-indigo-500/20">
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/50 rounded text-[10px] text-indigo-300 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                          Analyzing
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <div className="w-full max-w-[200px] space-y-2">
                            {/* Fake Waveform */}
                            <div className="flex justify-center items-center gap-1 h-12">
                              <div className="w-1 h-4 bg-indigo-500 rounded-full animate-pulse" style={{ animationDuration: '1s' }}></div>
                              <div className="w-1 h-8 bg-indigo-500 rounded-full animate-pulse" style={{ animationDuration: '1.2s' }}></div>
                              <div className="w-1 h-6 bg-indigo-500 rounded-full animate-pulse" style={{ animationDuration: '0.8s' }}></div>
                              <div className="w-1 h-10 bg-indigo-500 rounded-full animate-pulse" style={{ animationDuration: '1.5s' }}></div>
                              <div className="w-1 h-5 bg-indigo-500 rounded-full animate-pulse" style={{ animationDuration: '1.1s' }}></div>
                            </div>
                          </div>
                        </div>

                        {/* Real-time metrics */}
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="bg-white/5 rounded p-2 text-center">
                            <div className="text-[10px] text-slate-500">Pace</div>
                            <div className="text-xs font-medium text-emerald-400">Perfect</div>
                          </div>
                          <div className="bg-white/5 rounded p-2 text-center">
                            <div className="text-[10px] text-slate-500">Clarity</div>
                            <div className="text-xs font-medium text-white">96%</div>
                          </div>
                          <div className="bg-white/5 rounded p-2 text-center">
                            <div className="text-[10px] text-slate-500">Filler Words</div>
                            <div className="text-xs font-medium text-emerald-400">0</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Feedback Toast */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 glass-panel rounded-lg p-3 flex items-start gap-3 border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span role="img" aria-label="magic wand">✨</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-indigo-300 block mb-0.5">AI Suggestion</span>
                        <p className="text-[11px] text-slate-300 leading-snug">Great use of the STAR method. Try to emphasize the <strong>outcome</strong> more in your conclusion.</p>
                      </div>
                    </div>

                  </div>
                </div>
                {/* Reflection/Shadow */}
                <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-[#030304] to-transparent z-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals (Marquee) */}
        <section className="py-10 border-y border-white/5 bg-white/[0.01] overflow-hidden reveal">
          <div className="max-w-7xl mx-auto px-6 text-center mb-8">
            <p className="text-xs font-medium text-slate-500 tracking-wider uppercase">Our users have been hired at</p>
          </div>

          <div className="relative w-full overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="animate-marquee flex gap-12 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Original Items */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="google" className="text-2xl">🇬</span>
                <span className="font-bold text-lg text-white tracking-tight">Google</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="amazon" className="text-2xl">📦</span>
                <span className="font-bold text-lg text-white tracking-tight">Amazon</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="meta" className="text-2xl">♾️</span>
                <span className="font-bold text-lg text-white tracking-tight">Meta</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="netflix" className="text-2xl">▶️</span>
                <span className="font-bold text-lg text-white tracking-tight">Netflix</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="apple" className="text-2xl">🍎</span>
                <span className="font-bold text-lg text-white tracking-tight">Apple</span>
              </div>

              {/* Duplicate */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="google" className="text-2xl">🇬</span>
                <span className="font-bold text-lg text-white tracking-tight">Google</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="amazon" className="text-2xl">📦</span>
                <span className="font-bold text-lg text-white tracking-tight">Amazon</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="meta" className="text-2xl">♾️</span>
                <span className="font-bold text-lg text-white tracking-tight">Meta</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="netflix" className="text-2xl">▶️</span>
                <span className="font-bold text-lg text-white tracking-tight">Netflix</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="apple" className="text-2xl">🍎</span>
                <span className="font-bold text-lg text-white tracking-tight">Apple</span>
              </div>

              {/* Duplicate 2 */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="google" className="text-2xl">🇬</span>
                <span className="font-bold text-lg text-white tracking-tight">Google</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span role="img" aria-label="amazon" className="text-2xl">📦</span>
                <span className="font-bold text-lg text-white tracking-tight">Amazon</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 md:text-center max-w-2xl md:mx-auto reveal">
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">Intelligence built for your career.</h2>
              <p className="text-slate-400 text-lg">
                Stop guessing what interviewers want. Intervue AI analyzes thousands of successful interviews to give you the cheat codes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group p-8 glass-panel rounded-2xl hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden reveal delay-100">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span role="img" aria-label="microphone" className="text-indigo-500 text-8xl">🎤</span>
                </div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                  <span role="img" aria-label="record circle" className="text-indigo-400 text-xl">⏺️</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Speech Analysis</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Detects filler words, speaking pace, and tone confidence in real-time. Learn to speak with authority.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 glass-panel rounded-2xl hover:bg-white/[0.05] transition-all duration-300 md:col-span-2 relative overflow-hidden reveal delay-200">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center h-full">
                  <div className="flex-1 z-10">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 border border-purple-500/20">
                      <span role="img" aria-label="code circle" className="text-purple-400 text-xl">💻</span>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Technical & Behavioral</h3>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                      From "Explain a Closure" to "Describe a challenge you overcame". Our AI covers 50+ roles across Engineering, Product, and Sales.
                    </p>
                  </div>
                  {/* Micro visual */}
                  <div className="flex-1 w-full bg-[#0A0A0C] border border-white/5 rounded-lg p-4 shadow-lg transform group-hover:translate-y-[-4px] transition-transform duration-500">
                    <div className="flex gap-2 items-center mb-3 border-b border-white/5 pb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-[10px] text-purple-300">Code Analysis</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-400 space-y-1">
                      <div className="flex gap-2"><span className="text-purple-400">const</span> optimize = <span className="text-indigo-400">()</span> {"=>"} {"{"}</div>
                      <div className="pl-4 text-emerald-400">// O(n) complexity achieved</div>
                      <div className="pl-4">return data.filter(...)</div>
                      <div>{"}"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 glass-panel rounded-2xl hover:bg-white/[0.05] transition-all duration-300 reveal delay-100">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 border border-blue-500/20">
                  <span role="img" aria-label="chart 2" className="text-blue-400 text-xl">📈</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Performance Metrics</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Get a score out of 100 for every answer. Track your improvement over time with detailed charts.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-8 glass-panel rounded-2xl hover:bg-white/[0.05] transition-all duration-300 reveal delay-200">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6 border border-emerald-500/20">
                  <span role="img" aria-label="chat round check" className="text-emerald-400 text-xl">💬</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Answer Generation</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Stuck? Ask AI to generate an ideal "STAR" method answer based on your resume points.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group p-8 glass-panel rounded-2xl hover:bg-white/[0.05] transition-all duration-300 reveal delay-300">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 border border-orange-500/20">
                  <span role="img" aria-label="file check" className="text-orange-400 text-xl">📄</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Resume Parsing</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Upload your CV and the AI will ask specific questions about your past projects and skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="py-24 bg-[#050507] border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,_var(--tw-gradient-stops)) from-indigo-900/20 via-[#050507] to-[#050507]"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 space-y-6 reveal">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                Simulator
              </div>
              <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">Feedback that actually helps.</h2>
              <p className="text-slate-400 text-lg">
                Don't just practice blind. See exactly what you did right and what needs work with granular feedback on every answer.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span role="img" aria-label="check circle" className="text-emerald-400">✅</span>
                  Keyword analysis against job descriptions
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span role="img" aria-label="check circle" className="text-emerald-400">✅</span>
                  Structure evaluation (STAR Method)
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span role="img" aria-label="check circle" className="text-emerald-400">✅</span>
                  Tone and confidence scoring
                </li>
              </ul>
            </div>

            {/* Interactive Component */}
            <div className="flex-1 w-full reveal delay-200">
              <div className="bg-[#0e0e11] rounded-xl border border-white/10 p-6 shadow-2xl relative">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <span className="text-sm font-medium text-white">Interview Report: System Design</span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Task Item (Interactive) */}
                  <div className="group relative bg-[#18181b] rounded border border-white/5 p-4 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-6 h-6 rounded border border-slate-600 flex items-center justify-center bg-indigo-500/20 border-indigo-500/50">
                          <span className="text-[10px] text-indigo-300 font-bold">Q1</span>
                        </div>
                        <div>
                          <p className="text-sm text-slate-200 font-medium">Design a URL Shortener</p>
                          <p className="text-xs text-slate-500 mt-1">System Design • Difficulty: Hard</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Score: 92/100</span>
                    </div>

                    {/* Hover Reveal Content */}
                    <div className="h-0 group-hover:h-auto group-hover:mt-3 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                      <div className="pt-3 border-t border-white/10 space-y-2">
                        <div className="flex items-start gap-2 text-xs">
                          <span role="img" aria-label="like" className="text-emerald-400 mt-0.5">👍</span>
                          <span className="text-slate-300">Excellent discussion on database sharding keys.</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <span role="img" aria-label="danger circle" className="text-yellow-400 mt-0.5">⚠️</span>
                          <span className="text-slate-300">Missed discussing rate limiting for the API.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Static Task */}
                  <div className="bg-[#18181b] rounded border border-white/5 p-4 opacity-60">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-6 h-6 rounded border border-slate-600 flex items-center justify-center">
                          <span className="text-[10px] text-slate-400 font-bold">Q2</span>
                        </div>
                        <div>
                          <p className="text-sm text-slate-300">Handle High Traffic Spikes</p>
                          <p className="text-xs text-slate-500 mt-1">Scalability • Difficulty: Medium</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-500/10 text-slate-400 border border-slate-500/20">Skipped</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-medium text-center text-white mb-16 tracking-tight reveal">Candidates we've helped hire</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-red-500/20 transition-all duration-500 reveal delay-100 relative overflow-hidden group">
              {/* Fear Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

              <div className="flex gap-1 mb-4 text-indigo-400 relative z-10">
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 relative z-10">
                "I was terrified of the technical screening. The AI practiced the exact LeetCode style questions I got asked. Hired at L4!"
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white border border-red-500/20 shadow-lg shadow-red-500/10 group-hover:shadow-red-500/20 transition-shadow duration-500">AC</div>
                <div>
                  <p className="text-xs font-medium text-white">Alex Chen</p>
                  <p className="text-[10px] text-slate-500">Software Engineer @ Google</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-purple-500/20 transition-all duration-500 reveal delay-200 relative overflow-hidden group">
              {/* Fear Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-red-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" style={{ animationDelay: '0.3s' }}></div>

              <div className="flex gap-1 mb-4 text-indigo-400 relative z-10">
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 relative z-10">
                "The behavioral coaching is game-changing. It taught me to stop rambling and focus on impact metrics. Totally worth it."
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white border border-purple-500/20 shadow-lg shadow-purple-500/10 group-hover:shadow-purple-500/20 transition-shadow duration-500">SM</div>
                <div>
                  <p className="text-xs font-medium text-white">Sarah Miller</p>
                  <p className="text-[10px] text-slate-500">Product Manager @ Airbnb</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-orange-500/20 transition-all duration-500 reveal delay-300 relative overflow-hidden group">
              {/* Fear Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -top-4 -left-4 w-18 h-18 bg-orange-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-red-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" style={{ animationDelay: '0.4s' }}></div>

              <div className="flex gap-1 mb-4 text-indigo-400 relative z-10">
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 relative z-10">
                "My confidence was zero after being laid off. Practicing with Intervue gave me my mojo back. The salary negotiation tips were a bonus."
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white border border-orange-500/20 shadow-lg shadow-orange-500/10 group-hover:shadow-orange-500/20 transition-shadow duration-500">JW</div>
                <div>
                  <p className="text-xs font-medium text-white">James Wilson</p>
                  <p className="text-[10px] text-slate-500">Senior Designer @ Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / Early Access */}
        <section id="pricing" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl font-medium text-white mb-4 tracking-tight">Invest in your career</h2>
              <p className="text-slate-400">Costs less than 1% of your signing bonus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free */}
              <div className="p-8 rounded-2xl border border-white/5 bg-[#0A0A0C] reveal delay-100">
                <h3 className="text-lg font-medium text-white">Free</h3>
                <p className="text-sm text-slate-500 mb-6">For casual practice</p>
                <div className="text-3xl font-medium text-white mb-6">$0</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-400"><span role="img" aria-label="check circle" className="text-slate-600">✅</span> 1 Mock Interview / mo</li>
                  <li className="flex items-center gap-2 text-sm text-slate-400"><span role="img" aria-label="check circle" className="text-slate-600">✅</span> Basic Feedback</li>
                  <li className="flex items-center gap-2 text-sm text-slate-400"><span role="img" aria-label="check circle" className="text-slate-600">✅</span> 20 Common Questions</li>
                </ul>
                <button className="w-full py-2 rounded-lg border border-white/10 text-white text-sm hover:bg-white/5 transition-colors">Start Free</button>
              </div>

              {/* Pro */}
              <div className="p-8 rounded-2xl border border-indigo-500/30 bg-[#0E0E12] relative reveal delay-200">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-[10px] text-white font-medium">Job Seeker Choice</div>
                <h3 className="text-lg font-medium text-white">Pro</h3>
                <p className="text-sm text-slate-500 mb-6">Serious preparation</p>
                <div className="text-3xl font-medium text-white mb-6">$29<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-300"><span role="img" aria-label="check circle" className="text-indigo-400">✅</span> Unlimited Mock Interviews</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><span role="img" aria-label="check circle" className="text-indigo-400">✅</span> Advanced Speech Analytics</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><span role="img" aria-label="check circle" className="text-indigo-400">✅</span> Role-specific Questions</li>
                </ul>
                <button onClick={() => openSignIn()} className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition-colors shadow-lg shadow-indigo-500/20">Get Started</button>
              </div>

              {/* Coaching */}
              <div className="p-8 rounded-2xl border border-white/5 bg-[#0A0A0C] reveal delay-300">
                <h3 className="text-lg font-medium text-white">Executive</h3>
                <p className="text-sm text-slate-500 mb-6">For leadership roles</p>
                <div className="text-3xl font-medium text-white mb-6">$199<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-400"><span role="img" aria-label="check circle" className="text-slate-600">✅</span> Human Review (1/mo)</li>
                  <li className="flex items-center gap-2 text-sm text-slate-400"><span role="img" aria-label="check circle" className="text-slate-600">✅</span> Salary Negotiation Help</li>
                  <li className="flex items-center gap-2 text-sm text-slate-400"><span role="img" aria-label="check circle" className="text-slate-600">✅</span> Resume Rewrite</li>
                </ul>
                <button className="w-full py-2 rounded-lg border border-white/10 text-white text-sm hover:bg-white/5 transition-colors">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* Email Capture / CTA */}
        <section id="join" className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-6">Your dream job is waiting.</h2>
            <p className="text-slate-400 text-lg mb-10">Join 10,000+ candidates who aced their interviews with Intervue.</p>

            <form className="max-w-md mx-auto relative flex items-center">
              <span role="img" aria-label="letter" className="absolute left-4 text-slate-500">✉️</span>
              <input type="email" placeholder="Enter your email address" className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-11 pr-32 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors" />
              <button type="button" className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-white text-black text-xs font-semibold rounded-full hover:bg-slate-200 transition-colors">
                Start Now
              </button>
            </form>
            <p className="text-[10px] text-slate-600 mt-4">No credit card required for trial.</p>
          </div>

          {/* Background Accents */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] pointer-events-none"></div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#020203] py-12 text-sm reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[9px] font-bold">I</div>
                  <span className="text-white font-medium tracking-tight">INTERVUE</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">The AI-powered career coach that helps you speak with confidence and clarity.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Product</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="#" className="hover:text-white transition-colors">Mock Interviews</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Resume AI</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Resources</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="#" className="hover:text-white transition-colors">Question Bank</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Legal</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
              <p className="text-slate-600 text-xs">© 2023 Intervue AI Inc. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><span role="img" aria-label="twitter" className="grayscale">🐦</span></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><span role="img" aria-label="linkedin" className="grayscale">💼</span></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
