FROM nginx:stable-alpine

# Configuration nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Copier les fichiers de l'application
COPY dist/projects/farming-suite/web/browser /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



# npx nx run farming-suite-web:build
# ~/02-Dossier_Cooperl_Infra/EXPLOITATION-CSUITE-V2/prepa/poc-csuite-v2/poc-csuite-v3/dist/projects/farming-suite/web/browser



# FROM nginx:stable-alpine

# # Configuration nginx
# RUN rm /etc/nginx/conf.d/default.conf
# COPY <<EOF /etc/nginx/conf.d/default.conf
# server {
#     listen 80;
#     server_name localhost;
#     root /usr/share/nginx/html;
#     index index.html;

#     # Support du HTML5 History Mode
#     location / {
#         try_files \$uri \$uri/ /index.html;
#     }
# }
# EOF

# # Copier les fichiers de l'application
# COPY dist/projects/farming-suite/web/browser /usr/share/nginx/html/

# # Configurer l'authentification
# COPY <<EOF /usr/share/nginx/html/authentication.manifest.json
# {
#   "apiBaseUrl": "/restapi",
#   "keycloak": {
#     "config": {
#       "url": "http://host.docker.internal:8088",
#       "realm": "farming-solution-suite",
#       "clientId": "frontend"
#     },
#     "initOptions": {
#       "onLoad": "login-required",
#       "checkLoginIframe": false
#     },
#     "enableBearerInterceptor": true,
#     "bearerPrefix": "Bearer",
#     "bearerExcludedUrls": ["/assets", "/clients/public"]
#   }
# }
# EOF

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# docker compose up -d --build