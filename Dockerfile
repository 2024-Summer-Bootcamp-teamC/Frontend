FROM node:20-alpine

WORKDIR /app

COPY package.json /app/

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "npm" , "run", "dev"]