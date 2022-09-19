import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
})

// 요청 인터셉터 추가하기
API.interceptors.request.use(
  (config) => {
    // 요청이 전달되기 전에 작업 수행
    return config
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error)
  }
)

// 응답 인터셉터 추가하기
API.interceptors.response.use(
  (response) => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response
  },
  (error) => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    if (error.response.status === 401) {
    }
    return Promise.reject(error)
  }
)

export default API
