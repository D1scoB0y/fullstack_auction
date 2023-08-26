CREATE USER auction_admin;
CREATE DATABASE test_auction_db;
ALTER USER auction_admin WITH PASSWORD 'zelel228';
GRANT ALL PRIVILEGES ON DATABASE test_auction_db TO auction_admin;
