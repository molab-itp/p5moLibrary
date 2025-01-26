#!/bin/bash
cd ${0%/*}

# Produce a release build

cd ..
quiet=--quiet

# deploy to github pages
#
# update build number
# merge branch next in to branch main
# switch back to branch next
#

bin/build.sh --prod $quiet

git add . 
git commit $quiet -m "`cat gen/build_ver.txt`"
git push $quiet

# switch to release, and merge in main
git checkout release $quiet
git merge main $quiet -m "`cat gen/build_ver.txt`"
git push $quiet

# switch back to main
git checkout main $quiet

echo
echo "build `cat gen/build_ver.txt`"