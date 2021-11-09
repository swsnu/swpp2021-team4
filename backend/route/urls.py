from django.urls import path
from route import views

urlpatterns = [
    path('post/', views.posts, name='posts'), #get
    path('post/create/', views.create, name='create'), #post
    path('post/<int:id>/', views.post_spec_get, name='post_spec_get'), #get post
    path('post/<int:id>/edit/', views.post_spec_edit, name='post_spec_edit'), #get post
    path('post/<int:id>/cart/<int:fid>/', views.post_cart, name='post_cart'),
    path('post/<int:id>/like/', views.post_like, name='post_like'),
    path('post/<int:id>/comment/', views.post_comment_get, name='post_comment'), #get
    path('post/<int:id>/comment/create/', views.post_comment_post, name='post_comment_post'), #post
    path('post/<int:id>/comment/<int:cid>/', views.post_comment_spec, name='post_comment_spec'),
    path('place/', views.place_create, name='place_create'),
    path('place/<int:id>/', views.place_spec, name='place_spec'),
    path('place/<int:id>/edit/', views.place_spec_edit, name='place_spec_edit'),
    path('place/<int:id>/cart/<int:fid>/', views.place_cart, name='place_cart')
]