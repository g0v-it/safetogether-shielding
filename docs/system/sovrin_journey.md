Sovrin storyboad
=================

Here  is an example of how demo storyboard could be implemented using Sovrin/Hyperledger/Hindy SSI framework:


**step** - Marco si reca da Giovanni per verificare la sua immunità al Covid-19 ed esegue i test sierologici che danno esito positivo.

**step** - Giovanni invita Marco a scaricare la app di shielding e ad effettuare l’onboarding, se gia non è inpossesso

- La app di shielding è un edge agent di Sovrin che funziona da wallet dei certificati (verifiable claims) posseduti da Marco
- Il processo di onboarding dell’applicazione di shielding comprende la sua identificazione e la connessione di Marco al servizio sanitario nazionale che opera come issuer dei certificati


**step** - Giovanni il dottore emette (issues) il certificato di immunità per Marco e glielo invia:

- Il certificato di immunità è una verifiable claim, con uno schema ben definito
- Il dottore operando sulla propria interfaccia verso il sistema di issuing dei certificati registra il risultato dell’esame (genera la verifiable claim)
- Il sistema di issuing dei certificati firma la verifiable claim nel ledger pubblico di Sovrin
- Il sistema di issuing dei certificati invia la verifiable claim al wallet di Marco 
- La app di Marco si attiva notificandogli l’azione di Giovanni che intende rilasciare il certificato
- Marco accetta l’emissione del certificato, questa azione controfirma la claim nel ledger pubblico e salva i dati collegati nel wallet.

**step** - Marco si reca presso la protezione civile per chiedere di essere ammesso al programma di shielding

**step** - Walter (protezione civile) chiede a Marco di presentare il certificato di immunità

- Walter chiede a Marco di connettere la sua app di shielding alla app della protezione civile
- La app della protezione civile opera sia come issuer che come verifier di verifiable credentials possedute da Marco
- L’attivazione della connessione tra l’edge agent di Marco e il soggetto Protezione Civile permette a quest’ultima di chiedere la proof di un certificato e di emettere il certificato di appartenenza al programma di shielding
- Marco riceve la richiesta di connessione nella sua app e la conferma
- Da questo momento in poi Walter usando la app di Protezione Civile può chiedere a Marco dati contenuti nelle verifiable credentials che Marco possiede e può emettere nuove claims
- Attraverso la app di protezione civile, Walter chiede la proof a Marco del proprio certificato di immunità
- La richiesta di proof del possesso del certificato è accompagnata dalla richiesta di accesso ai dati firmati del certificato
- La app di shielding di Marco riceve notifica delle richiesta di accesso Marco approva la richiesta di accesso ai dati e invia la claim firmata alla app di protezione civile
- La app di Protezione Civile verifica la non revoca del certificato di immunità nel ledger pubblico e se ancora valido presenta il risultato a Walter

**step** - Walter verifica la validità del certificato

- Walter utilizza i dati firmati nel certificato di Marco per decidere se il suo stato rientra nei parametri per l’acccesso al programma di shielding come volontario

**step** - Walter firma una attestazione di partecipazione di Marco al programma di Shielding della protezione Civile e la invia a Marco

- La attestazione di partecipazione è una verifiable credential, con uno schema ben definito
- Walter operando sulla propria interfaccia verso il sistema di issuing dei certificati registra l’iscrizione di Marco (genera la verifiable claim)
- Il sistema di issuing dei certificati firma la verifiable claim nel ledger pubblico (e.g. di Sovrin)
- Il sistema di issuing dei certificati invia la verifiable claim al wallet di Marco 
- La app di Marco si attiva notificandogli l’azione di Walter che intende rilasciare le credenziali
- Marco accetta l’emissione delle credenziali, questa azione controfirma la claim nel ledger pubblico e salva i dati collegati nel wallet.

**step** - Il call center del programma Shielding contatta Marco e gli chiede di fare una visita di cortesia alla signora Franca

- Il call center utilizza il proprio sistema che agisce come verifier nell’architettura SSI per verificare le seguenti claim di Marco: stato di immunità, iscrizione al programma di protezione civile
- Il call center invia una richiesta di proof per le claim a Marco
- L’edge agent di Marco (la app di Shielding) si attiva notificando la richiesta di accesso del call center Marco approva la richiesta di accesso 
- Il call center riceve i dati che confermano i claim di Marco e genera un codice di intervento per Marco con una durata definita, e lo invia alla app di Marco

**step** - Marco citofona alla signora Franca fornendole il codice ricevuto dal call center

**step** - La signora Franca telefona al numero verde della protezione civile e comunica il codice di Marco

**step** - Il call center rassicura la signora Franca sul fatto che Marco è un volontario autorizzato.

Issue: translate in english
