import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { MDBSpinner } from 'mdb-react-ui-kit';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  return (
    <Layout title="Mis Pedidos.">
      <hr />
      <div className="card text-center border border-primary shadow-0 ">
        <div className="card-body">
          <h1 className="mb-4 text-xl">Mis Pedidos.</h1>
          {loading ? (
            <MDBSpinner className='me-2' style={{ width: '3rem', height: '3rem' }} role='status'>
              <span className='visually-hidden'>Cargando.</span>
            </MDBSpinner>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="table-responsive">
              <table className="table caption-top  align-middle mb-0 bg-white">
                <thead className="bg-light border-b">
                  <tr>
                    <th className="p-5 text-left">ID</th>
                    <th className="p-5 text-left">FECHA</th>
                    <th className="p-5 text-left">ARTÍCULO</th>
                    <th className="p-5 text-left">TALLA</th>
                    <th className="p-5 text-left">C. DE ORO</th>
                    <th className="p-5 text-left">C. DE PIEDRA</th>
                    <th className="p-5 text-left">TOTAL</th>
                    <th className="p-5 text-left">PAGADO</th>
                    <th className="p-5 text-left">ENTREGADO</th>
                    <th className="p-5 text-left">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1">
                              {order._id.substring(20, 24)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">
                          {order.createdAt.substring(0, 10)}
                        </p>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">
                          {order.name}
                        </p>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">
                          {order.size}
                        </p>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">
                          {order.colorOne}
                        </p>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">
                          {order.colorTwo}
                        </p>
                      </td>
                      <td>
                        <span className="badge badge-success rounded-pill d-inline">
                          $ {(order.totalPrice)?.toFixed(3)} - COP
                        </span>
                      </td>
                      <td>
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'NO Pagado.'}
                      </td>
                      <td>
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'NO Entregado.'}
                      </td>
                      <td>
                        <Link href={`/order/${order._id}`} passHref>
                          <div>
                            <a>
                              <i className="fa-solid fa-eye"></i> Ver Detalles.
                            </a>
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <hr />
    </Layout>
  );
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;