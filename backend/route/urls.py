from django.urls import path
from route import views

urlpatterns = [
    path('post/', views.posts, name='posts'), #get
    path('post/create/', views.post_create, name='post_create'), #post
    path('post/<int:post_id>/', views.post_spec_get, name='post_spec_get'), #get post
    path('post/<int:post_id>/share/', views.post_share, name='post_share'),
    path('post/<int:post_id>/edit/', views.post_spec_edit, name='post_spec_edit'), # post delete
    path('post/<int:post_id>/cart/<int:fid>/', views.post_cart, name='post_cart'),
    path('post/<int:post_id>/like/', views.post_like, name='post_like'),
    path('post/<int:post_id>/comment/', views.post_comment_get, name='post_comment'), #get
    path('post/<int:post_id>/comment/create/', views.post_comment_post, name='post_comment_post'), #post
    path('post/<int:post_id>/comment/<int:cid>/', views.post_comment_spec, name='post_comment_spec'),
    path('place/', views.place_create, name='place_create'),
    path('place/<int:place_id>/', views.place_spec, name='place_spec'),
    path('place/<int:place_id>/edit/', views.place_spec_edit, name='place_spec_edit'),
    path('place/<int:place_id>/cart/<int:fid>/', views.place_cart, name='place_cart')
]