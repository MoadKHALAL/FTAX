#!/bin/bash

psql -v ON_ERROR_ROLLBACK=on -U "$POSTGRES_USER" -f /restore/backup.sql 