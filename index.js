var util = require('util'),
  stream = require('stream'),
  exec = require('child_process').exec,
  spawn = require('child_process').spawn;

util.inherits(Driver,stream);
util.inherits(Device,stream);

var command;
exec('espeak " "', function(err) {
    if (!err) {
      command = "espeak";
    }
});
exec('say " "', function(err) {
    if (!err) {
      command = "say";
    }
});


function Driver(opts,app) {
  var self = this;
  var device;

  app.on('client::up',function(){
    if (command && !device) {
      device = new Device(app);
      self.emit('register', device);
    }

  });

}

function Device(app) {
  var self = this;

  this._app = app;
  this.writeable = true;
  this.readable = false;
  this.V = 0;
  this.D = process.platform === 'darwin'? 1021 : 1020;
  this.G = 'say';
  this.name = 'Say - ' + require('os').hostname();
}

Device.prototype.write = function(data) {
  spawn(command, [data]);
  this._app.log.info('Text-to-speech', data);
};

module.exports = Driver;
