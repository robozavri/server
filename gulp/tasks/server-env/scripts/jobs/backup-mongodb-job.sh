USER=$1
NODE_V=$2
RECEIVER_ADDRESS=$3
APPNAME=$4

DB_DATA_PATH=/var/lib/mongodb
BACKUP_NAME="$APPNAME-backup-$(date +%F_%R_%Z)"
BACKUP_BASE_PATH=mongodb-backups
BACKUP_COUNT=3

NODE=~/.nvm/versions/node/$NODE_V/bin/node
FOREVER=~/.nvm/versions/node/$NODE_V/bin/forever


echo "Backing up MongoDB FILE: $BACKUP_NAME RECEIVER: $RECEIVER_ADDRESS"
echo ">>>> Start at $(date +%R)"


export NODE_ENV=production
$NODE $FOREVER stopall
sudo service mongod stop
sudo chown -R $USER $DB_DATA_PATH

ssh $RECEIVER_ADDRESS "mkdir -p $BACKUP_BASE_PATH"
rsync -avr $DB_DATA_PATH/* $RECEIVER_ADDRESS:$BACKUP_BASE_PATH/$BACKUP_NAME

sudo chown -R mongodb $DB_DATA_PATH
sudo service mongod start
sleep 60s
$NODE $FOREVER start ~/$APPNAME/server/server.js


ssh $RECEIVER_ADDRESS 'bash -s' < ~/env/delete-backups.sh

echo "<<<< End at $(date +%R)\n\n"
