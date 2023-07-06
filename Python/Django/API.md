
# GET
```python
def some_view(request):
    param1 = request.GET.get('param1')  # 'value1'
    param2 = request.GET.get('param2')  # 'value2'
```

# POST
```python
def some_view(request):
    if request.method == 'POST':
        param1 = request.POST.get('param1')
        param2 = request.POST.get('param2')

def some_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        param1 = data.get('param1')
        param2 = data.get('param2')
```
