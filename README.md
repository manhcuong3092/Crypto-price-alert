# Crypto-price-alert
# Crypto-price-alert

# Install redis on Windows
- Open Microsofr Store -> Search "ubuntu 20.04 on Windows" -> Install ubuntu
- setup ubuntu
- open command line, run
sudo apt-add-repository ppa:redislabs/redis
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install redis-server
sudo service redis-server start
- test redis:
redis-cli 
127.0.0.1:6379> ping
PONG

# In project, install npm
- npm install
- create file .env by file .env.example, change email and password with account enabled less secure apps 

# Run project
- npm run start