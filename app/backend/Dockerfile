FROM node:16.14-alpine
WORKDIR /app-backend
COPY package.json .
# run - ocorre na contrução da imagem
RUN npm install
COPY . .
# CMD - comando que vai ser executado quando a imagem for carregada
CMD ["npm", "run", "dev"]
