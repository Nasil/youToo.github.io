```sql
SELECT 
    table_name,
    table_rows,
    round(data_length/(1024*1024),2) as 'DATA_SIZE(MB)',
    round(index_length/(1024*1024),2) as 'INDEX_SIZE(MB)'
FROM information_schema.TABLES
where table_schema = 'Data Base name'
GROUP BY table_name 
ORDER BY data_length DESC 
LIMIT 10;

```
