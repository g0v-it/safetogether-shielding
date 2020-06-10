CREATE TABLE Operator (
	username VARCHAR(20) NOT NULL,
	password CHAR(64) NOT NULL,
    role ENUM('admin','operator'),
	PRIMARY KEY (username)
);

CREATE TABLE User (
	name VARCHAR(64) NOT NULL,
	surname VARCHAR(64) NOT NULL,
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
	department VARCHAR(64),
	location VARCHAR(64),

	PRIMARY KEY (user_token, request_uid),
	FOREIGN KEY (operator) REFERENCES Operator(username),
	FOREIGN KEY (user_token) REFERENCES User(mail)
);


CREATE TABLE Request (
	id VARCHAR(64) NOT NULL,
	applicant VARCHAR(64) NOT NULL,

	req_date VARCHAR(64),
	description VARCHAR(200),
	state ENUM('TO_ASSIGN', 'TO_VERIFY', 'RUNNING', 'COMPLETED'),

	code VARCHAR(46),
	volunteer VARCHAR(64),

	PRIMARY KEY (id),
	FOREIGN KEY (volunteer) REFERENCES User(mail)
);


INSERT INTO Operator (username, password, role) VALUES(
    "walter",
    "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "admin"
);
