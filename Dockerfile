FROM denoland/deno

EXPOSE 8080

WORKDIR /app

ADD . /app

RUN deno cache src/main.ts

ENTRYPOINT deno task start