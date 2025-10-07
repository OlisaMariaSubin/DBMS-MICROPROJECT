-- Booking availability logic for SeamlessSpot (PostgreSQL)

-- Optional: Add fee_per_hour to spots if not present
-- ALTER TABLE public.parking_spot ADD COLUMN IF NOT EXISTS fee_per_hour NUMERIC(8,2) DEFAULT 0;

-- Helper view: available (unoccupied) spots by lot and vehicle type
CREATE OR REPLACE VIEW public.available_spots AS
SELECT ps.spot_id, ps.lot_id, ps.spot_number, ps.vehicle_type, ps.is_occupied
FROM public.parking_spot ps
WHERE ps.is_occupied = false;

-- Function: on booking insert, mark spot occupied
CREATE OR REPLACE FUNCTION public.fn_mark_spot_occupied()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'Booked' THEN
    UPDATE public.parking_spot SET is_occupied = true WHERE spot_id = NEW.spot_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: after booking insert
DROP TRIGGER IF EXISTS trg_after_booking_insert ON public.bookings;
CREATE TRIGGER trg_after_booking_insert
AFTER INSERT ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.fn_mark_spot_occupied();

-- Function: on booking status update, free spot on cancellation/completion
CREATE OR REPLACE FUNCTION public.fn_free_spot_on_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IN ('Cancelled','Completed') AND OLD.spot_id IS NOT NULL THEN
    UPDATE public.parking_spot SET is_occupied = false WHERE spot_id = OLD.spot_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: after booking update
DROP TRIGGER IF EXISTS trg_after_booking_update ON public.bookings;
CREATE TRIGGER trg_after_booking_update
AFTER UPDATE OF status ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.fn_free_spot_on_status_change();

-- Availability check example query (parameterized):
-- SELECT ps.spot_id
-- FROM public.parking_spot ps
-- JOIN public.parking_lot pl ON pl.lot_id = ps.lot_id
-- WHERE ps.is_occupied = false
--   AND ps.vehicle_type = $1    -- e.g., 'car' or 'bike'
--   AND pl.location ILIKE '%' || $2 || '%'
-- LIMIT 1;


