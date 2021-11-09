from django.urls import path
from route import views
from .views import Upload
urlpatterns = [
    path('post/', views.posts, name='posts'), #get
    path('post/create/', Upload.as_view(), name='create'), #post
    path('post/<int:ID>/', views.post_spec_get, name='post_spec_get'), #get post
    path('post/<int:ID>/edit/', views.post_spec_edit, name='post_spec_edit'), #get post
    path('post/<int:ID>/cart/<int:fid>/', views.post_cart, name='post_cart'),
    path('post/<int:ID>/like/', views.post_like, name='post_like'),
    path('post/<int:ID>/comment/', views.post_comment_get, name='post_comment'), #get
    path('post/<int:ID>/comment/create/', views.post_comment_post, name='post_comment_post'), #post
    path('post/<int:ID>/comment/<int:cid>/', views.post_comment_spec, name='post_comment_spec'),
    path('place/', views.place_create, name='place_create'),
    path('place/<int:ID>/', views.place_spec, name='place_spec'),
    path('place/<int:ID>/edit/', views.place_spec_edit, name='place_spec_edit'),
    path('place/<int:ID>/cart/<int:fid>/', views.place_cart, name='place_cart')
]