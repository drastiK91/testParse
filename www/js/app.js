// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    Parse.initialize("XzZvnUPx8kZCtjEckjadkVsaovrcAJPq2nORj5XC", "kMRwZN3C5ANvgfamAl7kke6zkRemnruWhlMVALor");
//browser login se non viene riconosciuto l'os come android o ios
    if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
  window.fbAsyncInit = function() {
      Parse.FacebookUtils.init({
          appId      : '1704523229770319', 
          version    : 'v2.4',
          xfbml      : true
      });
  };
 
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}
  });
})

.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  })  
  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'LoginCtrl'
  });
 
  $urlRouterProvider.otherwise("/");
 
})

