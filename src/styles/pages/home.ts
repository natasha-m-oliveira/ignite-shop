import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: 'calc(100% - 1rem) !important',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2) - 1rem)',
  marginLeft: 'auto',
  maxHeight: 656,
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  aspectRatio: '1 / 1.2',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '90%',
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgb(0, 0, 0, 0.6)',

    transform: 'translateY(118%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'grid',
      gap: '0.25rem',
    },

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },

    button: {
      padding: '0.75rem',
      background: '$green500',
      color: '$gray100',
      borderRadius: 6,
      border: 'none',
      cursor: 'pointer',

      '&:hover': {
        background: '$green300',
      },
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})
