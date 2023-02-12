import React, { useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import {
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
  AddCircle as AddCircleIcon,
} from '@mui/icons-material'

import { TaskCard } from '@/task/api/entity'
import { useTasks } from '@/task/api/hook'
import useEditTask from '@/task/hook/useEditTask'
import EditTaskModal from './EditTaskModal'
import TaskItem from './TaskItem'
interface TaskListProps {
  taskCard: TaskCard
}

const TaskList: React.FC<TaskListProps> = ({ taskCard }) => {
  const { tasks, refetch } = useTasks({
    taskCardId: taskCard.id,
  })
  const {
    isOpen,
    open,
    close,
    submitCreateTask: submit,
  } = useEditTask({
    refetch,
    task_card_id: taskCard.id,
  })
  // 같은 모드를 연속으로 클릭해도 적용할 수 있도록 원시타입이 아닌 참조타입 사용
  const [foldMode, setFoldMode] = useState<{ mode: 'expand_all' | 'collapse_all' | null }>({
    mode: null,
  })

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_auto_1fr] h-full">
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
            onClick={() => setFoldMode({ mode: 'expand_all' })}
          >
            <UnfoldMoreIcon color="primary" />
          </IconButton>

          <IconButton title="모두 접기" onClick={() => setFoldMode({ mode: 'collapse_all' })}>
            <UnfoldLessIcon color="primary" />
          </IconButton>
        </div>

        <IconButton title="태스크 추가" onClick={() => open('create')}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </div>

      <ul className="mt-2 overflow-y-auto">
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
