FROM openjdk:latest

RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y curl && curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -y nodejs

WORKDIR ./

COPY .babelrc ./
COPY package*.json ./

RUN npm install

EXPOSE 3000
CMD npm start
