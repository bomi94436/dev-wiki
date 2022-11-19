import React from 'react'
import './styles.css'

interface TaskCircleProps {
  completed: number
  total: number
}

const TaskCircle: React.FC<TaskCircleProps> = ({ completed, total }) => {
  return (
    <div className="single-chart">
      <svg viewBox="0 0 36 36" className="block w-5 h-5 my-auto">
        <path
          className="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {completed ? (
          <path
            className="circle stroke-slate-400"
            strokeDasharray={`${(completed / total) * 100}, 100`}
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        ) : null}
      </svg>
    </div>
  )
}

export default TaskCircle
