from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'), 
    path('signin/', views.signin, name='signin'), 
    path('signout/', views.signout, name='signout'), 
    path('<int:user_id>/', views.user_info, name='user_info'),
    path('<int:user_id>/edit/', views.edit_user_info, name='edit_user_info')
    path('<int:user_id>/folder/', views.user_folders, name='user_folders'), 
    path('<int:user_id>/folder/new/', views.create_user_folder, name='create_user_folder'), 
    path('<int:user_id>/folder/<int:fid>/', views.user_folder, name='user_folder'), 
    path('<int:user_id>/folder/<int:fid>/edit/', views.edit_user_folder, name='edit_user_folder'), 
    path('<int:user_id>/folder/<int:fid>/delete/', views.delete_user_folder, name='delete_user_folder'), 
    path('<int:user_id>/like/', views.user_likes, name='user_likes'), 
    path('<int:user_id>/share/', views.user_shares, name='user_shares'), 
]