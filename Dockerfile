FROM node:alpine
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY ./package.json .
RUN yarn install
COPY ./src /app/src
CMD ["yarn", "run", "dev"]
