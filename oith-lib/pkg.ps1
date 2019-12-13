pkg -t node12-win .\build\main.js -o .\build\oith7-preprocessor.exe

$date = Get-Date

Move-Item .\build\oith7-preprocessor.exe ("~\OneDrive\OneInThineHand.org\preprocessor\oith7-preprocessor-" + ($Date.ToString('yyyyMMddHHmmss') + '.exe'))
