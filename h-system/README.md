# H-System
POC for healthcare shielding application.
This application provides a way for issuing and revoking immunity certificates 


## Quickstart with docker

The project is shipped with a [Docker](https://docker.com) setup that makes it easy to get a containerized  environment up and running.


```
docker-compose up -d
```



## Project Structure

### Store

Store is a "standalone" component built with [mariaDB](https://mariadb.org/).
At startup it cretes the following table schemas.

#### Facility [TODO: is it necessary]

Contains information about the workplace of healthcare professionals.

| name | address | type
|----------|:-------------:|------:|
| name of facility | address of facility | indicates whether it's a farmacy or hospital


#### Operator

Contains information about healthcare professionals.


| username   |      password      |  userid | [facility](#facility)
|----------|:-------------:|------:| ------:|
| userame or email used for login |  SHA256 | identifier of operator in NHS | Reference


#### Certificates [TBD]

Contains information about issued certificates and the operator who issued them.

| business_id   |      [username](#operator) 
|----------|:-------------:|
| id of the certificate's owner |  certificate's issuer 


### Api

Api is a standard [node-express](https://expressjs.com/) application. It connects the store and [Dizme](https://dizme.io/) by providing a layer of abstruction between the two. It also exposes certain routes to be used by frontend.

#### Routes

| METHOD   |   Route |  Description
|:----------|:-----------|:-------------|
| POST | /login | Login service provided by [passportjs](http://www.passportjs.org/).
| GET | /certificates | List of issued certificates by the logged in operator.
| POST | /issue | Fires up the process of issuing an immunity certification according to the predefined schema.
| GET | /details/:business_id | Returns the details of a certificate.
| POST | /revoke | Revokes the certificate 


### Frontend

Frontend is a standard [vue-js](https://vuejs.org/) single-page application. It uses the API part for sending and retrieving data. It basically makes everything visible.