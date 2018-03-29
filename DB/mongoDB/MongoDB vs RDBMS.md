# MongoDB vs RDBMS

| RDBMS | MongoDB |
| ------ |  -------- |
| database   |  database |
| table | collection |
| row | document or BSON document |
| column | field |
| column | field |
| index|    index|
| table joins | embedded documents and linking|
| primary key |     primary key (automatically set _id field.)|
| aggregation (e.g. group by) | aggregation pipeline|

# Executables

|type | MongoDB | MySQL| Oracle|
|------ | ------ | ------ | ------ |
|Database Server | mongod | mysqld | oracle |
|Database Client | mongo | mysql | sqlplus |

# MongoDB vs RDBMS Term

| RDBMS | MongoDB |
| ------ |  -------- |
| WHERE   | $match |
| GROUP BY | $group |
| HAVING | $match |
| SELECT | $project |
| ORDER BY | $sort|
| SUM() | $sum|
| COUNT() | $sum|
| join | $unwind|

## Example

    // RDBMS
    SELECT cust_id,
       SUM(price) as total
    FROM orders
    WHERE status = 'A'
    GROUP BY cust_id
    HAVING total > 250

    // MongoDB
    db.orders.aggregate( [
       { $match: { status: 'A' } },
       {
         $group: {
            _id: "$cust_id",
            total: { $sum: "$price" }
         }
       },
       { $match: { total: { $gt: 250 } } }
    ] )

https://docs.mongodb.com/v3.0/reference/sql-aggregation-comparison/
