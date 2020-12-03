FROM node:14.15.1-alpine
WORKDIR /home/node/app
COPY . .
RUN chown -R node:node /home/node/app
USER node
RUN npm ci
ENV PORT=4002
ENV NODE_ENV=production
CMD [ "node", "./src/index.js" ]