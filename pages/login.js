import React from 'react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import Layout from '../components/Layout';

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };
  return (
    <Layout title="Iniciar Sesión.">
      <hr />
      <div className="row">
        <div className="col-md-7">
          <div className="col-lg-12 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3">
              <span className="special" style={{ textAlign: "justify", color: "black" }}>
                Nury Valenzuela.
              </span>
            </h1>
            <p className="col-lg-10 fs-4" style={{ textAlign: "justify" }}>
              ¡Bienvenido de nuevo a Nury Valenzuela Ingrese su correo electrónico para comenzar.
            </p>
          </div>
        </div>
        <div className="col-md-5">
          <div className="col-md-12 mx-auto col-lg-12">
            <form
              className="p-4 p-md-5 border rounded-3 bg-light"
              onSubmit={handleSubmit(submitHandler)}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  {...register('email', {
                    required: 'Por favor Ingrese El Correo Electrónico.',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Por favor Introduzca Un Correo Electrónico Válido.',
                    },
                  })}
                  id='email'
                  className="form-control"
                  placeholder="tucorreo@example.com"
                  autoFocus />
                <label htmlFor="email">
                  <i className="fas fa-at"></i> Tu Correo. <span className="required">:*</span>
                </label>
                {errors.email && (
                  <div className="text-red-500">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  {...register('password', {
                    required: 'Por Favor, Ingrese Contraseña.',
                    minLength: { value: 6, message: 'La Contraseña Tiene Más De 5 Caracteres.' },
                  })}
                  id='password'
                  className="form-control"
                  placeholder="La Contraseña."
                  autoFocus />
                <label htmlFor="password">
                  <i className="fas fa-key"></i> La Contraseña. <span className="required">:*</span>
                </label>
                {errors.password && (
                  <div className="text-red-500 ">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <button className="w-100 btn btn-lg btn-primary">
                <i className="fas fa-user-shield"></i> Iniciar Sesión.
              </button>
              <hr className="my-4" />
              <small className="text-muted">
                <p style={{ textAlign: "justify" }}>
                  {' '}
                  SI TODAVÍA NO TIENES UNA CUENTA DE USUARIO DE Nury Valenzuela UTILIZAR ESTA OPCIÓN PARA ACCEDER AL FORMULARIO
                  DE REGISTRO.{' '}
                  {' '}
                  TE SOLICITAREMOS LA INFORMACIÓN IMPRESCINDIBLE PARA REALIZAR EL PROCESO DE COMPRA.{' '}
                  <Link href="/register" rel="noopener noreferrer" className="btn btn-secondary">
                    <i className="fas fa-user-plus"></i> Regístrarse.
                  </Link>
                </p>
              </small>
            </form>
          </div>
        </div>
      </div>
      <hr />
    </Layout>
  );
}
