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
```
CREATE TABLE `t_validation` (
  `validation_no` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'validation number',
  `condition_type` varchar(30) NOT NULL COMMENT '조건 종류 (value-type, value, regex, symbol)',
  `condition_value` varchar(50) NOT NULL COMMENT '조건 값 (>, >=, <, <=, ===, !==, in, not-in)',
  `title` varchar(210) NOT NULL COMMENT '검증 조건명',
  `description` varchar(300) DEFAULT NULL COMMENT '검증 조건 내용',
  `is_deleted` enum('T','F') NOT NULL DEFAULT 'F' COMMENT '삭제여부',
  `ins_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  `upd_timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '수정일',
  `del_timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '삭제일',
  PRIMARY KEY (`validation_no`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='검증 조건 테이블';
```
 
### 2. Insert data
#### 2-1 csv 로 옮겨서 하기
#### 2-2 insert 문을 복사해서 붙여넣기

- mysqldump 는 왠만하면 쓰지말기 락걸림
```
mysqldump -uerp -p비번 db명 table명
```

## 기타
- Check index
```
SHOW INDEX FROM table_name;
```
