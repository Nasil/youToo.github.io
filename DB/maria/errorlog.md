## Error log 

- 우리는 가끔 실수한다. 실서버에 접속해서 DB를 날려먹기도 하고 where 조건을 안걸고 업데이트를 치기도 하고.
- 정말 믿을수 없는 일이지만 일어난다. 

- 에러로그 모니터링 
https://mariadb.com/kb/en/library/sql-error-log-plugin/

```
install plugin SQL_ERROR_LOG soname 'sql_errlog';
```
