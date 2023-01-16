import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { MDBSpinner, MDBIcon } from 'mdb-react-ui-kit';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}
function OrderScreen() {
  const { data: session } = useSession();
  // order/:id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('¡.El Pedido Se Pagado Con Éxito.!');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Se Entrega El Pedido.');
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  }

  return (
    <Layout title={`# ID ${orderId}`}>
      <hr />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/order-history"><MDBIcon fas icon="angle-left" /> VOLVER.</Link>
              </li>
            </ol>
          </nav>
        </div>
      </nav>
      <hr />
      <h1 className="mb-4 text-xl">{`# ID ${orderId}`}</h1>
      <div className="card border border-primary shadow-0 ">
        <div className="card-body">
          {loading ? (
            <MDBSpinner className='me-2' style={{ width: '3rem', height: '3rem' }} role='status'>
              <span className='visually-hidden'>Cargando.</span>
            </MDBSpinner>
          ) : error ? (
            <div className="alert-error">{error}</div>
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
                        <p>
                          {isDelivered ? (
                            <div className="alert-success">Entregado En {deliveredAt}</div>
                          ) : (
                            <div className="alert-error">No Entregado.</div>
                          )}
                        </p>
                        <hr />
                        <div className="d-flex pt-2">
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
                        <p>
                          {isPaid ? (
                            <div className="alert-success">Pagado En {paidAt}</div>
                          ) : (
                            <div className="alert-error">NO Pagado.</div>
                          )}
                        </p>
                        <hr />
                        <div className="pt-2">
                          <div className="d-flex pb-2">
                            <div>
                              <p>
                                <b>Encargar Artículos.</b>
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
                                  {orderItems.map((item) => (
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
                              <b>
                                <span className="badge badge-primary rounded-pill d-inline">Total. :*</span>
                              </b>
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
                          <div className="p-2 d-flex pt-3">
                            <div className="col-12">
                              <b>
                                <div>
                                  {!isPaid && (
                                    <div>
                                      {isPending ? (
                                        <MDBSpinner className='me-2' style={{ width: '3rem', height: '3rem' }} role='status'>
                                          <span className='visually-hidden'>Cargando.</span>
                                        </MDBSpinner>
                                      ) : (
                                        <div>
                                          <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                          ></PayPalButtons>
                                        </div>
                                      )}
                                      {loadingPay && <MDBSpinner className='me-2' style={{ width: '3rem', height: '3rem' }} role='status'>
                                        <span className='visually-hidden'>Cargando.</span>
                                      </MDBSpinner>}
                                    </div>
                                  )}
                                  <div>
                                    {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                                      <>
                                        {loadingDeliver && <MDBSpinner className='me-2' style={{ width: '3rem', height: '3rem' }} role='status'>
                                          <span className='visually-hidden'>Cargando.</span>
                                        </MDBSpinner>}
                                        <button
                                          className="primary-button w-full"
                                          onClick={deliverOrderHandler}
                                        >
                                          <i className="fa-solid fa-truck"></i> Entregar Pedido.
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </b>
                            </div>
                          </div>
                          <div className="border-top px-2 mx-2" />
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
        </div>
      </div>
      <hr />
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;