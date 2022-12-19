import React, { useState } from 'react'
import { Typography } from '@mui/material'

import { Task, TaskCard } from '@/task/api/entity'
import TaskItem from './TaskItem'
import { useTasks } from '@/task/api/hook'
import { useMutation } from 'react-query'
import { postTask } from '@/task/api/funcs'
import { snackbarState } from '@/global/atom'
import { useRecoilState } from 'recoil'
import EditTaskModal from './EditTaskModal'
import useCreateTask from '@/task/hook/useCreateTask'

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

  return (
    <div>
      <Typography variant="h4" gutterBottom className="!font-semibold">
        {taskCard.name}
      </Typography>

      <h5 className="text-xl">{taskCard.description}</h5>

      <ul className="mx-5 mt-10 grid grid-cols-1">
        {tasks?.map((task) => (
          <TaskItem key={`task-item-${task.id}`} task={task} refetch={refetch} />
        ))}
        <li
          className="border border-dashed border-gray-300 bg-gray-200 text-gray-400 font-semibold rounded-xl py-2 m-2 flex justify-center items-center cursor-pointer"
          onClick={open}
        >
          <span>+</span>
        </li>
      </ul>

      {isOpen && <EditTaskModal isOpen={isOpen} close={close} submit={submit} />}
    </div>
  )
}

export default TaskList
