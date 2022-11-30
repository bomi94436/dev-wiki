import React, { useState } from 'react'
import { Typography } from '@mui/material'

import { TaskCard } from '../api/entity'
import { useTaskCards } from '../api/hook'
import TaskCircle from './TaskCircle'
import { Drawer } from '@/global/ui'
import TaskList from './TaskList'

const TaskCardList: React.FC = () => {
  const { taskCards } = useTaskCards()
  const [selectedTaskCard, setSelectedTaskCard] = useState<TaskCard | null>(null)

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
      </div>
    </div>
  )
}

export default TaskCardList
