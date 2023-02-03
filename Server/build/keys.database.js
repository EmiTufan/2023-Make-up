"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: {
        host: '127.0.0.1',
        user: 'xxx',
        password: 'xxx',
        database: 'Login',
        connectionLimit: 10,
        port: 3306
    },
    database_Login_Admin: {
        host: '127.0.0.1',
        user: 'xxx',
        password: 'xxx',
        database: 'admin',
        connectionLimit: 10,
        port: 3306
    },
    database_web_info: {
        host: '127.0.0.1',
        user: 'xxx',
        password: 'xxx',
        database: 'website_info',
        connectionLimit: 10,
        port: 3306
    }
};
// CREATE TABLE `login`.`login` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `password` VARCHAR(255) NOT NULL , `token` VARCHAR(255) NOT NULL , `user_agent` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
// CREATE USER 'root_emi'@'%' IDENTIFIED VIA mysql_native_password USING '***';GRANT ALL PRIVILEGES ON *.* TO 'root_emi'@'%' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;GRANT ALL PRIVILEGES ON `login`.* TO 'root_emi'@'%';
