# 테이블 복사 (MySQL)


## 같은 서버에 있는 경우 

- To copy with indexes and triggers do these 2 queries (인덱스와 트리거로 복사하려면 다음 두 가지 쿼리를 수행하십시오.)
```
CREATE TABLE newtable LIKE oldtable; 
INSERT newtable SELECT * FROM oldtable;
```
- To copy just structure and data use this one: (구조와 데이터만 복사하려면이 것을 사용하십시오.)
```
CREATE TABLE tbl_new AS SELECT * FROM tbl_old;
```
- PK
```
ALTER TABLE 새로만든테이블 ADD PRIMARY KEY(지정할 컬럼명 )
```
- Auto_increament
```
alter table new modify 지정할컬럼명 int auto_increment
```
- Table Rename
```
RENAME TABLE old_table TO backup_table, new_table TO old_table;
```

## 다른 서버에 있는 경우

### 1. Create Table 
// Create statement
 
### 2. Insert data
#### 2-1 dump
- mysqldump 는 왠만하면 쓰지말기 락걸림
```
mysqldump -uerp -p비번 db명 table명
```
- csv
mysql -uerp -p비번 db명 -e "select id, age, place from account where place = 'seoul';" | sed 's/\t/","/g;s/^/"/;s/$/"/;' > account_bak.csv
#### 2-2 insert 문을 복사해서 붙여넣기
- export SQL INSERT statements
https://stackoverflow.com/questions/3978326/get-insert-statement-for-existing-row-in-mysql?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa


## 기타
- Check index
```
SHOW INDEX FROM table_name;
```
