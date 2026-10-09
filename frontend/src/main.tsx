import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider }   from 'react-redux'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

import App from './App.tsx'

import store from './store.ts'

// SCREENS
import HomeScreen          from "./screens/HomeScreen.tsx";
import ProductDetailScreen from "./screens/ProductDetailScreen.tsx";
import CartScreen          from "./screens/CartScreen.tsx";
import LoginScreen         from "./screens/LoginScreen.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={`/`} element={<App />}>
            <Route index={ true } path="/" element={ <HomeScreen /> } />
            <Route path="/product/:id" element={ <ProductDetailScreen /> } />
            <Route path="/cart" element={ <CartScreen /> } />
            <Route path="/login" element={ <LoginScreen /> } />
        </Route>
    )
)

createRoot(document.getElementById('app')!).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)
