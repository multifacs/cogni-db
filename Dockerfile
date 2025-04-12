FROM node:current-alpine3.21
WORKDIR /app
COPY . .
RUN npm i && npm run build
CMD npm run start