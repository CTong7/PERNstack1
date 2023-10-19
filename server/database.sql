-- *Building a database


-- create database called perntodo
CREATE DATABASE perntodo;

-- Create a table called todo with 2 columns/attributes: primary key and description are column headers

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    --unique todo ID for each item in todo list so we know which to delete,modify etc.

    description VARCHAR(255)
    -- varchar is a data type use to store character strings
    -- 255 is the max lenght of the string (any greater inputs will be truncated leading to dataloss)
    -- in SQL we need to define data type and size of column
    -- ! how does SQL actually work on the backend of the language? how does it query stuff?
);