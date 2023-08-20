# dev-wiki

[프로젝트 노션 페이지](https://www.notion.so/dev-wiki-bbf38f8ec1474142a44cd51b0bfda8bf)

### backend 구성

- `nodejs`(ts-node v10.8.0)
- `mysql`(mysql:8.0 v8.0.30)
- `redis`(redis:alpine v7.0.4)

### backend 개발자 도구

- `Medis`: redis GUI
- `MySQLWorkbench`: mysql GUI

### 서비스 실행

```
docker-compose up --build
```

### backend 테스트 실행

```sh
npm i -g mocha

cd backend

npm test
```
