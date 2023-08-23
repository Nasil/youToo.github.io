

- FactoryService class
```python
_entities = {}

def __init__(self):
    pass

def factory(self, market_code: str, group: str, cmd: str):
    entity: str = f"{market_code}|{group}|{cmd}"
    print(f"_entities: {self._entities}")
    try:
        entity_class = self._entities[entity]
        return entity_class()
    except KeyError:
        raise Exception(f"Invalid entity: {entity}")

@classmethod
def register(cls, entity):
    def decorator(subclass):
        cls._entities[entity] = subclass
        return subclass

    return decorator
```

- child class
```python

register = FactoryService.register

@register("cocoa")
class CocoaServicw:
    def __init__(self):
        pass

    def call(self):
        return "test cocoa"
```

- main
```python
market_factory = self.service.factory("cocoa")
response = market_factory.call()
print(response)
```
