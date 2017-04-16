# === Tested with Ubuntu 16.04.
# Run this from within the kauri-energy-monitor directory.

echo Install NodeJS.
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs

echo Install Ruby.
sudo apt-get install -y ruby-full

echo Install and start MongoDB.
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

cat <<EOF > /lib/systemd/system/mongodb.service
[Unit]
Description=MongoDB Database Service
Wants=network.target
After=network.target

[Service]
ExecStart=/usr/bin/mongod --config /etc/mongod.conf
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
User=mongodb
Group=mongodb
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl start mongodb
sudo systemctl enable mongodb.service

echo Install Compass.
sudo apt-get install -y build-essential bison openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libxml2-dev autoconf libc6-dev ncurses-dev automake libtool
gem install compass

echo Install global dependencies.
npm install -g pm2 nodemon bower grunt

echo Install API dependencies.
npm run setup

echo Install frontend dependencies.
# Install these seperately to try prevent 'npm install' from crashing on low-memory systems.
npm --prefix frontend install gifsicle
npm --prefix frontend install optipng-bin
npm --prefix frontend run setup

echo Build the frontend.
grunt --base frontend --gruntfile frontend/Gruntfile.js build

echo Start Kauri!
pm2 start pm2.json

pm2 startup
pm2 save