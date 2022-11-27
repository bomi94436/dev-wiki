import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Button } from '@mui/material'
import { AxiosError } from 'axios'
import { useRecoilState } from 'recoil'

import API from '@/global/api'
import { snackbarState } from '@/global/atom/index'

const insertToTextArea = (intsertString: string) => {
  const textarea = document.querySelector('textarea')
  if (!textarea) {
    return null
  }

  let sentence = textarea.value
  const len = sentence.length
  const pos = textarea.selectionStart
  const end = textarea.selectionEnd

  const front = sentence.slice(0, pos)
  const back = sentence.slice(pos, len)

  sentence = front + intsertString + back

  textarea.value = sentence
  textarea.selectionEnd = end + intsertString.length

  return sentence
}

interface EditorProps {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  onClickNextPage: React.MouseEventHandler<HTMLButtonElement>
}

const Editor: React.FC<EditorProps> = ({
  title,
  setTitle,
  content,
  setContent,
  onClickNextPage,
}) => {
  const [, setSnackbar] = useRecoilState(snackbarState)

  const onImagePasted = async (
    dataTransfer: DataTransfer,
    setMarkdown: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const files: File[] = []

    for (let index = 0; index < dataTransfer.items.length; index += 1) {
      const file = dataTransfer.files.item(index)

      if (file) {
        files.push(file)
      }
    }

    await Promise.all(
      files.map(async (file) => {
        const formdata = new FormData()
        formdata.append('image', file)

        try {
          const response = await API.post<{
            file: {
              filename: string
              mimetype: string
              size: number
              path: string
            }
          }>('/upload', formdata)

          const insertedMarkdown = insertToTextArea(`![](${response.data.file.path})`)
          if (!insertedMarkdown) {
            return
          }
          setMarkdown(insertedMarkdown)
        } catch (err) {
          const error = err as AxiosError
          if (error.response?.status === 422) {
            setSnackbar({
              message: '파일 업로드에 실패하였습니다. 파일 형식은 jpg, jpeg, png만 가능합니다.',
              type: 'error',
            })
          } else {
            setSnackbar({
              message: '파일 업로드에 실패하였습니다.',
              type: 'error',
            })
          }
          return
        }
      })
    )
  }

  return (
    <section className="w-full p-8" data-color-mode="light">
      <div className="pb-6">
        <input
          className="outline-none text-3xl w-full bg-none bg-background"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <MDEditor
        value={content}
        onChange={(value) => setContent(value || '')}
        height={400}
        onPaste={async (event) => {
          if (event.clipboardData.files.length) {
            event.preventDefault()
            await onImagePasted(event.clipboardData, setContent)
          }
        }}
        onDrop={async (event) => {
          event.preventDefault()
          await onImagePasted(event.dataTransfer, setContent)
        }}
        textareaProps={{
          placeholder: '내용을 작성하세요',
        }}
      />

      <div className="pt-6 flex justify-end">
        <Button variant="outlined" onClick={onClickNextPage}>
          다음
        </Button>
      </div>
    </section>
  )
}

export default Editor
