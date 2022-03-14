#!/usr/bin/env sh
# See https://vuepress.vuejs.org/guide/deploy.html#github-pages

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd src/.vuepress/dist

# if you are deploying to a custom domain
echo 'datp.io' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:tooltwist/datp.io.git master:gh-pages

cd -

