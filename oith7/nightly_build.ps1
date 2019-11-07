

npm run prod

Set-Location .\dist\browser
tar -czf ../../nightly.tar.gz *.*
Set-Location ../..
scp -P 7822 nightly.tar.gz oneinthi@oneinthinehand.org:files.oneinthinehand.org/

ssh -t oneinthi@oneinthinehand.org -p 7822 'cd files.oneinthinehand.org && tar xvf nightly.tar.gz -C ../nightly.oneinthinehand.org > /dev/null'
# ssh -t oneinthi@oneinthinehand.org -p 7822 'cd canary.oneinthinehand.org && tar xvf nightly.tar.gz'

Remove-Item .\nightly.tar.gz
