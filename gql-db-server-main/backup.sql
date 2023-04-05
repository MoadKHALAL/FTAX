--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--





--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:nOXPmkxbItYAwXL/BQrnRA==$se0/5gSb/aZfUfON7hA+InO6vU9+kNfSy5+gT3Zpv48=:lPON1RIwPhtaWLMCq5ezSzf1pTtrb3Z78s3sun8Ez4c=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: hdb_catalog; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hdb_catalog;


ALTER SCHEMA hdb_catalog OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: gen_hasura_uuid(); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.gen_hasura_uuid() RETURNS uuid
    LANGUAGE sql
    AS $$select gen_random_uuid()$$;


ALTER FUNCTION hdb_catalog.gen_hasura_uuid() OWNER TO postgres;

--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$







DECLARE







  _new record;







BEGIN







  _new := NEW;







  _new."updated_at" = NOW();







  RETURN _new;







END;







$$;


ALTER FUNCTION public.set_current_timestamp_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hdb_action_log; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_action_log (
    id uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    action_name text,
    input_payload jsonb NOT NULL,
    request_headers jsonb NOT NULL,
    session_variables jsonb NOT NULL,
    response_payload jsonb,
    errors jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    response_received_at timestamp with time zone,
    status text NOT NULL,
    CONSTRAINT hdb_action_log_status_check CHECK ((status = ANY (ARRAY['created'::text, 'processing'::text, 'completed'::text, 'error'::text])))
);


ALTER TABLE hdb_catalog.hdb_action_log OWNER TO postgres;

--
-- Name: hdb_cron_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_cron_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_cron_event_invocation_logs OWNER TO postgres;

--
-- Name: hdb_cron_events; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_cron_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    trigger_name text NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_cron_events OWNER TO postgres;

--
-- Name: hdb_metadata; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_metadata (
    id integer NOT NULL,
    metadata json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL
);


ALTER TABLE hdb_catalog.hdb_metadata OWNER TO postgres;

--
-- Name: hdb_scheduled_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_scheduled_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_scheduled_event_invocation_logs OWNER TO postgres;

--
-- Name: hdb_scheduled_events; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_scheduled_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    webhook_conf json NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    retry_conf json,
    payload json,
    header_conf json,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    comment text,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_scheduled_events OWNER TO postgres;

--
-- Name: hdb_schema_notifications; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_schema_notifications (
    id integer NOT NULL,
    notification json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL,
    instance_id uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT hdb_schema_notifications_id_check CHECK ((id = 1))
);


ALTER TABLE hdb_catalog.hdb_schema_notifications OWNER TO postgres;

