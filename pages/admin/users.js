import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { MDBSpinner, MDBIcon, MDBBtn, MDBBadge } from 'mdb-react-ui-kit';
import 'semantic-ui-css/semantic.min.css';
import { Tab } from 'semantic-ui-react';

const panes = [
  {
    menuItem: 'Tablero.', render: () => <Tab.Pane>
      <Link href="/admin/dashboard" className="mt-1 mb-2 text-muted small">
        <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
          <i className="fa-solid fa-sliders"></i> Tablero.
        </MDBBadge>
      </Link>
    </Tab.Pane>
  },
  {
    menuItem: 'Mis Pedidos.', render: () => <Tab.Pane>
      <Link href="/admin/orders" className="mt-1 mb-2 text-muted small">
        <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
          <i className="fa-solid fa-truck-fast"></i> Mis Pedidos.
        </MDBBadge>
      </Link>
    </Tab.Pane>
  },
  {
    menuItem: 'Productos.', render: () => <Tab.Pane>
      <Link href="/admin/products" className="mt-1 mb-2 text-muted small">
        <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
          <MDBIcon fas icon="shopping-bag" /> Productos.
        </MDBBadge>
      </Link>
    </Tab.Pane>
  },
  {
    menuItem: 'Usuarios.', render: () => <Tab.Pane>
      <Link href="/admin/users" className="mt-1 mb-2 text-muted small">
        <div>
          <a className="font-bold mt-1 mb-2 text-muted small">
            <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
              <i className="fa-solid fa-users"></i> Usuarios.
            </MDBBadge>
          </a>
        </div>
      </Link>
    </Tab.Pane>
  },
]

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (userId) => {
    if (!window.confirm('Estas Seguro?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Usuario Eliminado ??xitosamente.');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Usuarios De Administraci??n.">
      <hr />
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
      <hr />
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-12">
          <h1 className="mb-4 text-xl"><i className="fa-solid fa-users"></i> Usuarios De Administraci??n.</h1>
          {loadingDelete && <MDBSpinner className='me-2' color='danger' style={{ width: '3rem', height: '3rem' }} role='status'>
            <span className='visually-hidden'>Borrando.</span>
          </MDBSpinner>}
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
                    <th className="p-5 text-left">NOMBRE</th>
                    <th className="p-5 text-left">CORREO</th>
                    <th className="p-5 text-left">ADMIN</th>
                    <th className="p-5 text-left">ACCI??N</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className=" p-5 ">
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1">
                              {user._id.substring(20, 24)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className=" p-5 ">
                        <p className="fw-bold mb-1">
                          {user.name}
                        </p>
                      </td>
                      <td className=" p-5 ">
                        <p className="fw-bold mb-1">
                          {user.email}
                        </p>
                      </td>
                      <td className=" p-5 ">
                        <p className="fw-bold mb-1">
                          {user.isAdmin ? 'SI' : 'NO'}
                        </p>
                      </td>
                      <td className=" p-5 ">
                        {/*<Link href={`/admin/user/${user._id}`} passHref>
                          <div>
                            <MDBBtn type="button" className="me-1" color='success'>
                              <i className="fa-solid fa-pen-to-square"></i> Editar.
                            </MDBBtn>
                          </div>
                        </Link>
                        &nbsp;*/}
                        <MDBBtn
                          type="button"
                          className="me-1"
                          color='danger'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <i className="fa-solid fa-trash"></i> Borrar.
                        </MDBBtn>
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

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;