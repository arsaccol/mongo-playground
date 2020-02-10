#!/bin/sh

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"buga@bugabuga.org","password":"bugabugapwd"}' \
  http://localhost:3000/users/login | json_pp
