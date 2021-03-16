##
## EPITECH PROJECT, 2020
## B-DEV-500-PAR-5-1-cardgames-lucas.guyader
## File description:
## Dockerfile
##

FROM node:latest
ENV NODE_ENV=production
WORKDIR /EpitechDashboard
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE 8080
CMD npm start