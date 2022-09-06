import React, { useCallback } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useMutation } from 'react-query'
import API from '@/global/api'
import { AxiosError } from 'axios'

const Signup = () => {
  const [form] = Form.useForm()
  const { mutate: callSignup } = useMutation(
    (data: { email: string; password: string; nickname: string }) =>
      API.post('/auth/signup', {
        ...data,
      }),
    {
      onSuccess: async (data) => {
        message.success('회원가입이 완료되었습니다.')
        // TODO: redirect login
      },
      onError: async (error) => {
        const err = error as AxiosError

        if (err.response.status === 409) {
          // duplicate error
          message.error('이미 존재하는 사용자입니다.')
        }

        if (err.response.status === 422) {
          // validate error
        }
      },
    }
  )

  const onSubmit = useCallback(async () => {
    const email = form.getFieldValue('email')
    const password = form.getFieldValue('password')
    const passwordConfirm = form.getFieldValue('password-confirm')
    const nickname = form.getFieldValue('nickname')

    if (password !== passwordConfirm) {
      message.error('비밀번호가 일치하지 않습니다.')
      return
    }

    await callSignup({ email, password, nickname })
  }, [form])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[350px] h-[50vh]">
        <Form layout="vertical" form={form}>
          <Form.Item label="이메일" name="email">
            <div className="flex w-full items-center">
              <Input placeholder="아이디로 사용할 이메일을 입력하세요." />

              {/* TODO: email 중복 확인 */}
              <Button type="default" className="ml-3">
                중복 확인
              </Button>
            </div>
          </Form.Item>

          <Form.Item label="비밀번호" name="password">
            <Input.Password placeholder="비밀번호를 입력하세요." />
          </Form.Item>

          <Form.Item label="비밀번호 확인" name="password-confirm">
            <Input.Password placeholder="위의 비밀번호와 동일한 비밀번호를 입력하세요." />
          </Form.Item>

          <Form.Item label="닉네임" name="nickname">
            <div className="flex w-full items-center">
              <Input placeholder="닉네임을 입력하세요." className="w-full" />

              {/* TODO: nickname 중복 확인 */}
              <Button type="default" className="ml-3">
                중복 확인
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={onSubmit}>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Signup
