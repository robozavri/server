set nocp

augroup reload_vimrc " {
  autocmd!
  autocmd BufWritePost $MYVIMRC source $MYVIMRC
augroup END " }

" Better copy & paste
set pastetoggle=<F2>
set clipboard=unnamed

" Mouse and backspace
set mouse=a
set bs=2

" Rebind <Leader> key
let mapleader = ","

" Bind nohl
" Removes highlight of last search
noremap <C-n> :nohl<CR>
vnoremap <C-n> :nohl<CR>
inoremap <C-n> :nohl<CR>


" Quick quit command
noremap <Leader>d :quit<CR>

" Bind Ctrl+<movement> keys to move around the windows
map <C-h> <C-w>h
map <C-j> <C-w>j
map <C-k> <C-w>k
map <C-l> <C-w>l

" Easier moving of code blocks
vnoremap < <gv
vnoremap > >gv

" Easier formatting of paragraphs
vmap Q gq
nmap Q gqap

nnoremap ; :
nnoremap : <Nop>
noremap <Leader>s :wq<CR>


filetype off
syntax on

" Showing line numbers and length
set number " show line numbers
set ruler


set tabstop=2
set shiftwidth=2
set softtabstop=2
set shiftround
set expandtab " spaces instead of tabs
set smarttab
set autoindent

" Make search case insensitive
" set hlsearch
set ignorecase " ignore upper/lower case when searching
set incsearch " show partial matches for a search phrase
set smartcase

" Disable backup
set nobackup
set nowritebackup
set noswapfile

set hidden " remove the buffer when closing tab
