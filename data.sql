--
-- PostgreSQL database dump
--

\restrict yzBGA63mQj2ytNrEnTbY712DxCZjSPCCuamHcL58BTAiklfe1T7tygmhbxFVsA0

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

--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (admin_id, username, password, role) FROM stdin;
1	admin1	hashedadminpass1	superadmin
2	manager1	hashedadminpass2	manager
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
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, email, password, phone_number) FROM stdin;
1	Alice Johnson	alice@example.com	hashedpass1	9876543210
2	Bob Smith	bob@example.com	hashedpass2	9123456780
3	Charlie Davis	charlie@example.com	hashedpass3	9988776655
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
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (payment_id, booking_id, amount, method, status, payment_date) FROM stdin;
1	1	100.00	UPI	Success	2025-10-03 20:24:25.00911+05:30
2	2	50.00	CreditCard	Pending	2025-10-03 20:24:25.00911+05:30
3	3	80.00	Cash	Failed	2025-10-03 20:24:25.00911+05:30
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
-- PostgreSQL database dump complete
--

\unrestrict yzBGA63mQj2ytNrEnTbY712DxCZjSPCCuamHcL58BTAiklfe1T7tygmhbxFVsA0

