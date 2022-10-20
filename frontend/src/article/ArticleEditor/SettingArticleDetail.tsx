import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { Button, TextField, Typography } from '@mui/material'

import { snackbarState } from '@/global/atom'
import API from '@/global/api'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

interface SettingArticleDetailProps {
  onClickPrevPage: React.MouseEventHandler<HTMLButtonElement>
  onSubmitArticle: React.MouseEventHandler<HTMLButtonElement>

  thumbnail: string | null
  setThumbnail: React.Dispatch<React.SetStateAction<string | null>>
  shortDescription: string
  setShortDescription: React.Dispatch<React.SetStateAction<string>>
}

const SettingArticleDetail: React.FC<SettingArticleDetailProps> = ({
  onClickPrevPage,
  onSubmitArticle,

  thumbnail,
  setThumbnail,
  shortDescription,
  setShortDescription,
}) => {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [, setSnackbar] = useRecoilState(snackbarState)
  const { mutate: uploadThumbnail } = useMutation(
    (formdata: FormData) =>
      API.post<{
        file: {
          filename: string
          mimetype: string
          size: number
          path: string
        }
      }>('/upload', formdata),
    {
      onSuccess: (res) => {
        setThumbnail(res.data.file.path)
      },
      onError: (err) => {
        const error = err as AxiosError
        if (error.response.status === 422) {
          setSnackbar({
            message: '파일 업로드에 실패하였습니다. 파일 형식은 jpg, jpeg, png만 가능합니다.',
            type: 'error',
          })
        } else {
          setSnackbar({
            message: '파일 업로드에 실패하였습니다.',
            type: 'error',
          })
        }
      },
    }
  )

  const onChangeThumbnail: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files[0]
    const formdata = new FormData()
    formdata.append('image', file)

    uploadThumbnail(formdata)
  }

  return (
    <section className="w-full p-8 flex flex-col items-center">
      <div className="w-[350px]">
        <Typography gutterBottom variant="h5" component="div">
          포스트 미리보기
        </Typography>

        {thumbnail ? (
          <div className="relative w-full aspect-video">
            <img
              className="w-full aspect-video object-cover rounded-lg"
              src={thumbnail}
              alt="writed article thumbnail image"
            />

            <Button
              variant="contained"
              size="small"
              color="error"
              className="!absolute right-2 bottom-2"
              onClick={() => setThumbnail(null)}
            >
              삭제
            </Button>
          </div>
        ) : (
          <div className="w-full aspect-video bg-gray-100 flex justify-center items-center rounded-lg">
            <Button
              variant="outlined"
              className="!bg-white"
              onClick={() => {
                uploadInputRef.current.click()
              }}
            >
              썸네일 업로드
            </Button>
            <input
              ref={uploadInputRef}
              type="file"
              className="hidden"
              onChange={onChangeThumbnail}
            />
          </div>
        )}

        <TextField
          className="!mt-4 w-full"
          placeholder="글의 간략한 설명을 입력하세요."
          multiline
          rows={4}
          maxRows={6}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </div>

      <div className="pt-8">
        <Button variant="outlined" className="!mr-4" onClick={onClickPrevPage}>
          이전
        </Button>

        <Button variant="contained" onClick={onSubmitArticle}>
          작성 완료
        </Button>
      </div>
    </section>
  )
}

export default SettingArticleDetail
