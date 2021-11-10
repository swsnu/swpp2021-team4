from django import forms

class UserForm(forms.Form):
    username = forms.CharField(max_length=256, required=True)
    password = forms.CharField(max_length=256, required=True)
    profile_image = forms.ImageField(required = False)
