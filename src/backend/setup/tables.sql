CREATE DATABASE IF NOT EXISTS pe_contacts;

USE pe_contacts;

CREATE TABLE IF NOT EXISTS contact_category (
	id INT AUTO_INCREMENT,
	name VARCHAR(128) NOT NULL,
	color VARCHAR(32) NOT NULL,
	PRIMARY KEY (id)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS contact_company (
	id INT AUTO_INCREMENT,
	name VARCHAR(128) NOT NULL,
	PRIMARY KEY (id)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS contact_person (
	id INT AUTO_INCREMENT,
	name VARCHAR(128) NOT NULL,
	company_id INT NOT NULL,
	category_id INT NOT NULL,
	PRIMARY KEY (id),
	INDEX (company_id),
	INDEX (category_id),
	FOREIGN KEY (company_id)
		REFERENCES contact_company(id),
	FOREIGN KEY (category_id)
		REFERENCES contact_category(id)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS contact_address (
	id INT AUTO_INCREMENT,
	person_id INT NOT NULL,
	zip INT NOT NULL,
	town VARCHAR(128) NOT NULL,
	country VARCHAR(128) NOT NULL,
	street VARCHAR(128) NOT NULL,
	PRIMARY KEY (id),
	INDEX (person_id),
	FOREIGN KEY (person_id)
		REFERENCES contact_person(id)
		ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS contact_phone (
	id INT AUTO_INCREMENT,
	person_id INT NOT NULL,
	type VARCHAR(128) NOT NULL,
	number VARCHAR(20) NOT NULL,
	PRIMARY KEY (id),
	INDEX (person_id),
	FOREIGN KEY (person_id)
		REFERENCES contact_person(id)
		ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS contact_email (
	id INT AUTO_INCREMENT,
	person_id INT NOT NULL,
	type VARCHAR(128) NOT NULL,
	address VARCHAR(256) NOT NULL,
	PRIMARY KEY (id),
	INDEX (person_id),
	FOREIGN KEY (person_id)
		REFERENCES contact_person(id)
		ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE utf8_bin;

