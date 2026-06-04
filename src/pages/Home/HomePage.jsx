import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AboutSection } from './sections/AboutSection'
import { IntroSection } from './sections/IntroSection'
import { RecommendationsSection } from './sections/RecommendationsSection'
import './HomePage.css'

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const targetId = hash.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const navbarHeight = 140
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
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
