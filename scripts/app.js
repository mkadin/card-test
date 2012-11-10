var baseUrl = 'http://merlin.prospecthillacademy.org/merlin912/app';
$(function () {
  
  // AJAX Error Handling.
      $('body').ajaxError(function (event, xhr, ajaxSettings) {
      if (xhr.status == 406) {
        if (xhr.responseText.indexOf('User is not logged in.') == -1) {
          $.mobile.changePage('#my-account');
          errorPopup('Already Logged In!',"You've already logged into this app");
          return;
        }
        else {
          $.mobile.changePage('#login');
          errorPopup('Logged Out','You have already logged out.');
          return;
        }
      }
      if (xhr.status == 403 || xhr.status == 401) {
        if ($.mobile.activePage.attr('id') == 'login') {
          errorPopup('Try Again','Incorect username / password.  Try again.');
          return;
        }
        $.mobile.changePage('#login');
        return;
      }
    });
  
  
  // Log In Handler
  $('#login-submit-button').click(function () {
    
    var username = $('#username').val();
    var password = $('#password').val();
    var xhr = $.post(baseUrl + "/user/login", { "username": username, "password":password}, function (data) {
        $.mobile.changePage('#my-account');
    });
    
  });
  
  
  // Log Out Handler
  $('.logout-button').click(function () {
    var xhr = $.post(baseUrl + "/user/logout", function () {
      $.mobile.changePage('#login');
    });
  });
});

/**
 * Brings up an error popup.
 * 
 * @var title
 *   The title of the popup.
 * @var text
 *   The text inside the popup.
 */
function errorPopup(title, text) {
  
  $currentPage = $.mobile.activePage;
  
  var $dialog = $currentPage.find('.popup-wrapper');
  $currentPage.find('.popup-title').text(title);
  $currentPage.find('.popup-content').text(text);
  
	$dialog.popup();
  
  $dialog.popup('open');
  
}