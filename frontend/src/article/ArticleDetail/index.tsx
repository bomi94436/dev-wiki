import React from 'react'
import { Divider, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getArticle } from '@/global/api/funcs'
import MDEditor from '@uiw/react-md-editor'

const ArticleDetail: React.FC = () => {
  const { id: articleId } = useParams()
  const { data: article } = useQuery(['article', articleId], () => getArticle(Number(articleId)), {
    enabled: !!articleId,
  })

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full" data-color-mode="light">
        {article && (
          <>
            <Typography variant="h4" gutterBottom>
              {article.title}
            </Typography>

            <Divider className="!my-4" />

            <MDEditor.Markdown
              source={article.content}
              style={{
                // TODO: 몇줄만 표시할 방법
                whiteSpace: 'pre-wrap',
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default ArticleDetail
