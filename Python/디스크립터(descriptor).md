# 디스크립터
- 파이썬의 디스크립터(descriptor)는 객체의 속성에 대한 접근을 커스터마이즈하는 방법을 제공

```python
class Descriptor:
    def __get__(self, instance, owner):
        print('Getting:', self, instance, owner)

    def __set__(self, instance, value):
        print('Setting:', self, instance, value)

    def __delete__(self, instance):
        print('Deleting:', self, instance)

class MyClass:
    attribute = Descriptor()

my_instance = MyClass()
my_instance.attribute  # Getting: <__main__.Descriptor object ...> <__main__.MyClass object ...> <class '__main__.MyClass'>
my_instance.attribute = 10  # Setting: <__main__.Descriptor object ...> <__main__.MyClass object ...> 10
del my_instance.attribute  # Deleting: <__main__.Descriptor object ...> <__main__.MyClass object ...>

```


```python
class HistoryTraceAttribute:
    def __init__(self, trace_attribute_name: str) -> None:
        self.trace_attribute_name = trace_attribute_name
        self._name = None
    def __set_name__(self, owner, name):
        self._name = name
    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dic__[self._name]
    def __set__(self, instance, value):
        self._track_change_in_value_for_instance(instance, value)
        instance.__dict__[self.name] = value
    def _track_change_in_value_for_instance(self, instance, value):
        self._set_default(instance)
        if self._needs_to_track_change(instance, value):
            instance.__dict__[self.trace_attribute_name].append(value)
    def _needs_to_track_change(self, instance, value) -> bool:
        try:
            current_value = instance.__dict__[self.name]
        except KeyError:
            return True
        return value != current_value
    def _set_default(self, instance):
        instance.__dict__.setdefault(self.trace_attribute_name, [])

class Traveler:
    current_city = HistoryTraceAttribute("cities_visited")
    
    def __init__(self, name:str, current_city:str) -> None:
        self.name = name
        self.current_city = current_city


traveler = Traveler('Alice', 'New York')
print(traveler.cities_visited)  # Expect: ['New York']

traveler.current_city = 'Los Angeles'
print(traveler.cities_visited)  # Expect: ['New York', 'Los Angeles']

traveler.current_city = 'San Francisco'
print(traveler.cities_visited)  # Expect: ['New York', 'Los Angeles', 'San Francisco']
        
```
