import { Bag, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Close,
  CartContainer,
  Footer,
  CartContent,
  ProductContainer,
  ImageContainer,
  Trigger,
  Couter,
  ActionsContainer,
  ProductDetails,
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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Trigger>
          <Bag size="1.5rem" />
          {!!cartCount && <Couter>{cartCount}</Couter>}
        </Trigger>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content asChild>
            <CartContainer>
              <Dialog.Close asChild>
                <Close>
                  <X size="1.5rem" />
                </Close>
              </Dialog.Close>
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
                    <ProductDetails>
                      <span>{entry.name}</span>
                      <strong>{entry.formattedValue}</strong>

                      <ActionsContainer>
                        <NumberInput
                          value={entry.quantity}
                          onValueChange={(value) =>
                            handleQuantityChange(
                              entry.id,
                              value,
                              entry.quantity,
                            )
                          }
                        />
                        <button onClick={() => removeItem(entry.id)}>
                          Remover
                        </button>
                      </ActionsContainer>
                    </ProductDetails>
                  </ProductContainer>
                ))}
                {!cartCount && <p>Você não possui nenhum item no carrinho.</p>}
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
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
