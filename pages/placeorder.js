import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 1000 + Number.EPSILON) / 1000;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.456,789

  const shippingPrice = itemsPrice > 200 ? 0 : 19;
  const taxPrice = round2(itemsPrice * 0.19); //19% tax in Colombia.
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Realizar Pedido.">
      <hr />
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Realizar Pedido.</h1>
      {cartItems.length === 0 ? (
        <div>
          El Carrito Esta Vacío. <Link href="/"><i className="fa-solid fa-chevron-right"></i> Ir De Compras. <i className="fa-solid fa-chevron-left"></i></Link>
        </div>
      ) : (
        <section style={{ backgroundColor: '#eee' }}>
          <div className="container py-5">
            <div className="card">
              <div className="card-body">
                <div className="row d-flex justify-content-center pb-5">
                  <div className="col-md-7 col-xl-5 mb-4 mb-md-0">
                    <div className="py-4 d-flex flex-row">
                      <h5>
                        <span className="far fa-check-square pe-2" /><b>ELEGIBLE</b> |
                      </h5>
                      <span className="ps-2">Pagar</span>
                    </div>
                    <div className="d-flex pt-2">
                      <div>
                        <p>
                          <b>Dirección De Envío. :*</b>
                        </p>
                      </div>
                    </div>
                    <p>
                      {shippingAddress.fullName}, {shippingAddress.address},{' '}
                      {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                      {shippingAddress.country}
                    </p>
                    <div className="rounded d-flex" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="p-2">
                        <Link href="/shipping">
                          <i className="fa-solid fa-pen-to-square"></i> Editar.
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <div className="pt-2">
                      <div className="d-flex pb-2">
                        <div>
                          <p>
                            <b>Método De Pago. :*</b>
                          </p>
                        </div>
                        <div className="ms-auto">
                          <p className="text-primary">
                            <span className="badge badge-warning rounded-pill d-inline">{paymentMethod}</span>
                          </p>
                        </div>
                      </div>
                      <div className="rounded d-flex" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="p-2">
                          <Link href="/payment">
                            <i className="fa-solid fa-pen-to-square"></i> Editar.
                          </Link>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="pt-2">
                      <div className="d-flex pb-2">
                        <div>
                          <p>
                            <b>Encargar Artículos.</b>
                          </p>
                        </div>
                        <div className="ms-auto">
                          <p className="text-primary rounded d-flex" style={{ backgroundColor: '#f8f9fa' }}>
                            <Link href="/cart" className="p-2">
                              <i className="fa-solid fa-pen-to-square"></i> Editar.
                            </Link>
                          </p>
                        </div>
                      </div>
                      <p>
                        <div className="table-responsive">
                          <table className="table align-middle mb-0 bg-white">
                            <thead className="border-b bg-light">
                              <tr>
                                <th className="p-5 text-left">
                                  <span className="badge badge-primary rounded-pill d-inline">ARTÍCULO</span>
                                </th>
                                <th className="    p-5 text-right">
                                  <span className="badge badge-primary rounded-pill d-inline">TALLA</span>
                                </th>
                                <th className="    p-5 text-right">
                                  <span className="badge badge-primary rounded-pill d-inline">C. DE ORO Y C. DE PIEDRA</span>
                                </th>
                                <th className="    p-5 text-right">
                                  <span className="badge badge-primary rounded-pill d-inline">CANTIDAD</span>
                                </th>
                                <th className="  p-5 text-right">
                                  <span className="badge badge-primary rounded-pill d-inline">PRECIO</span>
                                </th>
                                <th className="p-5 text-right">
                                  <span className="badge badge-primary rounded-pill d-inline">SUB-TOTAL</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartItems.map((item) => (
                                <tr key={item._id} className="border-b">
                                  <td>
                                    <Link href={`/product/${item.slug}`}>
                                      <div className="d-flex align-items-center">
                                        <a className="flex items-center">
                                          <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={50}
                                            height={50}
                                            className="rounded-circle"
                                          ></Image>
                                          <div className="ms-3">
                                            <p className="fw-bold mb-1">
                                              <span className="badge badge-secondary rounded-pill d-inline">{item.name}</span>
                                            </p>
                                          </div>
                                        </a>
                                      </div>
                                    </Link>
                                  </td>
                                  <td className=" p-5 text-right">
                                    <span className="badge badge-secondary rounded-pill d-inline">{item.size}</span>
                                  </td>
                                  <td className=" p-5 text-right">
                                    <p classname="fw-normal mb-1">
                                      <span className="badge badge-secondary rounded-pill d-inline">{item.colorOne}</span>
                                    </p>
                                    <p classname="text-muted mb-0">
                                      <span className="badge badge-secondary rounded-pill d-inline">{item.colorTwo}</span>
                                    </p>
                                  </td>
                                  <td className=" p-5 text-right">
                                    <span className="badge badge-warning rounded-pill d-inline">{item.quantity}</span>
                                  </td>
                                  <td className="p-5 text-right">
                                    <span className="badge badge-success rounded-pill d-inline">
                                      &#36; {(item.price).toLocaleString('es-ES', {
                                        style: 'currency',
                                        currency: 'COP',
                                      })}
                                    </span>
                                  </td>
                                  <td className="p-5 text-right">
                                    <span className="badge badge-success rounded-pill d-inline">
                                      &#36; {(item.quantity * item.price).toLocaleString('es-ES', {
                                        style: 'currency',
                                        currency: 'COP',
                                      })}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-5 col-xl-4 offset-xl-1">
                    <div className="py-4 d-flex justify-content-end">
                      <h6>
                        <Link href="/cart" className='text-danger'>
                          <i className="fa-solid fa-circle-xmark"></i> Cancelar Y Volver Al Sitio Web.
                        </Link>
                      </h6>
                    </div>
                    <div className="rounded d-flex flex-column p-2" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="p-2 me-3">
                        <h4>Resumen Del Pedido. :*</h4>
                      </div>
                      <div className="border-top px-2 mx-2" />
                      <div className="p-2 d-flex">
                        <div className="col-8">
                          <span className="badge badge-primary rounded-pill d-inline">Elementos. :*</span>
                        </div>
                        <div className="ms-auto">
                          <span className="badge badge-success rounded-pill d-inline">
                            &#36; {(itemsPrice).toLocaleString('es-ES', {
                              style: 'currency',
                              currency: 'COP',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="border-top px-2 mx-2" />
                      <div className="p-2 d-flex">
                        <div className="col-8">
                          <span className="badge badge-primary rounded-pill d-inline">Impuesto. :*</span>
                        </div>
                        <div className="ms-auto">
                          <span className="badge badge-success rounded-pill d-inline">
                            &#36; {(taxPrice).toLocaleString('es-ES', {
                              style: 'currency',
                              currency: 'COP',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="border-top px-2 mx-2" />
                      <div className="p-2 d-flex">
                        <div className="col-8">
                          <span className="badge badge-primary rounded-pill d-inline">Envío. :*</span>
                        </div>
                        <div className="ms-auto">
                          <span className="badge badge-success rounded-pill d-inline">
                            &#36; {(shippingPrice).toLocaleString('es-ES', {
                              style: 'currency',
                              currency: 'COP',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="border-top px-2 mx-2" />
                      <div className="p-2 d-flex">
                        <div className="col-8">
                          <b><span className="badge badge-primary rounded-pill d-inline">Total. :*</span></b>
                        </div>
                        <div className="ms-auto">
                          <b className="text-success">
                            <span className="badge badge-success rounded-pill d-inline">
                              &#36; {(totalPrice).toLocaleString('es-ES', {
                                style: 'currency',
                                currency: 'COP',
                              })}
                            </span>
                          </b>
                        </div>
                      </div>
                      <div className="border-top px-2 mx-2" />
                      <button
                        disabled={loading}
                        onClick={placeOrderHandler}
                        className="w-100 btn btn-lg btn-warning"
                      >
                        {loading ? 'Cargando.' : 'Realizar Pedido.'} <i className="fa-solid fa-eye"></i>
                      </button>
                      <div className="border-top px-2 mx-2" />
                      <br />
                      <div className="border-top px-2 mx-2" />
                      <br />
                      <div className="p-2 d-flex">
                        <div className="col-12">
                          <span className="badge badge-warning mb-2 text-center">
                            CONTACTAR EL VENDEDOR. :*
                          </span>
                          <Link
                            href="https://api.whatsapp.com/send?phone=573133966349&text=Hola%2C%20vengo%20desde%20tu%20perfil%20de%20Instagram%20y%20deseo%20obtener%20mas%20informaci%C3%B3n%20%20%F0%9F%92%8E"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-100 btn btn-lg btn-success">
                            <i className="fab fa-whatsapp" style={{ fontSize: "20px" }}></i> Comprar Por WhatsAPP.
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <hr />
    </Layout>
  );
}

PlaceOrderScreen.auth = true;