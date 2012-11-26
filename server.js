var express = require('express');
var config = require('./config');
var ips = {};

var app = express();

app.configure
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/setip', function(req, res) {
  var name = req.query.name;
  if (name) {
    if (config.secrets[name] && (config.secrets[name] == req.query.secret)) { 
      ips[name] = {
        ip: (req.query.ip || req.ip),
        updatedAt: (new Date()).getTime()
      };
      res.send(200, name +":"+ ips[name].ip);
    } else {
      res.send(404, "unknown value for name");
    }
  } else {
    res.send(404, "missing parameter: name");
  }
});

app.get('/getip', function(req, res) {
  var name = req.query.name;
  if (name) {
    if (ips[name]) {
      res.send(200, ips[name].ip);
    } else {
      res.send(404, "ip not found for "+name);
    }
  } else {
    res.send(404, "missing parameter: name");
  }
});

app.get('/showips', function(req, res) {
  var list = [];
  var now = (new Date()).getTime();
  for (var name in ips) {
    list.push({
      server:     name,
      ip:         ips[name].ip,
      lastUpdate: Math.floor((now-ips[name].updatedAt) / 1000) + " seconds ago"
    });
  }
  res.render('list.jade', { list: list});
});

app.listen(config.port);
