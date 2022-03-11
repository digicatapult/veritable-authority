ARG NODE_VERSION=16-alpine
FROM node:$NODE_VERSION AS build

RUN npm -g install npm@8.x.x

WORKDIR /veritable-authority

# Install base dependencies
COPY . .
RUN npm ci --production

# RUN Build
RUN npm run build

##################################################################################################

FROM node:$NODE_VERSION AS runtime

RUN npm -g install npm@8.x.x

WORKDIR /veritable-authority
ENV PORT 3004

COPY --from=build /veritable-authority/build .

RUN npm install -g serve

EXPOSE 3004
CMD ["serve", "/veritable-authority"]