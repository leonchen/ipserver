# server scripts
forever (start|restart|stop) server.js

# usages
```js
// set ip
/setip?name=myServer&secret=secretOfMyServer(&ip=127.0.0.1)
// get ip
/getip?name=myServer
// list ips
/showips
```

# cron task
```js
*/2 * * * * curl "http://<server+port>/setip?name=myServer&secret=secretOfMyServer"
```
