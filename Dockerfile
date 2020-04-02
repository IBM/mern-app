FROM registry.access.redhat.com/ubi8/ubi

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs

RUN mkdir /app
WORKDIR /app

COPY package.json webpack.common.js webpack.dev-proxy.js webpack.dev-standalone.js webpack.prod.js /app/
RUN npm install
COPY /client /app/client
RUN npm run build; npm prune --production
COPY . /app

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
