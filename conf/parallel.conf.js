username= 'neerajn',
accessKey=  'qJWmY51AY1vdlTC04Kh4iPttDsTgVl330z39YG4FadfqebaTSo',

exports.config = {
  'specs': [ '../specs/single.js' ],

  seleniumAddress: 'https://'+username+':'+accessKey+'@hub.lambdatest.com/wd/hub',

  'commonCapabilities': {
    'build': 'protractor-selenium-sample',
    'name': 'parallel-test',
    'tunnel': true
  },

  'multiCapabilities': [{
    'browserName': 'Chrome',
    'version':'67.0',
    'platform': 'WIN10'
  },{
    'browserName': 'Safari',
    'version':'11.1',
    'platform': 'macOS'
  },{
    'browserName': 'Edge',
    'version':'15.0',
    'platform': 'WIN10'
  },{
    'browserName': 'Firefox',
    'version':'62.0',
    'platform': 'WIN10'
  }],

  onPrepare: () => {

    myReporter = {
        specStarted: function(result) {
          specStr= result.id
          spec_id = parseInt(specStr[specStr.length -1])
          browser.getProcessedConfig().then(function (config) {
            var fullName = config.specs[spec_id];
            //var fileName = fullName.substring(fullName.lastIndexOf('/')+1);
            browser.executeScript("lambda-name="+fullName.split(/(\\|\/)/g).pop())
          });
        }
      };
      jasmine.getEnv().addReporter(myReporter);
  },
  onComplete: () => {
    browser.quit();
  }

};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
