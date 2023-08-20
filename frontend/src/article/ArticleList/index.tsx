import React, { useRef, useState } from 'react'
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import Article from './Article'
import { useArticles } from '../api/hook'
import { useSeriesList } from '@/global/api/hook'

const ArticleList: React.FC = () => {
  const { seriesList } = useSeriesList()
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(null)

  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const { articles } = useArticles({
    series_id: selectedSeriesId || undefined,
  })
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full">
        <Typography variant="h4" gutterBottom className="!font-semibold">
          아티클 리스트
        </Typography>

        <div className="flex items-center gap-x-4">
          <Paper
            variant="outlined"
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />

            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <div>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              ref={buttonRef}
              variant="contained"
              size="large"
            >
              시리즈
            </Button>
            <Popover
              open={!!anchorEl}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorPosition={{
                top: 12,
                left: 0,
              }}
              onClose={() => setAnchorEl(null)}
            >
              <ul className="grid grid-cols-1 gap-2 p-2">
                {seriesList?.items.map((series) => (
                  <li
                    key={`article-list-series-filter-${series.id}`}
                    className="hover:bg-gray-100 rounded-md bg-white py-1 px-2 flex justify-between items-center gap-x-4 cursor-pointer"
                    onClick={() => {
                      if (selectedSeriesId === series.id) {
                        setSelectedSeriesId(null)
                        return
                      }

                      setSelectedSeriesId(series.id)
                    }}
                  >
                    <p>{series.name}</p>
                    <Checkbox checked={series.id === selectedSeriesId} />
                  </li>
                ))}
              </ul>
            </Popover>
          </div>
        </div>

        <Divider className="!my-4" />

        <div className="grid grid-cols-3 gap-4 py-2">
          {articles?.map((article) => (
            <React.Fragment key={`grid-item-${article.id}`}>
              <Article article={article} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArticleList
