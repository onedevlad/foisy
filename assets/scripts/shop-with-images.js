//@prepros-prepend common.js

//@prepros-prepend ../lib/slick/slick.min.js
//@prepros-prepend ../lib/lightbox/js/lightbox.min.js


var currentFilter = {cats: {}, tags: {}}
var currentSlide = 0

function filter(){
  $('.disabled').removeClass('disabled')
  $('.slide.slick-current').find('.goods').each(function(i, el){
    var foundData = {cats: {}, tags: {}, price: 0}
    var catsArray = $(el).attr('data-cats').split(' ').join().split(',')
    var tagsArray = $(el).attr('data-tags').split(' ').join().split(',')
    catsArray.forEach(function(val, i){foundData.cats[val] = true})
    tagsArray.forEach(function(val, i){foundData.tags[val] = true})
    foundData.price = parseFloat($(el).attr('data-price'))

    var catsMatch = []
    for(var prop in currentFilter.cats){
      if(currentFilter.cats[prop] == foundData.cats[prop]) catsMatch.push(true)
      else catsMatch.push(false)
    }

    var tagsMatch = []
    for(var prop in currentFilter.tags){
      if(currentFilter.tags[prop] == foundData.tags[prop]) tagsMatch.push(true)
      else tagsMatch.push(false)
    }


    if((catsMatch.length !== 0 && catsMatch.indexOf(true) === -1) || 
       (tagsMatch.length !== 0 && tagsMatch.indexOf(true) === -1) ||
       (foundData.price > currentFilter.price)){
      $(el).addClass('disabled')
    }
  })
}

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
      filter()
    })
  }
})

$(document).ready(function(){
  $('.cat').click(function(){
    var currentCatName = $(this).attr('data-cat-name')
    if($(this).hasClass('active')){
      $(this).removeClass('active')
      delete currentFilter.cats[currentCatName]
    }
    else{
      currentFilter.cats[currentCatName] = true
      $(this).addClass('active')
    }
    filter()
  })
  $('.tag').click(function(){
    var currentTagName = $(this).attr('data-tag-name')
    if($(this).hasClass('active')){
      $(this).removeClass('active')
      delete currentFilter.tags[currentTagName]
    }
    else{
      currentFilter.tags[currentTagName] = true
      $(this).addClass('active')
    }
    filter()
  })
  $('.range').on('input', function(){
    var maxPrice = $(this).val()
    $('.range-output').html(maxPrice)
    currentFilter.price = maxPrice
    filter()
  })
})