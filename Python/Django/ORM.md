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
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Person, through="Membership")

    def __str__(self):
        return self.name

class Membership(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=64)
```

# 쿼리
- https://docs.djangoproject.com/ko/4.2/topics/db/queries/

## INSERT & UPDATE
```python
>>> from blog.models import Blog
>>> b = Blog(name="Beatles Blog", tagline="All the latest Beatles news.")
>>> b.save()

>>> b.name = "New name"
>>> b.save()
```

## SELECT
```python
all_entries = Entry.objects.all() # return QuerySet
Entry.objects.filter(pub_date__year=2006) # return QuerySet

>>> q1 = Entry.objects.filter(headline__startswith="What")
>>> q2 = q1.exclude(pub_date__gte=datetime.date.today())
>>> q3 = q1.filter(pub_date__gte=datetime.date.today())

one_entry = Entry.objects.get(pk=1) # return object

Entry.objects.all()[:5] # LIMIT 5
Entry.objects.all()[5:10] # OFFSET 5 LIMIT 5
```

## DELETE
```python
>>> q = Question.objects.get(id=1)
>>> q.delete()
```
