import axios from 'axios';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import { MDBSpinner, MDBIcon, MDBBadge } from 'mdb-react-ui-kit';
import 'semantic-ui-css/semantic.min.css';
import { Tab } from 'semantic-ui-react';

const panes = [
  {
    menuItem: 'Tablero.', render: () => <Tab.Pane>
      <Link href="/admin/dashboard" className="mt-1 mb-2 text-muted small">
        <div>
          <a className="font-bold mt-1 mb-2 text-muted small">
            <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
              <i className="fa-solid fa-sliders"></i> Tablero.
            </MDBBadge>
          </a>
        </div>
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
        <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
          <i className="fa-solid fa-users"></i> Usuarios.
        </MDBBadge>
      </Link>
    </Tab.Pane>
  },
]

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(162, 222, 208, 1)',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    <Layout title="Panel De Administración.">
      <hr />
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
      <hr />
      <div className="grid  md:grid-cols-4 md:gap-5">
        <div className="md:col-span-12">
          <h1 className="mb-4 text-xl">
            <i className="fa-solid fa-user-tie"></i> Panel De Administración.
          </h1>
          {loading ? (
            <MDBSpinner className='me-2' style={{ width: '3rem', height: '3rem' }} role='status'>
              <span className='visually-hidden'>Cargando.</span>
            </MDBSpinner>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="card m-12 p-12">
                  <p className="text-3xl">
                    &#36; {(summary.ordersPrice).toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'COP',
                    })}
                  </p>
                  <p><i className="fa-solid fa-chart-line"></i> Ventas.</p>
                  <Link href="/admin/orders"><i className="fa-solid fa-chart-line"></i> Ver Ventas.</Link>
                </div>
                <div className="card m-12 p-12">
                  <p className="text-3xl">{summary.ordersCount} </p>
                  <p><i className="fa-solid fa-truck-fast"></i> Pedidos.</p>
                  <Link href="/admin/orders"><i className="fa-solid fa-truck-fast"></i> Ver Pedidos.</Link>
                </div>
                <div className="card m-12 p-12">
                  <p className="text-3xl">{summary.productsCount} </p>
                  <p><MDBIcon fas icon="shopping-bag" /> Productos.</p>
                  <Link href="/admin/products"><MDBIcon fas icon="shopping-bag" /> Ver Productos.</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.usersCount} </p>
                  <p><i className="fa-solid fa-users"></i> Usuarios.</p>
                  <Link href="/admin/users"><i className="fa-solid fa-users"></i> Ver Usuarios.</Link>
                </div>
              </div>
              <h2 className="text-xl">Reporte De Ventas.</h2>
              <Bar
                options={{
                  legend: { display: true, position: 'right' },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
      <hr />
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;