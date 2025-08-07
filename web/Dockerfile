FROM node:19.1
WORKDIR /climatempo

ARG REACT_APP_SERVER_HOST http://localhost:4000
ENV REACT_APP_SERVER_HOST $REACT_APP_SERVER_HOST

ARG REACT_APP_SERVER_PORT 4000
ENV REACT_APP_SERVER_PORT $REACT_APP_SERVER_PORT

COPY ./package.json ./package.json
RUN npm install --quiet
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start", "--", "--host"]
