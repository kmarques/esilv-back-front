# Commands

## Docker compose

To start the Docker containers, run the following command in the terminal:
```bash
docker compose up
```

To run a single service to only execute a single command, use the following command:
```bash
docker compose run --rm <service_name>
```

To execute a command in a running container, use the following command:
```bash
docker compose exec <service_name> <command>
```