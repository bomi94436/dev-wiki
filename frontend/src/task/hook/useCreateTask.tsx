import { useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { snackbarState } from '@/global/atom'
import { postTask } from '@/task/api/funcs'
import { Task } from '@/task/api/entity'

const useCreateTask = ({
  refetch,
  task_card_id,
  parent_task_id,
}: { refetch: () => void } & Pick<Task, 'task_card_id' | 'parent_task_id'>) => {
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState<boolean>(false)
  const [, setSnackbar] = useRecoilState(snackbarState)

  const open = () => {
    setIsOpenAddTaskModal(true)
  }
  const close = () => {
    setIsOpenAddTaskModal(false)
  }
  const { mutate: createTask } = useMutation(postTask, {
    onSuccess: () => {
      setSnackbar({
        type: 'success',
        message: '태스크가 추가되었습니다.',
      })

      refetch()
      close()
    },
  })

  const submitCreateTask = ({ content }: Partial<Pick<Task, 'content'>>) => {
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

  return {
    submit: submitCreateTask,
    isOpen: isOpenAddTaskModal,
    open,
    close,
  }
}

export default useCreateTask
