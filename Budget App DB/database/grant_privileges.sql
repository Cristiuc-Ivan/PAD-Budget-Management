CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'qwerty33';
GRANT ALL PRIVILEGES ON Budget_Management.* TO 'admin'@'%';
FLUSH PRIVILEGES;


