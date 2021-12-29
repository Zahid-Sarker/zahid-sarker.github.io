from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.index, name='home'),
    path('about/', views.about, name='about'),
    path('search/', views.search, name='search'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.user_login, name='login'),
    path('profile/', views.profile, name='profile'),
    path('logout/', views.user_logout, name='logout'),
    path('profile/update/', views.update_profile, name='update'),
    path('profile/delete/', views.delete_profile, name='delete'),
    path('donor/<int:id>/', views.donor_details, name='donor-details'),
    path('donor-registration/', views.donor_registration, name='become-donor'),

    path('api/', views.apiOverview, name='api'),
    path('api/donors-list/', views.donors_list, name='donors-list-api'),
    path('api/donor-detail/<str:pk>/', views.donor_detail, name='donor-details-api'),
    path('api/create-donor/', views.donor_create, name='donor-create'),
    path('api/update-donor/<str:pk>/', views.donor_update, name='donor-update'),
    path('api/delete-donor/<str:pk>/', views.donor_delete, name='donor-delete')
]