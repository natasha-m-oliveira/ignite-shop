import { styled } from '..'

export const Container = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '100vh',
  padding: '0 0 2rem',

  '@md': {
    justifyContent: 'center',
  },
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: 'calc(100% - 2rem)',
  maxWidth: 'calc(1180px - 2rem)',
  margin: '0 auto',
})
