# COMPREHENSIVE POS SYSTEM API INTEGRATION PROMPT

## Project Context
You are integrating a complete POS (Point of Sale) system API into an existing React + Tailwind CSS responsive UI. The backend API documentation is available at: https://jackmabasuadmin.codexitbd.com/docs

**Base URL**: `https://jackmabasuadmin.codexitbd.com`

---

## TASK 1: PROJECT SETUP & DEPENDENCIES

### 1.1 Install Required Libraries
```bash
npm install axios @tanstack/react-query zustand
npm install @tanstack/react-query-devtools --save-dev
```

### 1.2 Core Library Purposes
- **Axios**: HTTP client for API requests with interceptors
- **TanStack Query (React Query)**: Server state management, caching, background updates
- **Zustand**: Client-side state management (cart, user preferences, filters)
- **React Query DevTools**: Development debugging tool

---

## TASK 2: CONFIGURATION & API CLIENT SETUP

### 2.1 Create Axios Instance
**File**: `src/api/axiosConfig.js`

```javascript
import axios from 'axios';

const API_BASE_URL = 'https://jackmabasuadmin.codexitbd.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available (for customer endpoints)
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('customer');
      window.location.href = '/login';
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response?.data?.message);
    }
    
    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server error:', error.response?.data);
    }
    
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
```

### 2.2 Setup React Query Provider
**File**: `src/main.jsx` or `src/App.jsx`

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

## TASK 3: API SERVICE LAYER ARCHITECTURE

Create modular API services for each domain:

### 3.1 Product API Service
**File**: `src/api/services/productService.js`

```javascript
import apiClient from '../axiosConfig';

export const productService = {
  // Get all products with filters
  getAllProducts: (params = {}) => {
    return apiClient.get('/products', { params });
  },

  // Get single product by slug
  getProductBySlug: (slug) => {
    return apiClient.get(`/products/${slug}`);
  },

  // POS specific: Get products for POS
  getPOSProducts: (params = {}) => {
    return apiClient.get('/pos-products', { params });
  },

  // POS specific: Get product by barcode
  getProductByBarcode: (barcode) => {
    return apiClient.get(`/pos-products/barcode/${barcode}`);
  },
};
```

### 3.2 Category API Service
**File**: `src/api/services/categoryService.js`

```javascript
import apiClient from '../axiosConfig';

export const categoryService = {
  // Get all categories (paginated)
  getAllCategories: (params = {}) => {
    return apiClient.get('/product-categories', { params });
  },

  // Get categories as tree (for navigation menu)
  getCategoryTree: (params = {}) => {
    return apiClient.get('/product-categories/tree', { params });
  },

  // Get single category
  getCategoryBySlug: (slug) => {
    return apiClient.get(`/product-categories/${slug}`);
  },
};
```

### 3.3 Brand API Service
**File**: `src/api/services/brandService.js`

```javascript
import apiClient from '../axiosConfig';

export const brandService = {
  getAllBrands: (params = {}) => {
    return apiClient.get('/brands', { params });
  },

  getBrandBySlug: (slug) => {
    return apiClient.get(`/brands/${slug}`);
  },
};
```

### 3.4 Order API Service
**File**: `src/api/services/orderService.js`

```javascript
import apiClient from '../axiosConfig';

export const orderService = {
  // Guest checkout
  guestCheckout: (orderData) => {
    return apiClient.post('/orders/guest-checkout', orderData);
  },

  // Authenticated user order
  createOrder: (orderData) => {
    return apiClient.post('/orders', orderData);
  },

  // Get customer order history
  getOrders: (params = {}) => {
    return apiClient.get('/orders', { params });
  },

  // Get specific order details
  getOrderById: (orderId) => {
    return apiClient.get(`/orders/${orderId}`);
  },
};
```

### 3.5 Payment & Shipping API Service
**File**: `src/api/services/checkoutService.js`

```javascript
import apiClient from '../axiosConfig';

export const checkoutService = {
  // Get active payment methods
  getPaymentMethods: () => {
    return apiClient.get('/payment-methods');
  },

  // Get active shipping methods
  getShippingMethods: () => {
    return apiClient.get('/shipping-methods');
  },
};
```

### 3.6 Customer/Auth API Service
**File**: `src/api/services/authService.js`

