import React from "react"
import ProductDetail from "./product_addition"
import AddProduct from "./product_addition"

const ProductAddUpdate = (props) => {
    return (
        <div>
            {props.updateProduct && <ProductDetail />}
            {props.addProduct && <AddProduct />}
        </div>
    )
}