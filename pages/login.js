import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from "react-hook-form";
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Iniciar Sesión.">
      <hr />
      <div className="card text-center border border-primary shadow-0 ">
        <div className="card-body">
          <form
            className="p-4 p-md-5 border rounded-3 bg-light"
            onSubmit={handleSubmit(submitHandler)}>
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
                <Link href={`/register?redirect=${redirect || '/'}`} rel="noopener noreferrer" className="w-100 btn btn-lg btn-secondary">
                  <i className="fas fa-user-plus"></i> Regístrarse.
                </Link>
              </p>
            </small>
          </form>
        </div>
      </div>
      <hr />
    </Layout>
  );
}
