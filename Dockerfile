# Etapa 1: Construcción (Build) de la aplicación React
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
# (Si usas Vite en lugar de Create React App, cambia /app/build por /app/dist)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]