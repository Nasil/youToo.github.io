# generics APIView
- generics.CreateAPIView : 생성
- generics.ListAPIView : 목록
- generics.RetrieveAPIView : 조회
- generics.DestroyAPIView : 삭제
- generics.UpdateAPIView : 수정
- generics.RetrieveUpdateAPIView : 조회/수정
- generics.RetrieveDestroyAPIView : 조회/삭제
- generics.ListCreateAPIView : 목록/생성
- generics.RetrieveUpdateDestroyAPIView : 조회/수정/삭제

# urls.py
```python
from django.urls import path
from .views import TeamListCreateView, TeamRetrieveUpdateDestroyView, MemberListCreateView, MemberRetrieveUpdateDestroyView

urlpatterns = [
    path('teams/', TeamListCreateView.as_view(), name='team-list-create'),
    path('teams/<str:pk>/', TeamRetrieveUpdateDestroyView.as_view(), name='team-retrieve-update-destroy'),
    path('members/', MemberListCreateView.as_view(), name='member-list-create'),
    path('members/<str:pk>/', MemberRetrieveUpdateDestroyView.as_view(), name='member-retrieve-update-destroy'),
]
```

# views.py
```python
from rest_framework import generics
from .models import Team, Member
from .serializers import TeamSerializer, MemberSerializer

class TeamListCreateView(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TeamRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class MemberListCreateView(generics.ListCreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class MemberRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

```

# models.py
```python
from django.db import models

class Team(models.Model):
    team_name = models.CharField(max_length=64, primary_key=True, verbose_name='팀이름')
    created_at = models.DateField(auto_now_add=True, verbose_name='팀 생성일')

    class Meta:
        db_table = 'team'

class Member(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, verbose_name='소속팀')
    member_name = models.CharField(max_length=64, verbose_name='멤버 이름')
    member_age = models.IntegerField(verbose_name='멤버 나이')
    
    NATIONALITIES = [
        ('KOR', '대한민국'),
        ('USA', '미국'),
        ('CAN', '캐나다'),
        # Add more nationalities as needed
    ]
    member_nationality = models.CharField(max_length=3, choices=NATIONALITIES, verbose_name='멤버 국적')

    class Meta:
        db_table = 'member'
```
