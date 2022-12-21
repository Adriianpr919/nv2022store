import Head from 'next/head';
{/**/ } import Link from 'next/link';
{/**/ } import Image from 'next/image';
import React, { useState, useContext } from 'react';
import { Store } from '../utils/Store';
import Logo from '../public/Logonv.png';
import FooterDiv from './Footer';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBBadge,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBInputGroup
} from 'mdb-react-ui-kit';

export default function Layout({ title, children }) {
  const [showBasic, setShowBasic] = useState(false);
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Head>
        <title data-rh="true">{title ? title + ' - Nury Valenzuela.' : 'Nury Valenzuela.'}</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta http-equiv="Content-Language" lang="es-ES" />
        <meta name="robots" content="all" />
        <meta name="geo.placename" content="Villavicencio, Meta, Colombia." />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <link rel="shortcut icon" type="image/x-icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.ico" />
        <meta name="theme-color" content="#E6ACA9" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <MDBNavbar expand='lg' light bgColor='light' className="flex items-center px-4 justify-between shadow-md">
            <MDBContainer fluid>
              <MDBNavbarBrand href="/" rel="noopener noreferrer">
                <Image
                  src={Logo}
                  className="site_logo"
                  alt="Nury Valenzuela."
                  title="Nury Valenzuela."
                  loading="lazy"
                  lang="es" />
              </MDBNavbarBrand>

              <MDBNavbarToggler
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowBasic(!showBasic)}
              >
                <MDBIcon icon='bars' fas />
              </MDBNavbarToggler>

              <MDBCollapse navbar show={showBasic}>
                <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' className="text-lg font-bold" href='/' rel="noopener noreferrer">
                      <MDBIcon fas icon="globe" /> INICIO.
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                        <MDBIcon fas icon="shopping-bag" /> Ver Productos.
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem className="text-lg font-bold" link>Compras Por Categorías.</MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem link>NUEVOS.</MDBDropdownItem>
                        <MDBDropdownItem link>DESTACADOS.</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
                      <input className='form-control' placeholder="BUSCAR" aria-label="BUSCAR" type='BUSCAR' />
                      <MDBBtn outline><MDBIcon fas icon="search" /> BUSCAR.</MDBBtn>
                    </MDBInputGroup>
                  </MDBNavbarItem>
                </MDBNavbarNav>

                <Link className='mx-3' href='/login' rel="noopener noreferrer">
                  <MDBIcon fas icon='users' style={{ fontSize: "20px", color: "black" }} size='lg' />
                  <MDBBadge color='danger' notification pill>
                    1
                  </MDBBadge>
                </Link>
                <Link className='mx-3' href='/cart' rel="noopener noreferrer">
                  <MDBIcon fas icon='shopping-cart' style={{ fontSize: "20px", color: "black" }} size='lg' />
                  {cart.cartItems.length > 0 && (
                    <MDBBadge color='danger' notification pill className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </MDBBadge>
                  )}
                </Link>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          <div
            className='p-5 text-center bg-image shadow-md'
            style={{ backgroundImage: "url('https://images.pexels.com/photos/2942855/pexels-photo-2942855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", height: '400px' }}
          >
            <div className='mask' style={{ backgroundColor: '#bdc3c787' }}>
              <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='text-white'>
                  <h1 className='mb-3'>
                    <span className="special" style={{ textAlign: "center", color: "white", borderRadius: "20px 20px", padding: "2px 4px", backgroundColor: 'rgb(0 0 0 / 12%)' }}>
                      Nury Valenzuela.
                    </span>
                  </h1>
                  <h5 className="mb-4" style={{ textAlign: "center", color: "white", borderRadius: "20px 20px", padding: "2px 4px", backgroundColor: 'rgb(0 0 0 / 12%)' }}>
                    Los mejores productos y la mejor calidad.
                  </h5>
                  <MDBBtn tag="a" href='/shop' rel="noopener noreferrer" role="button" className='btn btn-secondary' size="lg">
                    Compra Ahora.
                  </MDBBtn>
                  <MDBBtn tag="a" href="#shop" rel="noopener noreferrer" role="button" className='btn btn-secondary' size="lg">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="container m-auto mt-4 px-4">
          {children}
        </main>
        <footer className="text-center text-lg-start bg-light text-muted shadow-inner">
          <FooterDiv />
        </footer>
      </div>
    </>
  );
}
