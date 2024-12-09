import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import'./menu.css';
import'./web.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Admin from './adminfront';
import Dashboard from './dashboard';
import Category from './category';
import Subcategory from './subcategory';
import Product from './product';
import Website from './website';
import Shopproducts from './shopproducts';
import Login from './login';
import Signup from './signup';
import Cart from './cart';
import Cartadd from './cartadd';
import Order from './myorder';
import Myorder from './usermyorder';
import Searchproduct from './searchproduct';
import Track from './trackingproduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/adminfront" element={<Admin />} ></Route>
        <Route exact path="/dashboard" element={<Dashboard />} ></Route>
        <Route exact path="/category" element={<Category />} ></Route>
        <Route exact path="/subcategory" element={<Subcategory />} ></Route>
        <Route exact path="/product" element={<Product />} ></Route>
        <Route exact path="/website" element={<Website />} ></Route>
        <Route exact path="/shopproducts/:id" element={<Shopproducts />} ></Route>
        <Route exact path="/login" element={<Login />} ></Route>
        <Route exact path="/signup" element={<Signup />} ></Route>
        <Route exact path="/cart" element={<Cart />} ></Route>
        <Route exact path="/cartadd" element={<Cartadd />} ></Route>
        <Route exact path="/myorder" element={<Order />} ></Route>
        <Route exact path="/usermyorder" element={<Myorder />} ></Route>
        <Route exact path="/searchproduct/:id" element={<Searchproduct />} ></Route>
        <Route exact path="/trackingproduct" element={<Track />} ></Route>

      </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
