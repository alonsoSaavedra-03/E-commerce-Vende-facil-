import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Laptop,
  Dumbbell,
  Armchair,
  BookOpen,
  Shirt,
  PackageSearch,
  ArrowRight,
  Percent,
  Sparkles,
  Truck
} from 'lucide-react'
import { getProducts, getCategories, getSettings } from '../../../../services/api'
import './IntroSection.css'

const categoryIcons = {
  electronicos: Laptop,
  deportes: Dumbbell,
  hogar: Armchair,
  libros: BookOpen,
  moda: Shirt
}

const bannerIcons = {
  Sparkles: Sparkles,
  Percent: Percent,
  Truck: Truck
}

const bannerSlides = [
  {
    id: 1,
    title: 'Tecnología de Vanguardia',
    subtitle: 'Equípate con lo último en laptops, audífonos e insumos a precios insuperables.',
    cta: 'Explorar Tecnología',
    categorySlug: 'electronicos',
    icon: 'Sparkles',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    tag: 'Nueva Colección'
  },
  {
    id: 2,
    title: 'Rendimiento Deportivo',
    subtitle: 'Zapatillas, indumentaria y accesorios de alto nivel para tus entrenamientos diarios.',
    cta: 'Ver Deportes',
    categorySlug: 'deportes',
    icon: 'Percent',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)',
    tag: 'Oferta Especial'
  },
  {
    id: 3,
    title: 'Envíos Gratis a todo el Perú',
    subtitle: 'Recibe tus compras directamente en tu puerta sin costo adicional por compras mayores a S/ 150.',
    cta: 'Comprar Ahora',
    categorySlug: null,
    icon: 'Truck',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
    tag: 'Envío Gratis'
  }
]

