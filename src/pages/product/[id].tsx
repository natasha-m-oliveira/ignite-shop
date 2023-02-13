import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Stripe from 'stripe'
import 'react-loading-skeleton/dist/skeleton.css'

import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import Head from 'next/head'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    defaultPriceId: string
    price: number
    currency: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <>
        <Head>
          <title>Produto | Ignite Shop</title>
        </Head>

        <SkeletonTheme baseColor="#202024" highlightColor="#2a2a2d">
          <ProductContainer>
            <div
              style={{
                width: 590,
                height: 656,
              }}
            >
              <Skeleton height={'100%'} borderRadius={8} />
            </div>
            <ProductDetails>
              <h1>
                <Skeleton />
              </h1>
              <span>
                <Skeleton count={1} />
              </span>
              <p>
                <Skeleton count={4} />
              </p>
              <div style={{ marginTop: 'auto' }}>
                <Skeleton height="3.875rem" borderRadius={8} />
              </div>
            </ProductDetails>
          </ProductContainer>
        </SkeletonTheme>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </span>
          <p>{product.description}</p>

          <button onClick={() => addItem(product)}>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_NGIAFGNBrHcoqg' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = String(params?.id)

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        defaultPriceId: price.id,
        price: price.unit_amount,
        currency: price.currency,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
