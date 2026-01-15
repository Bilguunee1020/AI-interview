"use client";

import { useClerk } from "@clerk/nextjs";
import FluidBackground from "./FluidBackground";

export default function LandingPage() {
  const { openSignIn } = useClerk();

  return (
    <div className="interview-body relative">
      {/* FLUID BACKGROUND */}
      <FluidBackground />

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" className="text-purple-500">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46a2.5 2.5 0 0 0-1.98 3a2.5 2.5 0 0 0-1.32 4.24a3 3 0 0 0 .34 2.68a3 3 0 0 0 2.03 2a2.5 2.5 0 0 0 2.4 2.94h7.97a2.5 2.5 0 0 0 2.4-2.94a3 3 0 0 0 2.03-2a3 3 0 0 0 .34-2.68a2.5 2.5 0 0 0-1.32-4.24a2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5"></path>
                <path d="M12 8v4l3 3"></path>
              </g>
            </svg>
            <span className="font-bold tracking-tight text-lg">InterviewAI</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          <button onClick={() => openSignIn()} className="hidden md:block px-4 py-2 text-sm font-semibold rounded-full bg-white text-black hover:bg-neutral-200 transition-colors">
            Start Interview
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-neutral-400" onClick={() => {
            const menu = document.getElementById('mobile-menu');
            if (menu) menu.classList.toggle('hidden');
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" className="lucide lucide-menu">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5h16M4 12h16M4 19h16"></path>
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden absolute top-16 left-0 w-full bg-neutral-900 border-b border-white/10 p-4 flex flex-col gap-4 md:hidden">
          <a href="#features" className="text-neutral-400 hover:text-white">Features</a>
          <a href="#how-it-works" className="text-neutral-400 hover:text-white">How it Works</a>
          <button onClick={() => openSignIn()} className="text-purple-400">Start Interview</button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              AI V2.0 LIVE
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Master Your Next <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Interview with AI.</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Practice with realistic AI avatars, get instant feedback on your answers, and ace your dream job. No humans needed.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <button onClick={() => openSignIn()} className="shiny-cta group">
                <span className="flex items-center gap-2">
                  Start Interview Now
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" className="lucide lucide-arrow-right">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7"></path>
                  </svg>
                </span>
              </button>

              <a href="#how-it-works" className="px-6 py-3 rounded-full border border-white/10 text-neutral-300 font-medium hover:bg-white/5 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" className="lucide lucide-play-circle">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </g>
                </svg>
                Watch Demo
              </a>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Everything you need to prep</h2>
            <p className="text-neutral-400 max-w-xl mx-auto">Our AI simulates a real pressure environment so you are ready for the real thing.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="glass-card p-6 rounded-xl hover:border-purple-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.2em" height="1.2em" viewBox="0 0 24 24" className="lucide lucide-bot">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8V4H8"></path>
                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 14h2m16 0h2m-6-1v2m-8-2v2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">AI Interviewer</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Voice-based conversational AI that asks follow-up questions based on your responses.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-6 rounded-xl hover:border-blue-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.2em" height="1.2em" viewBox="0 0 24 24" className="lucide lucide-file-text">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                  <line x1="16" x2="8" y1="13" y2="13" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></line>
                  <line x1="16" x2="8" y1="17" y2="17" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></line>
                  <line x1="10" x2="8" y1="9" y2="9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></line>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">CV-Based Questions</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Upload your resume and get tailored questions regarding your specific experience.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-6 rounded-xl hover:border-pink-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.2em" height="1.2em" viewBox="0 0 24 24" className="lucide lucide-video">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m22 8l-6 4l6 4V8Z"></path>
                  <rect width="14" height="12" x="2" y="6" rx="2" ry="2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></rect>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Webcam & Mic</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Full AV synchronization to analyze your eye contact, speech pace, and body language.
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-card p-6 rounded-xl hover:border-green-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.2em" height="1.2em" viewBox="0 0 24 24" className="lucide lucide-captions">
                  <rect width="18" height="14" x="3" y="5" rx="2" ry="2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></rect>
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 15h4M15 15h2M7 11h2M13 11h4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Live Transcript</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                See real-time speech-to-text to catch filler words and improve your articulation.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16">
              <div className="md:w-1/3 sticky top-32 h-fit">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">How it Works</h2>
                <p className="text-neutral-400 mb-8">Three simple steps to significantly improve your interview performance today.</p>
                <button onClick={() => openSignIn()} className="px-5 py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors">
                  Try it Free
                </button>
              </div>

              <div className="md:w-2/3 space-y-12">
                {/* Step 1 */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(147,51,234,0.5)]">1</div>
                    <div className="w-px h-full bg-white/10 my-2"></div>
                  </div>
                  <div className="pb-8">
                    <h3 className="text-xl font-medium text-white mb-2">Upload Resume</h3>
                    <p className="text-neutral-400 text-sm">Drag and drop your PDF resume. Our system analyzes your skills, experience, and gaps to generate relevant questions.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div className="w-px h-full bg-white/10 my-2"></div>
                  </div>
                  <div className="pb-8">
                    <h3 className="text-xl font-medium text-white mb-2">Start the Simulation</h3>
                    <p className="text-neutral-400 text-sm">Enable your camera and microphone. The AI recruiter will begin the session. Answer naturally as if it were a real call.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-white font-bold text-sm">3</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Get Actionable Feedback</h3>
                    <p className="text-neutral-400 text-sm">Receive a detailed report card. See your filler word usage, answer confidence score, and suggested improvements for each question.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="start" className="py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-900/20 blur-3xl rounded-full -z-10 transform scale-50"></div>

          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Ready to land the job?
            </h2>
            <p className="text-lg text-neutral-400">
              Stop practicing in front of a mirror. Get real feedback from advanced AI models trained on thousands of successful interviews.
            </p>
            <div className="flex justify-center pt-4">
              <button onClick={() => openSignIn()} className="shiny-cta">
                <span>Start Your Mock Interview</span>
              </button>
            </div>
            <p className="text-xs text-neutral-600 mt-8">No credit card required for first 3 sessions.</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-neutral-500">
            © 2024 InterviewAI. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm font-medium text-neutral-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
