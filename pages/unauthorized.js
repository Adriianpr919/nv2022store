import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Página NO Autorizada.">
      <h1 className="text-xl">¡.Acceso Denegado.!</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
}
