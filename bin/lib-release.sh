#!/bin/bash
cd ${0%/*}

# Publish lib to p5moRelease/lib/n

# check for destination
dest=../../p5moRelease
if [ ! -e "$dest" ]; then
  git clone https://github.com/molab-itp/p5moRelease.git $dest
fi
if [ ! -e "$dest" ]; then
  echo "fail to clone to $dest"
  exit
fi

excludes="--exclude-from to-public-exclude.txt"

quiet=--quiet
delete=--delete
test=
verbose=
# test=--dry-run
# verbose=v

buildnum=`cat ../src/gen/build_ver.txt`

rdest=$dest/lib/$buildnum

mkdir -p $rdest

source=../src/lib
# echo $verbose $delete $test
# echo -razO$verbose $excludes $delete $test
# echo "rsync from $source"
# echo "        to $rdest"
rsync -razO$verbose $excludes $delete $test "$source/" "$rdest/"

echo
echo lib $buildnum

cd $dest

git add . 
git commit $quiet -m "$buildnum"
git push $quiet

