-- This file identifies the strucute of the table 
-- used for authentication 

CREATE TABLE users(
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255),
    passwordhash VARCHAR(255),
    refreshToken VARCHAR(255)
)