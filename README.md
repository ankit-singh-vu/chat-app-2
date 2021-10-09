# chat-app-2

open this project in vs code
install live server from vscode view->extensions->search "live server" made by Ritwick Dey->install 
right click index.html and open with live server 
a browser opens


in vscode go to terminal->new terminal 
cd nodeServer
node index.js
------------
still it will not work beacause of cross origin problem.
for working cross origin, create a bat file with following contents-
(change Dell to your user)

//for windows
cd C:\Program Files x86)\Google\Chrome\Application
chrome.exe --user-data-dir="C:\Users\Dell\Documents\my\data" --disable-web-security
------
click on bat file
a browser opens
hit this url  http://127.0.0.1:5500/


//for linux
open terminal and enter-
google-chrome --disable-site-isolation-trials --disable-web-security --user-data-dir="~/tmp"
hit this url  http://127.0.0.1:5500/

enjoy!!
