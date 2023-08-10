# Použijeme oficiální Node.js image
FROM node:14 as build

# Nastavení pracovního adresáře
WORKDIR /app

# Kopírování package.json a package-lock.json pro zajištění efektivního cachování závislostí
COPY aspcrud-frontend/package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku aplikace
COPY aspcrud-frontend/ ./

# Build frontendu
RUN npm run build

# Použijeme oficiální Nginx image pro servírování statických souborů
FROM nginx:alpine

# Kopírování výsledků buildu z prvního image do adresáře, ze kterého Nginx servíruje soubory
COPY --from=build /app/build /usr/share/nginx/html

# Exponování portu, na kterém bude běžet Nginx
EXPOSE 80

# Příkaz pro spuštění Nginx
CMD ["nginx", "-g", "daemon off;"]
