const Parser = require('icecast-parser');
var lame = require('lame');
var Speaker = require('speaker');

const radioStation = new Parser({
  url: 'http://14003.live.streamtheworld.com/CADENA3.mp3', // URL to radio station
  //keepListen: false, // don't listen radio station after metadata was received
  //autoUpdate: true, // update metadata after interval
  //errorInterval: 10 * 60, // retry connection after 10 minutes
  //emptyInterval: 5 * 60, // retry get metadata after 5 minutes
  //metadataInterval: 5 // update metadata after 5 seconds
});

radioStation.on('error', function(error) {
  console.log(['Connection to', this.getConfig('url'), 'was rejected'].join(' '));
});

radioStation.on('empty', function() {
  console.log(['Radio station', this.getConfig('url'), 'doesn\'t have metadata'].join(' '));
});

radioStation.on('metadata', function(metadata) {
  console.log(metadata);
});

radioStation.on('stream', function(stream) {
  stream
    .pipe(new lame.Decoder())
    .pipe(new Speaker());
});