--
-- Name: hdb_version; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_version (
    hasura_uuid uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    version text NOT NULL,
    upgraded_on timestamp with time zone NOT NULL,
    cli_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    console_state jsonb DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE hdb_catalog.hdb_version OWNER TO postgres;

--
-- Name: business_expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business_expenses (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    tax_records_id uuid NOT NULL,
    "formData" jsonb
);


ALTER TABLE public.business_expenses OWNER TO postgres;

--
-- Name: employment_expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employment_expenses (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    tax_records_id uuid NOT NULL,
    "formData" jsonb
);


ALTER TABLE public.employment_expenses OWNER TO postgres;

--
-- Name: motor_vehicle_expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.motor_vehicle_expenses (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    tax_records_id uuid NOT NULL,
    "formData" jsonb
);


ALTER TABLE public.motor_vehicle_expenses OWNER TO postgres;

--
-- Name: moving_expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.moving_expenses (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    tax_records_id uuid NOT NULL,
    "formData" jsonb
);


ALTER TABLE public.moving_expenses OWNER TO postgres;

--
-- Name: personal_information; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_information (
    first_name text NOT NULL,
    last_name text NOT NULL,
    gender text NOT NULL,
    date_of_birth text NOT NULL,
    social_insurrance_number text NOT NULL,
    telephone text NOT NULL,
    city text NOT NULL,
    postal_code text NOT NULL,
    province_or_territory text NOT NULL,
    country text DEFAULT 'Canada'::text NOT NULL,
    address text NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    verified boolean DEFAULT false NOT NULL
);


ALTER TABLE public.personal_information OWNER TO postgres;

--
-- Name: rental_expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rental_expenses (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    tax_records_id uuid NOT NULL,
    "formData" jsonb
);


ALTER TABLE public.rental_expenses OWNER TO postgres;

--
-- Name: tax_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tax_records (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    year text NOT NULL,
    user_id uuid NOT NULL,
    submitted boolean DEFAULT false NOT NULL,
    has_business_expenses boolean DEFAULT false NOT NULL,
    has_rental_expenses boolean DEFAULT false NOT NULL,
    status text DEFAULT 'Pending'::text NOT NULL,
    has_employment_expenses boolean DEFAULT false NOT NULL,
    has_motor_vehicle_expenses boolean DEFAULT false NOT NULL,
    has_moving_expenses boolean DEFAULT false NOT NULL
);


ALTER TABLE public.tax_records OWNER TO postgres;

--
-- Name: TABLE tax_records; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tax_records IS 'Tax Data';


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.users IS 'User Profiles';


--
-- Data for Name: hdb_action_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_action_log (id, action_name, input_payload, request_headers, session_variables, response_payload, errors, created_at, response_received_at, status) FROM stdin;
\.


--
-- Data for Name: hdb_cron_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_cron_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_cron_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_cron_events (id, trigger_name, scheduled_time, status, tries, created_at, next_retry_at) FROM stdin;
\.


--
-- Data for Name: hdb_metadata; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_metadata (id, metadata, resource_version) FROM stdin;
1	{"custom_types":{"objects":[{"name":"LoginUserOutput","fields":[{"name":"access_token","type":"String"},{"name":"id","type":"String"},{"name":"email","type":"String"},{"name":"first_name","type":"String"},{"name":"last_name","type":"String"}]},{"name":"SignupUserOutput","fields":[{"name":"email","type":"String"},{"name":"first_name","type":"String"},{"name":"id","type":"String"},{"name":"access_token","type":"String"},{"name":"last_name","type":"String"}]},{"name":"TaxSubmissionOutput","fields":[{"name":"id","type":"String"},{"name":"user_id","type":"String"},{"name":"submitted","type":"Boolean"},{"name":"year","type":"String"}]}]},"actions":[{"definition":{"output_type":"LoginUserOutput","arguments":[{"name":"email","type":"String!"},{"name":"password","type":"String!"}],"handler":"{{HASURA_ACTION_BASE_URL}}/auth/loginUser","type":"query"},"name":"loginUser","permissions":[{"role":"anonymous"}]},{"definition":{"kind":"synchronous","output_type":"SignupUserOutput","arguments":[{"name":"email","type":"String!"},{"name":"password","type":"String!"},{"name":"first_name","type":"String!"},{"name":"last_name","type":"String!"},{"name":"gender","type":"String!"},{"name":"date_of_birth","type":"String!"},{"name":"social_insurrance_number","type":"String!"},{"name":"telephone","type":"String!"},{"name":"city","type":"String!"},{"name":"postal_code","type":"String!"},{"name":"province_or_territory","type":"String!"},{"name":"country","type":"String!"},{"name":"address","type":"String!"}],"handler":"{{HASURA_ACTION_BASE_URL}}/auth/signupUser","type":"mutation"},"name":"signupUser","permissions":[{"role":"anonymous"}]},{"definition":{"kind":"synchronous","output_type":"TaxSubmissionOutput","arguments":[{"name":"tax_records_id","type":"String!"}],"handler":"{{HASURA_ACTION_BASE_URL}}/tax/submit","type":"mutation"},"name":"updateTaxSubmission","permissions":[{"role":"user"}]}],"sources":[{"kind":"postgres","name":"ftax-postgres-db","tables":[{"select_permissions":[{"role":"user","permission":{"columns":["formData","id","tax_records_id"],"filter":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}}}}],"object_relationships":[{"using":{"foreign_key_constraint_on":"tax_records_id"},"name":"tax_record"}],"insert_permissions":[{"role":"user","permission":{"backend_only":false,"check":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}},"columns":["formData"]}}],"table":{"schema":"public","name":"business_expenses"},"update_permissions":[{"role":"user","permission":{"check":null,"columns":["formData"],"filter":{"tax_record":{"_and":[{"user":{"id":{"_eq":"X-Hasura-User-Id"}}},{"_not":{"submitted":{"_eq":true}}}]}}}}]},{"select_permissions":[{"role":"user","permission":{"columns":["formData","id","tax_records_id"],"filter":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}}}}],"object_relationships":[{"using":{"foreign_key_constraint_on":"tax_records_id"},"name":"tax_record"}],"insert_permissions":[{"role":"user","permission":{"backend_only":false,"check":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}},"columns":["formData"]}}],"table":{"schema":"public","name":"employment_expenses"},"update_permissions":[{"role":"user","permission":{"check":null,"columns":["formData"],"filter":{"tax_record":{"_and":[{"user":{"id":{"_eq":"X-Hasura-User-Id"}}},{"_not":{"submitted":{"_eq":true}}}]}}}}]},{"select_permissions":[{"role":"user","permission":{"columns":["formData","id","tax_records_id"],"filter":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}}}}],"object_relationships":[{"using":{"foreign_key_constraint_on":"tax_records_id"},"name":"tax_record"}],"insert_permissions":[{"role":"user","permission":{"backend_only":false,"check":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}},"columns":["formData"]}}],"table":{"schema":"public","name":"motor_vehicle_expenses"},"update_permissions":[{"role":"user","permission":{"check":null,"columns":["formData"],"filter":{"tax_record":{"_and":[{"user":{"id":{"_eq":"X-Hasura-User-Id"}}},{"_not":{"submitted":{"_eq":true}}}]}}}}]},{"select_permissions":[{"role":"user","permission":{"columns":["formData","id","tax_records_id"],"filter":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}}}}],"object_relationships":[{"using":{"foreign_key_constraint_on":"tax_records_id"},"name":"tax_record"}],"insert_permissions":[{"role":"user","permission":{"backend_only":false,"check":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}},"columns":["formData"]}}],"table":{"schema":"public","name":"moving_expenses"},"update_permissions":[{"role":"user","permission":{"check":null,"columns":["formData"],"filter":{"tax_record":{"_and":[{"user":{"id":{"_eq":"X-Hasura-User-Id"}}},{"_not":{"submitted":{"_eq":true}}}]}}}}]},{"select_permissions":[{"role":"user","permission":{"columns":["address","city","country","date_of_birth","first_name","gender","id","last_name","postal_code","province_or_territory","social_insurrance_number","telephone","user_id"],"filter":{"user_id":{"_eq":"X-Hasura-User-Id"}}}}],"object_relationships":[{"using":{"foreign_key_constraint_on":"user_id"},"name":"user"}],"table":{"schema":"public","name":"personal_information"},"update_permissions":[{"role":"user","permission":{"check":null,"columns":["address","city","first_name","gender","last_name","postal_code","province_or_territory","telephone"],"filter":{"user_id":{"_eq":"X-Hasura-User-Id"}}}}]},{"select_permissions":[{"role":"user","permission":{"columns":["formData","id","tax_records_id"],"filter":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}}}}],"object_relationships":[{"using":{"foreign_key_constraint_on":"tax_records_id"},"name":"tax_record"}],"insert_permissions":[{"role":"user","permission":{"backend_only":false,"check":{"tax_record":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}},"columns":["formData"]}}],"table":{"schema":"public","name":"rental_expenses"},"update_permissions":[{"role":"user","permission":{"check":null,"columns":["formData"],"filter":{"tax_record":{"_and":[{"user":{"id":{"_eq":"X-Hasura-User-Id"}}},{"_not":{"submitted":{"_eq":true}}}]}}}}]},{"select_permissions":[{"role":"user","permission":{"columns":["has_business_expenses","has_employment_expenses","has_motor_vehicle_expenses","has_moving_expenses","has_rental_expenses","id","status","submitted","user_id","year"],"filter":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}}}],"object_relationships":[{"using":{"foreign_key_constraint_on":{"column":"tax_records_id","table":{"schema":"public","name":"business_expenses"}}},"name":"business_expenses"},{"using":{"foreign_key_constraint_on":{"column":"tax_records_id","table":{"schema":"public","name":"employment_expenses"}}},"name":"employment_expenses"},{"using":{"foreign_key_constraint_on":{"column":"tax_records_id","table":{"schema":"public","name":"motor_vehicle_expenses"}}},"name":"motor_vehicle_expenses"},{"using":{"foreign_key_constraint_on":{"column":"tax_records_id","table":{"schema":"public","name":"moving_expenses"}}},"name":"moving_expenses"},{"using":{"foreign_key_constraint_on":{"column":"tax_records_id","table":{"schema":"public","name":"rental_expenses"}}},"name":"rental_expenses"},{"using":{"foreign_key_constraint_on":"user_id"},"name":"user"}],"insert_permissions":[{"role":"user","permission":{"backend_only":false,"check":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}},"columns":["has_business_expenses","has_employment_expenses","has_motor_vehicle_expenses","has_moving_expenses","has_rental_expenses","submitted","user_id","year"]}}],"table":{"schema":"public","name":"tax_records"},"update_permissions":[{"role":"user","permission":{"check":null,"columns":["has_business_expenses","has_employment_expenses","has_motor_vehicle_expenses","has_moving_expenses","has_rental_expenses","submitted"],"filter":{"user":{"id":{"_eq":"X-Hasura-User-Id"}}}}}]},{"select_permissions":[{"role":"user","permission":{"columns":["email","first_name","last_name","password_hash","created_at","updated_at","id"],"filter":{"id":{"_eq":"X-Hasura-User-Id"}}}}],"object_relationships":[{"using":{"foreign_key_constraint_on":{"column":"user_id","table":{"schema":"public","name":"personal_information"}}},"name":"personal_information"}],"table":{"schema":"public","name":"users"},"update_permissions":[{"role":"user","permission":{"check":null,"columns":["email","first_name","last_name","password_hash"],"filter":{"id":{"_eq":"X-Hasura-User-Id"}}}}],"array_relationships":[{"using":{"foreign_key_constraint_on":{"column":"user_id","table":{"schema":"public","name":"tax_records"}}},"name":"tax_records"}]}],"configuration":{"connection_info":{"use_prepared_statements":false,"database_url":{"from_env":"HASURA_GRAPHQL_DATABASE_URL"},"isolation_level":"read-committed"}}}],"version":3}	26
\.


