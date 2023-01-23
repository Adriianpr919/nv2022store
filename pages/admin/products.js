import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import 'semantic-ui-css/semantic.min.css';
import { Table, Tab } from 'semantic-ui-react';
import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';

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
      <Link href="/admin/products" active aria-current='page' className="mt-1 mb-2 text-muted small">
        <div>
          <a className="font-bold mt-1 mb-2 text-muted small">
            <MDBBadge color='secondary' pill style={{ fontSize: "15px" }}>
              <MDBIcon fas icon="shopping-bag" /> Productos.
            </MDBBadge>
          </a>
        </div>
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

export default function AdminProdcutsScreen() {
  return (
    <Layout title="Mis Productos De Administración.">
      <hr />
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
      <hr />
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-12">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ARTICULO</Table.HeaderCell>
                <Table.HeaderCell>NOMBRE</Table.HeaderCell>
                <Table.HeaderCell>CATEGORÍA</Table.HeaderCell>
                <Table.HeaderCell>SUB-CATEGORÍA</Table.HeaderCell>
                <Table.HeaderCell>PRECIO</Table.HeaderCell>
                <Table.HeaderCell>CANTIDAD</Table.HeaderCell>
                <Table.HeaderCell>DESCRIPCIÓN</Table.HeaderCell>
                <Table.HeaderCell>ACCIÓNES</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  ----
                </Table.Cell>
                <Table.Cell>----</Table.Cell>
                <Table.Cell>----</Table.Cell>
                <Table.Cell>----</Table.Cell>
                <Table.Cell>----</Table.Cell>
                <Table.Cell>----</Table.Cell>
                <Table.Cell>----</Table.Cell>
                <Table.Cell>----</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
      <hr />
    </Layout>
  );
}

AdminProdcutsScreen.auth = { adminOnly: true };
