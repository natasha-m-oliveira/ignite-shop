import { styled } from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImagesWrapper = styled('div', {
  display: 'flex',
  marginBottom: '3rem',
})

export const ImageContainer = styled('div', {
  width: '8rem',
  height: '8rem',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '100vmax',
  padding: '0.25rem',
  boxShadow: 'rgba(0, 0, 0, 0.8) 0px 1px 3px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:not(:first-child)': {
    marginLeft: '-3rem',
  },

  img: {
    display: 'block',
    maxWidth: '100%',
    objectFit: 'cover',
  },
})
