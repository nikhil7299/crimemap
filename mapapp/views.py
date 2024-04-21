from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from .models import Crime

# Create your views here.
def index(request):
    items = Crime.objects.all()
  
    myList = []

    for obj in items:
        my_dict = {}
        my_dict["message"] = obj.message
        my_dict["location"] = obj.location
        my_dict["name"] = obj.name
        my_dict["phoneNumber"] = obj.phoneNumber
        my_dict["crimeType"] = obj.crimeType
        myList.append(my_dict)
       
    # Return the JSON response
    return JsonResponse({"data":myList})


def add(request):
    message = request.GET.get("message")
    location = request.GET.get("location")
    name = request.GET.get("name")
    phoneNumber = request.GET.get("phoneNumber")
    crimeType = request.GET.get("crimeType")
    item = Crime(message=message,location=location, name=name,  phoneNumber=phoneNumber, crimeType=crimeType)
    item.save()
    return JsonResponse({"saved":"true"})
