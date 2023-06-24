# Honey Store Front
 Store site created with VueJS, Tailwind.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
The site sells products. all page of this site are responsive.

Online Site [Honey Store](http://5.75.202.22:4173/)

Online Docs [Honey Docs]( http://5.75.202.22:2000/docs/)

For more information about backend. see [Honey Store Backend](https://github.com/a-abdi/honey-store-backend)

For more information about Docs. see [Honey Store Swagger](https://github.com/a-abdi/honey-swagger)

## Technologies
Project is created with:
* VueJS 
* TailwindCSS
* TypeScript
* Vite
* Pinia
* VueRouter
* Docker
* Docker-Compose
	
## Setup
### To test, enter the admin username and password as follow:
###### User: 09394552776
###### Password: !QAZ1qaz
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

