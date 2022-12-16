import Head from 'next/head'
import React from 'react'

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title data-rh="true">Nury Valenzuela.</title>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta http-equiv="Content-Language" lang="es-ES" />
        <meta name="robots" content="all" />
        <meta name="geo.placename" content="Villavicencio, Meta, Colombia." />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <link rel="shortcut icon" type="image/x-icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.ico" />
        <meta name="theme-color" content="#E6ACA9" />
      </Head>
      <div>
        <header>

        </header>
        <main>
          {children}
        </main>
        <footer>

        </footer>
      </div>
    </>
  )
}
