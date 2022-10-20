import React, { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { getArticle, patchArticle, PatchArticleParams, postArticle } from '@/global/api/funcs'
import { snackbarState } from '@/global/atom'
import Editor from './Editor'
import SettingArticleDetail from './SettingArticleDetail'
import { parseImageMarkdown } from '../usecase'

const ArticleEditor: React.FC = () => {
  const navigate = useNavigate()
  const [editorPage, setEditorPage] = useState<1 | 2>(1)

  const [query] = useSearchParams()
  const articleId = !isNaN(parseInt(query.get('id'))) ? parseInt(query.get('id')) : null
  const { data: article } = useQuery(['article', articleId], () => getArticle(articleId), {
    enabled: !!articleId,
  })

  const [title, setTitle] = useState<string>(article ? article.title : '')
  const [content, setContent] = useState<string>(article ? article.content : '')
  const [thumbnail, setThumbnail] = useState<string | null>(article ? article.thumbnail : null)
  const [shortDescription, setShortDescription] = useState<string | null>(
    article ? article.short_description : null
  )

  const [, setSnackbar] = useRecoilState(snackbarState)

  const { mutate: createArticle } = useMutation(postArticle, {
    onError: (err) => {
      if ((err as AxiosError).response.status === 422) {
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
      if ((err as AxiosError).response.status === 422) {
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
