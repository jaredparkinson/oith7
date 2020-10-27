ts-node src/main.ts --i ../scripture_files --ns ../scripture_files/Port_Settings-*.zip --all
echo "Done"
# rclone copy .cache/flat/ azure:blobtest