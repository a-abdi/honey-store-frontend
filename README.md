# honey-front

## Requirements 
  ### honey-market
  #### For more information, see [Honey Backend](https://github.com/a-abdi/honey-market).

## Running the app

```bash
# run sample docker-compose
services:
  mongo:
    container_name: mongo
    image: mongo:4.4.6
    network_mode: "host"
    ports:
      - 27017:21017
    restart: always

  backend:
    container_name: backend
    image: aliabdi709/honey-backend:0.0.1
    network_mode: "host"
    env_file: .env
    ports:
      - 3000:3000
    restart: always
