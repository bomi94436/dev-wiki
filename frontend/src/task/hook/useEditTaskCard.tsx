import { useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { snackbarState } from '@/global/atom'
import { TaskCard } from '../api/entity'
import { patchTaskCard, postTaskCard } from '../api/funcs'

const useEditTaskCard = ({ refetch }: { refetch: () => void }) => {
  const [isOpenEditTaskCardModal, setIsOpenEditTaskCardModal] = useState<boolean>(false)
  const [mode, setMode] = useState<'create' | 'update' | null>(null)
  const [, setSnackbar] = useRecoilState(snackbarState)

  const open = (mode: 'create' | 'update') => {
    setMode(mode)
    setIsOpenEditTaskCardModal(true)
  }
  const close = () => {
    setIsOpenEditTaskCardModal(false)
    setMode(null)
  }

  const { mutate: createTaskCard } = useMutation(postTaskCard, {
    onSuccess: () => {
      setSnackbar({
        type: 'success',
        message: '태스크 카드가 추가되었습니다.',
      })

      refetch()
      close()
    },
  })

  const { mutate: updateTaskCard } = useMutation(patchTaskCard, {
    onSuccess: () => {
      setSnackbar({
        type: 'success',
        message: '태스크 카드가 수정되었습니다.',
      })

      refetch()
      close()
    },
  })

  const submitCreateTaskCard = ({
    name,
    description,
  }: Partial<Pick<TaskCard, 'name' | 'description'>>) => {
    if (!name) {
      setSnackbar({
        type: 'error',
        message: '카드 이름 작성은 필수입니다.',
      })
      return
    }

    createTaskCard({
      name,
      description,
    })
  }

  const submitUpdateTaskCard = ({
    id,
    name,
    description,
    is_closed,
  }: Pick<TaskCard, 'id'> & Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>) => {
    if (!name) {
      setSnackbar({
        type: 'error',
        message: '카드 이름 작성은 필수입니다.',
      })
      return
    }

    updateTaskCard({
      id,
      body: {
        name,
        description,
        is_closed,
      },
    })
  }

  return {
    submitCreateTaskCard,
    submitUpdateTaskCard,
    isOpenEditTaskCardModal,
    mode,
    open,
    close,
  }
}

export default useEditTaskCard
