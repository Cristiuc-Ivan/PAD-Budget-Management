FROM node:20 AS build
WORKDIR /usr/src/app
USER root
RUN apt-get update -y && apt-get install -y iputils-ping
USER app
COPY package.json package-lock.json ./
RUN npm gci
COPY . .
RUN npm run build

FROM nginx:1.21-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/budget-app-frontend/* /usr/share/nginx/html/
