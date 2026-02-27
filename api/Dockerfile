FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build && npx prisma generate

EXPOSE 3333

CMD npx prisma migrate deploy && npx tsx prisma/seed.ts && node dist/app.js
