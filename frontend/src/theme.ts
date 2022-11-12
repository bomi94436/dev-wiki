import { createTheme, Shadows } from '@mui/material'

const theme = createTheme({
  shape: {
    borderRadius: 12,
  },
  palette: {
    primary: {
      main: '#222324',
    },
  },
  shadows: ['none', ...Array.from({ length: 24 }, () => '')] as Shadows,
})

export default theme
