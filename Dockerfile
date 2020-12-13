FROM node:14.15.1-alpine AS build
WORKDIR /home/node/app
COPY . .
RUN chown -R node:node /home/node/app
USER node
RUN npm ci
RUN npm run build

FROM node:14.15.1-alpine
WORKDIR /home/node/app
COPY --from=build /home/node/app/package*.json ./
COPY --from=build /home/node/app/dist ./dist
RUN chown -R node:node /home/node/app
USER node
RUN npm ci --only=prod
ENV PORT=4002
ENV NODE_ENV=production
CMD [ "node", "./dist/index.js" ]
