import React, { useCallback } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useRecoilState } from 'recoil'

import { snackbarState } from '../atom'
import { Portal } from '@/global/ui'

/**
 * @example
 * const [, setSnackbar] = useRecoilState(snackbarState)
 *
 * setSnackbar({
 *  type: 'success',
 *  message: '성공적으로 삭제되었습니다.',
 * })
 *
 */
const useSnackbar = () => {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState)

  const CustomSnackbar = useCallback(
    (): JSX.Element => (
      <Portal>
        <Snackbar
          className="z-30"
          open={!!snackbar.message}
          autoHideDuration={6000}
          onClose={() =>
            setSnackbar({
              type: null,
              message: null,
            })
          }
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
        >
          <Alert
            onClose={() => setSnackbar({ type: null, message: null })}
            severity={snackbar.type!}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Portal>
    ),
    [snackbar]
  )

  return {
    CustomSnackbar,
  }
}

export default useSnackbar