```javascript
import apiClient from '../axiosConfig';

export const authService = {
  // Register new customer
  register: (userData) => {
    return apiClient.post('/customer/register', userData);
  },

  // Login
  login: (credentials) => {
    return apiClient.post('/customer/login', credentials);
  },

  // Google OAuth login
  googleLogin: (googleData) => {
    return apiClient.post('/customer/google-login', googleData);
  },

  // Get profile
  getProfile: () => {
    return apiClient.get('/customer/profile');
  },

  // Logout
  logout: () => {
    return apiClient.post('/customer/logout');
  },

  // Logout all devices
  logoutAll: () => {
    return apiClient.post('/customer/logout-all');
  },

  // Change password
  changePassword: (passwordData) => {
    return apiClient.put('/customer/change-password', passwordData);
  },
};
```

### 3.7 Customer Address API Service
**File**: `src/api/services/addressService.js`

```javascript
import apiClient from '../axiosConfig';

export const addressService = {
  getAddresses: () => {
    return apiClient.get('/customer/addresses');
  },

  addAddress: (addressData) => {
    return apiClient.post('/customer/addresses', addressData);
  },

  updateAddress: (id, addressData) => {
    return apiClient.put(`/customer/addresses/${id}`, addressData);
  },

  deleteAddress: (id) => {
    return apiClient.delete(`/customer/addresses/${id}`);
  },
};
```

### 3.8 Attribute API Service
**File**: `src/api/services/attributeService.js`

```javascript
import apiClient from '../axiosConfig';

export const attributeService = {
  getAllAttributes: (params = {}) => {
    return apiClient.get('/attributes', { params });
  },

  getAttributeById: (identifier) => {
    return apiClient.get(`/attributes/${identifier}`, { params: { with_values: 1 } });
  },

  getAllAttributeValues: (params = {}) => {
    return apiClient.get('/attribute-values', { params });
  },

  getAttributeValueById: (identifier) => {
    return apiClient.get(`/attribute-values/${identifier}`);
  },
};
```



## TASK 4: REACT QUERY HOOKS IMPLEMENTATION

Create custom hooks for each API service using React Query:

### 4.1 Product Hooks
**File**: `src/hooks/useProducts.js`

```javascript
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { productService } from '../api/services/productService';

// Get all products with filters
export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getAllProducts(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes for product list
  });
};

// Infinite scroll for products
export const useInfiniteProducts = (filters = {}) => {
  return useInfiniteQuery({
    queryKey: ['products-infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      productService.getAllProducts({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.current_page;
      const lastPageNum = lastPage.data.last_page;
      return currentPage < lastPageNum ? currentPage + 1 : undefined;
    },
  });
};

// Get single product
export const useProduct = (slug) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug, // Only run if slug exists
    staleTime: 5 * 60 * 1000, // 5 minutes for single product
  });
};

// POS: Get products
export const usePOSProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['pos-products', filters],
    queryFn: () => productService.getPOSProducts(filters),
  });
};

// POS: Get product by barcode
export const useProductByBarcode = (barcode) => {
  return useQuery({
    queryKey: ['product-barcode', barcode],
    queryFn: () => productService.getProductByBarcode(barcode),
    enabled: !!barcode && barcode.length > 3,
  });
};
```

### 4.2 Category Hooks
**File**: `src/hooks/useCategories.js`

```javascript
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../api/services/categoryService';

export const useCategories = (filters = {}) => {
  return useQuery({
    queryKey: ['categories', filters],
    queryFn: () => categoryService.getAllCategories(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
  });
};

export const useCategoryTree = (showInMenu = true) => {
  return useQuery({
    queryKey: ['category-tree', showInMenu],
    queryFn: () => categoryService.getCategoryTree({ menu: showInMenu ? 1 : 0 }),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useCategory = (slug) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};
```

### 4.3 Brand Hooks
**File**: `src/hooks/useBrands.js`

```javascript
import { useQuery } from '@tanstack/react-query';
import { brandService } from '../api/services/brandService';

export const useBrands = (filters = {}) => {
  return useQuery({
    queryKey: ['brands', filters],
    queryFn: () => brandService.getAllBrands(filters),
    staleTime: 10 * 60 * 1000,
  });
};

export const useBrand = (slug) => {
  return useQuery({
    queryKey: ['brand', slug],
    queryFn: () => brandService.getBrandBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};
```

### 4.4 Order Hooks
**File**: `src/hooks/useOrders.js`

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../api/services/orderService';

// Get order history
export const useOrders = (filters = {}) => {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderService.getOrders(filters),
  });
};

// Get single order
export const useOrder = (orderId) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
  });
};

