$(document).ready(function(){ // Nav module
  var toggleNav = function(){
    $('.nav').toggleClass('active')
  }
  $('.nav-close-button').click(toggleNav)
  $('.nav-open-button').click(toggleNav)
})

$(document).ready(function(){ // Lightbox config module
  lightbox.option({
    maxWidth: $(window).width()/2.5
  })
})

$(document).ready(function(){ // Slick config module
  $('.slick-slider').slick({
    autoPlaySpeed: 3000,
    // autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    }],
  })
  .on('afterChange', function(slick, currentSlideObj){
    var activeCheckbox = currentSlideObj.currentSlide < 3 ? 0 : 1
    console.log(currentSlideObj)
    $('.slider-control-box.active').removeClass('active')
    $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
    $('.current-slide').html('0' + (activeCheckbox + 1))
  })
  $('.slider-control-box').click(function(){
    var index = $(this).index()
    $('.slick-slider').slick('slickGoTo', index ? 4 : 1)
  })
})
