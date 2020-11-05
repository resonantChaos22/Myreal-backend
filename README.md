# TO RUN

sudo docker-compose up --build

# TO OPEN BASH

docker exec -ti myreal-node-app bash

# TO OPEN DATABASE CLI

docker exec -it myreal-postgres-db psql -U dbuser myreal-db

# Deployment port 4192

While deploying the docker map the host 8080 to container port
