import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  TextField,
} from '@mui/material'
import { TaskCard } from '@/task/api/entity'

interface EditTaskCardModalProps {
  isOpen: boolean
  close: () => void
  submit: (data: Partial<Pick<TaskCard, 'name' | 'description'>>) => void
  taskCard?: Pick<TaskCard, 'name' | 'description'>
}

const EditTaskCardModal: React.FC<EditTaskCardModalProps> = ({
  isOpen,
  close,
  taskCard,
  submit,
}) => {
  const [input, setInput] = useState<typeof taskCard | undefined>(taskCard)

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{taskCard ? '태스크 카드 수정' : '태스크 카드 추가'}</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="카드 이름"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />

        <TextareaAutosize
          id="name"
          placeholder="설명"
          minRows={3}
          className="w-full"
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={close}>
          취소
        </Button>
        <Button
          variant="contained"
          onClick={() => submit({ name: input?.name, description: input?.description })}
        >
          {taskCard ? '수정' : '추가'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditTaskCardModal
