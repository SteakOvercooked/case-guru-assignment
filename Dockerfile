FROM node:18.19
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run dev
EXPOSE 3000