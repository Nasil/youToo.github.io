# 테이블 복사 (MySQL)


## 같은 서버에 있는 경우 
- Table copy
```
create table new_table_name like old_table_name
```
- Table & data copy
```
create table new_table_name select * from old_table_name
```
- Data copy
```
INSERT INTO [대상 테이블명] SELECT * FROM [원본 테이블명]  
```
- PK
```
ALTER TABLE 새로만든테이블 ADD PRIMARY KEY(지정할 컬럼명 )
```
- Auto_increament
```
alter table new modify 지정할컬럼명 int auto_increment
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
