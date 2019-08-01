DROP TABLE IF EXISTS posts, users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  user_name VARCHAR(50),
  password VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  date VARCHAR(50),
  time VARCHAR(50),
  location VARCHAR(50),
  description VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
  REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);