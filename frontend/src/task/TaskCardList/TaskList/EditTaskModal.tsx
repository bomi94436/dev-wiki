import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { Task } from '@/task/api/entity'

interface EditTaskModalProps {
  isOpen: boolean
  close: () => void
  submit: ({ content }: Partial<Pick<Task, 'content'>>) => void
  task?: Pick<Task, 'content'>
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, close, submit, task }) => {
  const [input, setInput] = useState<Pick<Task, 'content'> | undefined>(task)

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{task ? '태스크 수정' : '태스크 추가'}</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="content"
          label="할 일"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={close}>
          취소
        </Button>
        <Button variant="contained" onClick={() => submit({ content: input?.content })}>
          {task ? '수정' : '추가'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditTaskModal
