import { Typography } from '@mui/material'
import React from 'react'
import { useTaskCards } from '../api/hook'
import TaskCircle from './TaskCircle'

const TaskList: React.FC = () => {
  const { taskCards } = useTaskCards()

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full">
        <Typography variant="h4" gutterBottom className="!font-semibold">
          태스크 리스트
        </Typography>

        <ul className="grid grid-cols-1 gap-2">
          {taskCards?.map((taskCard) => (
            <li
              key={`task-card-${taskCard.id}`}
              className="border border-gray-200 rounded-xl bg-white p-3 flex justify-between items-center"
            >
              <div>
                <h5 className="font-bold">{taskCard.name}</h5>
                {taskCard.description && <p className="mt-2">{taskCard.description}</p>}
              </div>

              <div className="flex items-center">
                {taskCard.task_count ? (
                  <React.Fragment>
                    <span className="mr-3 text-slate-500">
                      {0} / {taskCard.task_count}
                    </span>

                    <TaskCircle completed={0} total={taskCard.task_count} />
                  </React.Fragment>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TaskList
