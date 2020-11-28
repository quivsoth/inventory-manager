FROM node:12 AS builder

# Create app directory
WORKDIR /usr/src/app

RUN git clone https://github.com/quivsoth/inventory-manager.git

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

FROM selenium/standalone-chrome

COPY --from=builder . .
EXPOSE 4444
EXPOSE 8080

RUN chmod 777 /usr/src/app/inventory-manager/startup.sh 
ENTRYPOINT ["/usr/src/app/inventory-manager/startup.sh"]

# CMD [ "node", "index.js" ]