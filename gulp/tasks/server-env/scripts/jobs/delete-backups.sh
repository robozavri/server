TO_LEAVE_COUNT=3

cd ~/mongodb-backups

TOTAL_COUNT=$(ls | wc -l)
TO_DELETE_COUNT=$(($TOTAL_COUNT - $TO_LEAVE_COUNT))
TO_DELETE_COUNT=$((TO_DELETE_COUNT > 0 ? TO_DELETE_COUNT : 0))

for FILE in $(ls | sort | head -n $TO_DELETE_COUNT)
do
  echo "deleting: $FILE"
  rm -rf $FILE
done
