#!/bin/sh

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"britbong@loicence.co.uk","name":"Bongheritus McBuga","username":"britbong","password":"winnerwinnerchickensinner"}' \
  http://localhost:3000/users/signup
