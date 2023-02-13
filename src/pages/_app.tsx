import Image from 'next/image'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'
import Cart from '../components/cart'
import { CartProvider } from 'use-shopping-cart'
import Link from 'next/link'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={String(process.env.STRIPE_PUBLIC_KEY)}
        successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
        cancelUrl={`${process.env.NEXT_URL}/`}
        currency="BRL"
        allowedCountries={['BR']}
        billingAddressCollection
        shouldPersist
      >
        <Container>
          <Header>
            <Link href="/" prefetch={false}>
              <Image src={logoImg} alt="" />
            </Link>
            <Cart />
          </Header>

          <Component {...pageProps} />
        </Container>
      </CartProvider>
      <ToastContainer position="bottom-left" theme="dark" />
    </>
  )
}
