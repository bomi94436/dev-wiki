dockerize -wait tcp://mysql:3306 -timeout 20s

echo "Start nodejs server"
npm run start:dev:docker