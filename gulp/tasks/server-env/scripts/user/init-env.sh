NODE_VERSION=8
PORT=$1

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt update
sudo apt-get install -y git vim htop curl nginx mongodb-org
printf "\n\n__GDG__: Installed: git vim htop etc...\n\n\n"

echo "[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target" | sudo tee --append /etc/systemd/system/mongodb.service
sudo systemctl start mongodb
sudo systemctl enable mongodb
printf "\n\n__GDG__: Run MongoDB\n\n\n"


curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
. ~/.nvm/nvm.sh
nvm i $NODE_VERSION
nvm alias default $NODE_VERSION
npm i -g forever --no-optional
printf "\n\n__GDG__: Installed node ($NODE_VERSION)\n\n\n"

sed -i "s/<<port>>/$PORT/g" ~/nginx
sudo mv ~/nginx /etc/nginx/sites-available/default
sudo /etc/init.d/nginx restart
printf "\n\n__GDG__: Initialized nginx config\n\n\n"
