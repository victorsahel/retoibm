FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
HEALTHCHECK --interval=5m --timeout=3s \
CMD ["node", "servidor.js"]