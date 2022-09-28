import API from '@/global/api'
import { Button } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import React, { useState } from 'react'

const ArticleEditor: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('**내용을 작성하세요**')

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

      <MDEditor value={content} onChange={setContent} height={400} />

      <div className="pt-6 flex justify-end">
        <Button variant="contained" type="submit">
          작성 완료
        </Button>
      </div>
    </form>
  )
}

export default ArticleEditor
