import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  ImagesWrapper,
  SuccessContainer,
} from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  amount: number
  products: {
    id: string
    imageUrl: string
  }[]
}

export default function Success({
  customerName,
  amount,
  products,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesWrapper>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesWrapper>
        <h1>Compra efetuada!</h1>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {amount} camiseta
          {amount !== 1 && 's'} já est
          {amount !== 1 ? 'ão' : 'á'} a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  let amount = 0
  const customerName = session.customer_details?.name
  const products = (session.line_items?.data ?? []).map((item) => {
    const product = item.price?.product as Stripe.Product
    amount += item.quantity ?? 0
    return {
      id: product.id,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      customerName,
      amount,
      products,
    },
  }
}
