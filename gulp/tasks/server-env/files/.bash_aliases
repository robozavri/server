# =============== General ===============
alias l="cd ~/gdg"
alias na="nautilus"
alias ce="crontab -e"
alias bal="vi ~/.bash_aliases && pudot"
alias plgulp="git submodule update --remote"

# =============== Folders ===============
alias ~="cd"
alias ..="cd .."
alias ...="cd ../.."
alias la="ls -A"
alias ll="ls -lFh"
alias lla="ls -AlFh"
alias dx="cd ~/Desktop && rm *.xlsx && exit"

# =============== Git ===============
alias st="git status"
alias diff="git diff"
alias pl="git pull --rebase origin master"
alias pu="git push origin master"

function ga {
  git add -A
  git commit -m "$1"
  git push origin master
}

# =============== Dotfiles ===============
function pudot {
  cd ~
  cp .bashrc .bash_aliases .vimrc .npmrc server-env/files
  ga "chore(update)"
  . .bashrc
}

function pldot {
  cd ~
  git pull --rebase origin master
  . .bashrc
}

function pubase {
  cd ~/gdg/base-app/gulp
  ga "chore(update)"
  cd ..
  ga "chore(update)"
}

# =============== Gulp ===============
alias g="gulp"
alias gs="gulp serve"
alias gd="gulp dist"
alias gt="gulp test"
alias gr="gulp release"

# =============== Server ===============
alias digital-gdg="ssh gdg@gdg.ge"
alias digital-hophop="ssh gdg@46.101.173.174"
alias digital-kvlevebi="ssh gdg@46.101.153.60"
alias digital-ymf="ssh ymf@youth.gov.ge" #ymfforward
alias digital-ipspool="ssh ipspool@ipspool.com" #gdgforpass
alias digital-nile="ssh gdg@nileflowers.ge"

alias frrestartall="forever restartall"
alias frlist="forever list"
alias frstopall="forever stopall"

function nginconf {
  vi /etc/nginx/sites-available/default
  /etc/init.d/nginx restart
}

function gdg-server-restart {
  ssh gdg@gdg.ge ". .nvm/nvm.sh && \
    forever stopall && \
    cd ~/gdg.ge && npm run frstart && \
    cd ~/tst.ge && npm run frstart && \
    cd ~/gadmodi && npm run frstart"
}
