from django.urls import path
from route import views

urlpatterns = [
    path('post/', views.posts, name='post'),
    path('post/<int:id>/', views.post_spec, name='post_spec'),
    path('post/<int:id>/cart/<int:fid>/', views.post_cart, name='post_cart'),
    path('post/<int:id>/like/', views.post_like, name='post_like'),
    path('post/<int:id>/comment/', views.post_comment, name='post_comment'),
    path('post/<int:id>/comment/<int:cid>', views.post_comment_spec, name='post_comment_spec'),
    path('place/', views.place_create, name='place_create'),
    path('place/<int:id>/', views.place_spec, name='place_spec'),
    path('place/<int:id>/cart/<int:fid>/', views.place_cart, name='place_cart')
]