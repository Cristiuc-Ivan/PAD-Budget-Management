FROM node:20 AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.21-alpine
COPY --from=node /app/dist/budget-app-frontend /usr/share/nginx/html

EXPOSE 80


