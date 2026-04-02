"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { GoldWorksLogo } from "@/components/gold-works-logo"
import { ArrowDown, Gamepad2 } from "lucide-react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px] animate-pulse-glow"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] animate-pulse-glow"
          style={{ animationDelay: '2s', transform: 'translate(50%, 50%)' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GoldWorksLogo size="sm" className="text-primary" />
            <span className="text-lg font-bold tracking-tight">
              Gold <span className="text-primary">Works</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#philosophy" className="hover:text-primary transition-colors">Philosophy</a>
            <a href="#featured" className="hover:text-primary transition-colors">Featured</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main hero content */}
      <div 
        className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex justify-center mb-8">
          <GoldWorksLogo size="xl" className="text-primary" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[0.9]">
          <span className="block text-foreground">GOLD</span>
          <span className="block text-primary">WORKS</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          An indie game studio crafting original games and meaningful interactive experiences. 
          Every world we build is shaped with imagination, care, and creative purpose.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold"
            onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore the Studio
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary/50 text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 px-8 py-6 text-base font-semibold group"
            onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Gamepad2 className="mr-2 h-5 w-5 shrink-0 text-primary transition-transform group-hover:scale-110" />
            <span>Featured Game</span>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
