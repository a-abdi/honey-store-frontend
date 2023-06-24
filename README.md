# Honey Store Front
 Store site created with VueJS, Tailwind.

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
The site sells products. all page of this site are responsive.
this repository is for [Honey Store Backend](https://github.com/a-abdi/honey-store-backend). 

## Screenshots
#### Show Product
![image](https://github.com/a-abdi/honey-front/assets/56398602/e6a3c5b9-8853-4fde-bd49-f5b95c62f66c)

#### User Login
![image](https://github.com/a-abdi/honey-front/assets/56398602/fce6c099-53cd-4fa0-8c1f-0d7ad9cf2788)

#### User Orders
![image](https://github.com/a-abdi/honey-front/assets/56398602/ddbdfbcf-8964-4805-93b1-a0a3a26b7367)

#### Admin Dashboard Create New product
![image](https://github.com/a-abdi/honey-front/assets/56398602/6cede8d2-ad69-4ef6-bf0d-4b8fe49fa3f2)

#### Admin Dashboard Show Orders
![image](https://github.com/a-abdi/honey-front/assets/56398602/42906083-c2b1-49ae-bee1-c952834828ce)

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

