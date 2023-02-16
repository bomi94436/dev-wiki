import { useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { snackbarState } from '@/global/atom'
import { patchTask, postTask } from '@/task/api/funcs'
import { Task } from '@/task/api/entity'
import { useTaskCards } from '../api/hook'

const useEditTask = ({
  refetch: refetchTasks,
  task_card_id,
}: { refetch: () => void } & Pick<Task, 'task_card_id'>) => {
  const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState<boolean>(false)
  const [mode, setMode] = useState<'create' | 'update' | null>(null)
  const [, setSnackbar] = useRecoilState(snackbarState)
  const { refetch: refetchTaskCards } = useTaskCards()

  const open = (mode: 'create' | 'update') => {
    setMode(mode)
    setIsOpenEditTaskModal(true)
  }
  const close = () => {
    setIsOpenEditTaskModal(false)
    setMode(null)
  }
  const { mutate: createTask } = useMutation(postTask, {
    onSuccess: () => {
      setSnackbar({
        type: 'success',
        message: '태스크가 추가되었습니다.',
      })
      refetchTaskCards()
      refetchTasks()
      close()
    },
  })

  const { mutate: updateTask } = useMutation(patchTask, {
    onSuccess: () => {
      setSnackbar({
        type: 'success',
        message: '태스크가 수정되었습니다.',
      })

      refetchTaskCards()
      refetchTasks()
      close()
    },
  })

  const submitCreateTask = ({
    parent_task_id,
    content,
  }: Partial<Pick<Task, 'content' | 'parent_task_id'>>) => {
    if (!content) {
      setSnackbar({
        type: 'error',
        message: '내용 작성은 필수입니다.',
      })
      return
    }

    createTask({
      content,
      task_card_id,
      parent_task_id,
    })
  }

  const submitUpdateTask = ({ id, content }: Pick<Task, 'id'> & Partial<Pick<Task, 'content'>>) => {
    if (!content) {
      setSnackbar({
        type: 'error',
        message: '내용 작성은 필수입니다.',
      })
      return
    }

    updateTask({
      id,
      body: {
        content,
      },
    })
  }

  return {
    submitCreateTask,
    submitUpdateTask,
    isOpen: isOpenEditTaskModal,
    mode,
    open,
    close,
  }
}

export default useEditTask
