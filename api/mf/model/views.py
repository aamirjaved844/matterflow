import os
import json
import sys

from matterflow import WorkflowException
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

from modulefinder import ModuleFinder

from .models import ModelModel

@swagger_auto_schema(method='post',
                     operation_summary='Create a new model.',
                     operation_description='Creates a new model.',
                     responses={
                         200: 'Created new Model'
                     })
@api_view(['POST'])
def new_model(request):
    """Create a new model.

    Initialize a new, empty, Model object and store it in the session.

    Return:
        200 - Created new Model
    """
    try:
        json_data = json.loads(request.body)
        # Create new Model
        mod = ModelModel(name=json_data['name'], description=json_data['description'], json_data=json_data['json_data']) # create new model instance
        print(mod)
        mod.save() #save to db        
        return JsonResponse({
            'Message': 'Model Created',
            'Request Body': json.dumps(json_data)
        })
    except (json.JSONDecodeError, KeyError) as e:
        return JsonResponse({'No React model ID provided': str(e)}, status=500)

@swagger_auto_schema(method='get',
                     operation_summary='Retrieve list of models.',
                     operation_description='Retrieves a list of models.',
                     responses={
                         200: 'List of successor models.',
                         404: 'No models exists.',
                         500: 'Error retrieving list of models.'
                     })
@api_view(['GET'])
def get_models(request):
    """Get sorted list of Model.

    Generates a list of all models.

    Returns:
        List of models.
    """
    try:
        all_entries = json.loads(serializers.serialize("json", ModelModel.objects.all()))
        models = []
        for item in all_entries:
            entry = {}
            entry['id'] = item['pk']
            for key,value in item['fields'].items():
                entry[key] = value
            models.append(entry)

        response = { "data": models}
        return JsonResponse(response, status=200)
    except WorkflowException as e:
        return JsonResponse({e.action: e.reason}, status=500)

    return JsonResponse(order, safe=False)


@swagger_auto_schema(method='get',
                     operation_summary='Retrieve a node from the graph',
                     operation_description='Retrieves a node from the graph.',
                     responses={
                         200: 'JSON response with data',
                         400: 'No file specified',
                         404: 'Node/graph not found'
                     })
@swagger_auto_schema(method='post',
                     operation_summary='Update a node from the graph',
                     operation_description='Updates a node from the graph.',
                     responses={
                         200: 'JSON response with data',
                         400: 'No file specified',
                         404: 'Node/graph not found'
                     })
@swagger_auto_schema(method='delete',
                     operation_summary='Delete a node from the graph',
                     operation_description='Deletes a node from the graph.',
                     responses={
                         200: 'JSON response with data',
                         400: 'No file specified',
                         404: 'Node/graph not found',
                         405: 'Method not allowed',
                         500: 'Error processing Node change'
                     })
@api_view(['GET', 'POST', 'DELETE'])
@csrf_exempt
def handle_model(request, model_id):
    """ Retrieve, update, or delete a model

    Returns:
        200 - model was found; data in JSON format
        404 - model does not exist
        405 - Method not allowed
        500 - Error processing model change
    """

    if model_id is None:
        return JsonResponse({
            'message': 'The request does not contain a model id'
        }, status=404)

    # Process request
    try:
        if request.method == 'GET':
            #conn = 
            item = json.loads(serializers.serialize("json", ModelModel.objects.filter(pk=model_id)))
            entry = {}
            entry['id'] = model_id
            for key,value in item[0]['fields'].items():
                entry[key] = value

            response = JsonResponse({
                'data': entry
            }, safe=False)
        elif request.method == 'POST':
            updates = json.loads(request.body)
            ModelModel.objects.filter(pk=model_id).update(**updates)
            return JsonResponse({
                'message': 'POST successful'
            }, safe=False)
        elif request.method == 'DELETE':
            ModelModel.objects.filter(pk=model_id).delete()
            return JsonResponse({
                'message': 'DELETE successful'
            }, safe=False)
        else:
            return JsonResponse({
                'message': request.method + ' not yet handled.'
            }, status=405)
    except (WorkflowException) as e:
        return JsonResponse({e.action: e.reason}, status=500)
    except ParameterValidationError as e:
        return JsonResponse({'message': str(e)}, status=500)

    return response
