#!/bin/bash

echo What version is this?
read VERSION

docker build -t sebastian2772/airbnb-clone:$VERSION .
docker push sebastian2772/airbnb-clone:$VERSION