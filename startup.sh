#!/usr/bin/bash
java -jar /opt/selenium/selenium-server-standalone.jar &
P1=$!
node /usr/src/app/inventory-manager/index.js &
P2=$!
wait $P1 $P2


# node /usr/src/app/inventory-manager/index.js && java -jar /opt/selenium/selenium-server-standalone.jar