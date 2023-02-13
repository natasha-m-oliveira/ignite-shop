import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',

    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: '$gray800',
    },

    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },

    outline: '$green500',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
})
