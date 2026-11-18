#!/usr/bin/env bash
#
# docker-release.sh
# ---------------------------------------------------------------
# Script parametrizado para build e push da imagem do findtax-mkt-api
# para o GitHub Container Registry (ghcr.io).
#
# Uso:
#   ./scripts/docker-release.sh -v prd-22
#   ./scripts/docker-release.sh --version prd-23 --username rafaelfindtax --token ghp_xxx
#   GHCR_TOKEN=ghp_xxx ./scripts/docker-release.sh -v prd-24
#
# Parâmetros:
#   -v, --version     (obrigatório) Tag da versão, ex: prd-22
#   -u, --username    (opcional)    Username do ghcr.io. Default: rafaelfindtax
#   -t, --token       (opcional)    Token/Password. Default: $GHCR_TOKEN (env)
#   -r, --registry    (opcional)    Registry base. Default: ghcr.io
#   -i, --image       (opcional)    Caminho da imagem. Default: rafaelfindtax/findtax-mkt-api/find-node-api
#   -f, --file        (opcional)    Caminho do Dockerfile. Default: Dockerfile
#       --no-login                  Pula etapa de login
#       --no-push                   Faz apenas o build, sem push
#   -h, --help                      Mostra esta ajuda
# ---------------------------------------------------------------
set -euo pipefail

USERNAME="rafaelfindtax"
TOKEN="${GHCR_TOKEN:-}"
REGISTRY="ghcr.io"
IMAGE_PATH="rafaelfindtax/findtax-mkt-api/find-node-api"
DOCKERFILE="Dockerfile"
VERSION=""
DO_LOGIN=true
DO_PUSH=true

usage() {
  grep '^#' "$0" | sed 's/^#//'
  exit 0
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -v|--version)   VERSION="$2"; shift 2 ;;
    -u|--username)  USERNAME="$2"; shift 2 ;;
    -t|--token)     TOKEN="$2"; shift 2 ;;
    -r|--registry)  REGISTRY="$2"; shift 2 ;;
    -i|--image)     IMAGE_PATH="$2"; shift 2 ;;
    -f|--file)      DOCKERFILE="$2"; shift 2 ;;
    --no-login)     DO_LOGIN=false; shift ;;
    --no-push)      DO_PUSH=false; shift ;;
    -h|--help)      usage ;;
    *)
      echo "Parâmetro desconhecido: $1" >&2
      exit 1
      ;;
  esac
done

if [[ -z "$VERSION" ]]; then
  echo "ERRO: é obrigatório informar a versão com -v/--version (ex: -v prd-22)" >&2
  exit 1
fi

FULL_TAG="${REGISTRY}/${IMAGE_PATH}:${VERSION}"

echo "==========================================================="
echo " findtax-mkt-api — Docker release"
echo "-----------------------------------------------------------"
echo " Registry:   ${REGISTRY}"
echo " Imagem:     ${IMAGE_PATH}"
echo " Versão:     ${VERSION}"
echo " Tag final:  ${FULL_TAG}"
echo " Dockerfile: ${DOCKERFILE}"
echo "==========================================================="

if $DO_LOGIN; then
  if [[ -z "$TOKEN" ]]; then
    echo "ERRO: token não informado. Use -t/--token ou a env var GHCR_TOKEN." >&2
    exit 1
  fi
  echo ">> Fazendo login no ${REGISTRY}..."
  echo "$TOKEN" | docker login --username "$USERNAME" --password-stdin "$REGISTRY"
else
  echo ">> Pulando login (--no-login)"
fi

echo ">> Buildando imagem ${FULL_TAG}..."
docker build -f "$DOCKERFILE" -t "$FULL_TAG" .

if $DO_PUSH; then
  echo ">> Fazendo push de ${FULL_TAG}..."
  docker push "$FULL_TAG"
  echo ">> Push concluído: ${FULL_TAG}"
else
  echo ">> Pulando push (--no-push)"
fi

echo "==========================================================="
echo " Release finalizado com sucesso"
echo "==========================================================="
