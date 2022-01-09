## QueryDSL 
```
PAFactoryQuery query = new JPAQueryFactory(em);
QMember m = QMember.member; 
List<Member> list = 
  query.selectFrom(m)
 .where(m.age.gt(18)) 
 .orderBy(m.name.desc())
 .fetch();
```
