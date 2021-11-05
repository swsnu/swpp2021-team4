from django.urls import path
from route import views

urlpatterns = [
    path('post/', views.posts, name='post'),
    path('post/:id/', views.post_spec, name='post_spec'),
    path('post/:id/cart/:fid/', views.post_cart, name='post_cart'),
    path('post/:id/like/', views.post_like, name='post_like'),
    path('post/:id/comment/', views.post_comment, name='post_comment'),
    path('post/:id/comment/:cid', views.post_comment_spec, name='post_comment_spec'),
]