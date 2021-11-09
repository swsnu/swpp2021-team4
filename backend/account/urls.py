from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'), 
    path('signin/', views.signin, name='signin'), 
    path('signout/', views.signout, name='signout'), 
    path('<int:user_id>/folder/', views.user_folders, name='user_folders'), 
    path('<int:user_id>/folder/<int:fid>/', views.user_folder_detail, name='user_folder_detail'), 
    path('<int:user_id>/like/', views.user_likes, name='user_likes'), 
    path('<int:user_id>/share/', views.user_shares, name='user_shares'), 
]