# # Copy-Item ~\OneDrive\OneInThineHand.org\notes\Overlay_Test.zip ..\scripture_files\november_subdomains\oneinthinehand.org
# # Copy-Item ~\OneDrive\OneInThineHand.org\notes\Overlay_Types_Dev.zip ..\scripture_files\november_subdomains\oneinthinehand.org
# ts-node.cmd .\src\main.ts --i ..\scripture_files\november_subdomains\oneinthinehand.org --ns ..\scripture_files\november_subdomains\oneinthinehand.org\Overlay_Types_Dev.zip --all
# # Get-ChildItem .\.cache\flat\ | ForEach-Object { $_.BaseName.Split('-')[0] } | Get-Unique | ForEach-Object {
# #     if ($_.Length -eq 3) {
# #         mkdir ('.cache\flat\' + $_)
# #         mv ('.cache\flat\' + $_ + '*.json')  ('.cache\flat\' + $_)

# #     }
# # }



# rclone move .\.cache\flat\ azure:blobtest




. '.\process_files.ps1'

processFiles -folderName  'dev' -settings $false -storage 'blobtest'
