import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Armchair,
  BookOpen,
  Dumbbell,
  Laptop,
  PackageSearch,
  Shirt,
  ShoppingCart,
  Undo2,
} from 'lucide-react'
import { getCategories, getProductsByCategory, getSettings, searchProducts } from '../../services/api'
import './CatalogPage.css'

const categoryIcons = {
  deportes: Dumbbell,
  electronicos: Laptop,
  hogar: Armchair,
  libros: BookOpen,
  moda: Shirt,
}

export function CatalogPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [directAddMessage, setDirectAddMessage] = useState('')
  
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [error, setError] = useState('')
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    getSettings()
      .then(({ data }) => setSettings(data))
      .catch(console.error)
  }, [])

  const formatPrice = (price) => {
    const currency = settings?.store_currency || 'PEN'
    const locale = currency === 'USD' ? 'en-US' : currency === 'EUR' ? 'fr-FR' : 'es-PE'
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(price)
  }

  useEffect(() => {
    let isMounted = true

    getCategories()
      .then(({ data }) => {
        if (isMounted) {
          setCategories(data)
          setError('')
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('No pudimos cargar las categorias. Revisa que Laravel y MySQL esten activos.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingCategories(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isLoadingCategories) {
      const searchParams = new URLSearchParams(location.search)
      const searchVal = searchParams.get('search')
      const catSlug = searchParams.get('category') || location.state?.categorySlug

      if (searchVal) {
        setSelectedCategory(null)
        setSearchQuery(searchVal)
        setProducts([])
        setError('')
        setIsLoadingProducts(true)

        searchProducts(searchVal)
          .then(({ data }) => {
            setProducts(data)
          })
          .catch(() => {
            setError('No pudimos cargar los productos de la búsqueda.')
          })
          .finally(() => {
            setIsLoadingProducts(false)
          })
      } else if (catSlug && categories.length > 0) {
        const found = categories.find(c => c.slug === catSlug)
        if (found) {
          setSelectedCategory(found)
          setSearchQuery('')
          setProducts([])
          setError('')
          setIsLoadingProducts(true)

          getProductsByCategory(found.slug)
            .then(({ data }) => {
              setProducts(data)
            })
            .catch(() => {
              setError('No pudimos cargar los productos de esta categoria.')
            })
            .finally(() => {
              setIsLoadingProducts(false)
            })
        }
      } else {
        setSelectedCategory(null)
        setSearchQuery('')
        setProducts([])
      }
    }
  }, [location, categories, isLoadingCategories])

  function handleCategoryClick(category) {
    navigate(`/catalogo?category=${category.slug}`)
  }

  function handleBackToCategories() {
    navigate('/catalogo')
  }

  function handleProductClick(product) {
    navigate(`/producto/${product.id}`)
  }

  function handleAddToCartDirect(product) {
    setDirectAddMessage(`¡"${product.name}" agregado al carrito! (Simulado)`)
    setTimeout(() => {
      setDirectAddMessage('')
    }, 4000)
  }

  return (
    <section className="catalog-page" aria-labelledby="catalog-title">
      <div className="catalog-page__header">
        <p className="page-section__eyebrow">Catalogo</p>
        <h1 id="catalog-title">
          {searchQuery 
            ? `Resultados para "${searchQuery}"` 
            : (selectedCategory ? selectedCategory.name : 'Explorar productos')
          }
        </h1>
        <p>
          {searchQuery
            ? `Mostrando productos que coinciden con tu búsqueda.`
            : (selectedCategory
              ? selectedCategory.description
              : 'Encuentra rapido la categoria que necesitas y empieza a descubrir productos de VendeFacil.')}
        </p>
      </div>

      {isLoadingCategories && (
        <div className="catalog-state">
          <PackageSearch size={30} strokeWidth={2} />
          <p>Cargando categorias...</p>
        </div>
      )}

      {!isLoadingCategories && error && (
        <div className="catalog-state catalog-state--error">
          <PackageSearch size={30} strokeWidth={2} />
          <p>{error}</p>
        </div>
      )}

      {!isLoadingCategories && !error && !selectedCategory && !searchQuery && (
        <div className="catalog-grid">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug] ?? PackageSearch
            const isInactive = !category.is_active

            if (isInactive) {
              return (
                <div
                  className="catalog-card catalog-card--disabled"
                  key={category.id}
                >
                  <Icon className="catalog-card__icon" size={34} strokeWidth={2.1} />
                  <div>
                    <h2>{category.name} <span className="inactive-badge">(Inactiva)</span></h2>
                    <p>{category.description}</p>
                    <span className="inactive-text">No disponible</span>
                  </div>
                </div>
              )
            }

            return (
              <button
                className="catalog-card"
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category)}
              >
                <Icon className="catalog-card__icon" size={34} strokeWidth={2.1} />
                <div>
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                  <span>{category.products_count} productos</span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {(selectedCategory || searchQuery) && (
        <div className="catalog-toolbar">
          <button type="button" onClick={handleBackToCategories}>
            <Undo2 size={18} strokeWidth={2.2} />
            Categorias
          </button>
        </div>
      )}

      {(selectedCategory || searchQuery) && isLoadingProducts && (
        <div className="catalog-state">
          <PackageSearch size={30} strokeWidth={2} />
          <p>Cargando productos...</p>
        </div>
      )}

      {(selectedCategory || searchQuery) && !isLoadingProducts && !error && (
        <div className="catalog-grid">
          {products.map((product) => {
            const isProductInactive = !product.is_active
            return (
              <article className={`product-card ${isProductInactive ? 'product-card--disabled' : ''}`} key={product.id}>
                <div 
                  className="product-card__media" 
                  style={{ cursor: isProductInactive ? 'not-allowed' : 'pointer' }}
                  onClick={() => !isProductInactive && handleProductClick(product)}
                >
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <PackageSearch size={44} strokeWidth={1.8} />
                  )}
                </div>
                <div 
                  className="product-card__body"
                  style={{ cursor: isProductInactive ? 'not-allowed' : 'pointer' }}
                  onClick={() => !isProductInactive && handleProductClick(product)}
                >
                  <p className="product-card__category">
                    {product.category?.name ?? 'Sin categoria'}
                    {isProductInactive && <span className="inactive-badge"> (Inactivo)</span>}
                  </p>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                </div>
                <div className="product-card__footer">
                  <div>
                    <strong>{formatPrice(Number(product.price))}</strong>
                    <span>{isProductInactive ? 'No disponible' : `${product.stock} disponibles`}</span>
                  </div>
                  {!isProductInactive && (
                    <button 
                      type="button" 
                      className="product-card__view-btn"
                      onClick={() => handleProductClick(product)}
                    >
                      Ver producto
                    </button>
                  )}
                </div>
              </article>
            )
          })}

          {products.length === 0 && (
            <div className="catalog-state">
              <PackageSearch size={30} strokeWidth={2} />
              <p>No se encontraron productos activos.</p>
            </div>
          )}
        </div>
      )}

      {/* Floating Direct Cart Addition Alert */}
      {directAddMessage && (
        <div className="catalog-toast-alert">
          <span>{directAddMessage}</span>
        </div>
      )}
    </section>
  )
}
