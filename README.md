# UX-Design
Eine Interaktive Installation für die Vorlesung UX Design

## Technischer Ablauf
An der Rückseite des Windrades befinden sich kleine unterschiedlich gepolte Magnete, welche bei der Rotation des Windrades am Wirkungsbereich eines Hall-Sensors streifen. Angeregt durch die unterschiedlich gepolten Magnetfelder, gibt der Hall Sensor ein digitales Signal aus. Am Ende des Signalweges befindet sich ein Arduino-Mikrocontroller. Im Mikrocontroller wird das Signal des Hall Sensors mit dem "Firmata" Protokoll codiert und an den angeschlossenen Computer gesendet.
Auf der Software Seite der Anwendung wird das Signal dekodiert und mithilfe der NodeJS Library [johnny-five.io](http://johnny-five.io) zur Weiterverwendung in einer Javascript-Umgebung aufbereitet.
Das User Interface ist mit Javascript und der, eigens für kreative Programmierung angedachten, Library [p5js.org](https://p5js.org) umgesetzt.

## Starten der Anwendung
Zuerst müssen die drei Anschlüsse am Windrad (rot, braun, orange) mit dem Arduino verbunden werden. Hierbei ist:

* rot: Spannung (5V)
* orange: Masse
* braun: Signal - Analog Input (A0)

Zum Starten der Anwendung ist eine Installation von NodeJS notwendig, sofern nicht vorhanden.
Die Anwendung kann dann über den Shell-Command `$ node server.js` gestartet werden. Wenn keine Fehler aufgetreten sind, kann die Anwendung nun im Browser unter `http://localhost:3000/` aufgerufen werden
