#!/bin/bash

echo What version is this?
read VERSION
echo Input AWS Account Id
read ID

docker build -t sebastian2772/airbnb-clone:$VERSION .
docker tag sebastian2772/airbnb-clone:$VERSION $ID.dkr.ecr.us-east-1.amazonaws.com/api:latest
docker push $ID.dkr.ecr.us-east-1.amazonaws.com/api:latest