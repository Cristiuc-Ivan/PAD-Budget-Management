FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=Budget_Management
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=qwerty33

COPY budget_management.sql /docker-entrypoint-initdb.d/
COPY grant_privileges.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
