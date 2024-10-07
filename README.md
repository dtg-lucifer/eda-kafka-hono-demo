# This is a demo of EDA based microservice with ***kafka*** and ***hono.js***

This repo contains a basic app which will mock the producer and consumer of a kafka topic using hono.js. The producer will send a message to the topic and the consumer will consume the message from the topic.

Basically in any other scenario, any rest api will be in charge of handling requests which will be then write into the database, so in that case we have to write in the database in for each request. It significantly reduces the **IOPS** for our database and makes our application slower ot respond on the peak moment of activity.

Our goal is to simplify the process of writing into the database and make it asynchronous. So, we will use the **kafka** as a message broker to send the message to the topic and the consumer will consume the message from the topic and write into the database.

It will use a message stream from the producer and we can decouple the consumer which will actually write the data to the databse so that it would be easier fofr us to scale up both the producer and the consumer in the future. And it will also make our API faster to respond to the requests. (HA - High Availabile)

## How it works
Each time the **producer** sends a message the **comsumer** will log the message received event and also write the message to the database if the number of pending messages to be writen is more than 10 or the time interval is more than 10 seconds since the last write to the databse and there are still some messages in the queue to be saved in the database to prevent the loss of data.

## Prerequisites
- Node.js / Bun.js
- npm / bun
- Docker
- Docker-compose

## Installation
1. Clone the repository
2. Don't forget to change the direcotyr before installing the dependencies
3. Run `bun install` to install the dependencies
4. Run `docker-compose up` to start the services (at the root of the project)
5. Run `bun run dev` to start the server

## Usage
- The producer will be running on `http://localhost:3000`
- The consumer will be running on `http://localhost:3001`
- The kafka broker will be running at `localhost:9092`
- Zookeeper will be running at `localhost:2181`

## API Endpoints
- POST `/post/create` - `{ "title": string, "content": string }` - To send a message to the kafka topic
