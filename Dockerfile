FROM node:16.14-alpine
WORKDIR /app

COPY . .
RUN [ "npm", "install" ]

ENTRYPOINT [ "npm", "run", "dev" ]
