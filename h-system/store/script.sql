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
	healthcare_id VARCHAR(20) NOT NULL,
	facility VARCHAR(20) NOT NULL,
	PRIMARY KEY (username),
	FOREIGN KEY (facility) REFERENCES Facility(code)
);

CREATE TABLE Certificate (
	token_user VARCHAR(20) NOT NULL,
	t_id VARCHAR(40) NOT NULL,
	operator VARCHAR(20) NOT NULL,
	PRIMARY KEY (token_user,t_id),
	FOREIGN KEY (operator) REFERENCES Operator(username)
);

INSERT INTO Facility (code,name, address,type) VALUES(
    "OSPEDALE123",
    "Nome dell'ospedale",
    "Indirizzo dell'ospedale",
    "hospital"
);
INSERT INTO Operator (username,password,healthcare_id,facility) VALUES(
    "Giovanni",
    "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "MEDICO0123",
    "OSPEDALE123"
);
