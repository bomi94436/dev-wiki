import React, { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import API from '@/global/api'
import { AxiosError } from 'axios'
import { Button, Link, Typography } from '@mui/material'

import { Input, PasswordInput } from '@/global/ui'
import { useUserInfo } from '@/global/hook'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { refetch } = useUserInfo()
  const [inputData, setInputData] = useState<{
    email: string
    password: string
  }>({
    email: '',
    password: '',
  })
  const [isShowPassword, setIsShowPassword] = useState(false)

  const onChangeInputData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const { mutate: callLogin } = useMutation(
    (data: { email: string; password: string }) =>
      API.post('/auth/login', {
        ...data,
      }),
    {
      onSuccess: () => {
        refetch()
        navigate('/')
      },
      onError: (error) => {
        const err = error as AxiosError
      },
    }
  )

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      callLogin({ email: inputData.email, password: inputData.password })
    },
    [inputData]
  )

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[350px] h-[50vh] flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <Typography variant="h5" gutterBottom className="!font-semibold">
            로그인
          </Typography>

          <Link className="hover:cursor-pointer" onClick={() => navigate('/signup')}>
            회원가입 하러가기
          </Link>
        </div>

        <form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
          <Input
            label="이메일"
            name="email"
            placeholder="이메일을 입력하세요."
            onChange={onChangeInputData}
          />

          <PasswordInput
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력하세요."
            isShowPassword={isShowPassword}
            setIsShowPassword={setIsShowPassword}
            onChange={onChangeInputData}
          />

          <Button variant="contained" type="submit" size="large">
            로그인
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
