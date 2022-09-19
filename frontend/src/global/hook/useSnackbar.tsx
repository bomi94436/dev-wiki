import React, { useCallback, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

const useSnackbar = ({ type }: { type: 'success' | 'info' | 'warning' | 'error' }) => {
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  const CustomSnackbar = useCallback(
    (): JSX.Element => (
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage(null)}
      >
        <Alert onClose={() => setSnackbarMessage(null)} severity={type}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    ),
    [snackbarMessage]
  )

  return {
    setSnackbarMessage,
    CustomSnackbar,
  }
}

export default useSnackbar
