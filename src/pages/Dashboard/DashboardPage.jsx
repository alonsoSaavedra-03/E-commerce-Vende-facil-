import { useState, useEffect } from 'react'
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  LayoutDashboard,
  Users,
  Tags,
  Boxes,
  UserCog,
  Settings,
} from 'lucide-react'
import './DashboardPage.css'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getDashboardStats,
  getSettings,
  saveSettings,
  clearSystemCache,
  seedSystemDatabase,
} from '../../services/api'

// Import sub-components
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { InicioTab } from './components/InicioTab'
import { UsersTab } from './components/UsersTab'
import { CategoriesTab } from './components/CategoriesTab'
import { ProductsTab } from './components/ProductsTab'
import { CustomersTab } from './components/CustomersTab'
import { SettingsTab } from './components/SettingsTab'
import { CrudDrawer } from './components/CrudDrawer'

const menuItems = [
  { label: 'Inicio', icon: LayoutDashboard, id: 'inicio' },
  { label: 'Usuarios', icon: Users, id: 'users' },
  { label: 'Categorias', icon: Tags, id: 'categories' },
  { label: 'Productos', icon: Boxes, id: 'products' },
  { label: 'Clientes', icon: UserCog, id: 'customers' },
  { label: 'Ajustes', icon: Settings, id: 'settings' },
]

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('inicio')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [customers, setCustomers] = useState([])
  const [stats, setStats] = useState({
    total_categories: 0,
    total_products: 0,
    total_stock: 0,
    average_price: 0,
    active_categories: 0,
    active_products: 0,
    recent_products: [],
    recent_categories: [],
    category_stats: [],
  })
  
  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  // Search/Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('')

  // Form Drawer state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formType, setFormType] = useState('category') // 'category', 'product', 'user', 'customer'
  const [formMode, setFormMode] = useState('create') // 'create' or 'edit'
  const [editingId, setEditingId] = useState(null)
  
  // Form values
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    is_active: true,
  })

  const [productForm, setProductForm] = useState({
    category_id: '',
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    imageFile: null,
    specifications: [],
    is_active: true,
  })

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    is_active: true,
  })

  const [customerForm, setCustomerForm] = useState({
    user_id: '',
    phone: '',
    address: '',
  })

  const [settingsForm, setSettingsForm] = useState({
    store_name: '',
    store_email: '',
    store_phone: '',
    store_currency: 'PEN',
    store_shipping_fee: '0',
    store_free_shipping_threshold: '0',
    store_address: '',
    system_maintenance: '0',
    home_banners: '',
  })

  // Load data based on tab
  useEffect(() => {
    setError('')
    setSuccessMessage('')
    setSearchQuery('')
    
    if (activeTab === 'inicio') {
      fetchStats()
    } else if (activeTab === 'categories') {
      fetchCategories()
    } else if (activeTab === 'products') {
      fetchProducts()
      fetchCategories(true) // We need categories for product creation dropdown
    } else if (activeTab === 'users') {
      fetchUsers()
    } else if (activeTab === 'customers') {
      fetchCustomers()
      fetchUsers(true) // We need users to select user_id in customer dropdown
    } else if (activeTab === 'settings') {
      fetchSettings()
    }
  }, [activeTab])

  // Clear messages after 4 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 4000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 6000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      const data = await getDashboardStats()
      setStats(data)
    } catch (err) {
      console.error(err)
      setError('Error al cargar las estadísticas del servidor.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async (silent = false) => {
    if (!silent) setIsLoading(true)
    try {
      const { data } = await getCategories(true) // Get all for dashboard
      setCategories(data)
    } catch (err) {
      console.error(err)
      setError('Error al cargar las categorías. Verifica la conexión con el servidor.')
    } finally {
      if (!silent) setIsLoading(false)
    }
  }

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const { data } = await getProducts(true) // Get all for dashboard
      setProducts(data)
    } catch (err) {
      console.error(err)
      setError('Error al cargar los productos. Verifica la conexión con el servidor.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUsers = async (silent = false) => {
    if (!silent) setIsLoading(true)
    try {
      const { data } = await getUsers()
      setUsers(data)
    } catch (err) {
      console.error(err)
      setError('Error al cargar los usuarios. Verifica la conexión con el servidor.')
    } finally {
      if (!silent) setIsLoading(false)
    }
  }

  const fetchCustomers = async () => {
    setIsLoading(true)
    try {
      const { data } = await getCustomers()
      setCustomers(data)
    } catch (err) {
      console.error(err)
      setError('Error al cargar los clientes. Verifica la conexión con el servidor.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSettings = async () => {
    setIsLoading(true)
    try {
      const { data } = await getSettings()
      setSettingsForm({
        store_name: data.store_name || '',
        store_email: data.store_email || '',
        store_phone: data.store_phone || '',
        store_currency: data.store_currency || 'PEN',
        store_shipping_fee: data.store_shipping_fee || '0',
        store_free_shipping_threshold: data.store_free_shipping_threshold || '0',
        store_address: data.store_address || '',
        system_maintenance: data.system_maintenance || '0',
        home_banners: data.home_banners || '',
      })
    } catch (err) {
      console.error(err)
      setError('Error al cargar la configuración de la tienda.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? (checked ? '1' : '0') : value
    setSettingsForm((prev) => ({ ...prev, [name]: val }))
  }

  const handleSettingsSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await saveSettings(settingsForm)
      setSuccessMessage('Configuración de la tienda guardada con éxito.')
    } catch (err) {
      console.error(err)
      setError('Error al guardar la configuración de la tienda.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearCache = async () => {
    setIsLoading(true)
    try {
      const response = await clearSystemCache()
      setSuccessMessage(response.message || 'Caché del sistema limpia.')
    } catch (err) {
      console.error(err)
      setError('Error al limpiar la caché del sistema.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSeedDatabase = async () => {
    if (window.confirm('¡ATENCIÓN! Estás a punto de restablecer la base de datos completa. Se borrarán todos los registros y se restaurarán los datos de prueba iniciales. ¿Deseas continuar?')) {
      setIsLoading(true)
      try {
        const response = await seedSystemDatabase()
        setSuccessMessage(response.message || 'Base de datos restablecida con éxito.')
        fetchStats()
      } catch (err) {
        console.error(err)
        setError('Error al restablecer la base de datos.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars
      .replace(/[\s-]+/g, '-') // Replace spaces and hyphens with single hyphen
      .replace(/^-+|-+$/g, '') // Trim leading/trailing hyphens
  }

  const handleCategoryChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    
    setCategoryForm((prev) => {
      const updated = { ...prev, [name]: val }
      if (name === 'name' && formMode === 'create') {
        updated.slug = slugify(value)
      }
      return updated
    })
  }

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value

    setProductForm((prev) => {
      const updated = { ...prev, [name]: val }
      if (name === 'name' && formMode === 'create') {
        updated.slug = slugify(value)
      }
      return updated
    })
  }

  const handleUserChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setUserForm((prev) => ({ ...prev, [name]: val }))
  }

  const handleCustomerChange = (e) => {
    const { name, value } = e.target
    setCustomerForm((prev) => ({ ...prev, [name]: value }))
  }

  // Open forms for create
  const openCreateCategory = () => {
    setCategoryForm({ name: '', slug: '', description: '', is_active: true })
    setFormType('category')
    setFormMode('create')
    setValidationErrors({})
    setIsFormOpen(true)
  }

  const openCreateProduct = () => {
    setProductForm({
      category_id: categories.length > 0 ? categories[0].id : '',
      name: '',
      slug: '',
      description: '',
      price: '',
      stock: '',
      image: '',
      imageFile: null,
      specifications: [],
      is_active: true,
    })
    setFormType('product')
    setFormMode('create')
    setValidationErrors({})
    setIsFormOpen(true)
  }

  const openCreateUser = () => {
    setUserForm({ name: '', email: '', password: '', role: 'customer', is_active: true })
    setFormType('user')
    setFormMode('create')
    setValidationErrors({})
    setIsFormOpen(true)
  }

  const openCreateCustomer = () => {
    const existingUserIds = customers.map((c) => c.user_id.toString())
    const availableUsers = users.filter((u) => !existingUserIds.includes(u.id.toString()))
    setCustomerForm({
      user_id: availableUsers.length > 0 ? availableUsers[0].id : '',
      phone: '',
      address: '',
    })
    setFormType('customer')
    setFormMode('create')
    setValidationErrors({})
    setIsFormOpen(true)
  }

  // Open forms for edit
  const openEditCategory = (category) => {
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      is_active: !!category.is_active,
    })
    setEditingId(category.id)
    setFormType('category')
    setFormMode('edit')
    setValidationErrors({})
    setIsFormOpen(true)
  }

  const openEditProduct = (product) => {
    const specsArray = []
    if (product.specifications && typeof product.specifications === 'object') {
      Object.entries(product.specifications).forEach(([k, v]) => {
        specsArray.push({ key: k, value: v })
      })
    }

    setProductForm({
      category_id: product.category_id,
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      image: product.image || '',
      imageFile: null,
      specifications: specsArray,
      is_active: !!product.is_active,
    })
    setEditingId(product.id)
    setFormType('product')
    setFormMode('edit')
    setValidationErrors({})
    setIsFormOpen(true)
  }

  const openEditUser = (user) => {
    setUserForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      is_active: !!user.is_active,
    })
    setEditingId(user.id)
    setFormType('user')
    setFormMode('edit')
    setValidationErrors({})
    setIsFormOpen(true)
  }

  const openEditCustomer = (customer) => {
    setCustomerForm({
      user_id: customer.user_id,
      phone: customer.phone || '',
      address: customer.address || '',
    })
    setEditingId(customer.id)
    setFormType('customer')
    setFormMode('edit')
    setValidationErrors({})
    setIsFormOpen(true)
  }

  // Form Submit
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    setValidationErrors({})
    setIsLoading(true)

    try {
      if (formMode === 'create') {
        await createCategory(categoryForm)
        setSuccessMessage('Categoría creada correctamente.')
      } else {
        await updateCategory(editingId, categoryForm)
        setSuccessMessage('Categoría actualizada correctamente.')
      }
      setIsFormOpen(false)
      fetchCategories()
    } catch (err) {
      console.error(err)
      if (err.errors) {
        setValidationErrors(err.errors)
      } else {
        setError(err.message || 'Ocurrió un error al guardar la categoría.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddSpecRow = () => {
    setProductForm((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }],
    }))
  }

  const handleRemoveSpecRow = (index) => {
    setProductForm((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }))
  }

  const handleSpecRowChange = (index, field, value) => {
    setProductForm((prev) => {
      const updatedSpecs = [...prev.specifications]
      updatedSpecs[index] = { ...updatedSpecs[index], [field]: value }
      return {
        ...prev,
        specifications: updatedSpecs,
      }
    })
  }

  const handleProductFileChange = (e) => {
    const file = e.target.files[0] || null
    setProductForm((prev) => ({
      ...prev,
      imageFile: file,
    }))
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    setValidationErrors({})
    setIsLoading(true)

    // Convert specs array of {key, value} back to {Key: Value} object
    const specsObj = {}
    if (productForm.specifications && Array.isArray(productForm.specifications)) {
      productForm.specifications.forEach((spec) => {
        if (spec.key.trim()) {
          specsObj[spec.key.trim()] = spec.value
        }
      })
    }

    // Format fields inside FormData for multipart file upload
    const formData = new FormData()
    formData.append('category_id', productForm.category_id)
    formData.append('name', productForm.name)
    formData.append('slug', productForm.slug)
    formData.append('description', productForm.description || '')
    formData.append('price', productForm.price)
    formData.append('stock', productForm.stock)
    formData.append('is_active', productForm.is_active ? '1' : '0')
    formData.append('specifications', JSON.stringify(specsObj))

    if (productForm.imageFile) {
      formData.append('image', productForm.imageFile)
    } else if (productForm.image) {
      formData.append('image', productForm.image)
    }

    try {
      if (formMode === 'create') {
        await createProduct(formData)
        setSuccessMessage('Producto creado correctamente.')
      } else {
        await updateProduct(editingId, formData)
        setSuccessMessage('Producto actualizado correctamente.')
      }
      setIsFormOpen(false)
      fetchProducts()
    } catch (err) {
      console.error(err)
      if (err.errors) {
        setValidationErrors(err.errors)
      } else {
        setError(err.message || 'Ocurrió un error al guardar el producto.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserSubmit = async (e) => {
    e.preventDefault()
    setValidationErrors({})
    setIsLoading(true)

    try {
      if (formMode === 'create') {
        await createUser(userForm)
        setSuccessMessage('Usuario creado correctamente.')
      } else {
        await updateUser(editingId, userForm)
        setSuccessMessage('Usuario actualizado correctamente.')
      }
      setIsFormOpen(false)
      fetchUsers()
    } catch (err) {
      console.error(err)
      if (err.errors) {
        setValidationErrors(err.errors)
      } else {
        setError(err.message || 'Ocurrió un error al guardar el usuario.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCustomerSubmit = async (e) => {
    e.preventDefault()
    setValidationErrors({})
    setIsLoading(true)

    try {
      if (formMode === 'create') {
        await createCustomer(customerForm)
        setSuccessMessage('Cliente creado correctamente.')
      } else {
        await updateCustomer(editingId, customerForm)
        setSuccessMessage('Cliente actualizado correctamente.')
      }
      setIsFormOpen(false)
      fetchCustomers()
    } catch (err) {
      console.error(err)
      if (err.errors) {
        setValidationErrors(err.errors)
      } else {
        setError(err.message || 'Ocurrió un error al guardar el cliente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Direct Status Toggle Handlers
  const handleToggleCategoryActive = async (category) => {
    const updatedStatus = !category.is_active
    try {
      await updateCategory(category.id, {
        name: category.name,
        slug: category.slug,
        description: category.description,
        is_active: updatedStatus,
      })
      setSuccessMessage(`Estado de categoría "${category.name}" actualizado.`)
      fetchCategories(true)
    } catch (err) {
      console.error(err)
      setError('No se pudo actualizar el estado de la categoría.')
    }
  }

  const handleToggleProductActive = async (product) => {
    const updatedStatus = !product.is_active
    try {
      await updateProduct(product.id, {
        category_id: product.category_id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        is_active: updatedStatus,
      })
      setSuccessMessage(`Estado de producto "${product.name}" actualizado.`)
      fetchProducts()
    } catch (err) {
      console.error(err)
      setError('No se pudo actualizar el estado del producto.')
    }
  }

  const handleToggleUserActive = async (user) => {
    const updatedStatus = !user.is_active
    try {
      await updateUser(user.id, {
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: updatedStatus,
      })
      setSuccessMessage(`Estado de usuario "${user.name}" actualizado.`)
      fetchUsers()
    } catch (err) {
      console.error(err)
      setError('No se pudo actualizar el estado del usuario.')
    }
  }

  // Delete Handlers
  const handleDeleteCategory = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría "${name}"? Esto afectará a sus productos.`)) {
      setIsLoading(true)
      try {
        await deleteCategory(id)
        setSuccessMessage('Categoría eliminada correctamente.')
        fetchCategories()
      } catch (err) {
        console.error(err)
        setError('No se pudo eliminar la categoría.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${name}"?`)) {
      setIsLoading(true)
      try {
        await deleteProduct(id)
        setSuccessMessage('Producto eliminado correctamente.')
        fetchProducts()
      } catch (err) {
        console.error(err)
        setError('No se pudo eliminar el producto.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDeleteUser = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${name}"? Esto eliminará también su perfil de cliente asociado.`)) {
      setIsLoading(true)
      try {
        await deleteUser(id)
        setSuccessMessage('Usuario eliminado correctamente.')
        fetchUsers()
      } catch (err) {
        console.error(err)
        setError('No se pudo eliminar al usuario.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDeleteCustomer = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el perfil de cliente de "${name}"?`)) {
      setIsLoading(true)
      try {
        await deleteCustomer(id)
        setSuccessMessage('Perfil de cliente eliminado correctamente.')
        fetchCustomers()
      } catch (err) {
        console.error(err)
        setError('No se pudo eliminar al cliente.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Filter listings
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cat.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (prod.description && prod.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategoryFilter === '' || prod.category_id.toString() === selectedCategoryFilter
    return matchesSearch && matchesCategory
  })

  const filteredUsers = users.filter((u) => {
    const term = searchQuery.toLowerCase()
    return u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term) || u.role.toLowerCase().includes(term)
  })

  const filteredCustomers = customers.filter((c) => {
    const term = searchQuery.toLowerCase()
    const userName = c.user?.name?.toLowerCase() || ''
    const userEmail = c.user?.email?.toLowerCase() || ''
    const phone = c.phone?.toLowerCase() || ''
    const address = c.address?.toLowerCase() || ''
    return userName.includes(term) || userEmail.includes(term) || phone.includes(term) || address.includes(term)
  })

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={menuItems}
      />

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Alerts / Feedback Banner */}
        {successMessage && (
          <div className="dashboard-alert dashboard-alert--success">
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        )}
        {error && (
          <div className="dashboard-alert dashboard-alert--error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Topbar */}
        <Topbar
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          openCreateCategory={openCreateCategory}
          openCreateProduct={openCreateProduct}
          openCreateUser={openCreateUser}
          openCreateCustomer={openCreateCustomer}
        />

        {/* Loading Overlay */}
        {isLoading && !isFormOpen && (
          <div className="dashboard-loader-container">
            <Loader2 className="animate-spin animate-spin-custom" size={40} />
            <p>Cargando datos del servidor...</p>
          </div>
        )}

        {/* Dynamic Views */}
        {!isLoading && activeTab === 'inicio' && (
          <InicioTab stats={stats} storeCurrency={settingsForm.store_currency || 'PEN'} />
        )}

        {!isLoading && activeTab === 'users' && (
          <UsersTab
            filteredUsers={filteredUsers}
            handleToggleUserActive={handleToggleUserActive}
            openEditUser={openEditUser}
            handleDeleteUser={handleDeleteUser}
          />
        )}

        {!isLoading && activeTab === 'categories' && (
          <CategoriesTab
            filteredCategories={filteredCategories}
            handleToggleCategoryActive={handleToggleCategoryActive}
            openEditCategory={openEditCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
        )}

        {!isLoading && activeTab === 'products' && (
          <ProductsTab
            filteredProducts={filteredProducts}
            categories={categories}
            selectedCategoryFilter={selectedCategoryFilter}
            setSelectedCategoryFilter={setSelectedCategoryFilter}
            handleToggleProductActive={handleToggleProductActive}
            openEditProduct={openEditProduct}
            handleDeleteProduct={handleDeleteProduct}
            storeCurrency={settingsForm.store_currency || 'PEN'}
          />
        )}

        {!isLoading && activeTab === 'customers' && (
          <CustomersTab
            filteredCustomers={filteredCustomers}
            openEditCustomer={openEditCustomer}
            handleDeleteCustomer={handleDeleteCustomer}
          />
        )}

        {!isLoading && activeTab === 'settings' && (
          <SettingsTab
            settingsForm={settingsForm}
            setSettingsForm={setSettingsForm}
            categories={categories}
            handleSettingsChange={handleSettingsChange}
            handleSettingsSubmit={handleSettingsSubmit}
            handleClearCache={handleClearCache}
            handleSeedDatabase={handleSeedDatabase}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Drawer Overlay for CRUD Forms */}
      <CrudDrawer
        storeCurrency={settingsForm.store_currency || 'PEN'}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        formType={formType}
        formMode={formMode}
        isLoading={isLoading}
        validationErrors={validationErrors}
        categoryForm={categoryForm}
        handleCategoryChange={handleCategoryChange}
        handleCategorySubmit={handleCategorySubmit}
        productForm={productForm}
        handleProductChange={handleProductChange}
        handleProductSubmit={handleProductSubmit}
        categories={categories}
        userForm={userForm}
        handleUserChange={handleUserChange}
        handleUserSubmit={handleUserSubmit}
        customerForm={customerForm}
        handleCustomerChange={handleCustomerChange}
        handleCustomerSubmit={handleCustomerSubmit}
        users={users}
        handleAddSpecRow={handleAddSpecRow}
        handleRemoveSpecRow={handleRemoveSpecRow}
        handleSpecRowChange={handleSpecRowChange}
        handleProductFileChange={handleProductFileChange}
      />
    </div>
  )
}
