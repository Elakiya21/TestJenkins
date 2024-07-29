#!/bin/sh

tag=`git rev-parse --short HEAD`
app_name="goomo-web-client-app"
registry_url="$1"

docker build -t $app_name .
docker tag $app_name $registry_url/$app_name:$tag
docker push $registry_url/$app_name:$tag

echo "\n\nPushed tag: $tag"
echo "\nTo pull: docker pull $registry_url/$app_name:$tag"

