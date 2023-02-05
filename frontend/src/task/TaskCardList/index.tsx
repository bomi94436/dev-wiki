import React, { useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import { LibraryAdd as LibraryAddIcon } from '@mui/icons-material'
import { useRecoilState } from 'recoil'

import { Drawer } from '@/global/ui'
import { snackbarState } from '@/global/atom'

import { TaskCard } from '../api/entity'
import { useTaskCards } from '../api/hook'
import TaskCircle from './TaskCircle'
import TaskList from './TaskList'
import EditTaskCardModal from './EditTaskCardModal'
import { useMutation } from 'react-query'
import { postTaskCard } from '../api/funcs'

const TaskCardList: React.FC = () => {
  const { taskCards, refetch } = useTaskCards()
  const [selectedTaskCard, setSelectedTaskCard] = useState<TaskCard | null>(null)
  const [isOpenAddTaskCardModal, setIsOpenAddTaskCardModal] = useState<boolean>(false)

  const [, setSnackbar] = useRecoilState(snackbarState)
  const { mutate: createTaskCard } = useMutation(postTaskCard, {
    onSuccess: () => {
      setSnackbar({
        type: 'success',
        message: '태스크 카드가 추가되었습니다.',
      })

      refetch()
      setIsOpenAddTaskCardModal(false)
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

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full">
        <div className="flex items-center justify-between">
          <Typography variant="h4" gutterBottom className="!font-semibold">
            태스크 카드 리스트
          </Typography>

          <IconButton onClick={() => setIsOpenAddTaskCardModal(true)}>
            <LibraryAddIcon color="primary" />
          </IconButton>
        </div>

        <ul className="grid grid-cols-1 gap-2">
          {taskCards?.map((taskCard) => (
            <li
              key={`task-card-${taskCard.id}`}
              className="border border-gray-200 rounded-xl bg-white p-3 flex justify-between items-center cursor-pointer"
              onClick={() => setSelectedTaskCard(taskCard)}
            >
              <div>
                <h5 className="font-bold">{taskCard.name}</h5>
                {taskCard.description && <p className="mt-2">{taskCard.description}</p>}
              </div>

              <div className="flex items-center">
                {taskCard.total_task_count ? (
                  <React.Fragment>
                    <span className="mr-3 text-slate-500">
                      {taskCard.completed_task_count} / {taskCard.total_task_count}
                    </span>

                    <TaskCircle completed={3} total={taskCard.total_task_count} />
                  </React.Fragment>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        {selectedTaskCard && (
          <Drawer isOpen={!!selectedTaskCard} close={() => setSelectedTaskCard(null)}>
            <TaskList taskCard={selectedTaskCard} />
          </Drawer>
        )}

        {isOpenAddTaskCardModal && (
          <EditTaskCardModal
            isOpen={isOpenAddTaskCardModal}
            close={() => setIsOpenAddTaskCardModal(false)}
            submit={submitCreateTaskCard}
          />
        )}
      </div>
    </div>
  )
}

export default TaskCardList
