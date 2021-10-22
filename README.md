# docker-monitor
View and manage all running Docker container from a simple web-interface.

Simply run the following command: 
```
docker run -p8080:8080 -v /var/run/docker.sock:/var/run/docker.sock f1nnm/dockermonitor
```
The UI will then be available under https://localhost:8080