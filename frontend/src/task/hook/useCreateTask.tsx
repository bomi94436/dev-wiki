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
  const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState<boolean>(false) // task 생성 또는 수정 모달 open 여부
  const [, setSnackbar] = useRecoilState(snackbarState)

  const open = () => {
    setIsOpenEditTaskModal(true)
  }
  const close = () => {
    setIsOpenEditTaskModal(false)
  }
  const { mutate: createTask } = useMutation(postTask, {
    onSuccess: () => {
      setSnackbar({
        type: 'success',
        message: 'Task가 추가되었습니다.',
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
    isOpen: isOpenEditTaskModal,
    open,
    close,
  }
}

export default useCreateTask
