import React, { useState } from 'react'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { LibraryAdd as LibraryAddIcon } from '@mui/icons-material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'

import { useSeriesList } from '@/global/api/hook'

const SeriesList: React.FC = () => {
  const { seriesList } = useSeriesList()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null) // more icon element
  const isOpenMore = Boolean(anchorEl)
  const [mode, setMode] = useState<'create' | 'update' | null>(null)

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full">
        <div className="flex items-center justify-between">
          <Typography variant="h4" gutterBottom className="!font-semibold">
            시리즈 관리
          </Typography>

          <IconButton onClick={() => setMode('create')} title="시리즈 추가">
            <LibraryAddIcon color="primary" />
          </IconButton>
        </div>

        <ul className="grid grid-cols-1 gap-2">
          {seriesList?.items.map((series) => (
            <li
              key={`series-list-${series.id}`}
              className="border border-gray-200 rounded-xl bg-white p-3 flex justify-between items-center cursor-pointer"
            >
              <h5 className="font-bold">{series.name}</h5>

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
                  <MenuItem
                    onClick={() => {
                      setMode('update')
                      setAnchorEl(null)
                    }}
                  >
                    수정
                  </MenuItem>

                  <MenuItem className="!text-red-600">삭제</MenuItem>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SeriesList
