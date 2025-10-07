-- Users and Roles setup for SeamlessSpot

-- Ensure users table has a role column
-- If not present, uncomment the following ALTER statement on your DB:
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role VARCHAR(20) CHECK (role IN ('driver','owner'));

-- Signup insert template (parameterized):
-- INSERT INTO public.users (name, email, password, phone_number, role)
-- VALUES ($1, $2, $3, $4, $5)
-- RETURNING user_id, role;

-- Simple login check (email/password hash check should be implemented in backend):
-- SELECT user_id, role, name FROM public.users WHERE email = $1 AND password = $2;

-- Owner can add parking lots and spots
-- Insert a lot owned by this user (add owner_name/contact or better owner_user_id):
-- ALTER TABLE public.parking_lot ADD COLUMN IF NOT EXISTS owner_user_id INT REFERENCES public.users(user_id) ON DELETE CASCADE;
-- INSERT INTO public.parking_lot (lot_name, location, total_spots, owner_name, owner_contact, owner_user_id)
-- VALUES ($1, $2, $3, $4, $5, $6)
-- RETURNING lot_id;

-- Add spots under a lot
-- INSERT INTO public.parking_spot (lot_id, spot_number, vehicle_type, is_occupied)
-- VALUES ($1, $2, $3, false)
-- RETURNING spot_id;


