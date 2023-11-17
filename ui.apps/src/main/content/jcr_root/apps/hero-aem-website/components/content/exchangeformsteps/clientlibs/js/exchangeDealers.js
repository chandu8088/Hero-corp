$(document).ready(function() {

    const exchangeSliderLength = $('.exchange-dealers').length;
    const browserWidth = $(window).width();

    if(browserWidth > 1200 && exchangeSliderLength < 5) {
      $('.exchg-dealers-wrap .exchange-dealers').addClass('dealers-outer-wrap');
      $('.exchg-dealers-wrap .exchg-dealers-options').addClass('w-100');
    }

    

    var tipsExchange = $('#exchangeList .tips-inner-wrap');
    var exchangeTipsIndex = 0;

    var tipsVehicle = $('#vehicleList .tips-inner-wrap');
    var vehicleTipsIndex = 0;

    var tipsMonth = $('#monthList .tips-inner-wrap');
    var MonthTipsIndex = 0;

    var tipsSilencer = $('#silencerList .tips-inner-wrap');
    var silencerTipsIndex = 0;

    var tipsStarting = $('#startingList .tips-inner-wrap');
    var startingTipsIndex = 0;

    var tipsLights = $('#lightsList .tips-inner-wrap');
    var lightsTipsIndex = 0;
    
    var tipsTyres = $('#tyresList .tips-inner-wrap');
    var tyresTipsIndex = 0;

    var tipsRearTyres = $('#rearTyresList .tips-inner-wrap');
    var rearTyresTipsIndex = 0;

    var tipsParts = $('#partsList .tips-inner-wrap');
    var partsTipsIndex = 0;

    function showNextDiv(tipsEle, tipsIndex) {
        tipsEle.eq(tipsIndex).fadeIn(500, function() {
            setTimeout(function() {
                tipsEle.eq(tipsIndex).fadeOut(500, function() {
                    tipsIndex = (tipsIndex + 1) % tipsEle.length;
                showNextDiv(tipsEle, tipsIndex);
            });
            }, 5000); // 5 seconds
        }).css('display', 'flex');
    }
    
    showNextDiv(tipsExchange, exchangeTipsIndex);
    showNextDiv(tipsVehicle, vehicleTipsIndex);
    showNextDiv(tipsMonth, MonthTipsIndex);
    showNextDiv(tipsSilencer, silencerTipsIndex);
    showNextDiv(tipsStarting, startingTipsIndex);
    showNextDiv(tipsLights, lightsTipsIndex);
    showNextDiv(tipsTyres, tyresTipsIndex);
    showNextDiv(tipsRearTyres, rearTyresTipsIndex);
    showNextDiv(tipsParts, partsTipsIndex);

    const exchangeDealerSlick = {
    infinite: false,
    autoplay: false,
    dots: true,
    prevArrow: false,
    nextArrow: false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 9999,
        settings: exchangeSliderLength > 4 ? {
            slidesToShow: 4,
            slidesToScroll: 4,
        } : "unslick",
      },
      {
        breakpoint: 1200,
        settings: exchangeSliderLength > 3 ? {
            slidesToShow: 3,
            slidesToScroll: 3,
        } : "unslick",
      },
      {
        breakpoint: 900,
        settings: exchangeSliderLength > 2 ? {
            slidesToShow: 2,
            slidesToScroll: 2,
        } : "unslick",
      },
      {
        breakpoint: 480,
        settings: exchangeSliderLength > 1 ? {
            slidesToShow: 1,
            slidesToScroll: 1,
        } : "unslick",
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  
  $(".exchange-banner .exchg-dealers-wrap").slick(exchangeDealerSlick);

    var width = $(window).width();
    $(window).on('resize', function() {
      if ($(this).width() !== width) {
          width = $(this).width();
          console.log(width, exchangeSliderLength);
          if(width > 1200 && exchangeSliderLength < 5) {
            $('.exchg-dealers-wrap .exchange-dealers').addClass('dealers-outer-wrap');
            $('.exchg-dealers-wrap .exchg-dealers-options').addClass('w-100'); 
          }
      }
    });
});