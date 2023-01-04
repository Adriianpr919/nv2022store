import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

import {
  MDBInput,
  MDBBtn,
  MDBBadge
} from 'mdb-react-ui-kit';

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
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}>
        <h1 className="mb-4 text-xl">Dirección De Envío. :*</h1>
        <div className="mb-4">
          <MDBInput
            wrapperClass='mb-4'
            id='fullName'
            label='Nombre Completo.'
            autoFocus
            {...register('fullName', {
              required: 'Por Favor Ingrese El Nombre Completo.',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">
              <MDBBadge className='mx-2' color='danger' light>
                <i className="fa-solid fa-triangle-exclamation"></i> {errors.fullName.message} <i className="fa-solid fa-triangle-exclamation"></i>
              </MDBBadge>
            </div>
          )}
        </div>
        <div className="mb-4">
          <MDBInput
            wrapperClass='mb-4'
            id='address'
            label='Dirección.'
            {...register('address', {
              required: 'Por Favor Ingrese La Dirección.',
              minLength: { value: 3, message: 'La Dirección Tiene Más De 2 Caracteres.' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">
              <MDBBadge className='mx-2' color='danger' light>
                <i className="fa-solid fa-triangle-exclamation"></i> {errors.address.message} <i className="fa-solid fa-triangle-exclamation"></i>
              </MDBBadge>
            </div>
          )}
        </div>
        <div className="mb-4">
          <MDBInput
            wrapperClass='mb-4'
            id='city'
            label='Ciudad.'
            {...register('city', {
              required: 'Por Favor Ingrese La Ciudad.',
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">
              <MDBBadge className='mx-2' color='danger' light>
                <i className="fa-solid fa-triangle-exclamation"></i> {errors.city.message} <i className="fa-solid fa-triangle-exclamation"></i>
              </MDBBadge>
            </div>
          )}
        </div>
        <div className="mb-4">
          <MDBInput
            wrapperClass='mb-4'
            id='postalCode'
            label='Código Postal.'
            {...register('postalCode', {
              required: 'Por Favor Ingrese El Código Postal.',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">
              <MDBBadge className='mx-2' color='danger' light>
                <i className="fa-solid fa-triangle-exclamation"></i> {errors.postalCode.message} <i className="fa-solid fa-triangle-exclamation"></i>
              </MDBBadge>
            </div>
          )}
        </div>
        <div className="mb-4">
          <MDBInput
            wrapperClass='mb-4'
            id='country'
            label='País.'
            {...register('country', {
              required: 'Por Favor Ingrese El País.',
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">
              <MDBBadge className='mx-2' color='danger' light>
                <i className="fa-solid fa-triangle-exclamation"></i> {errors.country.message} <i className="fa-solid fa-triangle-exclamation"></i>
              </MDBBadge>
            </div>
          )}
        </div>
        <MDBBtn className='mb-4' type='submit' block>
          Siguiente. <i className="fa-solid fa-chevron-right"></i>
        </MDBBtn>
      </form>
      <hr />
    </Layout>
  );
}

ShippingScreen.auth = true;