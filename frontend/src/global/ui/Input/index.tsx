import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

const Input = ({
  name,
  label,
  placeholder,
  onChange,
  className,
}: {
  name: string
  label?: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  className?: string
}) => {
  return (
    <FormControl className={className} variant="outlined">
      {label && (
        <InputLabel htmlFor={`outlined-adornment-${name}`} size="small">
          {label}
        </InputLabel>
      )}

      <OutlinedInput
        id={`outlined-adornment-${name}`}
        name={name}
        label={label}
        placeholder={placeholder}
        size="small"
        onChange={onChange}
      />
    </FormControl>
  )
}

export default Input
