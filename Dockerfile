FROM node:14

WORKDIR /app

COPY backend/package*.json ./backend/

RUN cd backend && npm install

COPY frontend/package*.json ./frontend/

RUN cd frontend && npm install

COPY . .

RUN cd frontend && npm run build

EXPOSE 8080 3000

CMD ["sh", "-c", "node backend/index.js & cd frontend && npm start"]
