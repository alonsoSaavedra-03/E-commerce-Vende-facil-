import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PackageSearch, ShoppingCart, Undo2 } from 'lucide-react'
import { getProduct, getSettings } from '../../services/api'
import './ProductDetailPage.css'

export function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [product, setProduct] = useState(null)
  const [settings, setSettings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    getSettings()
      .then(({ data }) => setSettings(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setError('')
    
    getProduct(id)
      .then(({ data }) => {
        setProduct(data)
        if (!data.is_active) {
          setError('Este producto no está disponible temporalmente.')
        }
      })
      .catch((err) => {
        console.error(err)
        setError('No pudimos cargar los detalles del producto. Verifica tu conexión.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const formatPrice = (price) => {
    const currency = settings?.store_currency || 'PEN'
    const locale = currency === 'USD' ? 'en-US' : currency === 'EUR' ? 'fr-FR' : 'es-PE'
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(price)
  }

  function increaseQty() {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  function decreaseQty() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  function handleAddToCart() {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 4500)
  }

  if (isLoading) {
    return (
      <div className="catalog-state" style={{ height: '70vh', justifyContent: 'center', border: 'none', background: 'transparent', boxShadow: 'none' }}>
        <PackageSearch className="animate-spin" size={40} strokeWidth={1.8} style={{ animation: 'spin 1.2s linear infinite', color: 'var(--color-brand)' }} />
        <p>Cargando producto...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="catalog-page">
        <div className="catalog-toolbar">
          <button type="button" onClick={() => navigate('/catalogo')}>
            <Undo2 size={18} strokeWidth={2.2} />
            Volver al catálogo
          </button>
        </div>
        <div className="catalog-state catalog-state--error" style={{ marginTop: '20px' }}>
          <PackageSearch size={30} strokeWidth={2} />
          <p>{error || 'Producto no encontrado.'}</p>
        </div>
      </div>
    )
  }

  const isOutOfStock = product.stock <= 0

  return (
    <section className="catalog-page product-detail-view" aria-labelledby="detail-title">
      <div className="catalog-toolbar">
        <button type="button" onClick={() => navigate(-1)}>
          <Undo2 size={18} strokeWidth={2.2} />
          Volver
        </button>
      </div>

      <div className="product-detail-grid">
        {/* Left Column: Image */}
        <div className="product-detail__media">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <PackageSearch size={120} strokeWidth={1.2} />
          )}
        </div>

        {/* Right Column: Info */}
        <div className="product-detail__body">
          <p className="product-detail__category">
            {product.category?.name ?? 'Sin categoría'}
          </p>
          <h1 id="detail-title" className="product-detail__title">{product.name}</h1>
          
          <p className="product-detail__description">
            {product.description || 'Este producto no cuenta con una descripción detallada todavía.'}
          </p>

          <div className="product-detail__price-stock">
            <div className="detail-price">
              <span className="price-label">Precio</span>
              <strong>{formatPrice(Number(product.price))}</strong>
            </div>
            <div className="detail-stock">
              <span className="stock-label">Disponibilidad</span>
              <span className={`stock-badge ${isOutOfStock ? 'stock-badge--empty' : 'stock-badge--ok'}`}>
                {isOutOfStock ? 'Agotado' : `${product.stock} unidades disponibles`}
              </span>
            </div>
          </div>

          {!isOutOfStock && (
            <div className="product-detail__actions">
              <div className="qty-selector">
                <button 
                  type="button" 
                  onClick={decreaseQty} 
                  disabled={quantity <= 1}
                  aria-label="Disminuir cantidad"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  type="button" 
                  onClick={increaseQty} 
                  disabled={quantity >= product.stock}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <button 
                type="button" 
                className="btn-add-cart-large"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} strokeWidth={2.2} />
                <span>Agregar al carrito</span>
              </button>
            </div>
          )}

          {showToast && (
            <div className="success-add-toast">
              <span className="toast-icon">✓</span>
              <span>¡Se agregaron {quantity} unidad(es) de "{product.name}" al carrito! (Simulado)</span>
            </div>
          )}
        </div>
      </div>

      {/* Specifications Section */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div className="product-detail-specs">
          <h2>Especificaciones Técnicas</h2>
          <table className="specs-table">
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
