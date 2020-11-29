#!/usr/bin/bash

node /usr/src/app/inventory-manager/index.js &  PIDIOS=$!
java -jar /opt/selenium/selenium-server-standalone.jar &  PIDMIX=$!
wait $PIDIOS
wait $PIDMIX

# node /usr/src/app/inventory-manager/index.js && java -jar /opt/selenium/selenium-server-standalone.jar