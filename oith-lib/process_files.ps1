function processFiles($folderName, $settings, $storage) {

    Remove-Item -r ..\scripture_files;

    mkdir ..\scripture_files;
    Copy-Item ('D:\OneDrive\OneInThineHand.org\notes\' + $folderName + '.oneinthinehand.org') ..\scripture_files -Recurse -Force

    if ($settings -eq $true) {
        ts-node.cmd .\src\main.ts --i ..\scripture_files\ --ns ('..\scripture_files\' + $folderName + '.oneinthinehand.org\note_settings_' + $folderName + '.zip')  --settings ('eng-' + $folderName)

    }
    else {
        if ($folderName -ne 'soglo') {

            Copy-Item D:\OneDrive\OneInThineHand.org\notes\other_notes -Recurse -Force ..\scripture_files
        }
        Copy-Item D:\OneDrive\OneInThineHand.org\scripture_files\eng.zip ..\scripture_files
        Copy-Item D:\OneDrive\OneInThineHand.org\scripture_files\basic-kjv-bible.zip  ..\scripture_files
        ts-node.cmd .\src\main.ts --i ..\scripture_files\ --ns ('..\scripture_files\' + $folderName + '.oneinthinehand.org\note_settings_' + $folderName + '.zip')  --all
    }


    # rclone move .\.cache\flat\ azure:novembertest

    # ts-node.cmd .\src\main.ts --i ..\scripture_files\ --ns '..\scripture_files\b.oneinthinehand.org\note_settings_'+ $folderName + '.zip' --all

    rclone copy .\.cache\flat\ ('azure:' + $storage)


}
