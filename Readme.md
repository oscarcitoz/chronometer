
# Chronometer Project

This project is built using **Deno** and **MongoDB** as a dependency. The goal of this project is to create and manage chronometers that, upon finishing their countdown, send a request to an endpoint with the data configured at the time of scheduling.

## Setup Instructions

Follow these steps to get the project up and running:

### 1. **Setup MongoDB with ReplicaSet**

First, you need to set up MongoDB with a ReplicaSet. To do this, use the following commands:

#### Generate a keyfile:
```bash
openssl rand -base64 756 > ./keyfile
chmod 600 ./keyfile
```

#### Run MongoDB with ReplicaSet in Docker:
```bash
docker run -d   --name mongo   -e MONGO_INITDB_ROOT_USERNAME=admin   -e MONGO_INITDB_ROOT_PASSWORD=adminpassword   -p 27017:27017   -v ./keyfile:/etc/mongo-keyfile:ro   mongo --replSet rs0 --keyFile /etc/mongo-keyfile
```

#### Initialize MongoDB ReplicaSet:
```bash
docker run -it --rm --network container:mongo mongo:6.0 mongosh --host localhost --authenticationDatabase admin -u admin -p adminpassword
rs.initiate({ _id: "rs0", members: [ { _id: 0, host: "localhost:27017" }] });
rs.status();
```

### 2. **Configure Environment Variables**

Ensure that your environment variables are properly set up. You can add them to a `.env` file or set them directly in your environment.

### 3. **Build the Project**

To build the project, use the following command:

```bash
docker build -t chronometer .
```

### 4. **Run the Project**

After building the project, you can run it using Docker with the following command:

```bash
docker run -p 8080:8080 chronometer
```

## API Endpoints

### 1. **Schedule a New Chronometer**

To schedule a new chronometer, use the following `curl` command:

```bash
curl --location 'localhost:8080/api/ms/chronometer' --header 'Content-Type: application/json' --data '{
    "reference_id": "1123",
    "seconds_for_run": 100,
    "request_config": {
        "headers": {"prueba": "prueba"},
        "url": "https://chronometerbb.free.beeceptor.com",
        "method": "POST",
        "body": {"pepe": "sabe"}
    }
}'
```

### 2. **Delete a Chronometer**

To delete a chronometer, use the following `curl` command with the chronometer's ID:

```bash
curl --location --request DELETE 'localhost:8080/api/ms/chronometer/1123' --data ''
```

### 3. **Check the Status of a Chronometer**

To check the status of a chronometer, use this `curl` command with the chronometer's ID:

```bash
curl --location 'localhost:8080/api/ms/chronometer/1123' --data ''
```

## Technologies Used

- **Deno**: JavaScript/TypeScript runtime
- **MongoDB**: NoSQL database with ReplicaSet
- **Docker**: Containerization of the application

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
