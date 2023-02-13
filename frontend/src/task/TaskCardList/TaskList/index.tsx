import React, { useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import {
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
  AddCircle as AddCircleIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material'

import { TaskCard } from '@/task/api/entity'
import { useTaskCards, useTasks } from '@/task/api/hook'
import useEditTask from '@/task/hook/useEditTask'
import EditTaskModal from './EditTaskModal'
import TaskItem from './TaskItem'
import useEditTaskCard from '@/task/hook/useEditTaskCard'
import EditTaskCardModal from '../EditTaskCardModal'
interface TaskListProps {
  taskCard: TaskCard
}

const TaskList: React.FC<TaskListProps> = ({ taskCard }) => {
  const { tasks, refetch: refetchTasks } = useTasks({
    taskCardId: taskCard.id,
  })
  const { refetch: refetchTaskCards } = useTaskCards()

  const {
    isOpen: isOpenCreateTaskModal,
    open: openCreateTaskModal,
    close: closeCreateTaskModal,
    submitCreateTask,
  } = useEditTask({
    refetch: refetchTasks,
    task_card_id: taskCard.id,
  })
  const {
    open: openUpdateTaskCardModal,
    close: closeUpdateTaskCardModal,
    isOpenEditTaskCardModal,
    submitUpdateTaskCard,
  } = useEditTaskCard({
    refetch: refetchTaskCards,
  })
  // 같은 모드를 연속으로 클릭해도 적용할 수 있도록 원시타입이 아닌 참조타입 사용
  const [foldMode, setFoldMode] = useState<{ mode: 'expand_all' | 'collapse_all' | null }>({
    mode: null,
  })

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_auto_1fr] h-full">
      <div className="border-b border-gray-200 pb-5 flex justify-between">
        <div>
          <Typography variant="h4" gutterBottom className="!font-semibold">
            {taskCard.name}
          </Typography>

          <h5 className="text-xl">{taskCard.description}</h5>
        </div>

        <div className="flex items-start">
          <IconButton title="태스크 카드 수정" onClick={() => openUpdateTaskCardModal('update')}>
            <DriveFileRenameOutlineIcon color="primary" />
          </IconButton>

          <IconButton title="태스크 카드 삭제">
            <DeleteOutlineIcon color="primary" />
          </IconButton>
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

        <IconButton title="태스크 추가" onClick={() => openCreateTaskModal('create')}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </div>

      <ul className="mt-2 overflow-y-auto">
        {tasks?.map((task) => (
          <TaskItem
            key={`task-item-${task.id}`}
            task={task}
            refetch={refetchTasks}
            foldMode={foldMode}
          />
        ))}
      </ul>

      {isOpenCreateTaskModal && (
        <EditTaskModal
          isOpen={isOpenCreateTaskModal}
          close={closeCreateTaskModal}
          submit={submitCreateTask}
        />
      )}
      {isOpenEditTaskCardModal && (
        <EditTaskCardModal
          isOpen={isOpenEditTaskCardModal}
          close={closeUpdateTaskCardModal}
          submit={(data) => {
            submitUpdateTaskCard({ id: taskCard.id, ...data })
          }}
          taskCard={taskCard}
        />
      )}
    </div>
  )
}

export default TaskList
