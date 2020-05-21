# Overview

For shielding high-risk categories, the SafeTogether system supports the management of a “buffer” with immune persons, according to the proposal of Prof. Udi Shapiro from the Weizmann Institute. Healthcare professionals are the only authority that can register and associate a digital certificate (whose chain of trusts is internationally verifiable) certifying immunity on the smartphone. Designed for support staff for high-risk categories, it enables to verify directly the truthfulness and validity of the certificate, avoiding the risk of fraud.

The shielding system is comprised of a collection of applications that work together to allow the fullfillment of the processes required to handle:

1. the release of the immunity credentials
2. the verification of the immunity credentials
3. the registration of a volunteer with the Civic Defence
4. the activation of a support action for a fragile person
5. the identification of the volunteer as an allowed support actor

# Data handled

## Credentials

The system foresees two different credentials that will identify the holder as an immune person and as a volunteer with the Civic Defence.

Any party participating in the Sovrin ecosystem will be able to verify the validity of the credentials and to ask and obtain the data connected with them from the user wallet (with user permission). The trustiness of the credentials will be insured by the Sovrin trust framework by being issued by an actor recognized as trusted (a Healthcare professional or the Civic Defense).

### Immunity credentials

This credential holds the data required to identify a user as immune.

The schema of the immunity credential is as follows [TODO: add json schema definition]

- identiticativo del certificato
- identificativo del test usato
- azienda produttrice
- identificativo di lotto
- identificativo entita' che lo ha effettuato
- matricola identificativo soggetto che lo ha effettuato
- timestamp del test
- tipo del test (PCR, IGG, IGM)
- esito del test
- numero documento identita
- tipo documento identita
- emittente documento identita
  

### Civic Defense Volunteer

This credential holds the data required to identify the user as belonging to the shielding program for the CivicDefense
 
The schema of the Civic Defense Volunteer credential is as follows [TODO: add json schema definition]

- matricola del volontario
- sezione protezione civile di appartenenza
- data iscrizione al programma
- riferimento responsabile

## Healthcare

### Certificate

- identiticativo del certificato
- identificativo del test usato
- azienda produttrice
- identificativo di lotto
- identificativo entita' che lo ha effettuato
- matricola identificativo soggetto che lo ha effettuato
- timestamp del test
- tipo del test (PCR, IGG, IGM)
- esito del test
- numero documento identita
- tipo documento identita
- emittente documento identita
- timestamp creazione
- timestamp revoca
- ragione revoca

### Healthcare Operator

This is the healthcare operator authorized to carry on the tests and to release an immunity certificate.

- username (or email)
- password
- matricola
- Facility (reference)

### Healthcare Facility

This is the healthcase facility (hospital, laboratory, ...) where the Operators work

- Name
- Address
- ...

## Civic Defence

### Civic Defence Administrator

This is the operator authorized to register a new volunteer and to verify their status.

- username (or email)
- password

### Civic Defence Volunteer

This is the operator authorized to register a new volunteer and to verify their status.

- first name
- last name
- numero documento identita
- tipo documento identita
- emittente documento identita
- date registration
- date expiry

### Civic Defence Support

This is the operator authorized to handle the call center requests to verify the.

- username (or email)
- password

### Appointment

This is support appointment that a volunteer 

- Volunteer (reference)
- Address
- Geolocation
- Recipient name
- Description
- Appointment pincode


# Applications

## Volunteer Credentials Wallet

This is the mobile application used by the volunteer to collect their credentials which allow them to be identified as an immune person and as belonging to the Civic Defense.
The credentials issued by healthcare professionals or by the Civic Defense are distributed verifiable credentials that can be checked by any subject that would be required to verify  the status of the holder.

_In the POC implementation this is the DIZME wallet_

## Healthcare application

This is a web application used by the healthcare professionals to issue the immunity credentials to the volunteer. Only authorized healthcare professionals should be allowed to use it, and it should allow to carry on al the operations required to generate a new immunity credential for a person that has passed the required medical tests.

This application will operate as an issuer of verifiable credentials and it will use the DIZME REST API to implement the connection to the Sovrin ecosystem.

The application will include a frontend and a backend/API service.

### Features

#### Healthcare Professional Login

A professional wants to login into the application to access the system

- if not logged in the app should redirect to a login page
- the login page should present a username & password field
- after successful login the credentials dashboard should be presented

#### Credentials dashboard

A professional wants to see the list of credentials they have issued to be able to issue a new one or revoke one

- a list of credentials issued should be visible
- only the credentials issued by the logged in professional should be visible
- for each credential the main data should be visible
- for each credential a details button should be visible
- for each credential a revoke button should be visible
- there should be a button to issue a new credential

#### Credential issuing

A professional wants to issue a credential to send it to a volunteer

