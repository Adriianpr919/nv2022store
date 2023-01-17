/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  MDBIcon, MDBBadge, MDBInput, MDBBtn, MDBCarousel,
  MDBCarouselItem
} from 'mdb-react-ui-kit';

export default function ProductScreen(props) {
  const { product } = props;
  const [selectedImg, setSelectedImg] = useState('');
  const [size, setSize] = useState('');
  const [colorOne, setColorOne] = useState('');
  const [colorTwo, setColorTwo] = useState('');
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="PRODUCTOS NO ENCONTRADOS.">PRODUCTOS NO ENCONTRADOS.</Layout>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('¡.Perdón.! El Producto Está Agotado.');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity, size, colorOne, colorTwo } });
    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"><MDBIcon fas icon="angle-left" /> VOLVER.</Link>
              </li>
            </ol>
          </nav>
        </div>
      </nav>
      <hr />
      <>
        <section style={{ backgroundColor: '#eee' }}>
          <div className="container py-5">
            <div className="row justify-content-center mb-3">
              <div className="col-md-12 col-xl-10">
                <div className="card shadow-0 border rounded-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                          <MDBCarousel showControls>
                            <MDBCarouselItem
                              className='w-100 img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top'
                              itemId={1}
                              src={selectedImg || `../${product.image}`}
                              alt={product.name}
                              title={product.name}
                              layout="responsive"
                            />
                            <MDBCarouselItem
                              className='w-100 img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top'
                              itemId={2}
                              src={`../${product.imageOne}`} onClick={() => setSelectedImg(`../${product.imageOne}`)}
                              alt={product.name}
                              title={product.name}
                              layout="responsive"
                            />
                            <MDBCarouselItem
                              className='w-100 img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top'
                              itemId={3}
                              src={`../${product.imageTwo}`} onClick={() => setSelectedImg(`../${product.imageTwo}`)}
                              alt={product.name}
                              title={product.name}
                              layout="responsive"
                            />
                            <MDBCarouselItem
                              className='w-100 img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top'
                              itemId={4}
                              src={`../${product.imageThree}`} onClick={() => setSelectedImg(`../${product.imageThree}`)}
                              alt={product.name}
                              title={product.name}
                              layout="responsive"
                            />
                            <MDBCarouselItem
                              className='w-100 img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top'
                              itemId={5}
                              src={`../${product.imageFour}`} onClick={() => setSelectedImg(`../${product.imageFour}`)}
                              alt={product.name}
                              title={product.name}
                              layout="responsive"
                            />
                            <MDBCarouselItem
                              className='w-100 img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top'
                              itemId={6}
                              src={`../${product.imageFive}`} onClick={() => setSelectedImg(`../${product.imageFive}`)}
                              alt={product.name}
                              title={product.name}
                              layout="responsive"
                            />
                            <MDBCarouselItem
                              className='w-100 img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top'
                              itemId={7}
                              src={`../${product.imageSix}`} onClick={() => setSelectedImg(`../${product.imageSix}`)}
                              alt={product.name}
                              title={product.name}
                              layout="responsive"
                            />
                            <MDBCarouselItem
                              className='w-100 img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top'
                              itemId={8}
                              src={`../${product.imageSeven}`} onClick={() => setSelectedImg(`../${product.imageSeven}`)}
                              alt={product.name}
                              title={product.name}
                              layout="responsive"
                            />
                          </MDBCarousel>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <h5>
                          <MDBBadge color='primary' pill style={{ fontSize: "15px" }}>
                            {product.name}
                          </MDBBadge>
                        </h5>
                        <div className="d-flex flex-row">
                          <span className="badge badge-warning small mb-2" style={{ fontSize: "15px" }}>
                            {product.rating} De {product.numReviews} Reseñas.
                            <div className="text-danger mb-1 me-2">
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
                        <p className="card-text">
                          <hr />
                          <div className="pd-group">
                            <div className="pd-otherAction">
                              <div className="pd-size" style={{ textAlign: "justify" }}>
                                <p className="grey-text">
                                  <MDBBadge color='primary' pill style={{ fontSize: "15px" }} className="pd-sizeTitle">
                                    Selecciona La Talla. :*
                                  </MDBBadge>
                                </p>
                                <div className="pd-sizeDiv">
                                  {
                                    product.sizes?.map((size) => (
                                      <>
                                        <input type="radio" onChange={(e) => setSize(e.target.value)} id={size.title} name="size" value={size.title} required />
                                        <label htmlFor={size.title}>{size.title}</label>
                                      </>
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="pd-group">
                            <div className="pd-otherAction">
                              <div className="pd-color" style={{ textAlign: "justify" }}>
                                <p className="grey-text">
                                  <MDBBadge color='primary' pill style={{ fontSize: "15px" }} className="pd-sizeTitle">
                                    Selecciona El Color De Oro. :*
                                  </MDBBadge>
                                </p>
                                <div className="pd-sizeDiv">
                                  {
                                    product.colorsOne?.map((colorOne) => (
                                      <>
                                        <input type="radio" onChange={(e) => setColorOne(e.target.value)} id={colorOne.title} name="colorOne" value={colorOne.title} required />
                                        <label htmlFor={colorOne.title}>{colorOne.title}</label>
                                      </>
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </p>
                        <hr />
                        <p className="card-text">
                          <div className="pd-group">
                            <div className="pd-otherAction">
                              <div className="pd-color" style={{ textAlign: "justify" }}>
                                <p className="grey-text">
                                  <MDBBadge color='primary' pill style={{ fontSize: "15px" }} className="pd-sizeTitle">
                                    Selecciona El Color De Piedra. :*
                                  </MDBBadge>
                                </p>
                                <div className="pd-sizeDiv">
                                  {
                                    product.colorsTwo?.map((colorTwo) => (
                                      <>
                                        <input type="radio" onChange={(e) => setColorTwo(e.target.value)} id={colorTwo.title} name="colorTwo" value={colorTwo.title} required />
                                        <label htmlFor={colorTwo.title}>{colorTwo.title}</label>
                                      </>
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </p>
                        <hr />
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
                              &#36; {(product.price).toLocaleString('es-ES', {
                                style: 'currency',
                                currency: 'COP',
                              })}
                            </MDBBadge>
                          </h4>
                        </div>
                        <h6 className="text-secondary">
                          <span className='pd-quantityNumber badge badge-secondary mb-2' style={{ fontSize: "15px" }}>
                            {product.countInStock > 0 ? 'EN STOCK.' : 'AGOTADO.'}
                          </span>
                        </h6>
                        <div className="d-flex flex-column mt-4">
                          <button
                            className="w-100 btn btn-lg btn-primary flex-shrink-0 btn-sm mt-2"
                            onClick={addToCartHandler}
                          >
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
      </>
      <hr />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}