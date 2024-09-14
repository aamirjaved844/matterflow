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
from xmlrpc.client import ServerProxy


@swagger_auto_schema(method='get',
                     operation_summary='Retrieve list of processes.',
                     operation_description='Retrieves a list of processes.',
                     responses={
                         200: 'List of successor processes.',
                         404: 'No processes exists.',
                         500: 'Error retrieving list of processes.'
                     })
@api_view(['GET'])
def get_processes(request):
    """Get sorted list of Processes.

    Generates a list of all processes.

    Returns:
        List of processes.
    """
    try:
        server = ServerProxy('http://localhost:9001/RPC2')
        response = { "data": json.dumps(server.supervisor.getAllProcessInfo())}
        return JsonResponse(response, status=200)
    except WorkflowException as e:
        return JsonResponse({e.action: e.reason}, status=500)

    return JsonResponse(order, safe=False)

@swagger_auto_schema(method='post',
                     operation_summary='Create a new flow.',
                     operation_description='Creates a new flow.',
                     responses={
                         200: 'Created new flow'
                     })
@api_view(['POST'])
def new_process(request):
    """Create a new process.

    Initialize a new, empty, flow object and store it in the session.

    Return:
        200 - Created new flow
    """
    try:
        json_data = json.loads(request.body)


        server = ServerProxy('http://localhost:9001/RPC2')
        response = { "data": json.dumps(server.supervisor.reloadConfig())}
        response = { "data": json.dumps(server.supervisor.restart())}
        
        return JsonResponse(response, status=200)

        return JsonResponse({
            'Message': 'Process Created',
            'Request Body': json.dumps(json_data)
        })
    except (json.JSONDecodeError, KeyError) as e:
        return JsonResponse({'No React flow provided': str(e)}, status=500)


@api_view(['POST'])
def start_process(request):
    try:
        # Get the process name from the request
        process_name = json.loads(request.body)['processName']

        # Create an XML-RPC client
        server = ServerProxy('http://localhost:9001/RPC2')

        # Start the process
        result = server.supervisor.startProcess(process_name)

        # Return the result
        return JsonResponse({'result': result})
    except (json.JSONDecodeError, KeyError) as e:
        return JsonResponse({'Cannot start the process': str(e)}, status=500)

@api_view(['POST'])
def stop_process(request):
    try:
        # Get the process name from the request
        process_name = json.loads(request.body)['processName']

        # Create an XML-RPC client
        server = ServerProxy('http://localhost:9001/RPC2')

        # Start the process
        result = server.supervisor.stopProcess(process_name)

        # Return the result
        return JsonResponse({'result': result})
    except (json.JSONDecodeError, KeyError) as e:
        return JsonResponse({'Cannot stop the process': str(e)}, status=500)
    