docker stack deploy -c ./stack/stack-proxy-registry.yml swarm-lab
docker-compose -f compose-build.yml build
docker-compose -f compose-build.yml push
docker stack deploy -c ./stack/stack-app.yml swarm-lab