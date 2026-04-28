CREATE DATABASE IF NOT EXISTS schema_db;
SHOW DATABASES;
USE schema_db;

CREATE TABLE Users(email VARCHAR(30) NOT NULL UNIQUE,
password VARCHAR(20) NOT NULL, role ENUM('Student', 'Admin') DEFAULT 'Student');
DESC Users;

CREATE TABLE Courses(course_ID INT AUTO_INCREMENT PRIMARY KEY,
course_name VARCHAR(20) NOT NULL,
description VARCHAR(30) NOT NULL,
fees INT, start_date DATE,
end_date DATE, video_expire_days INT);
DESC Courses;

CREATE TABLE Student(reg_no INT AUTO_INCREMENT PRIMARY KEY ,
name VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
course_ID INT NOT NULL,
mobile_no VARCHAR(15),
profile_pic BLOB,
FOREIGN KEY (course_ID) REFERENCES Courses(course_ID)
);
DESC Student;

CREATE TABLE Videos (
    video_ID INT AUTO_INCREMENT PRIMARY KEY,
    course_ID INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    youtube_url VARCHAR(100) NOT NULL,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_ID) REFERENCES Courses(course_ID) ON DELETE CASCADE
);
DESC Videos;


ALTER TABLE student ADD COLUMN profile_pic LONGBLOB;