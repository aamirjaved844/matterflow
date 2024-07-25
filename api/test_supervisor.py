from xmlrpc.client import ServerProxy
server = ServerProxy('http://localhost:9001/RPC2')


#print(server.supervisor.getAllProcessInfo())
#print(server.supervisor.reloadConfig())
print(server.supervisor.reloadConfig())
#print(server.supervisor.startProcess('984a8681-6e34-4e5f-8650-cf442fe10eb4'))
print(server.system.listMethods())
#print(server.supervisor.getAllProcessInfo())
exit(1)
#print(server.supervisor.getState())
#print(server.supervisor.getAllConfigInfo())
#print(server.supervisor.startAllProcesses())
#print(server.supervisor.startProcess('matterflow-new'))