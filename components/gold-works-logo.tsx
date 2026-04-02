"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface GoldWorksLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
}

export function GoldWorksLogo({ 
  className, 
  size = "md",
  animated = true 
}: GoldWorksLogoProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const dimension = sizeMap[size]

  useEffect(() => {
    if (!animated || !svgRef.current) return
    
    const paths = svgRef.current.querySelectorAll('.animate-path')
    paths.forEach((path, index) => {
      const pathElement = path as SVGPathElement
      const length = pathElement.getTotalLength()
      pathElement.style.strokeDasharray = `${length}`
      pathElement.style.strokeDashoffset = `${length}`
      pathElement.style.animation = `drawPath 1.5s ease-out ${index * 0.1}s forwards`
    })
  }, [animated])

  return (
    <svg
      ref={svgRef}
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-all duration-300", className)}
    >
      <style>
        {`
          @keyframes drawPath {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes float {
            0%, 100% { 
              transform: translateY(0);
            }
            50% { 
              transform: translateY(-2px);
            }
          }
          @keyframes pulse {
            0%, 100% { 
              opacity: 0.6;
            }
            50% { 
              opacity: 1;
            }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes glow {
            0%, 100% { 
              filter: drop-shadow(0 0 2px currentColor);
            }
            50% { 
              filter: drop-shadow(0 0 6px currentColor);
            }
          }
          .float {
            animation: float 4s ease-in-out infinite;
          }
          .pulse {
            animation: pulse 3s ease-in-out infinite;
          }
          .spin-slow {
            animation: spin-slow 30s linear infinite;
            transform-origin: 50px 50px;
          }
          .glow {
            animation: glow 3s ease-in-out infinite;
          }
        `}
      </style>
      
      <defs>
        {/* Gradient for golden shine effect */}
        <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
        
        {/* Radial glow */}
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Outer orbital ring */}
      <g className={animated ? "spin-slow" : ""}>
        <circle 
          cx="50" 
          cy="50" 
          r="42" 
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.2"
          strokeDasharray="4 8"
        />
      </g>
      
      {/* Background glow */}
      <circle 
        cx="50" 
        cy="50" 
        r="28" 
        fill="url(#centerGlow)" 
        className={animated ? "pulse" : ""}
      />
      
      {/* Main Symbol: Hexagonal gem with inner facets - represents crafted value */}
      <g className={animated ? "glow float" : ""}>
        {/* Outer hexagon frame */}
        <polygon
          className="animate-path"
          points="50,18 75,34 75,66 50,82 25,66 25,34"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        
        {/* Inner hexagon - creates depth */}
        <polygon
          className="animate-path"
          points="50,28 65,38 65,62 50,72 35,62 35,38"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
          opacity="0.7"
        />
        
        {/* Central diamond core - the golden essence */}
        <polygon
          points="50,38 58,50 50,62 42,50"
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Facet lines - top */}
        <line
          className="animate-path"
          x1="50" y1="18"
          x2="50" y2="28"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        
        {/* Facet lines - connecting outer to inner */}
        <line
          className="animate-path"
          x1="75" y1="34"
          x2="65" y2="38"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          className="animate-path"
          x1="75" y1="66"
          x2="65" y2="62"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          className="animate-path"
          x1="50" y1="82"
          x2="50" y2="72"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          className="animate-path"
          x1="25" y1="66"
          x2="35" y2="62"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          className="animate-path"
          x1="25" y1="34"
          x2="35" y2="38"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        
        {/* Inner facet lines to core */}
        <line
          className="animate-path"
          x1="50" y1="28"
          x2="50" y2="38"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          className="animate-path"
          x1="65" y1="38"
          x2="58" y2="50"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          className="animate-path"
          x1="65" y1="62"
          x2="58" y2="50"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          className="animate-path"
          x1="50" y1="72"
          x2="50" y2="62"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          className="animate-path"
          x1="35" y1="62"
          x2="42" y2="50"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          className="animate-path"
          x1="35" y1="38"
          x2="42" y2="50"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
      </g>
      
      {/* Corner accent marks - craftsmanship details */}
      <g opacity="0.3">
        {/* Top */}
        <circle cx="50" cy="10" r="1.5" fill="currentColor" className={animated ? "pulse" : ""} />
        {/* Bottom */}
        <circle cx="50" cy="90" r="1.5" fill="currentColor" className={animated ? "pulse" : ""} style={{ animationDelay: "0.5s" }} />
        {/* Left */}
        <circle cx="15" cy="50" r="1.5" fill="currentColor" className={animated ? "pulse" : ""} style={{ animationDelay: "1s" }} />
        {/* Right */}
        <circle cx="85" cy="50" r="1.5" fill="currentColor" className={animated ? "pulse" : ""} style={{ animationDelay: "1.5s" }} />
      </g>
      
      {/* Sparkle accents at vertices */}
      <g className={animated ? "pulse" : ""} style={{ animationDelay: "0.3s" }}>
        <circle cx="50" cy="18" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="75" cy="34" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="75" cy="66" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="50" cy="82" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="25" cy="66" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="25" cy="34" r="1.5" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  )
}
