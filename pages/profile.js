import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Layout from '../components/Layout';

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('name', session.user.name);
    setValue('email', session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('Perfil Actualizado Con Éxito.');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Mi Cuenta.">
      <div className="card text-center border border-primary shadow-0 ">
        <div className="card-body">
          <form
            className="p-4 p-md-5 border rounded-3 bg-light"
            onSubmit={handleSubmit(submitHandler)}>
            <h1 className="mb-4 text-xl">
              Actualización Del Perfil. :*
            </h1>
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
                <i className="fa-solid fa-user-pen"></i> Cambiar Tu Nompre Completo. <span className="required">:*</span>
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
                <i className="fas fa-at"></i> Cambiar Tu Correo. <span className="required">:*</span>
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
                <i className="fas fa-key"></i> Cambiar La Contraseña. <span className="required">:*</span>
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
                <i className="fas fa-key"></i> Cambiar Confirmar La Contraseña. <span className="required">:*</span>
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
                <i className="fa-solid fa-arrows-rotate"></i> Actualización Del Perfil.
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

ProfileScreen.auth = true;