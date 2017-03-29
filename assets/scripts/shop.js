//@prepros-prepend common.js

//@prepros-prepend ../lib/slick/slick.min.js
//@prepros-prepend ../lib/lightbox/js/lightbox.min.js


var fadeSliderConfig = Object.assign({}, defaultSliderConfig, {
  slidesToScroll: 1,
  slidesToShow: 1,
  fade: true,
  responsive: [{
    breakpoint: 992,
    settings: {
      fade: false,
    },
  }],
})

var repliesSliderConfig = Object.assign({}, defaultSliderConfig, {
  slidesToScroll: 1,
  slidesToShow: 1,
})

$(document).ready(function(){
  if(jQuery().slick) {
    $('.shop-fade-slider').slick(fadeSliderConfig)
    .on('afterChange', function(slick, currentSlideObj){
      var activeCheckbox = 0
      if(currentSlideObj.currentSlide) activeCheckbox = 1
      $('.slider-control-box.active').removeClass('active')
      $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
      $('.current-slide').html('0' + (activeCheckbox + 1))
    })
    $('.img-preview').each(function(i, el){
      $(el).click(function(){
        $('.shop-fade-slider').slick('slickGoTo', i)
      })
    })
    
    $('.shop-replies-slider').slick(repliesSliderConfig)
    .on('afterChange', function(slick, currentSlideObj){
      var activeCheckbox = 0
      if(currentSlideObj.currentSlide) activeCheckbox = 1
      $('.slider-control-box.active').removeClass('active')
      $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
      $('.current-slide').html('0' + (activeCheckbox + 1))
    })
    $('.next-arrow').click(function(){
      $('.shop-replies-slider').slick('slickNext')
    })
  }
})