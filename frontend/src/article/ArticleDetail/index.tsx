import React from 'react'
import { Divider, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const ArticleDetail: React.FC = () => {
  const { id: articleId } = useParams()

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full">
        <Typography variant="h4" gutterBottom>
          아티클 제목
        </Typography>

        <Divider className="!my-4" />

        <span>ArticleDetail {articleId}</span>
      </div>
    </div>
  )
}

export default ArticleDetail