--
-- Data for Name: hdb_scheduled_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_scheduled_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_scheduled_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_scheduled_events (id, webhook_conf, scheduled_time, retry_conf, payload, header_conf, status, tries, created_at, next_retry_at, comment) FROM stdin;
\.


--
-- Data for Name: hdb_schema_notifications; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_schema_notifications (id, notification, resource_version, instance_id, updated_at) FROM stdin;
1	{"metadata":false,"remote_schemas":[],"sources":[]}	26	62df32e8-3bfb-4ecf-b7e1-0fd1626eb668	2022-04-24 10:13:02.42818+00
\.


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state) FROM stdin;
aaa4ed82-f31e-49a9-b94b-f0ae53d3a66e	47	2022-04-24 10:12:26.123362+00	{}	{"console_notifications": {"admin": {"date": "2022-05-18T16:44:05.861Z", "read": "default", "showBadge": false}}, "telemetryNotificationShown": true}
\.


--
-- Data for Name: business_expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.business_expenses (id, tax_records_id, "formData") FROM stdin;
061fa999-c16b-4e93-b20b-e7f67d1aadaa	63ebd538-58cc-4404-8cc1-1f9d8d79a238	\N
bb55610f-dc5f-4041-97c1-55a715fa8c8a	4130633e-f56d-444c-9bc4-266d56d1e097	{"name": "Test Business", "address": "Test Address for Business", "insurance": "", "purchases": "", "date_began": "Wed Apr 06 2022", "date_ended": "Thu Apr 21 2022", "gst_number": "", "advertising": "", "prepare_gst": "Yes", "closing_inventory": "", "opening_inventory": "", "ownership_percent": "", "product_or_service": "", "sales_commission_fees": "", "additional_info_or_comments": ""}
\.


