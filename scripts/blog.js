$(document).ready(function(){ // Nav module
  var toggleNav = function(){
    $('.nav').toggleClass('active')
  }
  $('.nav-close-button').click(toggleNav)
  $('.nav-open-button').click(toggleNav)
})