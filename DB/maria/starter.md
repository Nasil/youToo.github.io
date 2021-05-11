# Install

1. https://mariadb.org/
2. https://dev.mysql.com/downloads/workbench/

# Grant user

```sql
create database xxx default character set utf8;

use xxx;
create user 'aaa'@'localhost' identified by 'bbb';
grant all privileges on *.* to 'aaa'@'localhost';


```
