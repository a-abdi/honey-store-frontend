# Honey Store Front
 Store site created with VueJS, Tailwind.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
The site sells products. all page of this site are responsive.

###### Admin User: 09394552776
###### Admin Password: !QAZ1qaz
#### Admin Link: [http://5.75.202.22:4173/admin/login](http://5.75.202.22:4173/admin/login)

#### Demo: [http://5.75.202.22:4173/](http://5.75.202.22:4173/)

#### Swagger Demo: [http://5.75.202.22:2000/docs/]( http://5.75.202.22:2000/docs/)

#### Backend Repo: [Honey Store Backend](https://github.com/a-abdi/honey-store-backend)

#### Swagger Repo [Honey Store Swagger](https://github.com/a-abdi/honey-swagger)

## Technologies
* VueJS 
* TailwindCSS
* TypeScript
* Vite
* Pinia
* VueRouter
* Docker
* Docker-Compose
	
## Setup
### To run this project:
#### First, configure the baseUrl in the .env.production file, and then choose one of the three options below to run the projec.
* run with docker-compose develop version
```
$ docker-compose -f docker-compose-develop.yaml up --build -d
```
* run with docker-compose in stable version
```
$ docker-compose -f docker-compose-production.yaml up --build -d
```
* run with npm in develop version
```
$ npm run build
$ npm run preview
```

