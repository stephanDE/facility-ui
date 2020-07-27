FROM node:10.15-alpine AS build

COPY . /app
WORKDIR /app

RUN npm config set unsafe-perm true

RUN apk update && apk --no-cache add git
RUN npm i npm@latest -g

RUN npm install && npm install -g @angular/cli
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist/facility-ui /app/dist/
ADD nginx/nginx_site.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