// Create order (authenticated)
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData) => orderService.createOrder(orderData),
    onSuccess: () => {
      // Invalidate orders list to refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// Guest checkout
export const useGuestCheckout = () => {
  return useMutation({
    mutationFn: (orderData) => orderService.guestCheckout(orderData),
  });
};
```

### 4.5 Checkout Hooks
**File**: `src/hooks/useCheckout.js`

```javascript
import { useQuery } from '@tanstack/react-query';
import { checkoutService } from '../api/services/checkoutService';

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: () => checkoutService.getPaymentMethods(),
    staleTime: 30 * 60 * 1000, // 30 minutes - rarely changes
  });
};

export const useShippingMethods = () => {
  return useQuery({
    queryKey: ['shipping-methods'],
    queryFn: () => checkoutService.getShippingMethods(),
    staleTime: 30 * 60 * 1000,
  });
};
```

### 4.6 Auth Hooks
**File**: `src/hooks/useAuth.js`

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/services/authService';

// Get current user profile
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(),
    staleTime: 5 * 60 * 1000,
    retry: false, // Don't retry if unauthorized
  });
};

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('customer', JSON.stringify(data.data.customer));
      // Invalidate profile to refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('customer', JSON.stringify(data.data.customer));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// Google login mutation
export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (googleData) => authService.googleLogin(googleData),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('customer', JSON.stringify(data.data.customer));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('customer');
      queryClient.clear(); // Clear all cache
    },
  });
};

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (passwordData) => authService.changePassword(passwordData),
  });
};
```

### 4.7 Address Hooks
**File**: `src/hooks/useAddresses.js`

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressService } from '../api/services/addressService';

export const useAddresses = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressService.getAddresses(),
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (addressData) => addressService.addAddress(addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => addressService.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => addressService.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};
```

---

## TASK 5: ZUSTAND STATE MANAGEMENT

Create global state stores for client-side data:

### 5.1 Cart Store
**File**: `src/store/cartStore.js`

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      
      // Add item to cart
      addToCart: (product, variant, quantity = 1) => {
        const cartItems = get().cartItems;
        const existingIndex = cartItems.findIndex(
          item => item.product_id === product.id && item.variant_id === variant.id
        );
        
        if (existingIndex !== -1) {
          // Update quantity if item exists
          const updatedCart = [...cartItems];
          updatedCart[existingIndex].quantity += quantity;
          set({ cartItems: updatedCart });
        } else {
          // Add new item
          set({
            cartItems: [
              ...cartItems,
              {
                product_id: product.id,
                variant_id: variant.id,
                product_name: product.name,
                variant_label: variant.attribute_label,
                price: variant.current_price,
                image: variant.image_url,
                quantity,
                stock: variant.stock,
              },
            ],
          });
        }
      },
      
      // Update item quantity
      updateQuantity: (productId, variantId, quantity) => {
        const cartItems = get().cartItems;
        const updatedCart = cartItems.map(item =>
          item.product_id === productId && item.variant_id === variantId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        );
        set({ cartItems: updatedCart });
      },
      
      // Remove item
      removeFromCart: (productId, variantId) => {
        const cartItems = get().cartItems.filter(
          item => !(item.product_id === productId && item.variant_id === variantId)
        );
        set({ cartItems });
      },
      
      // Clear cart
      clearCart: () => set({ cartItems: [] }),
      
      // Get cart total
      getCartTotal: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      // Get cart count
      getCartCount: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);

export default useCartStore;
```

### 5.2 Filter Store
**File**: `src/store/filterStore.js`

```javascript
import { create } from 'zustand';

const useFilterStore = create((set) => ({
  filters: {
    search: '',
    brand_slug: '',
    category_slug: '',
    min_price: '',
    max_price: '',
    in_stock: false,
    on_sale: false,
    sort_by: 'created_at',
    sort_order: 'desc',
    page: 1,
    per_page: 15,
  },
  
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value, page: 1 }, // Reset page on filter change
    })),
  
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    })),
  
  resetFilters: () =>
    set({
      filters: {
        search: '',
        brand_slug: '',
        category_slug: '',
        min_price: '',
        max_price: '',
        in_stock: false,
        on_sale: false,
        sort_by: 'created_at',
        sort_order: 'desc',
        page: 1,
        per_page: 15,
      },
    }),
  
  setPage: (page) =>
    set((state) => ({
      filters: { ...state.filters, page },
    })),
}));

export default useFilterStore;
```

