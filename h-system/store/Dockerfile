FROM mariadb:latest 

#this lines will be moved to a config file
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE healthcaredb
ENV MYSQL_USER healthcareapi
ENV MYSQL_PASSWORD 1234
#
ADD script.sql /docker-entrypoint-initdb.d
EXPOSE 3306