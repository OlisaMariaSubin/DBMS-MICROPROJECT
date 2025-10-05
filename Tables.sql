-- ============================
-- USERS (Drivers/Customers)
-- ============================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- hashed password
    phone_number VARCHAR(20)
);

-- ============================
-- PARKING LOTS (with owner details)
-- ============================
CREATE TABLE parking_lot (
    lot_id SERIAL PRIMARY KEY,
    lot_name VARCHAR(150) NOT NULL,
    location TEXT NOT NULL,
    total_spots INT NOT NULL DEFAULT 0,
    owner_name VARCHAR(100),       -- added owner detail
    owner_contact VARCHAR(50)      -- added owner detail
);

-- ============================
-- PARKING SPOTS
-- ============================
CREATE TABLE parking_spot (
    spot_id SERIAL PRIMARY KEY,
    lot_id INT REFERENCES parking_lot(lot_id) ON DELETE CASCADE,
    spot_number VARCHAR(50) NOT NULL,
    vehicle_type VARCHAR(20) CHECK (vehicle_type IN ('car','bike','EV','other')),
    is_occupied BOOLEAN DEFAULT FALSE,
    fee_per_hour NUMERIC(8,2) DEFAULT 0     -- Added parking fee per hour
);


-- ============================
-- BOOKINGS
-- ============================
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    spot_id INT REFERENCES parking_spot(spot_id) ON DELETE CASCADE,
    booking_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Booked','CheckedIn','Cancelled','Completed')) DEFAULT 'Booked',
    qr_code VARCHAR(100) UNIQUE,
    parking_fee NUMERIC(10,2) DEFAULT 0     -- Added total parking fee for this booking
);

-- ============================
-- PAYMENTS
-- ============================
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    method VARCHAR(30) CHECK (method IN ('UPI','CreditCard','DebitCard','Cash','Other')),
    status VARCHAR(20) CHECK (status IN ('Success','Failed','Pending')) DEFAULT 'Pending',
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================
-- ADMINS
-- ============================
CREATE TABLE admins (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- hashed password
    role VARCHAR(50) DEFAULT 'manager'
);

-- ============================
-- USEFUL INDEXES
-- ============================
CREATE INDEX idx_spot_lot ON parking_spot(lot_id);
CREATE INDEX idx_booking_user ON bookings(user_id);
CREATE INDEX idx_payment_booking ON payments(booking_id);
