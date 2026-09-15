import iconRemoveItem from '../assets/images/icon-remove-item.svg'

import './CartProduct.css'


export default function CartProduct({product, quantity, handleRemove}){
    
    const {name, price, id} = product
    const itemTotal = quantity * price

    return (
      <div className='c-cart-product' >
        <div className='c-cart-product__details'>
          <h3 className='c-cart-product__name'>{name}</h3>
          <p className='c-cart-product__price'><span className="c-cart-product__quantity">x{quantity}</span> @ ${price.toFixed(2)} <span className='c-cart-product__total'>${itemTotal.toFixed(2)}</span></p>
        </div>
        <button type='button' className='c-cart-product__remove-btn' onClick={()=>{handleRemove(id)}}><img src={iconRemoveItem} alt='Remove item' /></button>
      </div>
    )

}


    
