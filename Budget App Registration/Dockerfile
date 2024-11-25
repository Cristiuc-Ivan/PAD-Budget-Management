FROM openjdk:21-jdk-slim AS build
WORKDIR /app
USER root
RUN apt-get update -y && apt-get install -y iputils-ping
USER app
COPY pom.xml .
COPY src ./src

RUN apt-get update && apt-get install -y maven

RUN mvn clean install -DskipTests && ls -l /app/target

FROM openjdk:21-jdk-slim
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

LABEL authors="lstetiuc"
