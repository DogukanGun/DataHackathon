# Use the official Go base image
FROM golang:1.20.3

# Set the working directory inside the container
WORKDIR /app

# Copy the Go application source code into the container
COPY . .

# Build the Go application
RUN go get -d ./...
RUN go run main.go 0xdac17f958d2ee523a2206206994597c13d831ec7 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2


