# Simple two-stage build using Drogon base
FROM drogonframework/drogon:latest AS build

WORKDIR /app
COPY . /app

RUN cmake -B build -S . && cmake --build build -j

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=build /app/build/backend /app/backend
COPY config.json /app/config.json

EXPOSE 8080
CMD ["/app/backend"]
