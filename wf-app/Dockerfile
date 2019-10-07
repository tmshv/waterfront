# BUILD
FROM node:12-alpine as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Building app
RUN npm run build

# RUNTIME
FROM node:12-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production 

COPY --from=build /app/.next ./.next
COPY --from=build /app/build ./build
COPY ./static ./static

EXPOSE 80
ENV PORT 80
ENV NODE_ENV production

# Running the app
CMD [ "npm", "start" ]
