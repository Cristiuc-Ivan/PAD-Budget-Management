FROM openjdk:21-jdk-slim
LABEL authors="lstetiuc"
COPY ./target/budget_managment-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar","/app.jar"]
EXPOSE 8080