--
-- Data for Name: employment_expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employment_expenses (id, tax_records_id, "formData") FROM stdin;
640c9558-3867-42d3-8656-819bf2e4f080	63ebd538-58cc-4404-8cc1-1f9d8d79a238	\N
f875b4c4-12a3-4e59-9887-5addfb789d9a	4130633e-f56d-444c-9bc4-266d56d1e097	\N
\.


--
-- Data for Name: motor_vehicle_expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.motor_vehicle_expenses (id, tax_records_id, "formData") FROM stdin;
c5866ae2-f87f-467d-a176-b655a985de40	63ebd538-58cc-4404-8cc1-1f9d8d79a238	\N
b570a3b4-5680-4153-ac77-b60726dd1cdd	4130633e-f56d-444c-9bc4-266d56d1e097	\N
\.


--
-- Data for Name: moving_expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.moving_expenses (id, tax_records_id, "formData") FROM stdin;
efd92bd3-87de-41f6-af9a-c37e53b5b051	63ebd538-58cc-4404-8cc1-1f9d8d79a238	\N
7c4c9792-83f3-40db-b980-1ab07f6b1c3c	4130633e-f56d-444c-9bc4-266d56d1e097	\N
\.


--
-- Data for Name: personal_information; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_information (first_name, last_name, gender, date_of_birth, social_insurrance_number, telephone, city, postal_code, province_or_territory, country, address, id, user_id, verified) FROM stdin;
Test	User	Male	Mon Apr 04 2022	887 899 787	(+1) 454 546 4646	Vancouver	s1s 1s1	British Columbia	Canada	Test Apartment	e8abaa42-1205-4097-a049-cbfcf8a2777e	2f536c57-96e9-46a0-aab2-3aa3ddb912a9	f
\.


