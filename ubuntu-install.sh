# === Tested with Ubuntu 16.04.
# Run this from within the kauri-energy-monitor directory.

# Install NodeJS.
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Ruby.
sudo apt-get install -y ruby-full

# Install and start MongoDB.
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64,ppc64el,s390x ] http://repo.mongodb.com/apt/ubuntu xenial/mongodb-enterprise/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list
sudo apt-get update
sudo apt-get install -y mongodb-enterprise
sudo service mongod start

# Install Compass.
sudo apt-get install -y build-essential bison openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libxml2-dev autoconf libc6-dev ncurses-dev automake libtool
gem install compass

# Install global dependencies.
npm install -g pm2 nodemon bower grunt

# Install API dependencies.
npm run setup

# Install frontend dependencies.
npm --prefix frontend run setup

# Build the frontend.
grunt --base frontend --gruntfile frontend/Gruntfile.js build

# Start Kauri!
pm2 start pm2.json