FROM node:dubnium

WORKDIR ./

COPY package*.json ./
COPY .babelrc ./
COPY .eslintrc ./
COPY webpack.common.js ./
COPY webpack.dev.js ./

RUN npm install

EXPOSE 8080
CMD npm start
