#!/bin/bash

# necesas ankaŭ krei Gemfile en $(pwd)
# bundle init
# bundle exec jekyll 3.8.5 new .
# 
# aŭ 
# docker run -v $(pwd):/site github-pages init
# docker run -v $(pwd):/site github-pages exec jekyll new .

#https://github.com/madduci/docker-github-pages
docker run --rm -it -p 4000:4000 -v $(pwd):/site github-pages \
  install && exec jekyll serve --watch --force_polling --host 0.0.0.0 $@