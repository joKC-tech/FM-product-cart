import { useState } from 'react'
import './App.css'

import data from './data.json'
import Product from './components/Product.jsx'
import CartProduct from './components/CartProduct.jsx'

import illustrationEmptyCart from './assets/images/illustration-empty-cart.svg';
import iconCarbonNeutral from './assets/images/icon-carbon-neutral.svg'

function App() {

  const [cart, setCart ] = useState([]);

  function handleAddToCart(id){
    setCart( prev => {
      if (prev.find(item => item.id === id)){
        const newArray = prev.map( item => {
          if (item.id === id) {
            const newCount = item.quantity + 1 
            return { id: id, quantity: newCount}

          } else { 
            return item
          }
        })

        return newArray

      } else {
        return [ ...prev, { id: id , quantity: 1 }]
      }

    })
  }

  function handleDecreaseQuantity(id){
    setCart( prev => {
      if (prev.find(item => item.id === id)){
        const newArray = prev.map( item => {
          if (item.id === id) {
            const newCount = item.quantity - 1 

            return { id: id, quantity: newCount}

          } else { 
            return item
          }
        })

        return newArray.filter(item => item.quantity > 0)

      }

    })
  }

  function handleRemove(id){
    setCart( prev =>  prev.filter( item => item.id !== id ))

  }

  const products = data.map(item => {

    const cartItem = cart.find(cartItem => cartItem.id === item.id)
    const cartQuantity = cartItem ? cartItem.quantity : 0 

    return (
      <Product 
        item={item} 
        key={item.id} 
        handleAddToCart={handleAddToCart}
        handleDecreaseQuantity={handleDecreaseQuantity}
        quantity={cartQuantity}
        />
    )
    
  })

  const currentProducts = <div className='c-cart__cart-items'>
    {cart.map(cartItem => {
    return (
      <CartProduct 
        product={data.find( item => item.id === cartItem.id)} 
        quantity={cartItem.quantity} 
        key={`cart-${cartItem.id}`}
        handleRemove={handleRemove}
      />
)
  })}
  </div>

  const emptyCart = <div className="c-cart__empty-cart">
          <img className="c-cart__illustration" src={illustrationEmptyCart} alt="" />
          <p>Your added items will appear here</p>
        </div>

  const orderTotal = () => {
    let total = 0;
    cart.forEach(cartItem => {
      const product = data.find(product => product.id === cartItem.id);
      total = total + (product.price * cartItem.quantity)
    })
    return total.toFixed(2)
  }

  const orderQuantity = () => {
    let total = 0;
    cart.forEach(cartItem => {
      const product = data.find(product => product.id === cartItem.id);
      total = total + cartItem.quantity
    })
    return total
  }


  return (
    <main>
      <div className="l-products-section">
        <h1 className='c-h1'>Desserts</h1>
        <div className='l-products-list'>
          {products}
        </div>
      </div>
      <div className='c-cart'>
        <h2 className='c-cart__h2'>Your Cart ({orderQuantity()})</h2>
        { cart.length === 0 ? emptyCart : currentProducts }
        { cart.length > 0 && <>

            <p className='c-cart__total-label'>Order total <span className='c-cart__total'>${orderTotal()}</span></p>
            <div className="c-cart__carbon-neutral">
              <img className="c-cart__carbon-icon" src={iconCarbonNeutral} alt=""/>
              <p className='c-cart__carbon-txt'>This is a <b>carbon neutral</b> delivery</p>
            </div>
            <button className='c-cart__btn' type='button'>Confirm order</button>
        </>}


      </div>
    </main>
  )
}

export default App
