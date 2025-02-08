all:
	sudo docker compose up

db:
	sudo docker compose up db

rm:
	sudo docker stop task-backend-1
	sudo docker rm task-backend-1

rmi:
	sudo docker rmi task-backend

clean:
	sudo docker stop task-backend-1
	sudo docker container prune -f
	sudo docker volume prune -f
	sudo docker builder prune -f

build:
	sudo docker build --no-cache -t task-backend .
