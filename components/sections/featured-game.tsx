"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Fish, Users, Waves } from "lucide-react"

export function FeaturedGame() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="featured" 
      ref={sectionRef}
      className="relative pb-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4 font-mono">
            Coming Soon
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Featured <span className="text-primary">Game</span>
          </h2>
        </div>

        {/* Featured game card */}
        <div 
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
            {/* Visual showcase area */}
            <div className="relative aspect-[6/5] sm:aspect-[16/10] lg:aspect-[21/9] bg-gradient-to-br from-blue-950/50 via-card to-cyan-950/30 overflow-hidden">
              {/* Animated water waves background */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 80%, hsl(199, 89%, 48%) 0%, transparent 50%),
                                     radial-gradient(circle at 20% 60%, hsl(187, 100%, 42%) 0%, transparent 40%),
                                     radial-gradient(circle at 80% 40%, hsl(199, 89%, 48%) 0%, transparent 35%)`,
                    filter: 'blur(80px)'
                  }}
                />
                {/* Water ripple pattern */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `repeating-radial-gradient(circle at 50% 100%, transparent 0px, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 42px)`,
                  }}
                />
                {/* Animated waves */}
                <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path 
                    d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" 
                    fill="currentColor"
                    className="text-primary animate-[wave_8s_ease-in-out_infinite]"
                  />
                  <path 
                    d="M0,80 C200,40 400,120 600,80 C800,40 1000,120 1200,80 L1200,120 L0,120 Z" 
                    fill="currentColor"
                    className="text-cyan-500 opacity-50 animate-[wave_6s_ease-in-out_infinite_reverse]"
                  />
                </svg>
              </div>
              
              {/* Central visual element */}
              <div className="absolute inset-0 flex items-center justify-center px-6 py-8 sm:px-10 sm:py-12">
                <div className="relative w-full">
                  {/* Geometric game title treatment */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <Waves className="h-4 w-4 text-cyan-400 animate-pulse sm:h-5 sm:w-5" />
                      <div className="h-px w-8 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent sm:w-12" />
                      <Fish className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                      <div className="h-px w-8 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent sm:w-12" />
                      <Waves className="h-4 w-4 text-cyan-400 animate-pulse sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-2">
                      IDLE
                    </h3>
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-bold tracking-wide">
                      ANGLER
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-muted-foreground sm:mt-6 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-cyan-400" />
                        <span className="text-[10px] uppercase tracking-[0.2em] sm:text-sm sm:tracking-wider">Multiplayer</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="text-[10px] uppercase tracking-[0.2em] sm:text-sm sm:tracking-wider">In Development</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating fish decorations */}
              <div className="absolute left-[12%] top-[22%] animate-[float_4s_ease-in-out_infinite] sm:left-[15%] sm:top-1/4">
                <Fish className="h-6 w-6 -rotate-12 text-primary/30 sm:h-8 sm:w-8" />
              </div>
              <div className="absolute right-[14%] top-[30%] animate-[float_5s_ease-in-out_infinite_0.5s] sm:right-[20%] sm:top-1/3">
                <Fish className="h-5 w-5 rotate-6 text-cyan-400/20 sm:h-6 sm:w-6" />
              </div>
              <div className="absolute bottom-[28%] left-[20%] animate-[float_3.5s_ease-in-out_infinite_1s] sm:bottom-1/3 sm:left-[25%]">
                <Fish className="h-4 w-4 -rotate-6 text-primary/20 sm:h-5 sm:w-5" />
              </div>

              {/* Corner decorations */}
              <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                <div className="h-8 w-8 border-l-2 border-t-2 border-cyan-400/30 sm:h-12 sm:w-12" />
              </div>
              <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                <div className="h-8 w-8 border-r-2 border-t-2 border-cyan-400/30 sm:h-12 sm:w-12" />
              </div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <div className="h-8 w-8 border-l-2 border-b-2 border-cyan-400/30 sm:h-12 sm:w-12" />
              </div>
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <div className="h-8 w-8 border-r-2 border-b-2 border-cyan-400/30 sm:h-12 sm:w-12" />
              </div>
            </div>

            {/* Game info area */}
            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                <div className="flex-1 max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wide">
                      Idler
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium uppercase tracking-wide">
                      Multiplayer
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium uppercase tracking-wide">
                      Relaxing
                    </span>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Cast your line into tranquil waters and build your fishing empire while you&apos;re away. 
                    Collect rare fish, upgrade your gear, and compete with friends in this relaxing 
                    multiplayer idle fishing adventure. The perfect catch awaits.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Idle Progression</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>Online Multiplayer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Collect Rare Fish</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold group inline-flex items-center"
                    onClick={() => window.alert("Coming soon!")}
                  >
                    <span>Wishlist on Steam</span>
                    <ExternalLink className="ml-2 h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-1" />
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Coming to Steam 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-25px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--rotate, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--rotate, 0deg)); }
        }
      `}</style>
    </section>
  )
}
