import React from 'react'
import { Divider, IconButton, InputBase, Paper, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import thumbnail from '@/asset/hi.png'

import Article from './Article'
import { useQuery } from 'react-query'
import { getArticles } from '@/global/api/funcs'

const ArticleList: React.FC = () => {
  const { data: articles, isLoading } = useQuery(['articles'], getArticles)

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full">
        <Typography variant="h4" gutterBottom>
          아티클 리스트
        </Typography>

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

        <Divider className="!my-4" />

        <div className="grid grid-cols-3 gap-4 py-2">
          {!isLoading &&
            articles.map((article, index) => (
              <React.Fragment key={`grid-item-${article.id}`}>
                <Article thumbnailUrl={!index ? thumbnail : undefined} article={article} />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ArticleList
