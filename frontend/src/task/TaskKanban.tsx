import React from 'react'
import { Typography } from '@mui/material'

const TaskKanban: React.FC = () => {
  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full">
        <Typography variant="h4" gutterBottom className="!font-semibold">
          태스크 칸반
        </Typography>

        <div className="grid grid-cols-3 gap-5 mt-7">
          <section className="bg-gray-100 w-full min-h-[200px] rounded-xl">
            <ul className="py-3 px-3">
              <h6 className="font-bold mb-2">STATUS</h6>

              <li className="border border-gray-200 rounded-xl bg-white p-3">card</li>
            </ul>
          </section>

          <section className="bg-gray-100 w-full min-h-[200px] rounded-xl">
            <ul className="py-3 px-3">
              <h6 className="font-bold mb-2">STATUS</h6>

              <li className="border border-gray-200 rounded-xl bg-white p-3">card</li>
            </ul>
          </section>

          <section className="bg-gray-100 w-full min-h-[200px] rounded-xl">
            <ul className="px-3">
              <h6 className="font-bold py-3">STATUS</h6>

              <li className="border border-gray-200 rounded-xl bg-white p-3 mb-3">card</li>

              <li className="border border-dashed border-gray-300 bg-gray-200 text-gray-400 font-semibold rounded-xl py-2 mb-3 flex justify-center items-center cursor-pointer">
                <span>+</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TaskKanban
