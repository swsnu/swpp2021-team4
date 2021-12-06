from django import forms

class PostForm(forms.Form):
    title = forms.CharField(max_length=256, required=True)
    header_image = forms.ImageField(required=False)
    thumbnail_image = forms.ImageField(required=False)
    folder_id = forms.IntegerField()
    days = forms.IntegerField()
    is_shared = forms.BooleanField(initial=False, required=False)
    season = forms.CharField(max_length=10, required=False)
    theme = forms.CharField(max_length=10, required=False)
    location = forms.CharField(max_length=256, required=False)
    availableWithoutCar = forms.BooleanField(required=False)
    places = forms.CharField(required=False)
    path_list = forms.CharField(required=False)