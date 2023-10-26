FROM node:18.16-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx tsc

# Expose port 8080 to local machine
EXPOSE 8000

# Simple container without supervisor or reverse nginx proxy for time saving
CMD ["node", "./dist/index.js"]