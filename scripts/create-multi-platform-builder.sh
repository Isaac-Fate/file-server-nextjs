#! /bin/sh

docker buildx create \
  --name multi-platform \
  --use \
  --platform linux/amd64,linux/arm64 \
  --driver docker-container