--
-- Data for Name: rental_expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rental_expenses (id, tax_records_id, "formData") FROM stdin;
9bc776ab-892a-4074-9e5c-cbb0a33698ad	63ebd538-58cc-4404-8cc1-1f9d8d79a238	\N
9a94a569-f9cc-4a4a-9067-26c26df4cfa9	4130633e-f56d-444c-9bc4-266d56d1e097	\N
\.


--
-- Data for Name: tax_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tax_records (id, year, user_id, submitted, has_business_expenses, has_rental_expenses, status, has_employment_expenses, has_motor_vehicle_expenses, has_moving_expenses) FROM stdin;
63ebd538-58cc-4404-8cc1-1f9d8d79a238	2021	2f536c57-96e9-46a0-aab2-3aa3ddb912a9	f	f	f	Pending	f	f	f
4130633e-f56d-444c-9bc4-266d56d1e097	2020	2f536c57-96e9-46a0-aab2-3aa3ddb912a9	t	t	f	Pending	f	f	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, created_at, updated_at, email, password_hash, deleted) FROM stdin;
2f536c57-96e9-46a0-aab2-3aa3ddb912a9	Test	User	2022-04-23 21:28:30.820399+00	2022-05-18 16:46:42.223805+00	test@example.com	12345678	f
\.


--
-- Name: hdb_action_log hdb_action_log_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_action_log
    ADD CONSTRAINT hdb_action_log_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_events hdb_cron_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_events
    ADD CONSTRAINT hdb_cron_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_resource_version_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_resource_version_key UNIQUE (resource_version);


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_scheduled_events hdb_scheduled_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_events
    ADD CONSTRAINT hdb_scheduled_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_schema_notifications hdb_schema_notifications_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_schema_notifications
    ADD CONSTRAINT hdb_schema_notifications_pkey PRIMARY KEY (id);


--
-- Name: hdb_version hdb_version_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_version
    ADD CONSTRAINT hdb_version_pkey PRIMARY KEY (hasura_uuid);


--
-- Name: business_expenses business_expenses_tax_records_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_expenses
    ADD CONSTRAINT business_expenses_tax_records_id_key UNIQUE (tax_records_id);


