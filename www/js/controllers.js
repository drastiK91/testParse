var app = angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $cordovaFacebook) {
 
  $scope.data = {};
 
  $scope.signupEmail = function(){
 
  //Create a new user on Parse
  var user = new Parse.User();
  user.set("username", $scope.data.username);
  user.set("password", $scope.data.password);
 
 
  // other fields can be set just like with Parse.Object
  user.set("somethingelse", "like this!");
 
  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      alert("success!");
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
 
};
 
$scope.loginFacebook = function(){
 
  //Browser Login
  if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
 
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        console.log(user);
        if (!user.existed()) {
          alert("User signed up and logged in through Facebook!");
        } else {
          alert("User logged in through Facebook!");
        }
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
 
  } 
  //Native Login
  else {
 
    $cordovaFacebook.login(["public_profile", "email"]).then(function(success){
 
      console.log(success);
 
      //Need to convert expiresIn format from FB to date
      var expiration_date = new Date();
      expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
      expiration_date = expiration_date.toISOString();
 
      var facebookAuthData = {
        "id": success.authResponse.userID,
        "access_token": success.authResponse.accessToken,
        "expiration_date": expiration_date,
        "email": success.authResponse.email
      };
 
      Parse.FacebookUtils.logIn(facebookAuthData, {
        success: function(user) {
          console.log(user);
          user.set("email",facebookAuthData.email)
          if (!user.existed()) {
            alert("User signed up and logged in through Facebook!");
          } else {
            alert("User logged in through Facebook!");
          }
        },
        error: function(user, error) {
          alert("User cancelled the Facebook login or did not fully authorize.");
        }
      });
 
    }, function(error){
      console.log(error);
    });
 
  }
 
};


 $scope.loginEmail = function(){
  var user = Parse.User.logIn($scope.data.username, $scope.data.password, {
    success: function(user) {
      // Do stuff after successful login.
      console.log(user);
      alert("success!");
    },
    error: function(user, error) {
      // The login failed. Check error to see why.
      alert("error!");
    }
  });
};
 
});


