import { NextApiRequest, NextApiResponse } from 'next'
import { CartEntry } from 'use-shopping-cart/core'
import { stripe } from '../../lib/stripe'

interface Product extends CartEntry {
  defaultPriceId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { products } = req.body as {
    products: Product[]
  }

  if (req.method !== 'POST')
    return res.status(405).json({
      error: 'Method not allowed.',
    })

  if (!products.length)
    return res.status(400).json({
      error: 'Empty cart.',
    })

  const items = products.map((product) => ({
    price: product.defaultPriceId,
    quantity: product.quantity,
  }))

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: items,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
