# Stage 1
FROM node:20-alpine AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Stage 2
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve
COPY --from=build /app/dist ./dist

EXPOSE 8302
EXPOSE 8304

CMD ["serve", "-s", "dist", "-l", "8302"]
