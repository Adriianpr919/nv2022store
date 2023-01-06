import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Se Requiere Método De Pago.');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Método De Pago.">
      <hr />
      <CheckoutWizard activeStep={2} />
      <div className="card text-center border border-primary shadow-0 ">
        <div className="card-body">
          <form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={submitHandler}>
            <h1 className="mb-4 text-xl">Método De Pago.</h1>
            {['PayPal', 'Stripe', 'ContraReembolso'].map((payment) => (
              <div key={payment} className="mb-4">
                <input
                  name="paymentMethod"
                  className="p-2 outline-none focus:ring-0"
                  id={payment}
                  type="radio"
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                />
                <label className="p-2" htmlFor={payment}>
                  {payment}
                </label>
              </div>
            ))}
            <div className="mb-4 flex justify-between">
              <button
                onClick={() => router.push('/shipping')}
                type="button"
                className="w-100 btn btn-lg btn-secondary"
              >
                <i className="fa-solid fa-chevron-left"></i> Anterior.
              </button>
              <button className="w-100 btn btn-lg btn-primary">
                Siguiente. <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <hr />
    </Layout>
  );
}

PaymentScreen.auth = true;