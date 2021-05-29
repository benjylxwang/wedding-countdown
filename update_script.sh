#! /bin/bash

filename="src/views/Top/time.jsx"
regex="2021,\s6,\s3,\s12,\s0,\s0,\s0"

# Save previous file
cp $filename src/views/Top/time.jsx.old

# Get current date and time, parse into string
year=`date +"%Y"`
month=`date +"%m"`
month=$((${month#0} - 1))
day=`date +"%d"`
hour=`date +"%k"`
minute=`date +"%M"`
minute=${minute#0}
seconds=`date +"%S"`
ns=`date +"%N"`
ms=$((${ns#0} / 1000000))

old="2021,6,3,12,0,0,0"

replace="$year,$month,$day,$hour,$minute,$seconds,$ms"

searchString="s/$regex/$replace/g"
echo $searchString

# replace date in time file
sed -i $searchString $filename

# build 
gatsby build

# Update folder
rm -rf docs
mv public docs

# copy CNAME file in
cp CNAME docs/CNAME

# Git commit and push
git add .
git commit -m "wedding time test"
git push 
