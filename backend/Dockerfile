
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run postinstall

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
