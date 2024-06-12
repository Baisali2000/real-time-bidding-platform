# Bidding Platform API

This project is a RESTful API for a real-time bidding platform using Node.js, Express, Socket.io, and MySQL.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Baisali2000/real-time-bidding-platform.git
   cd bidding-platform
2. Create database named bidding_platform then run the queries given below:-

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create items table
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    starting_price DECIMAL(10, 2) NOT NULL,
    current_price DECIMAL(10, 2) DEFAULT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Set current_price default value to starting_price in items table
DELIMITER //
CREATE TRIGGER set_default_current_price
BEFORE INSERT ON items
FOR EACH ROW
BEGIN
    IF NEW.current_price IS NULL THEN
        SET NEW.current_price = NEW.starting_price;
    END IF;
END;
//
DELIMITER ;

-- Create bids table
CREATE TABLE bids (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    bid_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create notifications table
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

3.  run these in the terminal of your folder named bidding-platform
npm install
npm start

4. The project will run in http://localhost:3000/

use  postman to call the API's
