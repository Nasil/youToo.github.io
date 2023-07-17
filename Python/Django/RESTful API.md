

# urls.py
```python
from django.urls import path
from . import views

app_name = 'pybo'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('question', views.QuestionUpsert.as_view(), name='question_post'),
    path('question/<int:id>', views.QuestionDetail.as_view(), name='question_get'),
    path('question/<int:id>', views.QuestionUpsert.as_view(), name='question_put'),
    path('question/<int:id>', views.QuestionUpsert.as_view(), name='question_delete'),
    path('answer/<int:question_id>', views.AnswerUpsert.as_view(), name='answer_save'),
    path('answer/<int:answer_id>', views.AnswerDetail.as_view(), name='answer_get'),
]
```

# views.py
```python
import json

from django.http import HttpResponse, HttpRequest
from .models import Question, Answer
from injector import inject
from django.http import JsonResponse, Http404
from django.views import generic
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db import IntegrityError

class IndexView(generic.ListView):

    @inject
    def __init__(self, model_question:Question) -> None:
        self._model_question = model_question
        super().__init__()

    # answer 의 content 만
    def get_answer_content(self, request):
        questions = self._model_question.get_all_questions_with_answers()
        response = []
        for question in questions:
            answers = question.answer_set.all()
            answers_content = [answer.content for answer in answers]
            response.append({
                "id": question.id,
                "subject": question.subject,
                "content": question.content,
                "create_date": question.create_date,
                "answers": answers_content
            })
        return JsonResponse(response, safe=False)

    # answer 전체
    def get(self, request):
        questions = self._model_question.get_all_questions_with_answers()
        response = []
        for question in questions:
            answers = question.answer_set.all()
            answers_list = []
            for answer in answers:
                answers_list.append({
                    "id": answer.id,
                    "question": answer.question.id,  # question의 id 또는 다른 필드를 사용할 수 있습니다.
                    "content": answer.content,
                    "create_date": answer.create_date,
                })
            response.append({
                "id": question.id,
                "subject": question.subject,
                "content": question.content,
                "create_date": question.create_date,
                "answers": answers_list
            })
        return JsonResponse(response, safe=False)

class QuestionDetail(View):
    @inject
    def __init__(self, model_question:Question) -> None:
        self._model_question = model_question
        super().__init__()

    def get(self, request, id):
        try:
            question = self._model_question.get_questions_with_answers(id)
        except Question.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Question not found'})
        
        answers = question.answer_set.all()
        answers_list = []
        for answer in answers:
            answers_list.append({
                "id": answer.id,
                "question": answer.question.id,  # question의 id 또는 다른 필드를 사용할 수 있습니다.
                "content": answer.content,
                "create_date": answer.create_date,
            })
        response = {
            "id": question.id,
            "subject": question.subject,
            "content": question.content,
            "create_date": question.create_date,
            "answer": answers_list
        }
        return JsonResponse(response)
    
class AnswerDetail(View):
    @inject
    def __init__(self, model_answer:Answer) -> None:
        self._model_answer = model_answer
        super().__init__()

    def get(self, request, answer_id):
        try:
            answer = self._model_answer.get_answers_with_questions(answer_id)
        except Answer.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Answer not found'})
        
        response = {
            "question_id": answer.question.id,
            "question_subject": answer.question.subject,
            "question_content": answer.question.content,
            "question_create_date": answer.question.create_date,
            "answer_id": answer.id,
            "answer_content": answer.content,
            "answer_create_date": answer.create_date,
        }
        return JsonResponse(response)

@method_decorator(csrf_exempt, name='dispatch')
class QuestionUpsert(View):
    @inject
    def __init__(self, model_question:Question) -> None:
        self._model_question = model_question
        super().__init__()

    def post(self, request):
        data_dict = json.loads(request.body)
        data_dict["create_date"] = timezone.now()
        try:
            instance = self._model_question.create_question(data_dict)
            instance.full_clean()
            instance.save()
            return JsonResponse({'status': 'success', 'id': instance.id})
        except ValidationError as e:
            return JsonResponse({'status': 'error', 'errors': e.message_dict})
        except IntegrityError:
            return JsonResponse({'status': 'error', 'errors': 'IntegrityError: A question with this subject already exists.'})

    def put(self, request, id):
        update_dict = json.loads(request.body)
        try:
            instance = Question.objects.get(id=id)
            instance.update_question(update_dict)
            instance.save()
            return JsonResponse({'status': 'success', 'id': instance.id})
        except ValidationError as e:
            return JsonResponse({'status': 'error', 'errors': e.message_dict})
        except Question.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Question not found'})
        
    def delete(self, request, id):
        try:
            question = Question.objects.get(id=id)
        except Question.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Question not found'})
        
        question.delete()
        return JsonResponse({'status': 'success'})


@method_decorator(csrf_exempt, name='dispatch')
class AnswerUpsert(View):
    @inject
    def __init__(self, model_answer:Answer) -> None:
        self._model_answer = model_answer
        super().__init__()
    def post(self, request, question_id):
        content = json.loads(request.body).get('content')
        try:
            instance = self._model_answer.create_answer(question_id, content)
            if not instance:
                return JsonResponse({'status': 'error', 'message': 'Related question not found'})
            instance.full_clean()
            instance.save()
            return JsonResponse({'status': 'success', 'id': instance.id})
        except ValidationError as e:
            return JsonResponse({'status': 'error', 'errors': e.message_dict})
```

# models.py
```python
from django.db import models
from django.utils import timezone

# Create your models here.
class Question(models.Model):
    subject = models.CharField(max_length=200, unique=True)
    content = models.TextField()
    create_date = models.DateTimeField()

    def __str__(self):
        return self.subject
    
    def get_all_question(self):
        return Question.objects.all().order_by('-create_date')
    
    # parent -> child
    def get_all_questions_with_answers(self):
        return Question.objects.prefetch_related('answer_set').all().order_by('-create_date')
    
    def get_questions_with_answers(self, id):
        return Question.objects.prefetch_related('answer_set').get(id=id)

    def update_question(self, update_dict):
        for key, value in update_dict.items():
            if hasattr(self, key):
                setattr(self, key, value)
        self.save()


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.TextField()
    create_date = models.DateTimeField()

    def __str__(self):
        return self.subject
    
    # child -> parent
    def get_answers_with_questions(self, answer_id):
        return Answer.objects.select_related('question').get(id=answer_id)
    
    def create_answer(self, question_id, content):
        try:
            question = Question.objects.get(id=question_id)
            instance = Answer(question=question, content=content, create_date=timezone.now())
            instance.save()
            return instance
            # answer = Answer.objects.create(question=question, content=content, create_date=timezone.now())
            # return answer
        except Question.DoesNotExist:
            print("Question with given id does not exist")
```
