//@prepros-prepend common.js

var sliderConfig = Object.assign({}, defaultSliderConfig, {
  slidesToScroll: 1,
  slidesToShow: 1,
  autoplay: false,
  fade: false,
  lazyLoad: 'progressive',
  responsive: [{
    breakpoint: 992,
    settings: {
      fade: false,
    },
  }],
})

$(document).ready(function(){
  if(jQuery().slick) {
     $('.numbers-slider-controls .slider-control').each(function(i, el){
      $(el).click(function(){
        $('.shop-lazy-slider').slick('slickGoTo', i)
        $(el).parent().find('.active').removeClass('active')
        $(el).addClass('active')
      })
    })
    $('.shop-lazy-slider').slick(sliderConfig)
    .on('afterChange', function(slick, currentSlideObj){
      $('.numbers-slider-controls .slider-control.active').removeClass('active')
      $('.numbers-slider-controls .slider-control').eq(currentSlideObj.currentSlide).addClass('active')
    })
  }
})