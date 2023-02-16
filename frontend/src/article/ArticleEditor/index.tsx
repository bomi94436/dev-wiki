import React, { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { snackbarState } from '@/global/atom'
import Editor from './Editor'
import SettingArticleDetail from './SettingArticleDetail'
import { parseImageMarkdown } from '../usecase'
import { useArticle } from '../api/hook'
import { patchArticle, PatchArticleParams, postArticle } from '../api/funcs'
import { parseStringToInt } from '@/global/util/funcs'

const ArticleEditor: React.FC = () => {
  const navigate = useNavigate()
  const [editorPage, setEditorPage] = useState<1 | 2>(1)

  const [query] = useSearchParams()
  const articleId = parseStringToInt(query.get('id'))
  const { article } = useArticle({ id: articleId })

  const [title, setTitle] = useState<string>(article ? article.title : '')
  const [content, setContent] = useState<string>(article ? article.content : '')
  const [thumbnail, setThumbnail] = useState<string | undefined>(
    article ? article.thumbnail : undefined
  )
  const [shortDescription, setShortDescription] = useState<string | undefined>(
    article ? article.short_description : undefined
  )

  const [, setSnackbar] = useRecoilState(snackbarState)

  const { mutate: createArticle } = useMutation(postArticle, {
    onError: (err) => {
      if ((err as AxiosError).response?.status === 422) {
        setSnackbar({
          message: '제목 또는 내용을 입력하세요.',
          type: 'error',
        })
      }
    },
    onSuccess: () => {
      setSnackbar({
        message: '아티클이 추가되었습니다.',
        type: 'success',
      })
      navigate('/article')
    },
  })

  const { mutate: updateArticle } = useMutation((data: PatchArticleParams) => patchArticle(data), {
    onError: (err) => {
      if ((err as AxiosError).response?.status === 422) {
        setSnackbar({
          message: '제목 또는 내용을 입력하세요.',
          type: 'error',
        })
      }
    },
    onSuccess: (article) => {
      setSnackbar({
        message: '아티클이 수정되었습니다.',
        type: 'success',
      })
      navigate(`/article/${article.id}`)
    },
  })

  const onSubmitArticle: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (articleId !== null) {
      updateArticle({
        id: articleId,
        body: {
          title,
          content,
          thumbnail,
          short_description: shortDescription,
        },
      })
    } else {
      createArticle({
        title,
        content,
        thumbnail,
        short_description: shortDescription,
      })
    }
  }

  const onClickPrevPage: React.MouseEventHandler<HTMLButtonElement> = () => {
    setEditorPage(1)
  }

  const onClickNextPage: React.MouseEventHandler<HTMLButtonElement> = () => {
    setEditorPage(2)
    if (content && !thumbnail) {
      setThumbnail(parseImageMarkdown(content))
    }
  }

  useEffect(() => {
    if (article) {
      setTitle(article.title)
      setContent(article.content)
      setThumbnail(article.thumbnail)
      setShortDescription(article.short_description)
    }
  }, [article])

  return (
    <>
      {editorPage === 1 && (
        <Editor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          onClickNextPage={onClickNextPage}
        />
      )}

      {editorPage === 2 && (
        <SettingArticleDetail
          onClickPrevPage={onClickPrevPage}
          onSubmitArticle={onSubmitArticle}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          shortDescription={shortDescription}
          setShortDescription={setShortDescription}
        />
      )}
    </>
  )
}

export default ArticleEditor
