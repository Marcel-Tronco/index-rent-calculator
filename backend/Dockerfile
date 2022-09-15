FROM node:16.13-bullseye

WORKDIR /usr/src/app
COPY ./ ./
RUN mkdir -p ./database/backup && mkdir -p ./database/data
RUN npm ci \
    && npm audit fix \
    && chown -R node:node /usr/src/app

USER node
CMD ["node", "index.js"]