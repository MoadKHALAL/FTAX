This repository hosts the Postgres database server wrapped inside a Hasura GraphQL server for the FTax platform.

_"Hasura GraphQL Engine is a blazing-fast GraphQL server that gives you instant, realtime GraphQL APIs over Postgres, with webhook triggers on database events, and remote schemas for business logic."_ Learn more about Hasura [here](https://hasura.io/blog/what-is-hasura-ce3b5c6e80e8/).

# How to run

Study the `.env` file. It lists all the environment variables for our project, which will go into our custom Docker Compose Stack.

Provided you are starting this Docker Compose Stack for the first time, it will create for you the components needed on your Docker Engine; containers, network, volumes of data, initailzation of database from `backup.sql` file.

```
// this will start your stack in detached mode
docker compose up -d
```

If this is not your first time running this stack on your machine, such that a volume for this Docker stack already exists on your machine, `backup.sql` data will NOT be used to initialize. This way allows your changes to persist.

Note: For first time running, make sure that `backup.sql` file in your Text Editor is encoded to UTF-8. Or else there will be errors in DB setup.

# Backup for PostgreSQL

Backup process for Database is manual, for now.

```
// Backup schema only
docker exec -t ftax-db-server-postgres-1 pg_dumpall --clean -s -U postgres > backup.sql

```

# Restoring PostgreSQL

## Manually

- If exists, remove the previous container and volume from your host machine
- Spin up a new container from `docker-compose.yml` using:
  ```
  docker compose up -d
  ```

- Perform a hard restore (forcefull; if error occurs, statements still get executed if coming from superuser `postgres`) of PostgreSQL service from the dump file `backup.sql`:
  ```
  cat .\backup.sql | docker exec -i ftax-db-server-postgres-1 psql -v ON_ERROR_ROLLBACK=on -U postgres
  ```

- Go to Hasura and check
