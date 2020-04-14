DROP DATABASE IF EXISTS supersearch;
CREATE DATABASE supersearch;
\c supersearch;

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
-- Dumping data for table City
--
-- ORDER BY:  ID