--
-- Name: business_expenses business_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_expenses
    ADD CONSTRAINT business_pkey PRIMARY KEY (id);


--
-- Name: employment_expenses employment_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employment_expenses
    ADD CONSTRAINT employment_expenses_pkey PRIMARY KEY (id);


--
-- Name: employment_expenses employment_expenses_tax_records_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employment_expenses
    ADD CONSTRAINT employment_expenses_tax_records_id_key UNIQUE (tax_records_id);


--
-- Name: motor_vehicle_expenses motor_vehicle_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motor_vehicle_expenses
    ADD CONSTRAINT motor_vehicle_expenses_pkey PRIMARY KEY (id);


--
-- Name: motor_vehicle_expenses motor_vehicle_expenses_tax_records_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motor_vehicle_expenses
    ADD CONSTRAINT motor_vehicle_expenses_tax_records_id_key UNIQUE (tax_records_id);


--
-- Name: moving_expenses moving_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moving_expenses
    ADD CONSTRAINT moving_expenses_pkey PRIMARY KEY (id);


--
-- Name: moving_expenses moving_expenses_tax_records_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moving_expenses
    ADD CONSTRAINT moving_expenses_tax_records_id_key UNIQUE (tax_records_id);


--
-- Name: personal_information personal_information_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_information
    ADD CONSTRAINT personal_information_pkey PRIMARY KEY (id);


--
-- Name: personal_information personal_information_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_information
    ADD CONSTRAINT personal_information_user_id_key UNIQUE (user_id);


--
-- Name: rental_expenses rental_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_expenses
    ADD CONSTRAINT rental_expenses_pkey PRIMARY KEY (id);


--
-- Name: rental_expenses rental_expenses_tax_records_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_expenses
    ADD CONSTRAINT rental_expenses_tax_records_id_key UNIQUE (tax_records_id);


--
-- Name: tax_records tax_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tax_records
    ADD CONSTRAINT tax_records_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_event_id; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_cron_event_invocation_event_id ON hdb_catalog.hdb_cron_event_invocation_logs USING btree (event_id);


--
-- Name: hdb_cron_event_status; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_cron_event_status ON hdb_catalog.hdb_cron_events USING btree (status);


--
-- Name: hdb_cron_events_unique_scheduled; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_cron_events_unique_scheduled ON hdb_catalog.hdb_cron_events USING btree (trigger_name, scheduled_time) WHERE (status = 'scheduled'::text);


--
-- Name: hdb_scheduled_event_status; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_scheduled_event_status ON hdb_catalog.hdb_scheduled_events USING btree (status);


--
-- Name: hdb_version_one_row; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_version_one_row ON hdb_catalog.hdb_version USING btree (((version IS NOT NULL)));


--
-- Name: users set_public_users_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_users_updated_at ON users; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_cron_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_scheduled_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: business_expenses business_expenses_tax_records_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_expenses
    ADD CONSTRAINT business_expenses_tax_records_id_fkey FOREIGN KEY (tax_records_id) REFERENCES public.tax_records(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: employment_expenses employment_expenses_tax_records_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employment_expenses
    ADD CONSTRAINT employment_expenses_tax_records_id_fkey FOREIGN KEY (tax_records_id) REFERENCES public.tax_records(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: motor_vehicle_expenses motor_vehicle_expenses_tax_records_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motor_vehicle_expenses
    ADD CONSTRAINT motor_vehicle_expenses_tax_records_id_fkey FOREIGN KEY (tax_records_id) REFERENCES public.tax_records(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: moving_expenses moving_expenses_tax_records_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moving_expenses
    ADD CONSTRAINT moving_expenses_tax_records_id_fkey FOREIGN KEY (tax_records_id) REFERENCES public.tax_records(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: personal_information personal_information_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_information
    ADD CONSTRAINT personal_information_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: rental_expenses rental_expenses_tax_records_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_expenses
    ADD CONSTRAINT rental_expenses_tax_records_id_fkey FOREIGN KEY (tax_records_id) REFERENCES public.tax_records(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: tax_records tax_records_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tax_records
    ADD CONSTRAINT tax_records_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

