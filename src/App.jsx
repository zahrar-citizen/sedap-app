import './assets/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Loading from './components/Loading';
import Products from './pages/Products';

const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Notes = React.lazy(() => import("./pages/Notes"))
const Customers = React.lazy(() => import("./pages/Customers"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const Login = React.lazy(() => import("./pages/Auth/Login"))
const Register = React.lazy(() => import("./pages/Auth/Register"))
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"))
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))


function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />}/>
          <Route path="/products/:id" element={<ProductDetail />} /> 
          <Route path="/notes" element={<Notes/>}/>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
export default App
