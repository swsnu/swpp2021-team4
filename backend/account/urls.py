from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'), 
    path('signin/', views.signin, name='signin'), 
    path('signout/', views.signout, name='signout'), 
    path('<int:user_id>/', views.user_info, name='user_info')
]