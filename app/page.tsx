import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCourses } from "@/components/featured-courses"
import { InstructorsHighlight } from "@/components/instructors-highlight"
import { KeyFeatures } from "@/components/key-features"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatisticsSection } from "@/components/statistics-section"
import { CallToActionSection } from "@/components/call-to-action-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main role="main">
        <HeroSection />
        <FeaturedCourses />
        <InstructorsHighlight />
        <KeyFeatures />
        <TestimonialsSection />
        <StatisticsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  )
}
