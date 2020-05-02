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
  #\
  #; cat /usr/local/bundle/extensions/x86_64-linux-musl/2.7.0/eventmachine-1.2.7/mkmf.log
# RUN bundle install 
##
## Running bundle install in /usr/src/app/revuloj.github.io... 
##  Bundler: /usr/local/lib/ruby/2.7.0/bundler/resolver.rb:290:in `block in verify_gemfile_dependencies_are_found!': 
## Could not find gem 'minima (~> 2.0)' in any of the gem sources listed in your Gemfile. (Bundler::GemNotFound)
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/resolver.rb:258:in `each'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/resolver.rb:258:in `verify_gemfile_dependencies_are_found!'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/resolver.rb:49:in `start'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/resolver.rb:22:in `resolve'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/definition.rb:258:in `resolve'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/definition.rb:170:in `specs'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/definition.rb:237:in `specs_for'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/definition.rb:226:in `requested_specs'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/runtime.rb:101:in `block in definition_method'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/runtime.rb:20:in `setup'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler.rb:149:in `setup'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/setup.rb:20:in `block in <top (required)>'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/ui/shell.rb:136:in `with_level'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/ui/shell.rb:88:in `silence'
##  Bundler: from /usr/local/lib/ruby/2.7.0/bundler/setup.rb:20:in `<top (required)>'
##  Bundler: from /usr/local/lib/ruby/2.7.0/rubygems/core_ext/kernel_require.rb:92:in `require'
##  Bundler: from /usr/local/lib/ruby/2.7.0/rubygems/core_ext/kernel_require.rb:92:in `require'

RUN apk del .build-deps

#COPY Gemfile Gemfile.lock ./


### gem "jekyll", "~> 4.0.0"
### # This is the default theme for new Jekyll sites. You may change this to anything you like.
### gem "minima", "~> 2.5"
### # If you want to use GitHub Pages, remove the "gem "jekyll"" above and
### # uncomment the line below. To upgrade, run `bundle update github-pages`.
### # gem "github-pages", group: :jekyll_plugins
### # If you have any plugins, put them here!
### group :jekyll_plugins do
###   gem "jekyll-feed", "~> 0.12"
### end
### 
### # Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
### # and associated library.
### install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
###   gem "tzinfo", "~> 1.2"
###   gem "tzinfo-data"
### end
### 
### # Performance-booster for watching directories on Windows
### gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?


##gem "github-pages", "~> $GITHUB_PAGES_VERSION", group: :jekyll_plugins


#COPY . .

EXPOSE 4000
CMD ["bundle exec jekyll serve"]