DROP DATABASE IF EXISTS supersearch;
CREATE DATABASE supersearch;
\c supersearch;

--  
-- TABLE SECTION BELOW 1.0
--

--
-- Table structure for table users
--
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  ID serial NOT NULL,
  username text NOT NULL default '',
  screenname text NOT NULL default '',
  password text NOT NULL default '',
  zipcode text NOT NULL default '',
  PRIMARY KEY  (ID)
);

--
-- Table structure for movies
--
DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
  name text NOT NULL default '',
  theater text NOT NULL default '',
  address text NOT NULL default '',
  city text NOT NULL default '',
  zip text NOT NULL default ''
);

--
-- Table structure for restaurants
--
DROP TABLE IF EXISTS restaurants;
CREATE TABLE restaurants (
  restaurant_id serial primary key,
  name text NOT NULL default '',
  address text NOT NULL default '',
  city text NOT NULL default '',
  zip text NOT NULL default ''
);

--
-- Table structure for restaurant types
--
DROP TABLE IF EXISTS types;
CREATE TABLE types (
	type_id serial primary key,
	name text NOT NULL default ''
);

--
-- Table structure for restaurant-to-type junction
--
DROP TABLE IF EXISTS restaurantTypes;
create table restaurantTypes (
		restaurant_id serial,
		type_id serial 
);

--  
-- DATA SECTION BELOW 2.0
--

--
-- Insert movie information
--
INSERT INTO movies (name, theater, address, city, zip) VALUES
('Nobody''s Watching', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', '22401'),
('It', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', '22401'),
('The Limehouse Golem', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', '22401'),
('Despicable Me 3', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', '22401'),
('Wonder Woman', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', '22401'),
('The Emoji Movie', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', '22401'),
('Year By The Sea', 'Marquee Cinemas Southpoint 9', '5800 South Point Centre', 'Fredericksburg',  '22401'),
('Rememory', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', '88005'),
('Wonder Woman', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', '88005'),
('Dunkirk', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', '88005'),
('Anti Matter', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', '88005');

--
-- Insert restaurant information
--
INSERT INTO restaurants (name, address, city, zip) VALUES
('Hyperion Espresso', '301 William St.',  'Fredericksburg', '22401'),
('Starbucks' , '2001 Plank Road', 'Fredericksburg', '22401'),
('25 30 Expresso' , '400 Princess Anne St', 'Fredericksburg', '22401'),
('Agora Downtown' , '520 Caroline St', 'Fredericksburg', '22401'),
('Highpoint Coffee' , '615 Caroline St', 'Fredericksburg', '22401'),
('Duck Donuts' , '1223 Jefferson Davis Hwy', 'Fredericksburg', '22401'),
('Basilico' , '2577 Cowan Blvd', 'Fredericksburg',  '22401'),
('Cork and Table' , '909 Caroline', 'Fredericksburg',  '22401'),
('Orofino' , '1251 Carl D Silver Parkway', 'Fredericksburg',  '22401'),
('Pancho Villa Mexican Rest' , '10500 Spotsylvania Ave', 'Fredericksburg', '22401'),
('Chipotle' , '5955 Kingstowne', 'Fredericksburg', '22401'),
('Sedona Taphouse' , '591 Williams', 'Fredericksburg', '22401'),
('Pueblo''s Tex Mex Grill'  , '1320 Jefferson Davis Hwy', 'Fredericksburg', '22401'),
('El Pino' , '4211 Plank Road', 'Fredericksburg', '22401'),
('Starbucks' , '2808 Telshor Blvd', 'Las Cruces', '88005'),
('Starbucks' , '2511 Lohman Ave', 'Las Cruces', '88005'),
('Milagro Coffee Y Espresso' , '1733 E. University Ave', 'Las Cruces', '88005'),
('Starbucks' , '1500 South Valley',  'Las Cruces', '88005'),
('Bean' , '2011 Avenida De Mesilla',  'Las Cruces', '88005'),
('El Comedor' , '2190 Avenida De  Mesilla', 'Las Cruces', '88005'),
('Los Compas' , '603 S Nevarez St.',  'Las Cruces', '88005'),
('La Fuente' , '1710 S Espina',  'Las Cruces', '88005'),
('La Posta' , '2410 Calle De San Albino',  'Las Cruces', '88005'),
('El Jacalito' , '2215 Missouri Ave',  'Las Cruces', '88005'),
('Peet''s' , '2260 Locust',  'Las Cruces', '88005');

--
-- Insert types of restaurants
--
INSERT INTO types (name) values
('Coffee'),('Italian'),('American'),
('Mexican Restaurant'),('Bakery'),('Donuts');

--
-- Insert into junction table for types of restaurants. MANY-TO-MANY
--
INSERT INTO restaurantTypes (restaurant_id, type_id) VALUES
(1,1),(1,5),(2,1),(2,5),(3,1),(4,1),(4,5),
(5,1),(6,6),(6,1),(7,2),(8,2),(9,2),(10,4),
(11,4),(12,3),(13,4),(14,4),(15,1),(15,5),
(16,1),(16,5),(17,1),(18,1),(18,5),(19,1),
(20,4),(21,4),(22,4),(23,4),(24,4),(25,1);
