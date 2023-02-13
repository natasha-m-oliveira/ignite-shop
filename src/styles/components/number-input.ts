import { styled } from '..'

export const NumberInputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  maxWidth: '4.5rem',

  input: {
    width: '100%',
    background: 'none',
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
    width: '0.875rem',
    aspectRatio: '1 / 1',
    lineHeight: '0',
  },
})
