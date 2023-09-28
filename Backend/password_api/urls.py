from django.urls import path
from .views import PasswordListView, PasswordDetailView

urlpatterns = [
    # ... other URL patterns ...
    path('passwords/', PasswordListView.as_view(), name='password-list'),
    path('passwords/<int:pk>/', PasswordDetailView.as_view(), name='password-detail'),
]
