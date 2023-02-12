import React, { useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import {
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
  AddCircle as AddCircleIcon,
} from '@mui/icons-material'

import { TaskCard } from '@/task/api/entity'
import { useTasks } from '@/task/api/hook'
import useCreateTask from '@/task/hook/useCreateTask'
import EditTaskModal from './EditTaskModal'
import TaskItem from './TaskItem'
interface TaskListProps {
  taskCard: TaskCard
}

const TaskList: React.FC<TaskListProps> = ({ taskCard }) => {
  const { tasks, refetch } = useTasks({
    taskCardId: taskCard.id,
  })
  const { isOpen, open, close, submit } = useCreateTask({
    refetch,
    task_card_id: taskCard.id,
  })
  const [foldMode, setFoldMode] = useState<'expand_all' | 'collapse_all' | null>(null)

  return (
    <div>
      <div className="border-b border-gray-200 pb-5">
        <div>
          <Typography variant="h4" gutterBottom className="!font-semibold">
            {taskCard.name}
          </Typography>

          <h5 className="text-xl">{taskCard.description}</h5>
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div>
          <IconButton
            className="!mr-2"
            title="모두 펼치기"
            onClick={() => setFoldMode('expand_all')}
          >
            <UnfoldMoreIcon color="primary" />
          </IconButton>

          <IconButton title="모두 접기" onClick={() => setFoldMode('collapse_all')}>
            <UnfoldLessIcon color="primary" />
          </IconButton>
        </div>

        <IconButton title="태스크 추가" onClick={open}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </div>

      <ul className="mt-2 grid grid-cols-1">
        {tasks?.map((task) => (
          <TaskItem
            key={`task-item-${task.id}`}
            task={task}
            refetch={refetch}
            foldMode={foldMode}
          />
        ))}
      </ul>

      {isOpen && <EditTaskModal isOpen={isOpen} close={close} submit={submit} />}
    </div>
  )
}

export default TaskList
