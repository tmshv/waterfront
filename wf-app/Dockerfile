FROM node:12-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 80
ENV PORT 80

ENV NODE_ENV production

COPY . .

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start", "--", "-p", "${PORT}" ]
