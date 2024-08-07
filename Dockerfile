FROM nginx:alpine
WORKDIR .
RUN npm run build
COPY ./dist /usr/share
EXPOSE ${port}
cmd ["nginx", "-g", "'daemon off;'"]
