import { useEffect, useState } from 'react'
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
import { getCategories, getProductsByCategory } from '../../services/api'
import './CatalogPage.css'

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

const categoryIcons = {
  deportes: Dumbbell,
  electronicos: Laptop,
  hogar: Armchair,
  libros: BookOpen,
  moda: Shirt,
}

export function CatalogPage() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [error, setError] = useState('')

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

  function handleCategoryClick(category) {
    setSelectedCategory(category)
    setProducts([])
    setError('')
    setIsLoadingProducts(true)

    getProductsByCategory(category.slug)
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

  function handleBackToCategories() {
    setSelectedCategory(null)
    setProducts([])
    setError('')
  }

  return (
    <section className="catalog-page" aria-labelledby="catalog-title">
      <div className="catalog-page__header">
        <p className="page-section__eyebrow">Catalogo</p>
        <h1 id="catalog-title">{selectedCategory ? selectedCategory.name : 'Explorar productos'}</h1>
        <p>
          {selectedCategory
            ? selectedCategory.description
            : 'Encuentra rapido la categoria que necesitas y empieza a descubrir productos de VendeFacil.'}
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

      {!isLoadingCategories && !error && !selectedCategory && (
        <div className="catalog-grid">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug] ?? PackageSearch

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

      {selectedCategory && (
        <div className="catalog-toolbar">
          <button type="button" onClick={handleBackToCategories}>
            <Undo2 size={18} strokeWidth={2.2} />
            Categorias
          </button>
        </div>
      )}

      {selectedCategory && isLoadingProducts && (
        <div className="catalog-state">
          <PackageSearch size={30} strokeWidth={2} />
          <p>Cargando productos...</p>
        </div>
      )}

      {selectedCategory && !isLoadingProducts && !error && (
        <div className="catalog-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-card__media">
                <PackageSearch size={44} strokeWidth={1.8} />
              </div>
              <div className="product-card__body">
                <p className="product-card__category">{product.category?.name ?? 'Sin categoria'}</p>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>
              <div className="product-card__footer">
                <div>
                  <strong>{currencyFormatter.format(Number(product.price))}</strong>
                  <span>{product.stock} disponibles</span>
                </div>
                <button type="button" aria-label={`Agregar ${product.name} al carrito`}>
                  <ShoppingCart size={18} strokeWidth={2.2} />
                </button>
              </div>
            </article>
          ))}

          {products.length === 0 && (
            <div className="catalog-state">
              <PackageSearch size={30} strokeWidth={2} />
              <p>No hay productos activos en esta categoria.</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
