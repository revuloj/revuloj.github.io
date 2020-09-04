#!/bin/bash

# download closure-compiler:
# https://github.com/google/closure-compiler/releases/latest ...
# curl -LO https://dl.google.com/closure-compiler/compiler-latest.tar.gz \
#  && tar -xvzf compiler-latest.tar.gz 
# necesas nun mvn aŭ npx por ruli ĝin:
# npx ŝajnas la plej rapida voj:
# https://www.npmjs.com/package/google-closure-compiler

#java -jar closure-compiler*.jar --js_module_root jsc --entry_point revo-1b.js \
#           --js_output_file revo-compiled.js jsc/*.js

js=_js
jsc=revo/jsc/revo-1c.js
opt=BUNDLE

# vi povas antaŭinstali por eviti ĉiufoje ŝargi el la reto:
#   npm install google-closure-compiler
npx google-closure-compiler --compilation_level ${opt} --js_module_root jsc --entry_point ${js}/kadro.js \
           --js_output_file ${jsc} ${js}/*.js
           
           #\
           #--js ${js}/util.js --js ${js}/revo-kadro.js --js ${js}/revo-art-1b.js --js ${js}/redaktilo-1b.js