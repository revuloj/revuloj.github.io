#!/bin/bash

docker run --rm -it -p 4000:4000 -v $(pwd)/src:/usr/src/app/revuloj.github.io revuloj.github.io \
  bundle exec jekyll serve --watch --force_polling --host 0.0.0.0 $@