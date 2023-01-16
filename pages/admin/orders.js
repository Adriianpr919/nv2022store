import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { MDBSpinner, MDBIcon, MDBBtn, MDBBadge } from 'mdb-react-ui-kit';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Mis Pedidos De Administración.">
      <hr />
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">
                <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
                  <i className="fa-solid fa-sliders"></i> Tablero.
                </MDBBadge>
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">
                <div>
                  <a className="font-bold">
                    <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
                      <i className="fa-solid fa-truck-fast"></i> Mis Pedidos.
                    </MDBBadge>
                  </a>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/admin/products">
                <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
                  <MDBIcon fas icon="shopping-bag" /> Productos.
                </MDBBadge>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
                  <i className="fa-solid fa-users"></i> Usuarios.
                </MDBBadge>
              </Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-xl"><i className="fa-solid fa-truck-fast"></i> Mis Pedidos De Administración.</h1>
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
                    <th className="p-5 text-left">USUARIO</th>
                    <th className="p-5 text-left">FECHA</th>
                    <th className="p-5 text-left">TOTAL</th>
                    <th className="p-5 text-left">PAGADO</th>
                    <th className="p-5 text-left">ENTREGADO</th>
                    <th className="p-5 text-left">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-5">
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1">
                              {order._id.substring(20, 24)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <p className="fw-normal mb-1">
                          {order.user ? order.user.name : 'USUARIO'}
                        </p>
                      </td>
                      <td className="p-5">
                        <p className="fw-normal mb-1">
                          {order.createdAt.substring(0, 10)}
                        </p>
                      </td>
                      <td className="p-5">
                        <span className="badge badge-success rounded-pill d-inline" style={{ fontSize: "15px" }}>
                          &#36; {(order.totalPrice).toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'COP',
                          })}
                        </span>
                      </td>
                      <td className="p-5">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'NO Pagado.'}
                      </td>
                      <td className="p-5">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'NO Entregado.'}
                      </td>
                      <td className="p-5">
                        <Link href={`/order/${order._id}`} passHref>
                          <div>
                            <MDBBtn className='me-1' color='info' style={{ fontSize: "15px" }}>
                              <i className="fa-solid fa-eye"></i> Ver Detalles.
                            </MDBBtn>
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

AdminOrderScreen.auth = { adminOnly: true };