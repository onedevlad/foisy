//@prepros-prepend common.js

var sliderConfig = Object.assign({}, defaultSliderConfig, {
  slidesToScroll: 4,
  slidesToShow: 4,
})

$(document).ready(function() { // Slick config module
  if(jQuery().slick) {
    $('.app-slider').slick(sliderConfig)
    .on('afterChange', function(slick, currentSlideObj){
      var activeCheckbox = currentSlideObj.currentSlide === 0 ? 0 : 1
      $('.slider-control-box.active').removeClass('active')
      $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
      $('.current-slide').html('0' + (activeCheckbox + 1))
    })
  }
})

$(document).ready(function(){
  var handleScrollTimeout
  var counted = false

  $(window).scroll(function(){
    clearTimeout(handleScrollTimeout)
    handleScrollTimeout = setTimeout(function(){
      $('.number-to-count').each(function(){
        if(this.getBoundingClientRect().top > 0 && this.getBoundingClientRect().bottom < window.innerHeight){
          if(!counted){
            var countTo = parseFloat($(this).html())
            var step = Math.ceil(countTo / 100)
            var cur = 0
            var countInterval = setInterval((function(){
              this.innerHTML = cur
              cur = cur + step
              if(cur >= countTo){
                this.innerHTML = countTo
                counted = true
                clearInterval(countInterval)
              }
            }).bind(this), 20)
          }
        }
        else{
          counted = false
        }
      })
    }, 50)
  })
})