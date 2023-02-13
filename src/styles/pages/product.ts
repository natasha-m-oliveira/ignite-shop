import { styled } from '..'

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  justifyContent: 'center',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto',
  padding: '0 1rem',

  '@md': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

export const ImageContainer = styled('div', {
  maxWidth: 576,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    display: 'block',
    maxWidth: '100%',
    objectFit: 'cover',
  },

  '@lg': {
    aspectRatio: '1 / 1.2',
  },
})

export const ProductDetails = styled('div', {
  minWidth: '375px',
  display: 'grid',
  gap: '1rem',

  '&>h1': {
    fontSize: '$2xl',
    color: '$gray300',
  },

  '&>span': {
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
  },

  '&>p': {
    marginTop: '1.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  '&>button': {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    transitionProperty: 'background-color',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})
