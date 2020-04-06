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

#### Marco, Immune Volunteer

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

#### Paola, Pharmacist

##### Details

Paola is 47, living in Milano, she’s been working in her pharmacy with her husband for over 12 years. She’s open minded and relaxed, taking life one step at a time. She hasn’t been tested for SARS-CoV-2, but none of his relatives was exposed so fairly confident of not being infectious. 

##### Goals
Paola's goal is to get back to “business as usual" as soon as possible. Her family depends on the pharmacy business. She’s now one of the few registered professionals that can test the virus antibodies and produce digital certificates for immunity. While she’s happy to contribute to solving the current crisis, her major interests stay with the pharmacy itself. 

##### Values and Fears

Paola cares about her community, and especially their health. She’s afraid the current situation will be prolonged and that everyone will suffer, if not due to health conditions and access to treatment, due to the economic impact that this crisis will have. 

#### Walter, Institutional Forces

##### Details
Walter is 51, he works with the Civil Defence forces and he is in charge of coordinating volunteering efforts in a large province with a population of 1.2M people.

##### Goals
Walter wants to leverage all existing resources to mitigate the damages of the current epidemic. Supporting all those in need with essentials and protective equipment. He needs to recruit the most immune volunteers possible to serve the local population. 

##### Values and Fears
He fears to unknowingly spread the virus while trying to mitigate its damages. While he values privacy, he needs technological aid to gain visibility and make quick decisions. 


#### Franca, Fragile Person

##### Details
Franca is 72, already home-bound due to the government directions to the elderly. She’s getting essentials delivered at home by either supermarkets or volunteers. Living alone, with no family within her city she needs external support to survive. 

##### Goals
Survive. She needs to rely on low-tech communication, not having a computer and having only limited experience on how to use her smartphone.  

##### Values and Fears
Franca fears to be “left behind” and to have little means to request help/support. 


## User Stories

### Proof of Immunity

#### Conditions

##### Precondition
Marco’s state is immune

#### Story
Marco is asked by
[Andrea](##marco,-immune-volunteer) to prove that his state is immune. Marco opens the mobile app and authenticates. The app shows a QR code that contains Marco’s COC_ID. [Andrea](##marco,-immune-volunteer) scans the QR code using the operator app. The operator app checks Marco’s state on the backend (including the expiration date if the state is immune), and returns it to [Andrea](##marco,-immune-volunteer).


US9: Marco
Volunteers to Join Cordone Sanitario [Precondition: Marco’s state
is immune] Marco goes to Walter at
protezione civile, and volunteers to join cordone sanitario for
at-risk individuals. Marco proves that he is immune as described in
US8. Walter registers Marco’s information, including his COC_ID and
photo, to protezione civile’s system. Protezione civile’s system
uses the COC backend to send a notification to Marco’s mobile
app. Marco authenticates in front of Walter, and the app records
Marco as a volunteer.



US10: Marco’s
Immunity Expires [Precondition: Marco’s state is immune.
Post-condition: Marco’s state is unknown]
The mobile app notifies Marco that his state has expired, and
that it is now unknown. Marco can now proceed with US1.



US11: Marco is
Tested (Tampon). [Precondition: Marco’s state is unknown,
immune, or negative. Post-condition:
Marco’s state is quarantined,
negative, or immune] Marco feels
sick, and goes to his doctor Giovanni. Giovanni records information
about the test using the operator app, and updates Marco’s
state to unknown - thus possibly revoking Marco’s immune
state. After a few days, the test result is back. If the test is
positive, Marco’s state becomes quarantined. If the test is
negative, Marco’s state is set to negative or immune,
depending on Marco’s state at the beginning of US11. 




US12: Marco Visits
Franca. [Precondition: Marco’s state is immune]
Walter sends Marco to Franca. Marco knocks Franca’s door, and
Franca asks him to identify himself. Marco authenticates with the
mobile app on his smartphone, which then broadcasts Marco’s
certified COC_ID over Bluetooth LE. Franca’s app scans Bluetooth
devices and read’s Marco’s COC_ID using the mobile app on
her smartphone. Franca’s mobile app sends the COC_ID to the
backend, which returns Marco’s photo if his state is immune
and he was registered by Walter. Otherwise, the mobile app tells
Franca not to open the door. The backend records the interaction
between Marco and Franca. Franca verifies that Marco matches the
photo shown on her mobile app, and opens the door.


Marco va in farmacia
Il farmacista gli fa
un test anticorpale. 

Se il test è
positivo, il farmacista attiva l’App operatore, richiede il
codice fiscale e il numero di telefono e lo registra nell’App che
genera una notifica ad una autorità.
Altrimenti il
farmacista informa Marco che, se lo desidera, può procedere a
registrare il certificato del test sulla sua applicazione.
Se Marco lo
desidera, quindi, attiva l’App utente. L’App utente
presenta un QRcode che codifica timestamp ed il codice univoco
dell’App stessa (COC_ID). Il farmacista attiva l’App
operatore, con questa legge il QRcode, seleziona l’esito del
test (negativo, immune) e invia l’esito al backend. Il backend
registra l’informazione in un db e la invia al Backend COC che
trasmette la certificazione all’App Utente che memorizza il
certificato localmente.



Marco va da Walter
alla protezione civile e si offre come volontario per partecipare al
cordone sanitario per le persone fragili
Marco attiva l’App
utente e presenta a Walter il suo QRCode che codifica il COC_ID,
la data e l’ora e l’esito dell’esame.
Walter legge con la
sua App utente il QRcode e verifica che Marco è immune e la
data di scadenza del certificato. Walter registra i dati di Marco, il
COC_ID e dati certificazione sui sistemi della protezione civile.  Il
sistema della protezione civile, usando il Backend COC, manda all’App
Utente di Marco  la certificazione di iscrizione come volontario
della Protezione Civile e gli fa fare la procedura di enrollment
biometrico locale sull’App, davanti a Walter.



Dopo alcuni giorni,
il backend comunica all’App utente di Marco che deve tornare
dal farmacista per un nuovo test, chè la sua certificazione di
immunità è scaduta.



Marco si sente male,
va dal medico che gli fa un tampone. Il medico registra informazioni
dell’esame ed il suo COC_ID tramite una pagina web. Il sistema
invia tramite il Backend COC all’App di Marco una segnalazione di
sospensione della certificazione di Immunità
Il giorno dopo
arriva l’esito del tampone.
Se è positivo, il
medico registra l’informazione e annulla il certificato di immunità
Se  è negativo, il
sistema registra l’informazione e riabilita il certificato di
immunità



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
