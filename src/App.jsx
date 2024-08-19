import { useState } from "react";

import "./App.css";

import React, { createContext } from "react";
import SideDrawer from "./components/appbar/side_drawer";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import { CategoryList } from './components/categories/category_list'
import CategoryDetails from "./pages/categories/category";
import CategoryList from "./pages/categories/category_list";

import AppBar from "./components/appbar/appbar";
import AttributeList from "./attributes/attribute_list";

import ProductList from "./products/product_list";

import ProductDetail from "./products/product_detail";
import ProductVariation from "./products/product_variation";
import UpdateProductVariation from "./products/update_product_variation";
import AddProduct from "./products/product_addition";
import RootLayout from "./components/RootLayout";
import MeasuringUnit from "./measuringunit/measuringunit";
import CreateCategory from "./pages/categories/create_category";
import NewProduct from "./products/product_creation";
import Brand from "./pages/brand/brand";

const Context = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <CategoryList /> },
      { path: "/categories", element: <CategoryList /> },
      { path: "/categories/:id", element: <CategoryDetails /> },
      { path: "/createCategory", element: <CreateCategory /> },
      { path: "/products", element: <ProductList /> },
      { path: "/products/addProduct", element: <NewProduct /> },
      { path: "/products/:id", element: <NewProduct /> },
      { path: "/products/variations/:id", element: <ProductVariation /> },
      {
        path: "/products/updatevariations/:id",
        element: <ProductVariation />,
      },
      { path: "/attributes", element: <AttributeList /> },
      { path: "/measuringunit", element: <MeasuringUnit /> },
      { path: "/brands", element: <Brand /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
