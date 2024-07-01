import React from 'react'
import { useSelector } from 'react';
import { getCartItemsArray } from '../../redux/cart';


const Cart = () => {
  const items = useSelector(getCartItemsArray);
  items.map(({}) => (
    <div>Cart</div>
  ))
}

export default Cart
