FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей и устанавливаем зависимости для бэкенда
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Копируем файлы зависимостей и устанавливаем зависимости для фронтенда
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Копируем весь проект
COPY . .

# Собираем фронтенд
RUN cd frontend && npm run build

# Открываем порты
EXPOSE 8080 3000

# Запускаем бэкенд и фронтенд
CMD ["sh", "-c", "node backend/index.js & cd frontend && npm start"]
