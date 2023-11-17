$(document).ready(function () {
    const exchangeChooseSlick = {
        infinite: false,
        autoplay: true,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 9999,
            settings: "unslick",
          },
          {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
      };
    
      
    $(".exchange-choose-row").slick(exchangeChooseSlick);
})