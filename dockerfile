FROM node

WORKDIR /webserver_app

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "node", "app.js" ]