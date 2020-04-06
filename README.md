# staysafe-shielding
Covid-19 StaySafe shielding project





## Personas & User Stories

Premessa: preesiste un backend (”COC”)che gestisce le
comunicazioni tra le App utente ed il backend stesso. Le App
sono identificate con un ID chiamato COC_ID.
A questo Backend COC
si affianca un nuovo backend, per la sola gestione del sistema di
cordone sanitario.


### SDK Personas
	
	App
	Business Owner


**Business man** who designed/built a contacts tracing (?) App or is currently developing one.
**App Developer** Software developer who will be in charge of integrating our SDK into hisapplication.


### End Users

- Marco: patient
- Giovanni: physician or pharmacist
- Maria: hospital physician
- Andrea:police officer
- Walter: member of protezione civile
- Franca: at-risk individual

US8: Proof of
Immunity -- Marco Is Asked to Prove that He Is Immune. [Precondition:
Marco’s state is immune] Marco is asked by
[Andrea/Walter] to prove that his state is immune. Marco opens
the mobile app and authenticates. The app shows a QR code that
contains Marco’s COC_ID. [Andrea/Walter] scans the QR code using
the operator app. The operator app checks Marco’s
state on the backend (including the expiration date if the state is
immune), and returns it to [Andrea/Walter].



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
