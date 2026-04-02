"use client"

import { useEffect, useRef, useState } from "react"
import { Mail } from "lucide-react"
import { GoldWorksLogo } from "@/components/gold-works-logo"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex justify-center mb-8">
            <GoldWorksLogo size="lg" className="text-primary" />
          </div>
          
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4 font-mono">
            Get in Touch
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            Have questions, feedback, or just want to say hello?
            <br />
            We&apos;d love to hear from you.
          </p>

          {/* Email display */}
          <div 
            className={`inline-flex flex-col items-center transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="group relative">
              <div className="absolute -inset-4 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <a 
                href="mailto:support@goldworks.net"
                className="relative flex items-center gap-4 px-8 py-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Support & Inquiries
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    support@goldworks.net
                  </p>
                </div>
              </a>
            </div>
            
            <p className="mt-6 text-sm text-muted-foreground">
              We typically respond within 48 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
