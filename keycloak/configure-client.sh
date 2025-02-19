#!/bin/bash

KEYCLOAK_URL="http://localhost:8080"
REALM="fss-realm"
USERNAME="admin"
PASSWORD="admin"
CLIENT_ID="mservice"
KEYSTORE_PATH="/opt/keycloak/data/import/keystore.jks"
STORE_PASSWORD="fss"
KEY_ALIAS="fss-client"
KEY_PASSWORD="fss"
KEYSTORE_FORMAT="JKS"

# Obtenir un token d'accès
ACCESS_TOKEN_RESPONSE=$(curl -s --data "client_id=admin-cli" --data "username=$USERNAME" --data "password=$PASSWORD" --data "grant_type=password" "$KEYCLOAK_URL/realms/master/protocol/openid-connect/token")

# Obtenir le token d'accès réel
ACCESS_TOKEN=$(echo $ACCESS_TOKEN_RESPONSE | jq -r '.access_token')

if [ -z "$ACCESS_TOKEN" ]; then
  echo "Failed to obtain access token"
  exit 1
fi

# Vérifier si le client est déjà configuré
CLIENT_RESPONSE=$(curl -s -X GET "$KEYCLOAK_URL/admin/realms/$REALM/clients?clientId=$CLIENT_ID" -H "Authorization: Bearer $ACCESS_TOKEN")

# Obtenir l'ID du client
CLIENT_ID=$(echo $CLIENT_RESPONSE | jq -r '.[0].id')

if [ -z "$CLIENT_ID" ]; then
  echo "Client ID not found"
  exit 1
fi

# Envoyer le fichier JKS au client
UPLOAD_CERTIFICATE_URL="$KEYCLOAK_URL/admin/realms/$REALM/clients/$CLIENT_ID/certificates/jwt.credential/upload-certificate"

curl -v -X POST "$UPLOAD_CERTIFICATE_URL" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "keystoreFormat=$KEYSTORE_FORMAT" \
  -F "keyAlias=$KEY_ALIAS" \
  -F "storePassword=$STORE_PASSWORD" \
  -F "keyPassword=$KEY_PASSWORD" \
  -F "file=@$KEYSTORE_PATH;type=application/octet-stream"
