import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('¡.Perdón.! El Producto Está Agotado.');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Producto Actualizado En El Carrito.');
  };
  return (
    <Layout title="Carrito De Compras.">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <i className="fa-solid fa-chevron-left"></i> VOLVER.
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </nav>
      <hr />
      {cartItems.length === 0 ? (
        <div>
          El Carrito Esta Vacío. <Link href="/"><i className="fa-solid fa-chevron-right"></i> Ir De Compras. <i className="fa-solid fa-chevron-left"></i></Link>
        </div>
      ) : (
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol size="12">
                <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="p-0">
                    <MDBRow className="g-0">
                      <MDBCol lg="8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                              Carrito De Compras.
                            </MDBTypography>
                          </div>
                          <hr className="my-4" />
                          {cartItems.map((item) => (
                            <MDBRow className="mb-4 d-flex justify-content-between align-items-center" key={item.slug}>
                              <MDBCol md="2" lg="2" xl="2">
                                <Link href={`/product/${item.slug}`}>
                                  <MDBCardImage
                                    src={item.image}
                                    fluid
                                    className="rounded-3"
                                    alt={item.name}
                                    title={item.name} />
                                </Link>
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography tag="h6" style={{ fontSize: "15px" }} className="text-muted badge badge-secondary">
                                  {item.name}
                                </MDBTypography>
                                <MDBTypography tag="h6" style={{ fontSize: "15px" }} className="text-black mb-0 badge badge-secondary">
                                  {item.category}
                                </MDBTypography>
                                <MDBTypography tag="h6" style={{ fontSize: "15px" }} className="text-black mb-0 badge badge-secondary">
                                  {item.brand}
                                </MDBTypography>
                                <MDBTypography tag="h6" style={{ fontSize: "15px" }} className="text-black mb-0 badge badge-secondary">
                                  {item.size}
                                </MDBTypography>
                                <MDBTypography tag="h6" style={{ fontSize: "15px" }} className="text-black mb-0 badge badge-secondary">
                                  {item.colorOne}
                                </MDBTypography>
                                <MDBTypography tag="h6" style={{ fontSize: "15px" }} className="text-black mb-0 badge badge-secondary">
                                  {item.colorTwo}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" style={{ fontSize: "15px" }} className="mb-0 badge badge-secondary">
                                  <div className="mb-4 pb-2">
                                    <select
                                      className="select rounded bg-grey" style={{ width: "100%" }}
                                      value={item.quantity}
                                      onChange={(e) =>
                                        updateCartHandler(item, e.target.value)
                                      }
                                    >
                                      {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" style={{ color: "green", fontSize: "15px" }} className="mb-0 badge badge-success">
                                  &#36; {(item.price).toLocaleString('es-ES', {
                                    style: 'currency',
                                    currency: 'COP',
                                  })}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <button
                                  role="button"
                                  style={{ color: "red", fontSize: "15px" }} className="text-muted badge badge-danger"
                                  onClick={() => removeItemHandler(item)}>
                                  <MDBIcon fas icon="times" />
                                </button>
                              </MDBCol>
                            </MDBRow>
                          ))}
                          <hr className="my-4" />
                        </div>
                      </MDBCol>
                      <MDBCol lg="4" className="bg-grey">
                        <div className="p-5">
                          <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                            Resumen De Facturación. :*
                          </MDBTypography>

                          <hr className="my-4" />
                          <div className="d-flex justify-content-between mb-5">
                            <MDBTypography tag="h5" className="text-uppercase">
                              <span style={{ color: "green", fontSize: "15px" }} className="badge badge-success mb-2">
                                Sub-Total. ({cartItems.reduce((a, c) => a + c.quantity, 0)}):*
                              </span>
                            </MDBTypography>
                            <MDBTypography tag="h5" style={{ color: "green", fontSize: "15px" }} className="badge badge-success mb-2">
                              &#36; {(cartItems.reduce((a, c) => a + c.quantity * c.price, 0)).toLocaleString('es-ES', {
                                style: 'currency',
                                currency: 'COP',
                              })}
                            </MDBTypography>
                          </div>
                          <MDBBtn
                            color="dark"
                            block
                            size="lg"
                            onClick={() => router.push('login?redirect=/shipping')}
                          >
                            Verificar.{" "}
                            <i className="fas fa-long-arrow-alt-right ms-2"></i>
                          </MDBBtn>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      )}
      <hr />
    </Layout >
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });