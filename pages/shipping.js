import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push('/payment');
  };
  return (
    <Layout title="Dirección De Envío.">
      <hr />
      <CheckoutWizard activeStep={1} />
      <div className="card text-center border border-primary shadow-0 ">
        <div className="card-body">
          <form
            className="p-4 p-md-5 border rounded-3 bg-light"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">Dirección De Envío.</h1>
            <div className="form-floating mb-4">
              <input
                className="form-control"
                placeholder="Tu Nompre Completo."
                id="fullName"
                autoFocus
                {...register('fullName', {
                  required: 'Por Favor Ingrese El Nombre Completo.',
                })}
              />
              <label htmlFor="fullName">
                <i className="fa-solid fa-user-pen"></i> Nombre Completo. <span className="required">:*</span>
              </label>
              {errors.fullName && (
                <div className="text-red-500">
                  <i className="fa-solid fa-triangle-exclamation"></i> {errors.fullName.message} <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
              )}
            </div>
            <div className="form-floating mb-4">
              <input
                className="form-control"
                placeholder="Dirección."
                id="address"
                {...register('address', {
                  required: 'Por Favor Ingrese La Dirección.',
                  minLength: { value: 10, message: 'La Dirección Tiene Más De 9 Caracteres.' },
                })}
              />
              <label htmlFor="address">
                <i className="fa-solid fa-file-pen"></i> Dirección. <span className="required">:*</span>
              </label>
              {errors.address && (
                <div className="text-red-500">
                  <i className="fa-solid fa-triangle-exclamation"></i> {errors.address.message} <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
              )}
            </div>
            <div className="form-floating mb-4">
              <input
                className="form-control"
                placeholder="Ciudad."
                id="city"
                {...register('city', {
                  required: 'Por Favor Ingrese La Ciudad.',
                })}
              />
              <label htmlFor="city">
                <i className="fa-solid fa-file-pen"></i> Ciudad. <span className="required">:*</span>
              </label>
              {errors.city && (
                <div className="text-red-500 ">
                  <i className="fa-solid fa-triangle-exclamation"></i> {errors.city.message} <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
              )}
            </div>
            <div className="form-floating mb-4">
              <input
                className="form-control"
                placeholder="Código Postal."
                id="postalCode"
                {...register('postalCode', {
                  required: 'Por Favor Ingrese El Código Postal.',
                })}
              />
              <label htmlFor="postalCode">
                <i className="fa-solid fa-file-pen"></i> Código Postal. <span className="required">:*</span>
              </label>
              {errors.postalCode && (
                <div className="text-red-500 ">
                  <i className="fa-solid fa-triangle-exclamation"></i> {errors.postalCode.message} <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
              )}
            </div>
            <div className="form-floating mb-4">
              <input
                className="form-control"
                placeholder="País."
                id="country"
                {...register('country', {
                  required: 'Por Favor Ingrese El País.',
                })}
              />
              <label htmlFor="country">
                <i className="fa-solid fa-file-pen"></i> País. <span className="required">:*</span>
              </label>
              {errors.country && (
                <div className="text-red-500 ">
                  <i className="fa-solid fa-triangle-exclamation"></i> {errors.country.message} <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
              )}
            </div>
            <div className="mb-4 flex justify-between">
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

ShippingScreen.auth = true;