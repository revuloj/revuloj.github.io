#!/bin/bash

# https://github.com/envygeeks/jekyll-docker/blob/master/README.md

#docker run --rm \
#  --volume="$PWD:/srv/jekyll" \
#  -it jekyll/jekyll:$JEKYLL_VERSION \
#  jekyll build


#export JEKYLL_VERSION=3.8
#docker run --rm \
#  --volume="$PWD:/srv/jekyll" \
#  -it jekyll/jekyll:$JEKYLL_VERSION \
#  bundle update

docker run --rm -it -p 4000:4000 -v $(pwd):/srv/jekyll revuloj.github.io jekyll serve --watch --force_polling --host 0.0.0.0 $@