var util = require('util'),
  stream = require('stream'),
  exec = require('child_process').exec;

util.inherits(Driver,stream);
util.inherits(Device,stream);

function Driver(opts,app) {
  var self = this;

  app.on('client::up',function(){
    self.emit('register', new Device(app));
  });

}

function Device(app) {
  var self = this;

  this._app = app;
  this.writeable = true;
  this.readable = false;
  this.V = 0;
  this.D = 240; // display_text, should be speech
  this.G = 'say';
  this.name = 'Say - ' + require('os').hostname();
}

Device.prototype.write = function(data) {
  exec('say ' + data);
  this._app.log.info('Opening URL', url);
};

module.exports = Driver;
