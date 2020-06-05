CREATE TABLE Facility (
	code VARCHAR(20) NOT NULL,
	name VARCHAR(40) NOT NULL,
	address VARCHAR(40) NOT NULL,
	type ENUM('hospital','pharmacy') NOT NULL,
	PRIMARY KEY (code)
);

CREATE TABLE Operator (
	username VARCHAR(20) NOT NULL,
	password CHAR(64) NOT NULL,
	healthcare_id VARCHAR(20) ,
    role ENUM('admin','operator'),
	facility VARCHAR(20) ,
	PRIMARY KEY (username),
	FOREIGN KEY (facility) REFERENCES Facility(code)
);

CREATE TABLE User (
	username VARCHAR(64) NOT NULL,
	mail VARCHAR(64) NOT NULL,
	PRIMARY KEY (mail)
);


CREATE TABLE Certificate (
	user_token VARCHAR(64) NOT NULL,
	request_uid VARCHAR(64) NOT NULL,
	operator VARCHAR(20) NOT NULL,

	name VARCHAR(64),
	surname VARCHAR(64),
	birthdate VARCHAR(64),
	birthplace VARCHAR(64),
	req_timestamp BIGINT(20),
	covid_status ENUM('healthy','sick'),

	t_id VARCHAR(64),
	PRIMARY KEY (user_token,request_uid),
	FOREIGN KEY (operator) REFERENCES Operator(username),
	FOREIGN KEY (user_token) REFERENCES User(mail)
);


INSERT INTO Operator (username, password, role) VALUES(
    "Giovanni",
    "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "admin"
);
