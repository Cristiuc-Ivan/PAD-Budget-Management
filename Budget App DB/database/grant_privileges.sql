CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'qwerty33'
GRANT ALL PRIVILEGES ON Budget_Management.* TO 'admin'@'%';
CREATE USER 'root'@'ip_address' IDENTIFIED BY 'some_pass';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'ip_address';
FLUSH PRIVILEGES;


