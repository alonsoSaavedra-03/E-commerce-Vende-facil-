import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AboutSection } from './sections/AboutSection'
import { IntroSection } from './sections/IntroSection'
import { RecommendationsSection } from './sections/RecommendationsSection'
import './HomePage.css'

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    const targetId = hash.replace('#', '') || 'inicio'
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

  return (
    <div className="home-page">
      <IntroSection />
      <AboutSection />
      <RecommendationsSection />
    </div>
  )
}
