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

CREATE TABLE Certificate (
	token_user VARCHAR(20) NOT NULL,
	t_id VARCHAR(40) NOT NULL,
	operator VARCHAR(20) NOT NULL,
	status ENUM('active','disabled'),
	PRIMARY KEY (token_user,t_id),
	FOREIGN KEY (operator) REFERENCES Operator(username)
);


INSERT INTO Operator (username,password,role) VALUES(
    "Giovanni",
    "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "admin"
);
