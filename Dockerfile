FROM nginx:stable-alpine

# Configuration nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers de l'application
COPY dist/projects/farming-suite/web/browser /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]