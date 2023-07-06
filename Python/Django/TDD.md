## TDD 파일

- 경로 : myapp/tests/test_views.py
```python
from django.test import TestCase

class MyViewTest(TestCase):
    def test_my_view(self):
        a = 1 + 1
        self.assertEqual(a, 2)

    def test_my_view2(self):
        a = 1 + 1
        self.assertEqual(a, 1)
```

## TDD 실행
```bash
python manage.py test myapp.tests.test_views // 특정 파일

python manage.py test myapp.tests.test_views.MyViewTest // 특정 class

python manage.py test myapp.tests.test_views.MyViewTest.test_my_view // 특정 method

```
