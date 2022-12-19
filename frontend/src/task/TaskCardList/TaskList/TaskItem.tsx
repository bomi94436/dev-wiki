import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import { Checkbox, IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'

import { FolderToggleButton } from '@/global/ui'
import { Task } from '../../api/entity'
import EditTaskModal from './EditTaskModal'
import useCreateTask from '@/task/hook/useCreateTask'

const MenuLabel = {
  date: '목표일 설정',
  time: '목표시간 설정',
} as const

interface TaskItemProps {
  task: Task
  refetch: () => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, refetch }) => {
  const [isOpenSubTask, setIsOpenSubTask] = useState<boolean>(false) // 하위 task open 여부
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null) // more icon element
  const isOpenMore = Boolean(anchorEl)
  const [menu, setMenu] = useState<{
    [key in keyof typeof MenuLabel]: boolean
  }>({
    date: false,
    time: false,
  })

  const hasSubTask = useMemo(() => !!task.sub_tasks?.length, [task])
  const { isOpen, open, close, submit } = useCreateTask({
    refetch,
    task_card_id: task.task_card_id,
    parent_task_id: task.id,
  })

  return (
    <li
      className={cx('rounded-xl', {
        'p-2': !task.parent_task_id,
        'hover:bg-slate-100': hasSubTask,
        'my-2': task.parent_task_id,
      })}
    >
      <div className="grid grid-cols-[auto_1fr] items-center rounded-xl p-1 bg-white border border-gray-200">
        <div>
          {hasSubTask ? (
            <FolderToggleButton
              open={isOpenSubTask}
              onClick={() => setIsOpenSubTask((prev) => !prev)}
            />
          ) : (
            <div className="ml-10" />
          )}
        </div>

        <div className="grid grid-cols-1 gap-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* TODO: update task api */}
              <Checkbox checked={!!task.completed_at} readOnly />

              <p>{task.content}</p>
            </div>

            <div>
              <IconButton
                aria-label="more"
                id="more-button"
                aria-controls={isOpenMore ? 'more-menu' : undefined}
                aria-expanded={isOpenMore ? 'true' : undefined}
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="more-menu"
                MenuListProps={{
                  'aria-labelledby': 'more-button',
                }}
                anchorEl={anchorEl}
                open={isOpenMore}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {/* <MenuItem
                  onClick={() =>
                    setMenu((prev) => ({
                      date: !prev.date,
                      time: false,
                    }))
                  }
                >
                  <Checkbox checked={menu.date} readOnly className="!p-0 !mr-2" />
                  {MenuLabel.date}
                </MenuItem>

                {menu.date && (
                  <MenuItem
                    onClick={() =>
                      setMenu((prev) => ({
                        ...prev,
                        time: !prev.time,
                      }))
                    }
                  >
                    <Checkbox checked={menu.time} readOnly className="!p-0 !mr-2" />
                    {MenuLabel.time}
                  </MenuItem>
                )} */}

                <MenuItem
                  onClick={() => {
                    // TODO: add task api
                    open()
                    setAnchorEl(null)
                  }}
                >
                  하위 Task 추가
                </MenuItem>

                <MenuItem
                  className="!text-red-600"
                  onClick={() => {
                    // TODO: delete task api
                    setAnchorEl(null)
                  }}
                >
                  삭제
                </MenuItem>
              </Menu>
            </div>
          </div>

          {/* <div>
            <TextField
              type="date"
              size="small"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="time"
              size="small"
              className="!ml-3"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div> */}
        </div>
      </div>

      {isOpenSubTask && hasSubTask ? (
        <div className="border-l border-gray-300 ml-3">
          <ul className="ml-7 mt-4">
            {task.sub_tasks!.map((t) => (
              <TaskItem key={`sub-task-item-${t.id}`} task={t} refetch={refetch} />
            ))}
          </ul>
        </div>
      ) : null}

      {isOpen && <EditTaskModal isOpen={isOpen} close={close} submit={submit} />}
    </li>
  )
}

export default TaskItem
