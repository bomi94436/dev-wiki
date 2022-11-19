import React from 'react'
import { IconButton } from '@mui/material'
import {
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material'

interface FolderToggleButtonProps {
  open: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const FolderToggleButton: React.FC<FolderToggleButtonProps> = ({ open, onClick }) => {
  return open ? (
    <IconButton aria-label="delete" onClick={onClick}>
      <KeyboardArrowDownIcon fontSize="inherit" />
    </IconButton>
  ) : (
    <IconButton aria-label="delete" onClick={onClick}>
      <KeyboardArrowRightIcon fontSize="inherit" />
    </IconButton>
  )
}

export default FolderToggleButton
