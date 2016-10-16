$(document).ready(function(){
  var handleScrollTimeout
  var counted = false
  var numbers = []

  $(window).scroll(function(){
    clearTimeout(handleScrollTimeout)
    $('.number-to-count').each(function(){
      numbers.push(parseFloat($(this).html()))
    })

    handleScrollTimeout = setTimeout(function(){
      $('.number-to-count').each(function(i){
        if(this.getBoundingClientRect().top > 0 && this.getBoundingClientRect().bottom < window.innerHeight){
          if(!counted){
            var countTo = numbers[i]
            var needsSeparator = false
            var dotPosition = countTo.toString().indexOf('.')
            if(~dotPosition) {
              if(countTo.toString().length - dotPosition > 2){
                countTo = countTo.toString().replace('.', '')
                needsSeparator = true
              }
            }
            var step = Math.ceil(countTo / 100)
            var cur = 0
            var countInterval = setInterval((function(){
              this.innerHTML = cur
              cur = cur + step
              if(cur >= countTo){
                this.innerHTML = !needsSeparator ? countTo : countTo.slice(0, dotPosition) + '.' + countTo.slice(dotPosition)
                counted = true
                clearInterval(countInterval)
              }
            }).bind(this), 20)
          }
        }
        else{
          console.log(1)
          counted = false
        }
      })
    }, 50)
  })
})