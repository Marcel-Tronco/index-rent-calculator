# Mietspiegel Server

## Technischer Aufbau

### Überblick
Der Server basierend auf node.js nutzt einen http-Server von [express.js](expressjs.com). Der verschiedene Endpunkte einerseits für die Funktionen der API (Datenspeicherung, Backup, Abrufen als CSV) und andererseits fürs Abrufen des Frontends bereithält.

Der Server läuft in einem Dockercontainer, um das Deployment zu vereinfachen und den Server ausfallsicherer zu machen.

### Frontend
Das Frontend ist unter `/` auf der Website erreichbar. Die Daten liegen lokal im //dist-Ordner. Es bietet die Mietrechnerfunktionalität für die Nutzer:innen an und sendet Daten als .json ans Backend. Mehr zum Frontend-Aufbau im README des Frontends.

### API

Zu finden ist sie im /controllers-Ordner. Die API hat drei Funktionen. 
1. Daten sammeln:
    - Sie bekommt vom Frontend Daten als JSON. Die werden validiert und in die Datenbank eingetragen. (POST requests an `/api/add` )
2. Backups erstellen/löschen und 

3. CSV herunterladen:
    - unter `/api/backup` können neue backups oder CSVs heruntergeladen werden. Da die löschung der Backups dann leider nicht automatisch funktioniert, müssen dann in einem weiteren Schritt wenn der platz knapp wird die backups gelöscht werden.

Der `/api/backup/` endpoint ist mit Passwort gesichert.

### Datenbank

Es wird eine sqlite3 Datenbank genutzt. Die liegt im lokalen Dateisystem /database/data. Die Kommunikation mit der Datenbank ist in /database/db_connection.js geregelt. Dort sind die Abfragen für neue Einträge und die Erstellung der zusammenfassenden CSV zu finden.

Bei hoher Auslastung und vielen gesammelten Daten wäre es empfehlenswert Backups und CSV Abfragen zu Zeiten zu machen in denen weniger Menschen auf die Seite zugreifen.

## Nutzung

### Backups

Backups werden neu erstellt, wenn man mit richtigem Passwort den Endpoint (mit GET-Request) anspricht. `/api/backup/`.
Zusätzlich muss auch noch ein Passwort (mit sog. Query-Parameter) eingegeben werden und zwar wie folgt:

hinter den endpoint muss zunächst ein Fragezeichen dann 'pw=' und dann das Passwort eingegeben werden. Das sieht dann bspw. so aus: `website.de/api/backup/?pw=passwort`

Wenn man die Backups löschen will muss ein & und ein zusätzlicher Query-Parameter eingeben nämlich prune der dann "true" sein muss. Also `website.de/api/backup/?pw=passwort&prune=true`

Wenn man statt dessen Daten als CSV herunterladen möchte muss statt prune der Query-Parameter "csv" mit dem Wert "true" eingegeben wreden. Also `website.de/api/backup/?pw=passwort&csv=true`.