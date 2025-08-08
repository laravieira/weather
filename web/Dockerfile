FROM node:19.1
WORKDIR /climatempo

ENV REACT_APP_SERVER_HOST ""
ENV REACT_APP_SERVER_PORT 4000

COPY ./package.json ./package.json
RUN npm install --quiet
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start", "--", "--host"]
