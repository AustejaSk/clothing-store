import React, {useState} from 'react'
import { useLocation, Link } from 'react-router-dom'

import starIcon from '../images/star-icon.png'
import { FaAngleLeft, FaHeart, FaRegHeart } from "react-icons/fa6"

import Quantity from '../components/Quantity'

const Product = ({ products, getSelectedProducts }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [itemCount, setItemCount] = useState(0)

    const location = useLocation()

    const productId = location.state.id

    const currentProduct = products.find(product => product.id === productId)

    const description = isOpen
        ? currentProduct.description
        : currentProduct.description.slice(0, 140)

    const handleDescription = () => {
        setIsOpen(isOpen ? false : true)
    }

    const handleFavourite = () => {
        setIsFavourite(isFavourite ? false : true)
    }

    const handleSizeChoice = (size) => {
        setSelectedSize(size)
    }

    const handleColorChoice = (color) => {
        setSelectedColor(color)
    }

    const handleAddToCart = () => {
        const selectedItem = {
            ...currentProduct,
            id: currentProduct.id + selectedSize + selectedColor,
            size: selectedSize,
            color: selectedColor,
            itemCount: itemCount,
            setItemCount: setItemCount,
        }

        getSelectedProducts(selectedItem, itemCount)
    }

    return (
        <div className='product'>
            <div className='product__imgContainer'>
                <img className='product__imgContainer__img' src={currentProduct.imageUrl} alt={currentProduct.name} />
                <Link to={'..'} className='product__imgContainer__btn product__backBtn'><FaAngleLeft /></Link>
                <button className='product__imgContainer__btn product__fovouriteBtn' onClick={handleFavourite}>
                    {isFavourite ? <FaHeart /> : <FaRegHeart />}
                </button>
            </div>

            <div className='product__details'>
                <div className='product__header'>
                    <div className='product__info'>
                        <h1 className='product__name'>{currentProduct?.name}</h1>
                        <div className='product__rating'>
                            <img src={starIcon} alt='Star icon' />
                            <h3 className='product__rating__value'>{currentProduct.rating}
                                <span className='product__rating__reviews'>({currentProduct.reviews})</span>
                            </h3>
                        </div>
                    </div>
                    <Quantity itemCount={itemCount} setItemCount={setItemCount}/>
                </div>
                <div className='product__description'>
                    <p className='product__description__text'>
                        {description}
                        <span onClick={handleDescription}>
                            {isOpen ? ' Read Less...' : ' Read More...'}
                        </span>
                    </p>
                </div>

                <hr />

                <div className='product__customization'>
                    <div className='product__size'>
                        <h2 className='product__heading'>Choose Size</h2>
                        <div className='product__options'>
                            <button
                                className='product__size__option'
                                onClick={() => handleSizeChoice('s')}
                                style={selectedSize === 's' ? { backgroundColor: '#292526', color: '#ffffff' } : {} }
                            >
                            S</button>
                            <button
                                className='product__size__option'
                                onClick={() => handleSizeChoice('m')}
                                style={selectedSize === 'm' ? { backgroundColor: '#292526', color: '#ffffff' } : {} }
                            >
                            M</button>
                            <button
                                className='product__size__option'
                                onClick={() => handleSizeChoice('l')}
                                style={selectedSize === 'l' ? { backgroundColor: '#292526', color: '#ffffff' } : {} }
                            >
                            L</button>
                            <button
                                className='product__size__option'
                                onClick={() => handleSizeChoice('xl')}
                                style={selectedSize === 'xl' ? { backgroundColor: '#292526', color: '#ffffff' } : {} }
                            >
                            XL</button>
                        </div>
                    </div>
                    <div className='product__color'>
                        <h2 className='product__heading'>Choose Color</h2>
                        <div className='product__options'>
                            {currentProduct.colors.map(color => (
                                <button
                                    key={color}
                                    className='product__color__option' 
                                    style={selectedColor === color ? {border: '2px solid #FFD33C', backgroundColor: color} : {backgroundColor: color}}
                                    onClick={() => handleColorChoice(color)}
                                >
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    className={`product__cartBtn ${(itemCount > 0 && selectedSize && selectedColor)  ? '' : 'disabled'}`}
                    onClick={handleAddToCart}
                >
                Add to Cart
                </button>

            </div>
        </div>
    )
}

export default Product