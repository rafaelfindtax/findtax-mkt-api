FROM node:18

WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .
COPY .env .


# Expose API port
EXPOSE 5000

# Compila TypeScript
RUN npm run build

# Executa o JS compilado
CMD ["node", "dist/index.js"]
