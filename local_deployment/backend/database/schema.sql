CREATE DATABASE cafe;
USE cafe;

CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(5,2)
);

INSERT INTO menu (name, price) VALUES ('Coffee', 2.50), ('Tea', 2.00);
