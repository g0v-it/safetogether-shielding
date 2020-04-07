# staysafe-shielding
Covid-19 StaySafe shielding project



## Personas


Premessa: preesiste un backend (”COC”)che gestisce le
comunicazioni tra le App utente ed il backend stesso. Le App
sono identificate con un ID chiamato COC_ID.
A questo Backend COC
si affianca un nuovo backend, per la sola gestione del sistema di
cordone sanitario.


### SDK Personas

- **App Business Owner**
- **Business man** who designed/built a contacts tracing (?) App or is currently developing one.
- **App Developer** Software developer who will be in charge of integrating our SDK into hisapplication.


### End Users

#### Marco the Immune Volunteer

##### Details

Marco is 34, he’s a proactive with strong civic sense. He was diagnosed with SARS-CoV-2 but has now fully recovered. He is keen to get back to work soon after a long quarantine. In the spirit of helping his local community he has taken steps to become a volunteer and provide care to fragile elderly. He knows how to use a smartphone, but technology isn’t really his thing.

##### Goals
Marco would like to get the “volunteer” certification so that he could go ahead and start helping his community. He is looking for the fastest and simplest way to achieve this goal.

##### Values and Fears

Marco cares about privacy in general and doesn’t want to be tracked or share his data with any large government or corporation</br>
He is afraid of:
- Carrying the virus to the fragile people he is helping
- Being tracked and observed in his daily life
- Not knowing how to use the application properly

#### Paola the Pharmacist

##### Details

Paola is 47, living in Milano, she’s been working in her pharmacy with her husband for over 12 years. She’s open minded and relaxed, taking life one step at a time. She hasn’t been tested for SARS-CoV-2, but none of his relatives was exposed so fairly confident of not being infectious.

##### Goals
Paola's goal is to get back to “business as usual" as soon as possible. Her family depends on the pharmacy business. She’s now one of the few registered professionals that can test the virus antibodies and produce digital certificates for immunity. While she’s happy to contribute to solving the current crisis, her major interests stay with the pharmacy itself.

##### Values and Fears

Paola cares about her community, and especially their health. She’s afraid the current situation will be prolonged and that everyone will suffer, if not due to health conditions and access to treatment, due to the economic impact that this crisis will have.

#### Walter the Institutional Force

##### Details
Walter is 51, he works with the Civil Defence forces and he is in charge of coordinating volunteering efforts in a large province with a population of 1.2M people.

##### Goals
Walter wants to leverage all existing resources to mitigate the damages of the current epidemic. Supporting all those in need with essentials and protective equipment. He needs to recruit the most immune volunteers possible to serve the local population.

##### Values and Fears
He fears to unknowingly spread the virus while trying to mitigate its damages. While he values privacy, he needs technological aid to gain visibility and make quick decisions.


#### Franca the Fragile Person

##### Details
Franca is 72, already home-bound due to the government directions to the elderly. She’s getting essentials delivered at home by either supermarkets or volunteers. Living alone, with no family within her city she needs external support to survive.

##### Goals
Survive. She needs to rely on low-tech communication, not having a computer and having only limited experience on how to use her smartphone.

##### Values and Fears
Franca fears to be “left behind” and to have little means to request help/support.


## User Stories

### [US8] Proof of Immunity

#### Conditions

##### Precondition
Marco’s state is immune

