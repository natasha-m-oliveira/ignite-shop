import { Minus, Plus } from 'phosphor-react'
import { useState } from 'react'
import { NumberInputContainer } from '../styles/components/number-input'

export interface NumberInputProps {
  value: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export default function NumberInput(props: NumberInputProps) {
  const { value, onValueChange, min = 1, max = 10, step = 1 } = props
  const [count, setCount] = useState(value)

  const disableMinus = count === min
  const disableAdd = count === max

  function reduce() {
    if (!disableMinus) {
      const newNumber = count - step
      setCount(newNumber)
      if (onValueChange) onValueChange(newNumber)
    }
  }
  function add() {
    if (!disableAdd) {
      const newNumber = count + step
      setCount(newNumber)
      if (onValueChange) onValueChange(newNumber)
    }
  }

  return (
    <NumberInputContainer>
      <button disabled={disableMinus} onClick={reduce}>
        <Minus size="0.875rem" />
      </button>
      <input type="number" value={count} readOnly />
      <button disabled={disableAdd} onClick={add}>
        <Plus size="0.875rem" />
      </button>
    </NumberInputContainer>
  )
}
