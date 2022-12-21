/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import Link from 'next/link';
import Image from 'next/image';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  MDBIcon
} from 'mdb-react-ui-kit';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>PRODUCTOS NO ENCONTRADOS.</div>;
  }
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
      <figure className="dark-theme flex justify-center items-center">
        <div className="card text-center border border-primary shadow-0 shadow-md" style={{ width: '18rem', textAlign: "center" }}>
          <Image
            src={product.image}
            alt={product.name}
            title={product.name}
            width={640}
            height={640}
            className="img-fluid border border-dark img-rounded mx-auto d-block img-thumbnail shadow-md card-img-top"
            layout="responsive"
          ></Image>
          <div className="card-body">
            <p className="card-text">
              <ul className="list-group list-group-light list-group-small">
                <li className="list-group-item px-4">
                  <h1 className="text-lg badge badge-secondary mb-2" style={{ fontSize: "15px" }}>
                    {product.name}
                  </h1>
                </li>
                <li className="badge badge-secondary mb-2 list-group-item px-4" style={{ fontSize: "15px" }}
                >
                  Categoría. :* {product.category}
                </li>
                <li className="badge badge-secondary mb-2 list-group-item px-4" style={{ fontSize: "15px" }}
                >
                  SubCategoría. :* {product.brand}
                </li>
                <li className="badge badge-warning mb-2 list-group-item px-4" style={{ fontSize: "15px" }}>
                  {product.rating} De {product.numReviews} Reseñas.
                </li>
                <li className="badge badge-secondary mb-2 list-group-item px-4" style={{ textAlign: "justify", fontSize: "15px" }}>
                  Descripción. :* <br /> <p className="card-text" style={{ textAlign: "justify", fontSize: "15px" }}>
                    {product.description}
                  </p>
                </li>
              </ul>
            </p>
          </div>
          <div className="card-body">
            <p className="card-text">
              <div className="mb-2 flex justify-between">
                <div className="badge badge-secondary mb-2" style={{ fontSize: "15px" }}>
                  Precio. :*
                </div>
                <div>
                  <span className="pd-price badge badge-success mb-2" style={{ color: "green", fontSize: "15px" }}>
                    $ {product.price} - COP
                  </span>
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                <div className="badge badge-secondary mb-2" style={{ fontSize: "15px" }}>
                  Unidades. :*
                </div>
                <div>
                  <span className='pd-quantityNumber badge badge-success'>
                    <MDBIcon fas icon="check" style={{ color: "green", fontSize: "20px" }} /> {product.countInStock > 0 ? 'EN STOCK.' : 'AGOTADO.'}
                  </span>
                </div>
              </div>
              <p style={{ textAlign: "justify", color: "red" }}>
                La combinación de presas serán despachadas según la disponibilidad de nuestros Nury Valenzuela Agradecemos su comprensión.
              </p>
              <hr />
              <button
                className="btn btn-primary"
              >
                <i className="fa fa-shopping-basket" /> Añadir Al Carrito.
              </button>
            </p>
          </div>
        </div>
      </figure>
    </Layout>
  );
}
