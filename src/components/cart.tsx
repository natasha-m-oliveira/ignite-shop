import { Bag, X } from 'phosphor-react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import {
  Close,
  CartContainer,
  Footer,
  CartContent,
  ProductContainer,
  ImageContainer,
  Trigger,
  Couter,
  PriceContainer,
} from '../styles/components/cart'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import NumberInput from './number-input'

export default function Cart() {
  const {
    cartCount,
    cartDetails,
    formattedTotalPrice,
    clearCart,
    removeItem,
    incrementItem,
    decrementItem,
  } = useShoppingCart()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  function handleQuantityChange(id: string, current: number, previous: number) {
    if (current > previous) {
      incrementItem(id)
    } else if (current < previous) {
      decrementItem(id)
    }
  }

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: Object.values(cartDetails ?? {}),
      })

      const { checkoutUrl } = response.data

      clearCart()

      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      setIsCreatingCheckoutSession(false)

      toast('Falha ao redicionar ao checkout', {
        type: 'error',
      })
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Trigger>
          <Bag size="1.5rem" />
          {!!cartCount && <Couter>{cartCount}</Couter>}
        </Trigger>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay>
          <AlertDialog.Content asChild>
            <CartContainer>
              <AlertDialog.Cancel asChild>
                <Close>
                  <X size="1.5rem" />
                </Close>
              </AlertDialog.Cancel>
              <h2>Sacola de compras</h2>

              <CartContent>
                {Object.values(cartDetails ?? {}).map((entry) => (
                  <ProductContainer key={entry.id}>
                    <ImageContainer>
                      <Image
                        src={entry.imageUrl}
                        width={96}
                        height={96}
                        alt=""
                      />
                    </ImageContainer>
                    <span>{entry.name}</span>
                    <PriceContainer>
                      <strong>{entry.formattedValue}</strong>
                      <NumberInput
                        value={entry.quantity}
                        onValueChange={(value) =>
                          handleQuantityChange(entry.id, value, entry.quantity)
                        }
                      />
                    </PriceContainer>
                    <button onClick={() => removeItem(entry.id)}>
                      Remover
                    </button>
                  </ProductContainer>
                ))}
              </CartContent>

              <Footer>
                <span>Quantidade</span>
                <span>
                  {cartCount} ite{cartCount !== 1 ? 'm' : 'ns'}
                </span>
                <strong>Valor total</strong>
                <strong>{formattedTotalPrice}</strong>

                <button
                  onClick={handleCheckout}
                  disabled={isCreatingCheckoutSession || !cartCount}
                >
                  Finalizar compra
                </button>
              </Footer>
            </CartContainer>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
