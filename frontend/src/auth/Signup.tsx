import React, { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

import API from '@/global/api'
import { useSnackbar } from '@/global/hook'
import { Input, PasswordInput } from '@/global/ui'

const Signup = () => {
  const navigate = useNavigate()
  const { setSnackbarMessage: setSuccessMessage, CustomSnackbar: SuccessSnackbar } = useSnackbar({
    type: 'success',
  })
  const { setSnackbarMessage: setErrorMessage, CustomSnackbar: ErrorSnackbar } = useSnackbar({
    type: 'error',
  })
  const [inputData, setInputData] = useState<{
    email: string
    password: string
    passwordConfirm: string
    nickname: string
  }>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  })
  const [isShowPassword, setIsShowPassword] = useState(false)

  const onChangeInputData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const { mutate: callSignup } = useMutation(
    (data: { email: string; password: string; nickname: string }) =>
      API.post('/auth/signup', {
        ...data,
      }),
    {
      onSuccess: () => {
        setSuccessMessage('회원가입이 완료되었습니다.')
        navigate('/login')
      },
      onError: (error) => {
        const err = error as AxiosError

        if (err.response.status === 409) {
          // duplicate error
          setErrorMessage('이미 존재하는 사용자입니다.')
        }

        if (err.response.status === 422) {
          // validate error
        }
      },
    }
  )

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault()

    if (inputData.password !== inputData.passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.')
      return
    }

    callSignup({
      email: inputData.email,
      password: inputData.password,
      nickname: inputData.nickname,
    })
  }, [])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <SuccessSnackbar />
      <ErrorSnackbar />

      <div className="w-[350px] h-[50vh] flex flex-col justify-center">
        <Typography variant="h5" gutterBottom className="!font-semibold">
          회원가입
        </Typography>

        <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex w-full gap-3">
            <Input
              label="이메일"
              name="email"
              placeholder="아이디로 사용할 이메일을 입력하세요."
              onChange={onChangeInputData}
              className="grow"
            />

            {/* TODO: email 중복 확인 */}
            <Button variant="outlined">중복 확인</Button>
          </div>

          <PasswordInput
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력하세요."
            isShowPassword={isShowPassword}
            setIsShowPassword={setIsShowPassword}
            onChange={onChangeInputData}
          />

          <PasswordInput
            label="비밀번호 확인"
            name="passwordConfirm"
            placeholder="위의 비밀번호와 동일한 비밀번호를 입력하세요."
            isShowPassword={isShowPassword}
            setIsShowPassword={setIsShowPassword}
            onChange={onChangeInputData}
          />

          <div className="flex w-full gap-3">
            <Input
              label="닉네임"
              name="nickname"
              placeholder="닉네임을 입력하세요."
              onChange={onChangeInputData}
              className="grow"
            />

            {/* TODO: nickname 중복 확인 */}
            <Button variant="outlined">중복 확인</Button>
          </div>

          <Button variant="contained" type="submit" size="large">
            회원가입
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
