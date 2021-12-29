from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q
from functools import reduce

from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import DonorsSerializer


from .forms import CreateUserForm, DonorForm
from .models import Donors

# Create your views here.
def index(request):
    return render(request, 'blood_bank_management_system/index.html')

def about(request):
    return render(request, 'blood_bank_management_system/about.html')

def signup(request):
    if request.user.is_authenticated:
        return redirect('search')
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)

        if form.is_valid():
            form.save()
            messages.success(request, 'Registration successful!')
            return HttpResponseRedirect(reverse('login'))
    return render(request, 'blood_bank_management_system/signup.html', {'form':form})

def user_login(request):
    if request.user.is_authenticated:
        return redirect('search')
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, f'Welcome, {user.first_name}. Logged in successfully!')
            return redirect('/')
        else:
            messages.info(request, 'Username or Password incorrect!')
    return render(request, 'blood_bank_management_system/login.html')

@login_required(login_url='login')
def user_logout(request):
    logout(request)
    return redirect('home')

@login_required(login_url='login')
def search(request):
    context = {}
    if request.method == 'POST':
        # Search algorithm
        blood_group = request.POST.get('blood')
        donors = Donors.objects.filter(blood_group=blood_group)
        gender = request.POST.get('gender')
        if gender == 'any':
            gender = ['male', 'female', 'others']
            donors = donors.filter(reduce(lambda x, y: x | y, [Q(gender__contains=each) for each in gender]))
        else:
            donors = donors.filter(gender=gender)
        location = request.POST.get('location').replace(',', ' ').split()
        if location != []:
            donors = donors.filter(reduce(lambda x, y: x | y, [Q(location__contains=each) for each in location]))
        
        context = {'donors':donors}
        return render(request, 'blood_bank_management_system/search_result.html', context)
    return render(request, 'blood_bank_management_system/search.html', context)

@login_required(login_url='login')
def donor_details(request, id):
    donor = Donors.objects.get(pk=id)
    return render(request, 'blood_bank_management_system/donor_details.html', {'donor':donor})

@login_required(login_url='login')
def profile(request):
    return render(request, 'blood_bank_management_system/profile.html')

@login_required(login_url='login')
def update_profile(request):
    instance = User.objects.get(id=request.user.id)
    form = CreateUserForm(instance=instance)

    if request.method == 'POST':
        form = CreateUserForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            messages.success(request, f'Profile updated for {request.user.first_name}')
            return redirect('login')
        form = CreateUserForm(request.POST)
    return render(request, 'blood_bank_management_system/update.html', {'form':form})

@login_required(login_url='login')
def delete_profile(request):
    instance = User.objects.filter(id=request.user.id)
    instance.delete()
    messages.success(request, f'Profile deleted for {request.user.first_name}')
    return redirect('login')

@login_required(login_url='login')
def donor_registration(request):
    name = request.user.first_name + ' ' + request.user.last_name
    email = request.user.email
    form = DonorForm(initial={'name':name, 'email':email})
    
    if request.method == 'POST':
        form = DonorForm(request.POST)
        if form.is_valid():
            form.username = request.user.username
            print(form.username)
            form.save()
            return redirect('search')
    context = {'form':form}
    return render(request, 'blood_bank_management_system/donor_registration.html', context)


# Creaing Rest Api

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'Donors list':'/api/donors-list/',
		'Donor details':'/api/donor-detail/<str:pk>/',
		'Create donor':'/api/create-donor/',
		'Update donor':'/api/update-donor/<str:pk>/',
		'Delete donor':'/api/delete-donor/<str:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def donors_list(request):
	donors = Donors.objects.all().order_by('id')
	serializer = DonorsSerializer(donors, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def donor_detail(request, pk):
	donor = Donors.objects.get(id=pk)
	serializer = DonorsSerializer(donor, many=False)
	return Response(serializer.data)

@api_view(['POST'])
def donor_create(request):
	serializer = DonorsSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def donor_update(request, pk):
	donor = Donors.objects.get(id=pk)
	serializer = DonorsSerializer(instance=donor, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def donor_delete(request, pk):
	donor = Donors.objects.get(id=pk)
	donor.delete()

	return Response('Item succsesfully delete!')
