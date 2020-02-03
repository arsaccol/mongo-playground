#!/bin/sh

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"buga@bugabuga.org","name":"Buga da Silva","username":"buga","password":"bugabugapwd"}' \
  http://localhost:3000/api/signup
