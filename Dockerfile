# Використовуємо офіційний образ Node.js з версією 18
FROM node:18 AS builder

# Встановлюємо робочий каталог
WORKDIR /app

# Копіюємо package.json та package-lock.json для встановлення залежностей
COPY package.json package-lock.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли проекту
COPY . .

# Виконуємо збірку додатку
RUN npm run build:prod

# Використовуємо образ для nginx, щоб розгорнути зібраний додаток
FROM nginx:alpine

# Копіюємо зібраний додаток в nginx
COPY --from=builder /app/dist/project-client /usr/share/nginx/html

# Відкриваємо порт 80 для доступу до додатку
EXPOSE 80

# Запускаємо nginx
CMD ["nginx", "-g", "daemon off;"]
