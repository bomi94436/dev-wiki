import React from 'react'
import { Typography } from '@mui/material'

import { TaskCard } from '@/task/api/entity'
import TaskItem from './TaskItem'
import { useTasks } from '@/task/api/hook'

interface TaskListProps {
  taskCard: TaskCard
}

const TaskList: React.FC<TaskListProps> = ({ taskCard }) => {
  const { tasks } = useTasks({
    taskCardId: taskCard.id,
  })

  return (
    <div>
      <Typography variant="h4" gutterBottom className="!font-semibold">
        {taskCard.name}
      </Typography>

      <h5 className="text-xl">{taskCard.description}</h5>

      <ul className="mx-5 mt-10 grid grid-cols-1">
        {tasks?.map((task) => (
          <TaskItem key={`task-item-${task.id}`} task={task} />
        ))}
        <li className="border border-dashed border-gray-300 bg-gray-200 text-gray-400 font-semibold rounded-xl py-2 m-2 flex justify-center items-center cursor-pointer">
          <span>+</span>
        </li>
      </ul>
    </div>
  )
}

export default TaskList
