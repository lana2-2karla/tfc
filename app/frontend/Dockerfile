FROM node:16.14-alpine
WORKDIR /app-frontend
COPY package.json .
#ocorre na contrução da imagem
RUN npm install
COPY . .
#comando que vai ser executado quando a imagem for carregada
CMD ["npm", "run", "start"]