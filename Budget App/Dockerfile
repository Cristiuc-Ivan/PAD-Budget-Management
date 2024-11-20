FROM openjdk:21-jdk-slim AS build
WORKDIR /app
COPY src ./src
COPY pom.xml .

RUN apt-get update && apt-get install -y maven

RUN mvn clean install && ls -l /app/target

FROM openjdk:21-jdk-slim

# Set the working directory in the container
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

LABEL authors="lstetiuc"
