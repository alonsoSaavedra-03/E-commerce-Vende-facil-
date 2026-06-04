import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Trash2, ShoppingCart, Undo2, MessageCircle, Minus, Plus } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { getSettings } from '../../services/api'
import './CartPage.css'

export function CartPage() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart()
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

  const handleQuoteWhatsapp = () => {
    const storeName = settings?.store_name || 'VendeFácil'
    let message = `Hola ${storeName}, me gustaría cotizar el siguiente pedido:\n\n`
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Cant: ${item.quantity}) - Subtotal: ${formatPrice(item.price * item.quantity)}\n`
    })
    message += `\n*Total estimado: ${formatPrice(getCartTotal())}*`
    const phone = settings?.store_phone ? settings.store_phone.replace(/\D/g, '') : '51999999999'
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty-state">
        <ShoppingCart size={64} strokeWidth={1.5} className="cart-empty-icon" />
        <h1>Tu carrito está vacío</h1>
        <p>Parece que aún no has agregado productos a tu carrito. ¡Explora nuestro catálogo y encuentra lo que necesitas!</p>
        <button type="button" onClick={() => navigate('/catalogo')} className="btn-return-shop">
          Ir al catálogo
        </button>
      </div>
    )
  }

  return (
    <section className="cart-page-container">
      <div className="cart-page-header">
        <p className="page-section__eyebrow">Tu Compra</p>
        <h1>Carrito de Compras</h1>
      </div>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-section">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <ShoppingCart size={32} />
                )}
              </div>
              <div className="cart-item-details">
                <span className="cart-item-category">{item.category?.name || 'Producto'}</span>
                <Link to={`/producto/${item.id}`} className="cart-item-name">{item.name}</Link>
                <span className="cart-item-price-unit">Precio unitario: {formatPrice(Number(item.price))}</span>
              </div>
              <div className="cart-item-quantity">
                <div className="qty-selector mini-qty">
                  <button 
                    type="button" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    type="button" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="cart-item-stock-limit">Máx. {item.stock}</span>
              </div>
              <div className="cart-item-subtotal">
                <span className="subtotal-label">Subtotal</span>
                <strong>{formatPrice(Number(item.price) * item.quantity)}</strong>
              </div>
              <button 
                type="button" 
                className="btn-remove-item"
                onClick={() => removeFromCart(item.id)}
                aria-label="Eliminar producto"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <div className="cart-list-footer">
            <button type="button" onClick={clearCart} className="btn-clear-cart">
              Vaciar carrito
            </button>
            <button type="button" onClick={() => navigate('/catalogo')} className="btn-continue-shopping">
              <Undo2 size={16} />
              <span>Seguir comprando</span>
            </button>
          </div>
        </div>

        {/* Order Summary Panel */}
        <div className="cart-summary-panel">
          <h2>Resumen de Pedido</h2>
          
          <div className="summary-row">
            <span>Productos ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span className="free-badge">Gratis (Simulado)</span>
          </div>
          
          <div className="summary-total">
            <span>Total Estimado</span>
            <strong>{formatPrice(getCartTotal())}</strong>
          </div>

          <button 
            type="button" 
            className="btn-checkout-whatsapp"
            onClick={handleQuoteWhatsapp}
          >
            <MessageCircle size={20} strokeWidth={2.2} />
            <span>Cotizar pedido por WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  )
}
