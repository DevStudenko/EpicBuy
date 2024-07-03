import React from 'react'
import { useSelector } from 'react-redux';
import { getCartItemsArray } from '../../redux/cart';
import CartItem from "./CartItem";


const Cart = () => {
  const items = useSelector(getCartItemsArray);
  items.map(({ id, product }) => (
    <CartItem key={id} id={id} name={product.name} preview_img_url={product.preview_img_url} price={product.price} />
  ))
}

export default Cart
