import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'
import { Divider, IconButton, Typography } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import {
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material'

import { snackbarState } from '@/global/atom'
import { deleteArticle } from '../api/funcs'
import { useArticle } from '../api/hook'

const ArticleDetail: React.FC = () => {
  const navigate = useNavigate()
  const { id: articleId } = useParams()
  const { article } = useArticle({ id: Number(articleId) })

  const [, setSnackbar] = useRecoilState(snackbarState)
  const { mutate: removeArticle } = useMutation(deleteArticle, {
    onSuccess: () => {
      setSnackbar({
        type: 'success',
        message: '성공적으로 삭제되었습니다.',
      })
      navigate('/article')
    },
  })

  const onClickRemoveArticle = () => {
    if (window.confirm('해당 아티클을 삭제하시겠습니까?')) {
      removeArticle(Number(articleId))
    }
  }

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1000px] w-full" data-color-mode="light">
        {article && (
          <>
            <div className="flex items-center mb-3">
              <Typography variant="h4">{article.title}</Typography>

              <IconButton
                className="!ml-auto"
                aria-label="delete"
                onClick={() => navigate(`/article/write?id=${articleId}`)}
              >
                <DriveFileRenameOutlineIcon color="primary" fontSize="inherit" />
              </IconButton>

              <IconButton className="!ml-1" aria-label="delete" onClick={onClickRemoveArticle}>
                <DeleteOutlineIcon color="primary" fontSize="inherit" />
              </IconButton>
            </div>

            <Divider className="!my-4" />

            <div className="p-6 bg-white rounded-lg">
              <MDEditor.Markdown
                source={article.content}
                style={{
                  padding: '8',
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ArticleDetail
