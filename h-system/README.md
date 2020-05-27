# H-System
POC for healthcare shielding application.
This application provides a way for issuing and revoking immunity certificates 


## Quickstart with docker

The project is shipped with a [Docker](https://docker.com) setup that makes it easy to get a containerized  environment up and running.


```
docker-compose up -d
```

## Use case diagram
![Use case diagram](../docs/uml/h-system-usecase.svg)


## Project Structure

### Store

Store is a "standalone" component built with [mariaDB](https://mariadb.org/).
At startup it cretes the following table schemas.

#### Facility [TODO: is it necessary?]

Contains information about the workplace of healthcare professionals.

|code | name | address | type|
|----|:------:|:-------------:|------:|
|Identifier of the facility |name of facility | address of facility | indicates whether it's a farmacy or hospital|


#### Operator

Contains information about healthcare professionals and h-system admins.


| username   |      password      |  healthcareid | Role|[facility](#facility)
|----------|:-------------:|------:| ------:|--:|
| userame or email used for login |  SHA256 | identifier of operator in NHS | User role in h-system (admin or operator)|Reference


#### Certificates [TBD]

Contains information about issued certificates and the operator who issued them.

| business_id   | tid|status |    [username](#operator) 
|----------|:-------------:|:-----:|:----:|
| id of the certificate's owner | identifier of the transaction|status of the certificate| certificate's issuer 


### Api

Api is a standard [node-express](https://expressjs.com/) application. It connects the store and [Dizme](https://dizme.io/) by providing a layer of abstruction between the two. It also exposes certain routes to be used by frontend.
Per il momento le funzioni dell'amministratore non sono sviluppate, verranno sviluppate in seguito all'integrazione con il sistema sanitario internazionale utilizzando per il login e la gesione degli operatori l'infrastrutture del sistema sanitario
Questa applicazione è costituita da due componenti principali:
1. **DataBase Interface** che espone le seguenti funzioni:
    - setUserPassword(username, password, old_password)
    - login(username, password)
    *Operator Functions*
    - getCertificateList(username)
    - addCertificate()
    - revokeCertificate()
   
    *Admin Functions*
    - addUser(username, password, healthcare_id, role, facility_code)
    - addFacility(code, name, address, type,)
    - removeUser(username)
    - removeFacility(code)
    - resetUserPassword(username, password)

2. **Dizme Interface** che espone le seguenti funzioni:
    - getCertificateDetail()
    - issueCertificate()
    - revokeCertificate()


#### Routes

| METHOD   |   Route |  Description
|:----------|:-----------|:-------------|
| POST | /login | Login service provided by [passportjs](http://www.passportjs.org/).
| GET | /certificates | List of issued certificates by the logged in operator.
| POST | /issue | Fires up the process of issuing an immunity certification according to the predefined schema.
| GET | /details/:business_id | Returns the details of a certificate.
| POST | /revoke/:business_id | Revokes the certificate 

[TODO: add admin routes]




### Frontend

Frontend is a standard [vue-js](https://vuejs.org/) single-page application. It uses the API part for sending and retrieving data. It basically makes everything visible.
Il frontend espone le seguenti view:
1. **Login Page** pagina mostrata a tutti gli utenti che si connettono alla web app senza avere ancora effettuato il login. Da questa pagina è possibile effettuare il login, se l'utente è un admin viene reindirizzato alla Admin Page, altrimenti, se si tratta di un operatore , viene reindirizzato alla sua dashboard
2. **Admin Page** pagina di amministrazione della piattaforma. permette di inserire/rimuovere nuovi operatori, nuove facilities e resettare una password dell'utente.
3. **Dashboard** visualizza una lista di tutti i certificati issued dall'operatore che ha effettuato il login mostrando per ognuno il codice fiscale, il nome e il cognome della persona che ha effettuato il test e la data in cui è stato effettuato. per ognuno è possibile visualizzare il certificato completo (detail button) oppure revocarlo (revoke button).
é possibile creare un nuovo certificato (issue button)
4. **Issuing Page** pagina dove è possibile creare un nuovo certificato. contiene un form dove vengono isteriti i dati per la creazione del certificato e una sezione dove sarà mostrato il DIZME Widget per l'issuing del certificato
5. **Details\Revoke Page** la pagina mostra i dettagli di un singolo certificato e, nel caso in cui viene chiamata la rotta /revoke una sezione dove è possibile revocare il certificato inserendo la ragione della revoca.