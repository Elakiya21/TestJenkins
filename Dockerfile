# Dockerfile  

FROM mhart/alpine-node:8.9.4

RUN apk --update add build-base python git

COPY . /app/
WORKDIR /app
RUN npm install
CMD ["script/docker-entrypoint.sh"]

