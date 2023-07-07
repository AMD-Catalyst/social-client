import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect, useState, lazy } from "react";

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

const App = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={currentUser ? <Navigate to="/" replace /> : <Register />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/products/:category" element={<ProductList />} /> */}
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
};

export default App;
