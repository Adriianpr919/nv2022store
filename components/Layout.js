import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Image from 'next/image';
import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
//import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
//import { SearchIcon } from '@heroicons/react/outline';
import Logo from '../public/Logonv.png';
import FooterDiv from './Footer';
import BannerLogo from './BannerLogo';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

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
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
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
      <ToastContainer position="bottom-center" limit={1} />
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
                        <i className="fa-solid fa-circle-info"></i> &Aacute;REA LEGAL.
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem className="text-lg font-bold" link href="/options1" rel="noopener noreferrer">
                          <i className="fa fa-angle-double-right wv_circle" /> Términos y Condiciones.
                        </MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem link href="/options2" rel="noopener noreferrer">
                          <i className="fa fa-angle-double-right wv_circle" /> Políticas De Envios, Cambios, Devoluciones Y
                          Garantías.
                        </MDBDropdownItem>
                        <MDBDropdownItem link href="/faq" rel="noopener noreferrer">
                          <i className="fa fa-angle-double-right wv_circle" /> Preguntas Frecuentes.
                        </MDBDropdownItem>
                        <MDBDropdownItem link href="/about" rel="noopener noreferrer">
                          <i className="fa fa-angle-double-right wv_circle" /> Quiénes Somos.
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                        <MDBIcon fas icon="shopping-bag" /> VER PRODUCTOS.
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem className="text-lg font-bold" link>
                          <i className="fa fa-angle-double-right wv_circle" /> Compras Por Categorías.
                        </MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem link>
                          <i className="fa fa-angle-double-right wv_circle" /> NUEVOS.
                        </MDBDropdownItem>
                        <MDBDropdownItem link>
                          <i className="fa fa-angle-double-right wv_circle" /> DESTACADOS.
                        </MDBDropdownItem>
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

                {status === 'loading' ? (
                  'Cargando.'
                ) : session?.user ? (
                  <MDBDropdown>
                    <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                      <i className="fa-solid fa-users"></i> {session.user.name}.
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem className="text-lg font-bold" link href="/profile" id={DropdownLink}>
                        <i className="fa-solid fa-circle-user"></i> Mi Perfil.
                      </MDBDropdownItem>
                      <MDBDropdownItem divider />
                      <MDBDropdownItem link href="/order-history" id={DropdownLink}>
                        <i className="fa-solid fa-truck-fast"></i> Historial De Pedidos.
                      </MDBDropdownItem>
                      <MDBDropdownItem link href="#" onClick={logoutClickHandler}>
                        <i className="fa-solid fa-power-off"></i> Cerrar Sesión.
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                ) : (
                  <Link className='mx-3' href="/login" rel="noopener noreferrer">
                    <MDBIcon fas icon='users' style={{ fontSize: "20px", color: "black" }} size='lg' />
                  </Link>
                )}
                <Link className='mx-3' href='/cart' rel="noopener noreferrer">
                  <MDBIcon fas icon='shopping-cart' style={{ fontSize: "20px", color: "black" }} size='lg' />
                  {cartItemsCount > 0 && (
                    <MDBBadge color='danger' notification pill className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </MDBBadge>
                  )}
                </Link>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          <BannerLogo />
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
