import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Image from 'next/image';
import React, { Fragment, useState, useContext, useEffect } from 'react';
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
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = {

  pages: [
    { name: 'Inicio.', href: '/' },
    { name: 'Ver Todos Los Productos.', href: '/search' },
  ],
}

import {
  MDBContainer,
  MDBNavbar,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBadge,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBInputGroup
} from 'mdb-react-ui-kit';

export default function Layout({ title, children }) {
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
  const [open, setOpen] = useState(false);
  return (
    <>
      <Head>
        <title data-rh="true">{title ? title + ' - Nury Valenzuela.' : 'Nury Valenzuela.'}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="Content-Language" lang="es-ES" />
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
        <div className="bg-white">
          {/* Mobile menu */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pt-5 pb-2">
                      <button
                        type="button"
                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Cerrar Menú.</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                      {navigation.pages.map((page) => (
                        <div key={page.name} className="flow-root">
                          <a href={page.href} rel="noopener noreferrer" className="-m-2 block p-2 font-medium text-gray-900">
                            {page.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <header className="relative bg-white">
            <p className="flex h-10 items-center justify-center bg-rose-200 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
              BIENVENIDO A NURY VALENZUELA.
            </p>
            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center">
                  <button
                    type="button"
                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Menú Abierto.</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Logo */}
                  <div className="ml-4 flex lg:ml-0">
                    <Link href="/" rel="noopener noreferrer">
                      <span className="sr-only">Nury Valenzuela.</span>
                      <Image
                        className="h-12 w-auto"
                        src={Logo}
                        alt="Nury Valenzuela."
                        title="Nury Valenzuela."
                        width={100}
                        height={100}
                        loading="lazy"
                        lang="es"
                      />
                    </Link>
                  </div>

                  {/* Flyout menus */}
                  <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                    <div className="flex h-full space-x-8">
                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </Popover.Group>
                  <div className="ml-auto flex items-center">
                    {/* Search */}
                    <div className="flex lg:ml-6">
                      <a href="/search" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Buscar.</span>
                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    </div>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-6">
                      <Link href="/cart" rel="noopener noreferrer" className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        {cartItemsCount > 0 && (
                          <MDBBadge pill className='mx-2' color='danger' light>
                            <span className="ml-2 text-sm font-medium text-red-600 group-hover:text-gray-800">Ver {cartItemsCount}</span>
                          </MDBBadge>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
        <header>
          <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
              <MDBNavbarNav className='justify-content-center text-center ms-auto me-auto'>
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
                  <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
                    <input className='form-control' placeholder="BUSCAR" aria-label="BUSCAR" type='BUSCAR' />
                    <MDBBtn outline><MDBIcon fas icon="search" /> BUSCAR.</MDBBtn>
                  </MDBInputGroup>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  {status === 'loading' ? (
                    'Cargando.'
                  ) : session?.user ? (
                    <MDBDropdown>
                      <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                        <i className="fa-solid fa-users"></i> {session.user.name}.
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem className="text-lg font-bold" link href="/profile" rel="noopener noreferrer" id={DropdownLink}>
                          <i className="fa-solid fa-circle-user"></i> Mi Perfil.
                        </MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem link href="/order-history" rel="noopener noreferrer" id={DropdownLink}>
                          <i className="fa-solid fa-truck-fast"></i> Historial De Pedidos.
                        </MDBDropdownItem>
                        <div>
                          {session.user.isAdmin && (
                            <div>
                              <MDBDropdownItem link href="/admin/dashboard" rel="noopener noreferrer" id={DropdownLink}>
                                <i className="fa-solid fa-user-tie"></i> Panel De Administración.
                              </MDBDropdownItem>
                            </div>
                          )}
                        </div>
                        <MDBDropdownItem link href="#" rel="noopener noreferrer" onClick={logoutClickHandler}>
                          <i className="fa-solid fa-power-off"></i> Cerrar Sesión.
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  ) : (
                    <Link className='mx-3' href="/login" rel="noopener noreferrer">
                      <button type="button" className="btn btn-outline-dark me-3">
                        <span className="badge rounded-pill bg-secondary" style={{ fontSize: "15px" }}>
                          <i className="fas fa-users fa-lg" style={{ fontSize: "20px", color: "black" }}></i> Ingresar.
                        </span>
                      </button>
                    </Link>
                  )}
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBContainer>
          </MDBNavbar>
          <BannerLogo />
        </header>
        <main className="container m-auto mt-4 px-4">
          {children}
        </main>
        <div className="bg-gray-50">
          <div className="mx-auto max-w-7xl py-12 px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">¿Donde Ubicamos En La Tienda?</span>
              <span className="block text-rose-200">
                <span className="special" style={{ textAlign: "center", color: "black", borderRadius: "20px 20px", padding: "2px 4px", backgroundColor: 'rgb(0 0 0 / 12%)' }}>
                  Nury Valenzuela.
                </span>
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/location"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-rose-200 px-5 py-3 text-base font-medium text-white hover:bg-rose-500"
                >
                  Ver Contacto.
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-rose-200 hover:rose-500"
                >
                  Quiénes Somos.
                </Link>
              </div>
            </div>
          </div>
        </div>
        <footer className="text-center text-lg-start bg-light text-muted shadow-inner">
          <FooterDiv />
        </footer>
      </div >
    </>
  );
}
