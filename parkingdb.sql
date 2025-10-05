--
-- PostgreSQL database dump
--

\restrict LClnQFtpNc1xJSTzxamzLeRFBu35TghZ2nZE5nKcaWm10DTKNVo7OdSFhDhM8jx

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    admin_id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'manager'::character varying
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_admin_id_seq OWNER TO postgres;

--
-- Name: admins_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_admin_id_seq OWNED BY public.admins.admin_id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    user_id integer,
    spot_id integer,
    booking_time timestamp with time zone DEFAULT now(),
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    status character varying(20) DEFAULT 'Booked'::character varying,
    qr_code character varying(100),
    CONSTRAINT bookings_status_check CHECK (((status)::text = ANY ((ARRAY['Booked'::character varying, 'CheckedIn'::character varying, 'Cancelled'::character varying, 'Completed'::character varying])::text[])))
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_booking_id_seq OWNER TO postgres;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- Name: parking_lot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_lot (
    lot_id integer NOT NULL,
    lot_name character varying(150) NOT NULL,
    location text NOT NULL,
    total_spots integer DEFAULT 0 NOT NULL,
    owner_name character varying(100),
    owner_contact character varying(50)
);


ALTER TABLE public.parking_lot OWNER TO postgres;

--
-- Name: parking_lot_lot_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_lot_lot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parking_lot_lot_id_seq OWNER TO postgres;

--
-- Name: parking_lot_lot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_lot_lot_id_seq OWNED BY public.parking_lot.lot_id;


--
-- Name: parking_spot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_spot (
    spot_id integer NOT NULL,
    lot_id integer,
    spot_number character varying(50) NOT NULL,
    vehicle_type character varying(20),
    is_occupied boolean DEFAULT false,
    CONSTRAINT parking_spot_vehicle_type_check CHECK (((vehicle_type)::text = ANY ((ARRAY['car'::character varying, 'bike'::character varying, 'EV'::character varying, 'other'::character varying])::text[])))
);


ALTER TABLE public.parking_spot OWNER TO postgres;

--
-- Name: parking_spot_spot_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_spot_spot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parking_spot_spot_id_seq OWNER TO postgres;

--
-- Name: parking_spot_spot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_spot_spot_id_seq OWNED BY public.parking_spot.spot_id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    booking_id integer,
    amount numeric(10,2) NOT NULL,
    method character varying(30),
    status character varying(20) DEFAULT 'Pending'::character varying,
    payment_date timestamp with time zone DEFAULT now(),
    CONSTRAINT payments_method_check CHECK (((method)::text = ANY ((ARRAY['UPI'::character varying, 'CreditCard'::character varying, 'DebitCard'::character varying, 'Cash'::character varying, 'Other'::character varying])::text[]))),
    CONSTRAINT payments_status_check CHECK (((status)::text = ANY ((ARRAY['Success'::character varying, 'Failed'::character varying, 'Pending'::character varying])::text[])))
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_payment_id_seq OWNER TO postgres;

--
-- Name: payments_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone_number character varying(20)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: admins admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN admin_id SET DEFAULT nextval('public.admins_admin_id_seq'::regclass);


--
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- Name: parking_lot lot_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_lot ALTER COLUMN lot_id SET DEFAULT nextval('public.parking_lot_lot_id_seq'::regclass);


--
-- Name: parking_spot spot_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spot ALTER COLUMN spot_id SET DEFAULT nextval('public.parking_spot_spot_id_seq'::regclass);


--
-- Name: payments payment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (admin_id, username, password, role) FROM stdin;
1	admin1	hashedadminpass1	superadmin
2	manager1	hashedadminpass2	manager
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (booking_id, user_id, spot_id, booking_time, start_time, end_time, status, qr_code) FROM stdin;
1	1	1	2025-10-03 20:23:22.695413+05:30	2025-10-04 09:00:00+05:30	2025-10-04 11:00:00+05:30	Booked	QR12345
2	2	2	2025-10-03 20:23:22.695413+05:30	2025-10-04 10:00:00+05:30	2025-10-04 12:00:00+05:30	CheckedIn	QR67890
3	3	4	2025-10-03 20:23:22.695413+05:30	2025-10-04 14:00:00+05:30	2025-10-04 16:00:00+05:30	Cancelled	QR54321
\.


--
-- Data for Name: parking_lot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking_lot (lot_id, lot_name, location, total_spots, owner_name, owner_contact) FROM stdin;
1	City Center Lot	MG Road, Kochi	50	Mr. Mathew	mathew@parking.com
2	Tech Park Lot	Infopark, Kakkanad	100	Mrs. Priya	priya@parking.com
\.


--
-- Data for Name: parking_spot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking_spot (spot_id, lot_id, spot_number, vehicle_type, is_occupied) FROM stdin;
1	1	A1	car	f
2	1	A2	bike	f
3	1	A3	EV	t
4	2	B1	car	f
5	2	B2	bike	t
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (payment_id, booking_id, amount, method, status, payment_date) FROM stdin;
1	1	100.00	UPI	Success	2025-10-03 20:24:25.00911+05:30
2	2	50.00	CreditCard	Pending	2025-10-03 20:24:25.00911+05:30
3	3	80.00	Cash	Failed	2025-10-03 20:24:25.00911+05:30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, email, password, phone_number) FROM stdin;
1	Alice Johnson	alice@example.com	hashedpass1	9876543210
2	Bob Smith	bob@example.com	hashedpass2	9123456780
3	Charlie Davis	charlie@example.com	hashedpass3	9988776655
\.


--
-- Name: admins_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_admin_id_seq', 2, true);


--
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 3, true);


--
-- Name: parking_lot_lot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_lot_lot_id_seq', 2, true);


--
-- Name: parking_spot_spot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_spot_spot_id_seq', 5, true);


--
-- Name: payments_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_payment_id_seq', 3, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (admin_id);


--
-- Name: admins admins_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- Name: bookings bookings_qr_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_qr_code_key UNIQUE (qr_code);


--
-- Name: parking_lot parking_lot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_lot
    ADD CONSTRAINT parking_lot_pkey PRIMARY KEY (lot_id);


--
-- Name: parking_spot parking_spot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spot
    ADD CONSTRAINT parking_spot_pkey PRIMARY KEY (spot_id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: idx_booking_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_booking_user ON public.bookings USING btree (user_id);


--
-- Name: idx_payment_booking; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_payment_booking ON public.payments USING btree (booking_id);


--
-- Name: idx_spot_lot; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_spot_lot ON public.parking_spot USING btree (lot_id);


--
-- Name: bookings bookings_spot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_spot_id_fkey FOREIGN KEY (spot_id) REFERENCES public.parking_spot(spot_id) ON DELETE CASCADE;


--
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: parking_spot parking_spot_lot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spot
    ADD CONSTRAINT parking_spot_lot_id_fkey FOREIGN KEY (lot_id) REFERENCES public.parking_lot(lot_id) ON DELETE CASCADE;


--
-- Name: payments payments_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(booking_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict LClnQFtpNc1xJSTzxamzLeRFBu35TghZ2nZE5nKcaWm10DTKNVo7OdSFhDhM8jx

