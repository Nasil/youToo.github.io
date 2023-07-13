- 공식문서 : https://docs.djangoproject.com/ko/4.2/topics/db/


# 관계 (Relation)

### Many to one
```python
class Manufacturer(models.Model):
    # ...
    pass


class Car(models.Model):
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    # ...
```

### Many to Many
```python
```