### 5.3 UI Store (for modals, sidebars, etc.)
**File**: `src/store/uiStore.js`

```javascript
import { create } from 'zustand';

const useUIStore = create((set) => ({
  isSidebarOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  activeModal: null,
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeCart: () => set({ isCartOpen: false }),
  
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),
  
  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null }),
}));

export default useUIStore;
```

---

## TASK 6: COMPONENT INTEGRATION EXAMPLES

### 6.1 Product List Component
**File**: `src/components/ProductList.jsx`

```javascript
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import useFilterStore from '../store/filterStore';
import ProductCard from './ProductCard';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const ProductList = () => {
  const filters = useFilterStore((state) => state.filters);
  const { data, isLoading, isError, error } = useProducts(filters);
  
  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={error?.message || 'Failed to load products'} />;
  
  const products = data?.data?.data || [];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No products found</p>
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  );
};

export default ProductList;
```

### 6.2 Product Detail Component
**File**: `src/components/ProductDetail.jsx`

```javascript
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import useCartStore from '../store/cartStore';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useProduct(slug);
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;
  
  const product = data?.data;
  const currentVariant = selectedVariant || product?.product_attributes?.[0];
  
  const handleAddToCart = () => {
    if (currentVariant) {
      addToCart(product, currentVariant, quantity);
      alert('Added to cart!');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <img 
            src={currentVariant?.image_url || product?.image_url} 
            alt={product?.name}
            className="w-full rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product?.image_gallery_urls?.map((url, idx) => (
              <img key={idx} src={url} alt="" className="rounded cursor-pointer" />
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            ৳{currentVariant?.current_price}
            {currentVariant?.is_on_sale && (
              <span className="text-gray-400 line-through ml-2">৳{currentVariant?.price}</span>
            )}
          </p>
          
          {/* Variant Selection */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Select Variant:</label>
            <div className="flex gap-2 flex-wrap">
              {product?.product_attributes?.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 border rounded ${
                    currentVariant?.id === variant.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  {variant.attribute_label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Quantity:</label>
            <input 
              type="number" 
              min="1" 
              max={currentVariant?.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border px-4 py-2 rounded"
            />
            <span className="ml-2 text-gray-600">({currentVariant?.stock} in stock)</span>
          </div>
          
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={currentVariant?.stock < 1}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-400"
          >
            {currentVariant?.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          
          {/* Description */}
          <div className="mt-8">
            {product?.description?.map((section, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold text-lg">{section.section_name}</h3>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
```

### 6.3 Cart Component
**File**: `src/components/Cart.jsx`

```javascript
import React from 'react';
import useCartStore from '../store/cartStore';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCartStore();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart ({getCartCount()} items)</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/products" className="text-blue-600 underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <div key={`${item.product_id}-${item.variant_id}`} className="flex items-center gap-4 border p-4 rounded">
                <img src={item.image} alt={item.product_name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product_name}</h3>
                  <p className="text-gray-600 text-sm">{item.variant_label}</p>
                  <p className="text-green-600 font-semibold">৳{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product_id, item.variant_id, item.quantity - 1)}
                    className="px-3 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.variant_id, item.quantity + 1)}
                    className="px-3 py-1 border rounded"
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product_id, item.variant_id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total:</span>
              <span>৳{getCartTotal().toFixed(2)}</span>
            </div>
            <Link 
              to="/checkout" 
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
```

