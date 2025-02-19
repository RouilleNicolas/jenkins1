FROM keycloak/keycloak:25.0
WORKDIR /opt/keycloak
COPY realm-export.json /opt/keycloak/data/import/realm-export.json
EXPOSE 8080
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm"]
