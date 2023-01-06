import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

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
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

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
    <Layout title="Crear Una Cuenta">
      <hr />
      <div className="card text-center border border-primary shadow-0 ">
        <div className="card-body">
          <form
            className="p-4 p-md-5 border rounded-3 bg-light"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="col-lg-12 text-center text-lg-start">
              <h1 className="display-4 fw-bold lh-1 mb-3">
                <span className="special" style={{ textAlign: "justify", color: "black" }}>
                  Nury Valenzuela.
                </span>
              </h1>
              <p className="col-lg-10 fs-4" style={{ textAlign: "justify" }}>
              ¡Bienvenido a Nury Valenzuela Ingrese su correo electrónico para comenzar.
              </p>
            </div>
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Tu Nompre Completo."
                id="name"
                autoFocus
                {...register('name', {
                  required: 'Por Favor Ingrese El Nompre Completo.',
                })}
              />
              <label htmlFor="name">
                <i className="fa-solid fa-user-pen"></i> Tu Nompre Completo. <span className="required">:*</span>
              </label>
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>

            <div className="form-floating mb-4">
              <input
                type="email"
                {...register('email', {
                  required: 'Por favor Ingrese El Correo Electrónico.',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Por favor Introduzca Un Correo Electrónico Válido.',
                  },
                })}
                className="form-control"
                placeholder="tucorreo@example.com"
                id="email"
                autoFocus
              ></input>
              <label htmlFor="email">
                <i className="fas fa-at"></i> Tu Correo. <span className="required">:*</span>
              </label>
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                {...register('password', {
                  required: 'Por Favor, Ingrese Contraseña.',
                  minLength: { value: 6, message: 'La Contraseña Tiene Más De 5 Caracteres.' },
                })}
                className="form-control"
                placeholder="La Contraseña."
                id="password"
                autoFocus
              ></input>
              <label htmlFor="password">
                <i className="fas fa-key"></i> La Contraseña. <span className="required">:*</span>
              </label>
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>
            <div className="form-floating mb-4">
              <input
                className="form-control"
                placeholder="Confirmar La Contraseña."
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Por Favor Ingrese Confirmar Contraseña.',
                  validate: (value) => value === getValues('password'),
                  minLength: {
                    value: 6,
                    message: 'Confirmar La Contraseña Tiene Más De 5 Caracteres.',
                  },
                })}
                autoFocus
              />
              <label htmlFor="confirmPassword">
                <i className="fas fa-key"></i> Confirmar La Contraseña. <span className="required">:*</span>
              </label>
              {errors.confirmPassword && (
                <div className="text-red-500 ">
                  {errors.confirmPassword.message}
                </div>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === 'validate' && (
                  <div className="text-red-500 ">La Contraseña NO Coincide.</div>
                )}
            </div>

            <div className="mb-4 ">
              <button className="w-100 btn btn-lg btn-primary">
                <i className="fas fa-user-plus"></i> Crear Cuenta.
              </button>
            </div>
            <div className="mb-4 ">
              {' '}¿Ya Tienes Una Cuenta?{' '}
              <Link href={`/login?redirect=${redirect || '/'}`} rel="noopener noreferrer" className="w-100 btn btn-lg btn-secondary">
                <i className="fas fa-user-shield"></i> Inicia Sesión.
              </Link>
            </div>
          </form>
        </div>
      </div>
      <hr />
    </Layout>
  );
}