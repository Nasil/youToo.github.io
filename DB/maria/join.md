![](https://t1.daumcdn.net/cfile/tistory/2623B333576CC00037)


# 조인 

# INNER JOIN 종류
### EQUI JOIN
- 공통 컬럼의 동등 비교만을 사용 
```
SELECT * FROM emp INNER JOIN dept ON emp.deptno = dept.deptno
```
### NATURAL JOIN
- 조인 대상 모든 테이블의 컬럼을 비교해서 같은 컬럼명을 가진 컬럼으로 조인 수행
- 같은 이름을 가진 컬럼은 한번만 추출
```
select * from emp NATURAL JOIN dept
```
### CROSS JOIN
- 조인에 참여한 테이블들의 모든 데이터 추출


# 서브쿼리
### SELECT 절
- 스칼라 쿼리
- 서브 쿼리 결과 값이 1행
### WHERE 절
- 단일행, 다중행, 다중 컬럼, 연관 서브 쿼리
### FROM 절
- 인라인 뷰 
- 동적인 테이블 처럼 사용
- 메인 쿼리에서 서브쿼리 컬럼 값을 참조할 수 있음
### ORDER BY 절
### HAVING 절
### INSERT INTO 절
### UPDATE SET 절
