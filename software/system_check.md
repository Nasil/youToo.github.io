## 서버 로그 확인
- pglog 
```
/home/postgresql/data
``` 
- 아파치
```
/home/apps/apache/logs
```
- PostgreSQL
```
/home/postgresql/data/postgresql.log
```
- PHP
```
/home/apache/logs/php_error_log
/home/apache/logs/error_log
```

## 시스템 버전 확인

- 리눅스
```
cat /etc/issue
```
- 아파치
```
/home/apache/bin/httpd -v
```
- Postgresql
```
pgsql --version
```
- MySQL
```
/home/mysql/bin/mysql -V
```
- PHP
```
/home/php/bin/php -v
```
- ProFTPD
```
/home/proftpd/sbin/proftpd -v
```
- memcached
```
/home/memcached/bin/memcached -h
```
