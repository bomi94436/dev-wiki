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
  submit: (data: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>) => void
  taskCard?: Partial<Pick<TaskCard, 'name' | 'description' | 'is_closed'>>
}

const EditTaskCardModal: React.FC<EditTaskCardModalProps> = ({
  isOpen,
  close,
  taskCard,
  submit,
}) => {
  const [input, setInput] = useState<typeof taskCard>(taskCard)

  return (
    <Dialog open={isOpen} onClose={close} maxWidth="xl">
      <DialogTitle>{taskCard ? '태스크 카드 수정' : '태스크 카드 추가'}</DialogTitle>

      <DialogContent className="w-[50vw]">
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="카드 이름"
          type="text"
          fullWidth
          variant="standard"
          value={input?.name}
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
          value={input?.description}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />

        {/* TODO: close 여부 */}
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
