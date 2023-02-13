import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from '../lib/stripe'

import { HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import Stripe from 'stripe'
import Head from 'next/head'
import { Bag } from 'phosphor-react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    defaultPriceId: string
    price: number
    currency: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.2,
      spacing: 24,
    },
    breakpoints: {
      '(min-width: 640px': {
        slides: {
          perView: 2.5,
          spacing: 48,
        },
      },
      '(min-width: 1920px)': {
        slides: {
          perView: 3.5,
          spacing: 48,
        },
      },
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      {formatCurrencyString({
                        value: product.price,
                        currency: product.currency,
                      })}
                    </span>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      addItem(product)
                    }}
                  >
                    <Bag size="2rem" weight="bold" />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      defaultPriceId: price.id,
      price: price.unit_amount,
      currency: price.currency,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
