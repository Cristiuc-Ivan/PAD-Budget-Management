# 1. Используем Node.js для сборки
FROM node:16 AS build

# 2. Устанавливаем рабочую директорию
WORKDIR /src/app

# 3. Копируем файлы проекта
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем весь проект
COPY . .

# 6. Собираем Angular-приложение
RUN npm run build

# 7. Используем NGINX для сервировки статических файлов
FROM nginx:1.21-alpine

# 8. Копируем собранные файлы в NGINX
COPY --from=build /app/dist/budget-app-frontend /usr/share/nginx/html

# 9. Настраиваем NGINX (опционально)
COPY nginx.conf /etc/nginx/nginx.conf

# 10. Открываем порт 4200
EXPOSE 4200

# 11. Запускаем NGINX
CMD ["nginx", "-g", "daemon off;"]
