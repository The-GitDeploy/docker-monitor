# docker-monitor
Simple web-interface to view all running docker container

Run with: 
```
docker run -p8080:8080 -v /var/run/docker.sock:/var/run/docker.sock dockermonitor
```