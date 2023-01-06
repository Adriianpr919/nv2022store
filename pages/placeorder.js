import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 19;
  const taxPrice = round2(itemsPrice * 0.19); //19% tax in Colombia.
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Realizar Pedido.">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Realizar Pedido.</h1>
      {cartItems.length === 0 ? (
        <div>
          El Carrito Esta Vacío. <Link href="/"><i className="fa-solid fa-chevron-right"></i> Ir De Compras. <i className="fa-solid fa-chevron-left"></i></Link>
        </div>
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
              <div>
                <Link href="/shipping">
                  <i className="fa-solid fa-pen-to-square"></i> Editar.
                </Link>
              </div>
            </div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Método De Pago. :*</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">
                  <i className="fa-solid fa-pen-to-square"></i> Editar.
                </Link>
              </div>
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
                  {cartItems.map((item) => (
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
              <div>
                <Link href="/cart">
                  <i className="fa-solid fa-pen-to-square"></i> Editar.
                </Link>
              </div>
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
                </li>
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
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="w-100 btn btn-lg btn-warning"
                  >
                    {loading ? 'Cargando.' : 'Realizar Pedido.'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <hr />
    </Layout>
  );
}

PlaceOrderScreen.auth = true;