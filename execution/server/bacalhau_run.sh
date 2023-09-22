sudo docker build -t  dogukangun/datahackathon:go .
sudo docker push dogukangun/datahackathon:go
bacalhau docker run --wait --network=http --domain=eth.public-rpc.com dogukangun/datahackathon:go -- go run main.go 0xdac17f958d2ee523a2206206994597c13d831ec7 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2