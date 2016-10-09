//@prepros-prepend common.js

var sliderConfig = Object.assign({}, defaultSliderConfig, {
  slidesToScroll: 1,
  slidesToShow: 1,
})

$(document).ready(function(){
  if(jQuery().slick) {
    $('.home-shop-slider').slick(sliderConfig)
    .on('afterChange', function(slick, currentSlideObj){
      var activeCheckbox = 0
      if(currentSlideObj.currentSlide) activeCheckbox = 1
      $('.slider-control-box.active').removeClass('active')
      $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
      $('.current-slide').html('0' + (activeCheckbox + 1))
    })
    $('.slider-control-box').click(function(){
      var index = $(this).index()
      $('.home-shop-slider').slick('slickGoTo', index)
    })
  }
})
