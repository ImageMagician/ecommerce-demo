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
import RegisterScreen      from "./screens/RegisterScreen.tsx";
import ShippingScreen      from "./screens/ShippingScreen.tsx";
import PaymentScreen       from "./screens/PaymentScreen.tsx";
import PlaceOrderScreen    from "./screens/PlaceOrderScreen.tsx";
import OrderScreen         from "./screens/OrderScreen.tsx";

// COMPONENTS
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={`/`} element={<App />}>
            <Route path="/"               element={ <HomeScreen /> } index={ true } />
            <Route path="/product/:id"    element={ <ProductDetailScreen /> } />
            <Route path="/cart"           element={ <CartScreen /> } />
            <Route path="/login"          element={ <LoginScreen /> } />
            <Route path="/register"       element={ <RegisterScreen /> } />
            <Route path="" element={ <PrivateRoute /> }>
                <Route path="/shipping"       element={ <ShippingScreen /> } />
                <Route path="/payment"        element={ <PaymentScreen /> } />
                <Route path="/placeorder"     element={ <PlaceOrderScreen /> } />
                <Route path="/order/:orderId" element={ <OrderScreen /> } />
            </Route>
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