export function IntroSection() {
  const navigate = useNavigate()
  
  // Data States
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [settings, setSettings] = useState(null)
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Carousel State - Announcement Banner
  const [activeSlide, setActiveSlide] = useState(0)
  
  // Refs for smooth scroll carousels
  const productsScrollRef = useRef(null)
  const categoriesScrollRef = useRef(null)

  // Fetch Settings, Products and Categories on Mount
  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        const [settingsRes, productsRes, categoriesRes] = await Promise.all([
          getSettings().catch(() => ({ data: null })),
          getProducts().catch(() => ({ data: [] })),
          getCategories().catch(() => ({ data: [] }))
        ])

        if (isMounted) {
          setSettings(settingsRes.data)
          // Filter out inactive products
          const activeProducts = (productsRes.data || []).filter(p => p.is_active)
          setProducts(activeProducts)
          // Filter out inactive categories
          const activeCategories = (categoriesRes.data || []).filter(c => c.is_active)
          setCategories(activeCategories)
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error al cargar datos de inicio:', err)
          setError('Ocurrió un error al cargar la información de inicio.')
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  // Parse banners dynamically from settings or fall back
  const getBanners = () => {
    if (settings?.home_banners) {
      try {
        return JSON.parse(settings.home_banners)
      } catch (e) {
        console.error('Error parsing home_banners setting:', e)
      }
    }
    return bannerSlides
  }
  const banners = getBanners()

  // Auto-slide for Banner Carousel
  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [banners.length])

  // Format price helper
  const formatPrice = (price) => {
    const currency = settings?.store_currency || 'PEN'
    const locale = currency === 'USD' ? 'en-US' : currency === 'EUR' ? 'fr-FR' : 'es-PE'
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  // Smooth Scroll Handlers
  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 320
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Navigate to category
  const handleCategoryNav = (slug) => {
    if (slug) {
      navigate('/catalogo', { state: { categorySlug: slug } })
    } else {
      navigate('/catalogo')
    }
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="intro-section" id="inicio">
      
      {/* 1. LARGE ANNOUNCEMENT CAROUSEL */}
      <div className="banner-carousel">
        <div className="banner-carousel__track">
          {banners.map((slide, index) => {
            const IconComponent = bannerIcons[slide.icon] || Sparkles
            const isActive = index === activeSlide
            return (
              <div
                key={slide.id || index}
                className={`banner-slide ${isActive ? 'is-active' : ''}`}
                style={{ background: slide.gradient }}
              >
                <div className="banner-slide__content">
                  <span className="banner-slide__tag">
                    <IconComponent size={14} className="me-1" /> {slide.tag}
                  </span>
                  <h2 className="banner-slide__title">{slide.title}</h2>
                  <p className="banner-slide__subtitle">{slide.subtitle}</p>
                  <button
                    className="banner-slide__btn"
                    onClick={() => handleCategoryNav(slide.categorySlug)}
                  >
                    {slide.cta} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Carousel controls */}
        <button 
          className="banner-carousel__control banner-carousel__control--prev" 
          onClick={prevSlide}
          aria-label="Anterior anuncio"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          className="banner-carousel__control banner-carousel__control--next" 
          onClick={nextSlide}
          aria-label="Siguiente anuncio"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="banner-carousel__indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`banner-indicator ${index === activeSlide ? 'is-active' : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Ir al anuncio ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* LOADING STATE */}
      {isLoading && (
        <div className="home-loaders-container">
          <div className="home-spinner"></div>
          <p>Cargando novedades...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {!isLoading && error && (
        <div className="home-error-container">
          <PackageSearch size={32} />
          <p>{error}</p>
        </div>
      )}

      {/* CAROUSELS CONTENT */}
      {!isLoading && !error && (
        <div className="home-sections-grid">
          
          {/* 2. SMALL PRODUCTS CAROUSEL */}
          {products.length > 0 && (
            <div className="home-carousel-section">
              <div className="home-carousel-header">
                <div>
                  <h3 className="home-carousel-title">Productos más buscados</h3>
                  <p className="home-carousel-subtitle">Los artículos favoritos de nuestra comunidad esta semana.</p>
                </div>
                <div className="home-carousel-controls">
                  <button 
                    onClick={() => handleScroll(productsScrollRef, 'left')}
                    className="home-scroll-btn"
                    aria-label="Desplazar izquierda"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => handleScroll(productsScrollRef, 'right')}
                    className="home-scroll-btn"
                    aria-label="Desplazar derecha"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="home-carousel-track-container" ref={productsScrollRef}>
                <div className="home-products-track">
                  {products.map((product) => (
                    <div 
                      key={product.id} 
                      className="home-product-card"
                      onClick={() => navigate(`/producto/${product.id}`)}
                    >
                      <div className="home-product-card__img-wrapper">
                        <img 
                          src={product.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=60'} 
                          alt={product.name} 
                          loading="lazy"
                        />
                        {product.stock <= 3 && product.stock > 0 && (
                          <span className="home-card-badge home-card-badge--low">Últimos {product.stock}</span>
                        )}
                        {product.stock === 0 && (
                          <span className="home-card-badge home-card-badge--out">Agotado</span>
                        )}
                      </div>
                      <div className="home-product-card__info">
                        <h4 className="home-product-card__name">{product.name}</h4>
                        <p className="home-product-card__description">
                          {product.description ? (product.description.slice(0, 50) + '...') : ''}
                        </p>
                        <div className="home-product-card__footer">
                          <span className="home-product-card__price">{formatPrice(product.price)}</span>
                          <button className="home-product-card__btn">
                            Ver
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. SMALL CATEGORIES CAROUSEL */}
          {categories.length > 0 && (
            <div className="home-carousel-section">
              <div className="home-carousel-header">
                <div>
                  <h3 className="home-carousel-title">Categorías populares</h3>
                  <p className="home-carousel-subtitle">Explora nuestro catálogo por tus categorías favoritas.</p>
                </div>
                <div className="home-carousel-controls">
                  <button 
                    onClick={() => handleScroll(categoriesScrollRef, 'left')}
                    className="home-scroll-btn"
                    aria-label="Desplazar izquierda"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => handleScroll(categoriesScrollRef, 'right')}
                    className="home-scroll-btn"
                    aria-label="Desplazar derecha"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="home-carousel-track-container" ref={categoriesScrollRef}>
                <div className="home-categories-track">
                  {categories.map((category) => {
                    const Icon = categoryIcons[category.slug] ?? PackageSearch
                    return (
                      <div 
                        key={category.id} 
                        className="home-category-card"
                        onClick={() => handleCategoryNav(category.slug)}
                      >
                        <div className="home-category-card__icon-wrapper">
                          <Icon size={24} />
                        </div>
                        <h4 className="home-category-card__name">{category.name}</h4>
                        <p className="home-category-card__description">{category.description || 'Explorar artículos'}</p>
                        <span className="home-category-card__link">
                          Explorar <ArrowRight size={14} />
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </section>
  )
}
