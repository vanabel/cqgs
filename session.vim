let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/development/nodejs/cqgs
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +1 ~/development/nodejs/cqgs/package.json
badd +4 ~/development/nodejs/cqgs.axios/src/main.js
badd +5 ~/development/nodejs/cqgs.axios/src/router.js
badd +25 ~/development/nodejs/cqgs.axios/src/store.js
badd +51 ~/development/nodejs/cqgs.axios/src/components/Login.vue
badd +13 ~/development/nodejs/cqgs.axios/public/index.html
badd +19 ~/development/nodejs/cqgs/src/components/Login.vue
badd +1 ~/development/nodejs/cqgs/src/store.js
badd +0 ~/development/nodejs/cqgs.axios/src/NERD_tree_1
argglobal
silent! argdel *
set lines=40 columns=120
edit ~/development/nodejs/cqgs.axios/src/NERD_tree_1
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=1 winheight=1 winminwidth=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 31 + 60) / 120)
exe 'vert 2resize ' . ((&columns * 88 + 60) / 120)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 18) / 37)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
wincmd w
argglobal
if bufexists('~/development/nodejs/cqgs/src/store.js') | buffer ~/development/nodejs/cqgs/src/store.js | else | edit ~/development/nodejs/cqgs/src/store.js | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 42 - ((14 * winheight(0) + 18) / 37)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
42
normal! 011|
wincmd w
exe 'vert 1resize ' . ((&columns * 31 + 60) / 120)
exe 'vert 2resize ' . ((&columns * 88 + 60) / 120)
tabedit ~/development/nodejs/cqgs/package.json
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=1 winheight=1 winminwidth=1 winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 9 - ((8 * winheight(0) + 18) / 37)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
9
normal! 02|
tabnext 2
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToO
set winminheight=1 winminwidth=1
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
