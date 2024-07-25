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

from .models import ConnectionModel

@swagger_auto_schema(method='post',
                     operation_summary='Create a new connection.',
                     operation_description='Creates a new connection.',
                     responses={
                         200: 'Created new Connection'
                     })
@api_view(['POST'])
def new_connection(request):
    """Create a new connection.

    Initialize a new, empty, Connection object and store it in the session.

    Return:
        200 - Created new Connection
    """
    try:
        json_data = json.loads(request.body)
        # Create new Connection
        conn = ConnectionModel(name=json_data['name'], description=json_data['description'], json_data=json_data['json_data']) # create new model instance
        print(conn)
        conn.save() #save to db        
        return JsonResponse({
            'Message': 'Connection Created',
            'Request Body': json.dumps(json_data)
        })
    except (json.JSONDecodeError, KeyError) as e:
        return JsonResponse({'No React model ID provided': str(e)}, status=500)

@swagger_auto_schema(method='get',
                     operation_summary='Retrieve list of connections.',
                     operation_description='Retrieves a list of connection.',
                     responses={
                         200: 'List of successor connections.',
                         404: 'No connections exists.',
                         500: 'Error retrieving list of connections.'
                     })
@api_view(['GET'])
def get_connections(request):
    """Get sorted list of Connection.

    Generates a list of all connections.

    Returns:
        List of connections.
    """
    try:
        all_entries = json.loads(serializers.serialize("json", ConnectionModel.objects.all()))
        connections = []
        for item in all_entries:
            entry = {}
            entry['id'] = item['pk']
            for key,value in item['fields'].items():
                entry[key] = value
            connections.append(entry)

        response = { "data": connections}
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
def handle_connection(request, connection_id):
    """ Retrieve, update, or delete a connection

    Returns:
        200 - connection was found; data in JSON format
        404 - connection does not exist
        405 - Method not allowed
        500 - Error processing connection change
    """

    if connection_id is None:
        return JsonResponse({
            'message': 'The request does not contain a connection id'
        }, status=404)

    # Process request
    try:
        if request.method == 'GET':
            #conn = 
            item = json.loads(serializers.serialize("json", ConnectionModel.objects.filter(pk=connection_id)))
            entry = {}
            entry['id'] = connection_id
            for key,value in item[0]['fields'].items():
                entry[key] = value

            response = JsonResponse({
                'data': entry
            }, safe=False)
        elif request.method == 'POST':
            updates = json.loads(request.body)
            ConnectionModel.objects.filter(pk=connection_id).update(**updates)
            return JsonResponse({
                'message': 'POST successful'
            }, safe=False)
        elif request.method == 'DELETE':
            ConnectionModel.objects.filter(pk=connection_id).delete()
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
