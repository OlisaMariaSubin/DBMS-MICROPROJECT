create table Users(
user_id int  primary key,
name varchar(10) not null,
email varchar(10) not null,
password  varchar(10) not null,
phono number not null
);

create table Parking_lot(
spot_id int primary key,
lot_id int not null,
spot_no int not null,
vehicle_type varchar(10) not null,
is_occupied boolean not null
);


create table bookings(
booking_id int primary key,
user_id int not null,
spot_id int not null,
booking_time varchar(10) not null,
start_time varchar(10) not null,
end_time varchar(10) not null
);


create table spot(
    
)