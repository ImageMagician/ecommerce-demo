import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider }   from 'react-redux'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

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
import ProfileScreen       from "./screens/ProfileScreen.tsx";

// Admin screens
import OrderListScreen     from "./screens/admin/OrderListScreen.tsx";
import ProductListScreen   from "./screens/admin/ProductListScreen.tsx";
import UserListScreen      from "./screens/admin/UserListScreen.tsx";

// COMPONENTS
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute   from "./components/AdminRoute";

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
                <Route path="/profile"        element={ <ProfileScreen /> } />
            </Route>
            <Route path="/admin" element={ <AdminRoute /> }>
                <Route path="orders" element={ <OrderListScreen /> } />
                <Route path="products" element={ <ProductListScreen /> } />
                <Route path="users" element={ <UserListScreen /> } />
            </Route>
        </Route>
    )
)

createRoot(document.getElementById('app')!).render(
  <StrictMode>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true} options={ { clientId: 'test' } }>
            <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
  </StrictMode>,
)
