import { Hero } from "@/components/sections/hero"
import { Philosophy } from "@/components/sections/philosophy"
import { FeaturedGame } from "@/components/sections/featured-game"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto pt-16 pb-32">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
      <Philosophy />
      <div className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto py-32">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary/50" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
      </div>
      <FeaturedGame />
      <Contact />
      <Footer />
    </main>
  )
}
