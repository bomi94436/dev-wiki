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
      </ul>
    </div>
  )
}

export default TaskList