- a form to input all the data of the credential should be present
- a confirm issue button should be visible
- a back button to return to the dashboard should be visible
- any other informations required to perform the issuing should be present (QR code to connect with the volunteer DIZME app?)

#### Credential details

A professional wants to see the details of a credential they have issued to check it

- the full data for the credential should be visible
- a revoke button should be visible
- a back button to return to the dashboard should be visible

#### Credential revocation

A professional wants to revoke a credential they have issued to invalidate it

- the full data for the credential should be visible
- a field to insert the reason for the revoke should be present
- a confirm revoke button should be visible
- a back button to return to the dashboard should be visible


## Civic defense application

This is a web application used by the Civic defense volunteers to enroll other volunteers into the shielding program and to schedule the appointments with the fragile persons. Only authorized users from the Civic defense may use the application and they need to be able to check the volunteer immunity credential an to release a credential stating the fact that a volunteer is part of the shielding program.

This application will work both as an issuer of credentials and as a verifier of credentials.

the application will include a frontend and a backend/API service.

### Features

#### Civic defense admin login

An authorized civic defense admin wants to login into the application to access the system

- if not logged in the app should redirect to a login page
- the login page should present a username & password field
- after successful login the volunteers dashboard should be presented

#### Volunteers dashboard

An authorized civic defense admin wants to see the list of volunteers enrolled to the shielding program their status and their next appointment.

- a list of volunteers should be visible
- for each volunteer the main data should be visible (first name, last name, status, next appointment)
- for each volunteer a details button should be visible
- for each volunteer a block button should be visible
- for each volunteer a new appointment button should be visible
- there should be a button to enroll a new volunteer

#### Volunteer enrolling

An authorized civic defense admin wants to enroll a new volunteer to allow them to participate to the shielding program

- a form to input all the data of the volunteer should be present
- a confirm issue button should be visible
- a back button to return to the dashboard should be visible
- any other informations required to perform the issuing should be present (QR code to connect with the volunteer DIZME app?)

The enrolling will probably need to be split in two or more steps since it should include a step to require the immunity credential to the user:
Once the connection is established, the application should acquire the immunity credential information from the user by going throught the proof request via DIZME. This information should be shown the the admin enrolling the volunteer to allow them to verify that the user can participate in the shielding program. The application MIGHT implement some automatic validation of the immunity data obtained to make it easier for the admin to decide if the user can be enrolled (e.g. check that the tests weren't done too long ago, or that the tests are of the right kind).

#### Volunteer details

An authorized civic defense admin wants to see the details of a volunteer to check it

- the full data for the volunteer should be visible
- a block button should be visible
- a button to re-verify the immunity credential should be visible
- a button to add a new appointment should be visible
- the list of appointments should be visible
- a back button to return to the dashboard should be visible

#### Volunteer blocking

An authorized civic defense admin wants to revoke the shielding programm status of a volunteer to stop their participation in the program

- the full data for the volunteer should be visible
- a field to insert the reason for the action should be present
- a confirm block button should be visible
- a back button to return to the dashboard should be visible

#### Volunteer new appointment

An authorized civic defense admin wants to insert a new appointment to allow a volunteer to support a fragile person

- there should be a way to select the volunteer
- a form to input the rest of the appointment data should be present
- a confirm button should be visible
- a back button to return to the dashboard should be visible

The appointment creation will generate an appointment code to be used by the volunteer to communicate the appointment reference to the fragile person when arriving at their home.
The appointment creation may probably required to re-check the immunity credentials to make it more robust

## Call center application

This is a web application used by the Call center or possibly by the fragile person themselves via a simple interface to verify that a volunteer ringing at the door is actually part of the shielding program.

This application will work both as a verifier of credentials.

The application will include a frontend and possibly use the same backend as the Civic defense application. 

At its core it doesn't require a specific login but simply allows to verify the credentials for a person starting from the appointment code.

### Features

#### Appointment verification

A call center operator wants to verify that a volunteer is actually authorized to go to the fragile person

It is a two step wizard:

**First step**:

- the page shows a box to input an appointment code and a button to check

When the user inserts a code and presses the button the application should enquire the API and start the verification process.
The backend should start the credentials verification process, if successful in acquiring the data from the DIZME wallet of the volunteer, it should generate a PIN and send it to the volunteer via in-app notification.
then it should show the second step

**Second step**:

- the page should show the appointment code, a box to insert the PIN and a button to complete the operation
- the page should show a clear text to instruct the user to ask for the PIN to the volunteer

When the volunteer has communicated the PIN the user should insert it in the PIN box and press the button. The application verifies that  the given PIN matches the appointment PIN and shows the page with the complete appointment data confirming that the volunteer actually holds the credential wallet.