/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { MDBBadge } from 'mdb-react-ui-kit';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <>
      <hr />
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5">
          <div className="row justify-content-center mb-3">
            <div className="col-md-12 col-xl-10">
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        <Link href={`/product/${product.slug}`}>
                          <>
                            <img
                              src={product.image}
                              className="w-100 img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top"
                              alt={product.name}
                              title={product.name}
                              layout="responsive" />
                          </>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                      <h5>
                        <Link href={`/product/${product.slug}`}>
                          <h5 className="text-lg">
                            <MDBBadge color='primary' pill style={{ fontSize: "15px" }}>
                              {product.name}
                            </MDBBadge>
                          </h5>
                        </Link>
                      </h5>
                      <div className="d-flex flex-row">
                        <span className="badge badge-warning small mb-2" style={{ fontSize: "15px" }}>
                          {product.rating} De {product.numReviews} Reseñas.
                          <div className="text-danger mb-1 me-2">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </span>
                      </div>
                      <div className="mt-1 mb-2 text-muted small">
                        <span>
                          <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
                            {product.category}
                          </MDBBadge>
                        </span>
                        <span className="text-primary">
                          <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
                            &#8226;
                          </MDBBadge>
                        </span>
                        <span>
                          <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
                            {product.brand}
                          </MDBBadge>
                        </span>
                      </div>
                      <p className="text-truncate mb-4 mb-md-0">
                        <MDBBadge color='primary' pill style={{ fontSize: "15px" }}>
                          Descripción. :*
                        </MDBBadge><br />
                        {product.description}
                      </p>
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                      <div className="d-flex flex-row align-items-center mb-1">
                        <h4 className="mb-1 me-1">
                          <MDBBadge color='success' pill>
                            $ {(product.price).toFixed(3)} - COP
                          </MDBBadge>
                        </h4>
                      </div>
                      <h6 className="text-secondary">
                        <span className='pd-quantityNumber badge badge-secondary mb-2' style={{ fontSize: "15px" }}>
                          {product.countInStock > 0 ? 'EN STOCK.' : 'AGOTADO.'}
                        </span>
                      </h6>
                      <div className="d-flex flex-column mt-4">
                        <Link href={`/product/${product.slug}`} className="btn btn-secondary btn-sm">
                          <i className="fa-solid fa-eye"></i> Ver Detalles.
                        </Link>
                        <button
                          type="button"
                          className="w-100 btn btn-lg btn-primary btn-sm mt-2"
                          onClick={() => addToCartHandler(product)}>
                          <i className="fa fa-shopping-basket" /> Añadir Al Carrito.
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </>
  );
}
