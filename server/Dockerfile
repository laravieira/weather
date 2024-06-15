FROM node:19.0.0
WORKDIR /climatempo
COPY ./package.json ./package.json
RUN npm install
COPY . .

EXPOSE 4000
CMD ["npx", "tsx", "./src/index.ts"]
