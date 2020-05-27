FROM mariadb:latest

ENV MYSQL_ROOT_PASSWORD "root"
ENV MYSQL_DATABASE "healthcaredb"
ENV MYSQL_USER "healthcareapi"
ENV MYSQL_PASSWORD "12344"

ADD script.sql /docker-entrypoint-initdb.d

EXPOSE 3306