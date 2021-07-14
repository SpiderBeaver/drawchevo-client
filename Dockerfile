FROM node as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node as builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node as runner
WORKDIR /app
COPY --from=builder /app/build ./build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "build"]