#### Story
Marco is asked by
[Andrea](#marco-the-immune-volunteer) to prove that his state is immune. Marco opens the mobile app and authenticates. The app shows a QR code that contains Marco’s COC_ID. [Andrea](#marco-the-immune-volunteer) scans the QR code using the operator app. The operator app checks Marco’s state on the backend (including the expiration date if the state is immune), and returns it to [Andrea](#marco-the-immune-volunteer).

### [US9] Marco Volunteers to Join Cordone Sanitario
##### Precondition
Marco’s state is immune
#### Story
Marco goes to Walter at
protezione civile, and volunteers to join cordone sanitario for
at-risk individuals. Marco proves that he is immune as described in
US8. [Walter](#walter-the-istitutional) registers [Marco](#marco-the-immune-volunteer)’s information, including his COC_ID and
photo, to protezione civile’s system. Protezione civile’s system
uses the COC backend to send a notification to [Marco](#marco-the-immune-volunteer) mobile
app. [Marco](#marco-the-immune-volunteer) authenticates in front of [Walter](#walter-the-istitutional), and the app records
[Marco](#marco-the-immune-volunteer) as a volunteer.





### [US10] Marco’s Immunity Expires
##### Precondition
Marco’s state is immune.
##### Post-condition
 Marco’s state is unknown
 #### Story
The mobile app notifies [Marco](#marco-the-immune-volunteer)  that his state has expired, and
that it is now unknown. [Marco](#marco-the-immune-volunteer)  can now proceed with US1.






### [US11]  Marco is Tested (Tampon).
 ##### Precondition
  [Marco](#marco-the-immune-volunteer) state is unknown, immune, or negative.
 ##### Post-condition
  [Marco](#marco-the-immune-volunteer) state is quarantined, negative, or immune
#### Story
 [Marco](#marco-the-immune-volunteer) feels
sick, and goes to his doctor Giovanni. Giovanni records information
about the test using the operator app, and updates [Marco](#marco-the-immune-volunteer)’s
state to unknown - thus possibly revoking [Marco](#marco-the-immune-volunteer)’s immune
state. After a few days, the test result is back. If the test is
positive, [Marco](#marco-the-immune-volunteer)’s state becomes quarantined. If the test is
negative, [Marco](#marco-the-immune-volunteer)’s state is set to negative or immune,
depending on [Marco](#marco-the-immune-volunteer)’s state at the beginning of US11.






### [US12] Marco Visits Franca.
##### Precondition
 Marco’s state is immune
 #### Story
[Walter](#walter-the-istitutional) sends Marco to [Franca](#franca-the-fragile-person). Marco knocks [Franca](#franca-the-fragile-person)’s door, and
[Franca](#franca-the-fragile-person) asks him to identify himself. Marco authenticates with the
mobile app on his smartphone, which then broadcasts Marco’s
certified COC_ID over Bluetooth LE. [Franca](#franca-the-fragile-person)’s app scans Bluetooth
devices and read’s Marco’s COC_ID using the mobile app on
her smartphone. [Franca](#franca-the-fragile-person)’s mobile app sends the COC_ID to the
backend, which returns Marco’s photo if his state is immune
and he was registered by [Walter](#walter-the-istitutional). Otherwise, the mobile app tells
[Franca](#franca-the-fragile-person) not to open the door. The backend records the interaction
between Marco and [Franca](#franca-the-fragile-person). [Franca](#franca-the-fragile-person) verifies that Marco matches the
photo shown on her mobile app, and opens the door.





### [US13] Antibodies test

#### Conditions

##### Precondition
Marco’s state is unknown

#### Story
Marco goes to [Paola](#paola-the-pharmacist) in order to perform an antibodies test.
If the test is positive [Paola](#paola-the-pharmacist) ask for Marco's tax code and phone number and records them using operator app.
The operator app notifies the institutional forces.
(Also has to update db?)

Otherwise [Paola](#paola-the-pharmacist) informs [Marco](#marco-the-immune-volunteer) that she can add the test-certificate on his user app if he wants. (And if he doesn't want?)
[Marco](#marco-the-immune-volunteer) can open the user-app that generates a QRcode (QRcode=f(timestamp,COC_ID)), [Paola](#paola-the-pharmacist) uses the operator-app to read the QRcode. After that she selects the test result (negative or immune) and the operetor app sands the information to the backend.

The information are stored in a db, morover they are sended to COC Backend that forwards the certificate to the user-app.
The certificate will be stored [Marco](#marco-the-immune-volunteer)'s device memory.


### [US14] expired immunity

#### Conditions

##### Precondition
[us13] [Marco](#marco-the-immune-volunteer) has a test-certificate

#### Story
The test-certificate has an expiring-date. After this date [Marco](#marco-the-immune-volunteer) has to go back to [Paola](#paola-the-pharmacist) in order to update his immunity condition.

### [US15] Marco is a bad person

#### Conditions

##### Precondition
 [Marco](#marco-the-immune-volunteer) has a test-certificate

#### Story
When [Marco](#marco-the-immune-volunteer) goes to [Franca](#franca-the-fragile-person) robs her. Franca reports the crime to Carabinieri. Pietro, the policeman, uses the user-app to read [Franca](#franca-the-fragile-person) COC_ID, then He asks to Stefano, the app owner, [Marco](#marco-the-immune-volunteer)'s COC_ID stored in [Franca](#franca-the-fragile-person)'s contact logs. Pietro, the policeman, asks to [Walter](#walter-the-istitutional) to revoke [Marco](#marco-the-immune-volunteer)'s volunteer certificate.



Marco viene inviato
da Walter a visitare Franca, una anziana ipertesa. Marco suona alla
porta e Franca gli chiede di farsi riconoscere. L’App utente
di Marco verifica la validità dei certificati di immunità e di
iscrizione alla protezione civile, richiede a Marco di effettuare un
riconoscimento biometrico locale e quindi procede a fare una
scansione Bluetooth dei COC_ID vicini, li invia al Backend dell’App
che tramite il Backend COC manda un messaggio all’App utente di
Franca che presenta un semaforo verde. Franca lo vede e fa entrare
Marco.



Marco da’ una
bastonata in testa a Franca e le ruba gli ori; Franca denuncia
l’accaduto ai Carabinieri. L’appuntato semplice Pietro usa l’App
utente per leggere il COC_ID dell’App utente di Franca, richiede a
Stefano, gestore del servizio, il COC_ID del fedifrago che Stefano
rintraccia facendo una query con il log dei contatti di Franca.
Pietro si rivolge alla protezione civile che invia un messaggio
all’App Utente di Marco revocando il certificato e acquisendone la
posizione che comunica all’appuntato.
