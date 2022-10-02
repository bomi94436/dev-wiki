import React, { useState } from 'react'
import { Button } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import API from '@/global/api'

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
      // TODO: image upload
      const url = await API.post('/upload', file).catch(() => 'test_url')
      const insertedMarkdown = insertToTextArea(`![](${url})`)
      if (!insertedMarkdown) {
        return
      }
      setMarkdown(insertedMarkdown)
    })
  )
}

const ArticleEditor: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const onSubmitCreateArticle: React.FormEventHandler = (e) => {
    e.preventDefault()
    API.post('/article', {
      title,
      content,
    })
  }

  return (
    <form className="w-full p-8" data-color-mode="light" onSubmit={onSubmitCreateArticle}>
      <div className="pb-6">
        <input
          className="outline-none text-3xl"
          placeholder="제목을 입력하세요"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <MDEditor
        value={content}
        onChange={setContent}
        height={400}
        onPaste={async (event) => {
          event.preventDefault()
          await onImagePasted(event.clipboardData, setContent)
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
        <Button variant="contained" type="submit">
          작성 완료
        </Button>
      </div>
    </form>
  )
}

export default ArticleEditor
