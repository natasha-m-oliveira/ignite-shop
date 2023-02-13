import { keyframes } from '@stitches/react'
import { styled } from '..'

export const Trigger = styled('button', {
  position: 'relative',
  background: '$gray800',
  padding: '0.75rem',
  borderRadius: '6px',
  color: '$gray300',
  fontSize: '$sm',
  lineHeight: 0,
  border: 'none',
  cursor: 'pointer',
})

export const Couter = styled('span', {
  position: 'absolute',
  top: '-0.375rem',
  right: '-0.375rem',
  width: '1.5rem',
  height: '1.5rem',
  lineHeight: '22.4px',
  borderRadius: '100vmax',
  background: '$green500',
  color: '$gray100',
})

const fadeIn = keyframes({
  '0%': {
    opacity: '0',
    transform: 'translate3d(50px, 0, 0)',
  },
  '100%': {
    opacity: '1',
    transform: 'translate3d(0, 0, 0)',
  },
})

export const CartContainer = styled('aside', {
  position: 'fixed',
  top: '0',
  right: '0',

  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gap: '2rem',

  padding: '1.5rem',
  background: '$gray800',
  width: '370px',
  height: '100%',
  zIndex: 2,

  animation: `${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  '@sm': {
    padding: '3rem',
    width: '480px',
  },

  h2: {
    marginTop: '1rem',
    color: '$gray100',
    fontSize: '$lg',

    '@sm': {
      marginTop: '1.5rem',
    },
  },
})

export const Close = styled('button', {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',

  background: 'transparent',
  color: '$gray300',
  lineHeight: 0,
  border: 'none',
  cursor: 'pointer',
})

export const CartContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  overflowY: 'auto',
})

export const ProductContainer = styled('div', {
  display: 'flex',
  gap: '1.25rem',
})

export const ImageContainer = styled('div', {
  width: '6rem',
  height: '6rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    display: 'block',
    maxWidth: '100%',
    objectFit: 'cover',
  },
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',

  '& > span': {
    color: '$gray300',
    fontSize: '$md',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '1',
  },

  strong: {
    color: '$gray100',
    fontSize: '$md',
  },

  button: {
    width: 'min-content',
    background: 'transparent',
    color: '$green500',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',

    transitionProperty: 'color',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      color: '$green300',
    },
  },
})

export const ActionsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginTop: 'auto',
})

export const Footer = styled('footer', {
  alignSelf: 'end',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.5rem',

  span: {
    color: '$gray300',
    fontSize: '1rem',
  },

  strong: {
    color: '$gray100',
    fontSize: '$md',
  },

  ':is(span, strong):nth-child(even)': {
    justifySelf: 'end',
  },

  button: {
    gridColumn: '1 / -1',
    marginTop: '3.5rem',
    padding: '1.25rem 2rem',
    background: '$green500',
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$gray100',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',

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
