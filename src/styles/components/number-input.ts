import { styled } from '..'

export const NumberInputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',

  input: {
    width: '3rem',
    height: '2.5rem',
    padding: '0.75rem',
    background: '$gray900',
    color: '$gray100',
    fontSize: '$sm',
    fontWeight: 'bold',
    textAlign: 'center',
    border: 'none',
    borderRadius: '6px',

    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
      appearance: 'none',
      '-webkit-appearance': 'none',
    },
  },

  button: {
    padding: '0.75rem',
  },
})
