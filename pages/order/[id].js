import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { MDBSpinner } from 'mdb-react-ui-kit';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function OrderScreen() {
  // order/:id
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
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
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);
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

  return (
    <Layout title={`Order ${orderId}`}>
      <hr />
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
      <div className="card text-center border border-primary shadow-0 ">
        <div className="card-body">
          {loading ? (
            <MDBSpinner className='me-2' style={{ width: '3rem', height: '3rem' }} role='status'>
              <span className='visually-hidden'>Cargando.</span>
            </MDBSpinner>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="grid md:grid-cols-4 md:gap-5">
              <div className="overflow-x-auto md:col-span-3">
                <div className="card  p-5">
                  <h2 className="mb-2 text-lg">Dirección De Envío. :*</h2>
                  <div>
                    {shippingAddress.fullName}, {shippingAddress.address},{' '}
                    {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                    {shippingAddress.country}
                  </div>
                  {isDelivered ? (
                    <div className="alert-success">Entregado En {deliveredAt}</div>
                  ) : (
                    <div className="alert-error">No Entregado.</div>
                  )}
                </div>

                <div className="card p-5">
                  <h2 className="mb-2 text-lg">Método De Pago. :*</h2>
                  <div>{paymentMethod}</div>
                  {isPaid ? (
                    <div className="alert-success">Pagado En {paidAt}</div>
                  ) : (
                    <div className="alert-error">NO Pagado.</div>
                  )}
                </div>

                <div className="card overflow-x-auto p-5">
                  <h2 className="mb-2 text-lg">Encargar Artículos.</h2>
                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="px-5 text-left">ARTÍCULO</th>
                        <th className="    p-5 text-right">CANTIDAD</th>
                        <th className="  p-5 text-right">PRECIO</th>
                        <th className="p-5 text-right">SUB-TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item) => (
                        <tr key={item._id} className="border-b">
                          <td>
                            <Link href={`/product/${item.slug}`}>
                              <div>
                                <a className="flex items-center">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                  &nbsp;
                                  {item.name}
                                </a>
                              </div>
                            </Link>
                          </td>
                          <td className=" p-5 text-right">{item.quantity}</td>
                          <td className="p-5 text-right">$ {item.price} - COP</td>
                          <td className="p-5 text-right">
                            $ {item.quantity * item.price} - COP
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="card  p-5">
                  <h2 className="mb-2 text-lg">Resumen Del Pedido. :*</h2>
                  <ul>
                    <li>
                      <div className="mb-2 flex justify-between">
                        <div>Elementos. :*</div>
                        <div>$ {itemsPrice} - COP</div>
                      </div>
                    </li>{' '}
                    <li>
                      <div className="mb-2 flex justify-between">
                        <div>Impuesto. :*</div>
                        <div>$ {taxPrice} - COP</div>
                      </div>
                    </li>
                    <li>
                      <div className="mb-2 flex justify-between">
                        <div>Envío. :*</div>
                        <div>$ {shippingPrice} - COP</div>
                      </div>
                    </li>
                    <li>
                      <div className="mb-2 flex justify-between">
                        <div>Total. :*</div>
                        <div>$ {totalPrice} - COP</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;