### 6.4 Checkout Component
**File**: `src/components/Checkout.jsx`

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { usePaymentMethods } from '../hooks/useCheckout';
import { useShippingMethods } from '../hooks/useCheckout';
import { useCreateOrder, useGuestCheckout } from '../hooks/useOrders';
import { useProfile } from '../hooks/useAuth';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const { data: paymentMethodsData } = usePaymentMethods();
  const { data: shippingMethodsData } = useShippingMethods();
  const { data: profileData } = useProfile();
  const createOrderMutation = useCreateOrder();
  const guestCheckoutMutation = useGuestCheckout();
  
  const [formData, setFormData] = useState({
    // Guest info
    name: '',
    email: '',
    mobile: '',
    // Address
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: 'Bangladesh',
    postal_code: '',
    phone: '',
    // Checkout
    shipping_method_id: '',
    payment_method_id: '',
    remarks: '',
  });
  
  const isAuthenticated = !!profileData;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      products: cartItems.map(item => ({
        product_id: item.product_id,
        product_attribute_id: item.variant_id,
        quantity: item.quantity,
      })),
      shipping_method_id: parseInt(formData.shipping_method_id),
      payment_method_id: parseInt(formData.payment_method_id),
      remarks: formData.remarks,
    };
    
    try {
      if (isAuthenticated) {
        // Authenticated order
        await createOrderMutation.mutateAsync({
          ...orderData,
          customer_address_id: 1, // Use selected address
        });
      } else {
        // Guest checkout
        await guestCheckoutMutation.mutateAsync({
          guest: {
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            address: {
              name: formData.name,
              address_line_1: formData.address_line_1,
              address_line_2: formData.address_line_2,
              city: formData.city,
              state: formData.state,
              country: formData.country,
              postal_code: formData.postal_code,
              phone: formData.phone,
            },
          },
          ...orderData,
        });
      }
      
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        <div>
          {/* Guest Info (if not authenticated) */}
          {!isAuthenticated && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border px-4 py-2 rounded mb-3"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full border px-4 py-2 rounded mb-3"
              />
              <input
                type="tel"
                placeholder="Mobile (+8801XXXXXXXXX)"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          )}
          
          {/* Shipping Address (if not authenticated) */}
          {!isAuthenticated && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <input
                type="text"
                placeholder="Address Line 1"
                value={formData.address_line_1}
                onChange={(e) => setFormData({ ...formData, address_line_1: e.target.value })}
                required
                className="w-full border px-4 py-2 rounded mb-3"
              />
              <input
                type="text"
                placeholder="Address Line 2 (Optional)"
                value={formData.address_line_2}
                onChange={(e) => setFormData({ ...formData, address_line_2: e.target.value })}
                className="w-full border px-4 py-2 rounded mb-3"
              />
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="border px-4 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  required
                  className="border px-4 py-2 rounded"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          )}
          
          {/* Shipping Method */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
            {shippingMethodsData?.shipping_methods?.map((method) => (
              <label key={method.id} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="shipping"
                  value={method.id}
                  onChange={(e) => setFormData({ ...formData, shipping_method_id: e.target.value })}
                  required
                  className="mr-2"
                />
                {method.name}
              </label>
            ))}
          </div>
          
          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            {paymentMethodsData?.payment_methods?.map((method) => (
              <label key={method.id} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  onChange={(e) => setFormData({ ...formData, payment_method_id: e.target.value })}
                  required
                  className="mr-2"
                />
                {method.name}
              </label>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={`${item.product_id}-${item.variant_id}`} className="flex justify-between text-sm">
                  <span>{item.product_name} x {item.quantity}</span>
                  <span>৳{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>৳{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={createOrderMutation.isLoading || guestCheckoutMutation.isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
            >
              {createOrderMutation.isLoading || guestCheckoutMutation.isLoading
                ? 'Processing...'
                : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
```

### 6.5 POS Product Search Component
**File**: `src/components/POS/POSProductSearch.jsx`

```javascript
import React, { useState } from 'react';
import { usePOSProducts, useProductByBarcode } from '../hooks/useProducts';
import useCartStore from '../store/cartStore';

const POSProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [barcode, setBarcode] = useState('');
  
  const { data: productsData } = usePOSProducts({ search: searchTerm });
  const { data: barcodeProduct } = useProductByBarcode(barcode);
  const addToCart = useCartStore((state) => state.addToCart);
  
  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (barcodeProduct?.data) {
      const product = barcodeProduct.data.product;
      const variant = barcodeProduct.data.product_attribute;
      addToCart(product, variant, 1);
      setBarcode('');
    }
  };
  
  return (
    <div className="p-4">
      {/* Barcode Scanner */}
      <form onSubmit={handleBarcodeSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Scan barcode..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          autoFocus
        />
      </form>
      
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border px-4 py-2 rounded mb-4"
      />
      
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsData?.data?.data?.map((product) => (
          <div key={product.id} className="border rounded p-3">
            <img src={product.image_url} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
            {product.product_attributes?.map((variant) => (
              <button
                key={variant.id}
                onClick={() => addToCart(product, variant, 1)}
                className="w-full bg-blue-600 text-white py-1 rounded text-sm mt-1"
              >
                ৳{variant.current_price}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default POSProductSearch;
```

---

## TASK 7: PERFORMANCE OPTIMIZATIONS

### 7.1 Implement React Query Prefetching
```javascript
// Prefetch on hover for better UX
import { useQueryClient } from '@tanstack/react-query';

const ProductCard = ({ product }) => {
  const queryClient = useQueryClient();
  
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', product.slug],
      queryFn: () => productService.getProductBySlug(product.slug),
    });
  };
  
  return (
    <div onMouseEnter={handleMouseEnter}>
      {/* Product card content */}
    </div>
  );
};
```

### 7.2 Implement Debouncing for Search
```javascript
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks'; // or create custom hook

const SearchComponent = () => {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchInput, 500);
  
  const { data } = useProducts({ search: debouncedSearch });
  
  return (
    <input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      placeholder="Search..."
    />
  );
};
```

### 7.3 Implement Virtual Scrolling for Large Lists
```javascript
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualProductList = ({ products }) => {
  const parentRef = React.useRef();
  
  const virtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
  });
  
  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <ProductCard product={products[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## TASK 8: ERROR HANDLING & LOADING STATES

### 8.1 Global Error Boundary
**File**: `src/components/ErrorBoundary.jsx`

```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 8.2 Skeleton Loaders
```javascript
const ProductCardSkeleton = () => (
  <div className="border rounded-lg p-4 animate-pulse">
    <div className="bg-gray-300 h-48 rounded mb-4"></div>
    <div className="bg-gray-300 h-4 rounded mb-2"></div>
    <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
  </div>
);
```

---

## TASK 9: TESTING CHECKLIST

### 9.1 API Integration Testing
- [ ] Test all GET endpoints with various filters
- [ ] Test POST endpoints (orders, registration)
- [ ] Test PUT endpoints (update address, password)
- [ ] Test DELETE endpoints (address removal)
- [ ] Test authentication flow (login, logout, token refresh)
- [ ] Test error responses (401, 403, 404, 422, 500)

### 9.2 State Management Testing
- [ ] Test cart operations (add, update, remove, clear)
- [ ] Test filter state updates and persistence
- [ ] Test UI state (modals, sidebars)

### 9.3 User Flow Testing
- [ ] Browse products → View details → Add to cart → Checkout
- [ ] Search and filter products
- [ ] Guest checkout flow
- [ ] Authenticated user checkout
- [ ] Order history viewing
- [ ] Profile management

### 9.4 Performance Testing
- [ ] Test React Query caching
- [ ] Test debounced search
- [ ] Test infinite scroll
- [ ] Monitor network requests
- [ ] Check for memory leaks

---

## TASK 10: PRODUCTION BEST PRACTICES

### 10.1 Environment Variables
Create `.env` file:
```
VITE_API_BASE_URL=https://jackmabasuadmin.codexitbd.com/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 10.2 Security Measures
- Never log sensitive data (tokens, passwords)
- Use HTTPS only
- Implement CSRF protection
- Sanitize user inputs
- Implement rate limiting on frontend

### 10.3 SEO Optimization
- Add proper meta tags
- Implement React Helmet for dynamic meta
- Create sitemap
- Add structured data (JSON-LD)

### 10.4 Monitoring & Analytics
- Implement error tracking (Sentry)
- Add Google Analytics
- Monitor API performance
- Track user behavior

---

## TASK 11: DEPLOYMENT CHECKLIST

- [ ] Build production bundle: `npm run build`
- [ ] Test production build locally
- [ ] Configure environment variables
- [ ] Setup CDN for static assets
- [ ] Enable Gzip/Brotli compression
- [ ] Configure caching headers
- [ ] Setup SSL certificate
- [ ] Configure CORS properly
- [ ] Test on multiple devices/browsers
- [ ] Monitor performance metrics

---

## ADDITIONAL RESOURCES

### Useful Libraries to Consider:
- **React Hook Form**: For complex form handling
- **Yup/Zod**: For form validation
- **React Router**: For routing
- **React Hot Toast**: For notifications
- **date-fns**: For date formatting
- **numeral**: For number formatting

### Code Quality Tools:
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Run linters on staged files

---

## SUMMARY

This comprehensive integration plan provides:
1. ✅ Modular API architecture
2. ✅ React Query for server state
3. ✅ Zustand for client state
4. ✅ Complete CRUD operations
5. ✅ Authentication & authorization
6. ✅ Shopping cart functionality
7. ✅ Checkout flow (guest + authenticated)
8. ✅ POS-specific features
9. ✅ Performance optimizations
10. ✅ Error handling
11. ✅ Production-ready code

Follow these tasks sequentially for a complete, production-ready POS system integration.