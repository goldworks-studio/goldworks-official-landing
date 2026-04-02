"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Layers, Heart, Lightbulb } from "lucide-react"

const philosophyPoints = [
  {
    icon: Sparkles,
    title: "Craft",
    description: "Every element is carefully refined. We believe games deserve the same attention as any great work of art."
  },
  {
    icon: Lightbulb,
    title: "Imagination",
    description: "We pursue original ideas that surprise and inspire. Our worlds come from genuine creative vision."
  },
  {
    icon: Layers,
    title: "Refinement",
    description: "Gold is forged through fire. We iterate relentlessly until every detail feels right."
  },
  {
    icon: Heart,
    title: "Care",
    description: "We make games we genuinely want to play—experiences built with love for players who notice the difference."
  }
]

export function Philosophy() {
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
      id="philosophy" 
      ref={sectionRef}
      className="relative px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div 
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4 font-mono">
            Our Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            What <span className="text-primary">Gold</span> Means to Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Gold Works represents the value we place on creative labor—ideas shaped through effort, 
            worlds made with care, experiences worth remembering.
          </p>
        </div>

        {/* Philosophy grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {philosophyPoints.map((point, index) => (
            <div
              key={point.title}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group relative rounded-lg bg-card border border-border hover:border-primary/50 transition-colors duration-300">
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-5 group-hover:bg-primary/20 transition-colors">
                    <point.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
