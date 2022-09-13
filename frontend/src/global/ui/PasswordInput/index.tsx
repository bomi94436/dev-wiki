import React from 'react'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

/**
 *
 * @param name 패스워드 input 컴포넌트이기 때문에 default로 `password`를 넣을 수 있지만,
 * 이 컴포넌트를 사용한 곳에서 명시적이지 못할 것 같아서 default로 주지 않음
 * @returns 패스워드를 보이고 숨길 수 있는 input
 */
const PasswordInput = ({
  name,
  label,
  placeholder,
  isShowPassword,
  setIsShowPassword,
  onChange,
  className,
}: {
  name: string
  label?: string
  placeholder?: string
  isShowPassword: boolean
  setIsShowPassword: (value: React.SetStateAction<boolean>) => void
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
        size="small"
        type={isShowPassword ? 'text' : 'password'}
        label={label}
        placeholder={placeholder}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setIsShowPassword((prev) => !prev)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default PasswordInput
