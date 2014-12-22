module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'salaryController.js',
      'test/spec.js'
    ],
    exclude: [],

    browsers : ['Firefox'],
    
    plugins: [
      'karma-jasmine',
      'karma-firefox-launcher'
    ],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false
  });
};
