import iconAddToCart from "../assets/images/icon-add-to-cart.svg"
import iconDecrementQuantity from "../assets/images/icon-decrement-quantity.svg"
import iconIncreaseQuantity from '../assets/images/icon-increment-quantity.svg'
import './Product.css'

export default function Product({item, handleAddToCart, quantity, handleDecreaseQuantity}){
    const {image, category, name, price, id } = item;
    const formattedPrice = price.toFixed(2);
    const inCart = quantity > 0

    return (
        <div className="c-product">
            <div className="l-img-container">
                <picture className={`c-product__img ${inCart ? "red-outline" : ""}`}>
                    <source srcSet={image.desktop} media="(min-width: 64rem)" />
                    <source srcSet={image.tablet} media="(min-width: 48rem)" />
                    <img src={image.mobile} alt={name}/>
                </picture>
                { inCart ? 
                    <div className="c-product__quantity-control">
                        <button type="button" onClick={()=>{handleDecreaseQuantity(id)}}>
                            <img src={iconDecrementQuantity} alt="Decrease quanitity" />
                        </button>
                        {quantity}
                        <button type="button" onClick={()=>handleAddToCart(id)}> 
                            <img src={iconIncreaseQuantity} alt="Increase quantity" />
                        </button>
                    </div>:
                    <button type="button" className="c-product__btn" onClick={()=>handleAddToCart(id)}>
                    <img className="c-product__btn-icon" src={iconAddToCart} alt=""/>
                    Add to Cart
                    </button>
                }

             
            </div>
            <div className="c-product__details">
                <p className="c-product__category">{category}</p>
                <h3 className="c-product__name">{name}</h3>
                <span className="c-product__price">${formattedPrice}</span>
            </div>
            

        </div>
    )
}