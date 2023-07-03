-- This file identifies the strucute of the table 
-- used for saving links 
CREATE DATABASE links;

CREATE TABLE links(
    id SERIAL PRIMARY KEY,
    actual VARCHAR(255),
    short VARCHAR(64)
);