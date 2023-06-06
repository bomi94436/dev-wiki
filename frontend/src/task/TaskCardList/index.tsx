import React, { useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import { LibraryAdd as LibraryAddIcon } from '@mui/icons-material'

import { useTaskCards } from '../api/hook'
import useEditTaskCard from '../hook/useEditTaskCard'
import TaskCircle from './TaskCircle'
import TaskListDrawer from './TaskListDrawer'
import EditTaskCardModal from './EditTaskCardModal'

const TaskCardList: React.FC = () => {
  const { taskCards, refetch } = useTaskCards()
  const { open, close, isOpenEditTaskCardModal, submitCreateTaskCard } = useEditTaskCard({
    refetch,
  })
  const [selectedTaskCardId, setSelectedTaskCardId] = useState<number | null>(null)

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full">
        <div className="flex items-center justify-between">
          <Typography variant="h4" gutterBottom className="!font-semibold">
            태스크 카드 리스트
          </Typography>

          <IconButton onClick={() => open('create')} title="태스크 카드 추가">
            <LibraryAddIcon color="primary" />
          </IconButton>
        </div>

        <ul className="grid grid-cols-1 gap-2">
          {taskCards?.map((taskCard) => (
            <li
              key={`task-card-${taskCard.id}`}
              className="border border-gray-200 rounded-xl bg-white p-3 flex justify-between items-center cursor-pointer"
              onClick={() => setSelectedTaskCardId(taskCard.id)}
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

                    <TaskCircle
                      completed={taskCard.completed_task_count}
                      total={taskCard.total_task_count}
                    />
                  </React.Fragment>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        {selectedTaskCardId && taskCards?.find((card) => card.id === selectedTaskCardId) && (
          <TaskListDrawer
            isOpen={!!selectedTaskCardId}
            close={() => setSelectedTaskCardId(null)}
            taskCard={taskCards!.find((card) => card.id === selectedTaskCardId)!}
          />
        )}

        {isOpenEditTaskCardModal && (
          <EditTaskCardModal
            isOpen={isOpenEditTaskCardModal}
            close={close}
            submit={submitCreateTaskCard}
          />
        )}
      </div>
    </div>
  )
}

export default TaskCardList
