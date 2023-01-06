/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <>
      <div className="text-center border border-primary shadow-0 card">
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
          <Link href={`/product/${product.slug}`}>
            <img src={product.image} className="img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top" alt={product.name} title={product.name} />
          </Link>
        </div>
        <>
          <div className="card-header">{product.brand}</div>
          <div className="card-body">
            <h5 className="card-title">
              <Link href={`/product/${product.slug}`}>
                <h5 className="text-lg">{product.name}</h5>
              </Link>
            </h5>
            <p className="card-text">
              $ {product.price} - COP
            </p>
          </div>
          <div className="card-footer">
            <button
            type="button"
            className="w-100 btn btn-lg btn-primary"
            onClick={() => addToCartHandler(product)}>
              <i className="fa fa-shopping-basket" /> Añadir Al Carrito.
            </button>
          </div>
        </>
      </div>
    </>
  )
}
