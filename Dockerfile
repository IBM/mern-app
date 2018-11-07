FROM node:8-stretch

# Change working directory
WORKDIR "/app"

# Update packages and install dependency packages for services
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'

# Install npm production packages
COPY package.json webpack.common.js webpack.dev-proxy.js webpack.dev-standalone.js webpack.prod.js /app/
RUN cd /app; npm install --production
COPY /client /app/client/
RUN npm install --only=dev; npm run build; npm prune --production

COPY . /app

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]



