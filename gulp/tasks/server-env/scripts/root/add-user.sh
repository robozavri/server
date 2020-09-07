USER=$1
PASSWORD=$2


adduser --disabled-password --gecos "" $USER
echo "$USER:$PASSWORD" | chpasswd
echo "$USER ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
echo "$USER ALL=NOPASSWD: /usr/sbin/service, /bin/chown" >> /etc/sudoers
mkdir /home/gdg/.ssh
cat ~/.ssh/authorized_keys >> /home/gdg/.ssh/authorized_keys

printf "\n\n__GDG__: Added user ($USER)\n\n\n"
