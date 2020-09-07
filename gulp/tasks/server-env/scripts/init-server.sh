NUM_ARGS=2
IP=$1
PORT=$2
# PASSWORD=\$p@rk234
PASSWORD=testpassword
# USER=u
USER=gdg

if [ $# -ne $NUM_ARGS ] ; then
  echo "Error! Wrong number of arguments ($# instead of ${NUM_ARGS})"
  exit 128
fi

# init root
ssh-keyscan -H $IP >> ~/.ssh/known_hosts
ssh root@$IP 'bash -s' < ./gulp/tasks/server-env/scripts/root/init-lang-and-time.sh
ssh root@$IP 'bash -s' < ./gulp/tasks/server-env/scripts/root/add-user.sh $USER $PASSWORD

# init user
sshpass -p $PASSWORD ssh-copy-id -i ~/.ssh/id_rsa.pub $USER@$IP
rsync -avr ./gulp/tasks/server-env/files/ $USER@$IP:
ssh $USER@$IP 'bash -s' < ./gulp/tasks/server-env/scripts/user/init-env.sh $PORT
