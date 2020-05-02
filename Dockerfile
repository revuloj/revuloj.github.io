FROM ruby:2.5-alpine

# vidu:
# https://help.github.com/en/github/working-with-github-pages/creating-a-github-pages-site-with-jekyll
# https://github.com/docker/docker.github.io/blob/master/Dockerfile
# https://github.com/madduci/docker-github-pages/blob/master/Dockerfile

# https://pages.github.com/versions/
ARG JEKYLL_VERSION=3.8.5
ARG GITHUB_PAGES_VERSION=204
ARG MINIMA_VERSION=2.5.1
ARG COMMONMAKER_VERSION=0.17.13
ARG JEKYLL_FEED_VERSION=0.13.0
ARG ROUGE_VERSION=3.13.0

# https://github.com/gitphill/openssl-alpine/blob/master/Dockerfile
# install openssl
# default variables
#ENV COUNTY "DE"
#ENV STATE "Germany"
#ENV LOCATION "Lepsiko"
#ENV ORGANISATION "Revuloj"
#ENV ROOT_CN "Root"
#ENV ISSUER_CN "Revuloj"
#ENV PUBLIC_CN "*.steloj.de"
#ENV ROOT_NAME "root"
#ENV ISSUER_NAME "revuloj"
#ENV PUBLIC_NAME "public"
#ENV RSA_KEY_NUMBITS "2048"
#ENV DAYS "365"
#ENV KEYSTORE_NAME "keystore"
#ENV KEYSTORE_PASS "changeit"
#ENV CERT_DIR "/etc/ssl/certs"

RUN apk add --update --no-cache --virtual .build-deps gcc g++ libc-dev make openssl-dev && \
    rm -rf /var/cache/apk/* \
    && mkdir -p /usr/src/app/revuloj.github.io



# throw errors if Gemfile has been modified since Gemfile.lock
##RUN bundle config --global frozen 1


WORKDIR /usr/src/app/revuloj.github.io

# https://jekyllrb.com/tutorials/using-jekyll-with-bundler/

RUN  bundle init && gem install commonmarker -v $COMMONMAKER_VERSION --source 'https://rubygems.org/' \
  && bundle add jekyll --version $JEKYLL_VERSION && bundle exec jekyll new --force . 

# sed -i -e "s/daemon:x:2/daemon:x:${DAEMON_UID}/" /etc/passwd

RUN sed -i -e "s/^gem \"jekyll\"/#gem \"jekyll\"/" Gemfile \
 && sed -i -e "s/gem \"minima\".*/gem \"minima\", \"~> $MINIMA_VERSION\"/" Gemfile \
 && sed -i -e "s/gem \"jekyll-feed\".*/gem \"jekyll-feed\", \"~> $JEKYLL_FEED_VERSION\"/" Gemfile \
 && sed -i -e "s/gem \"github-pages\".*/gem \"github-pages\", \"~> $GITHUB_PAGES_VERSION\", group: :jekyll_plugins/" Gemfile \
 && sed "$ a gem \"rouge\", \"~> $ROUGE_VERSION\"" Gemfile

#RUN bundle update github-pages
RUN bundle update rouge && bundle install 


RUN apk del .build-deps

#COPY Gemfile Gemfile.lock ./
#COPY . .

EXPOSE 4000
CMD ["bundle","exec","jekyll","serve"]