$(document).ready(function () {
  $(".gallary-carousel").slick({
    slidesToShow: 1,
    dots: true,
    centerMode: false,
    rows: 1,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: false,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  });

  let modelOpened = true;
  $("#fullscreenGallery").on("shown.bs.modal", function (e) {
    console.log("initialize");
    if (modelOpened) {
      $(".gallary-carousel-mobile").slick({
        slidesToShow: 1,
        dots: false,
        centerMode: false,
        slidesToScroll: 1,
        infinite: true,
        adaptiveHeight: true,
      });
      modelOpened = false;
    }
  });

  $("#gallery-slider .gallery-slide a").on("click", function (event) {
    event.preventDefault();
    $("#fullscreenGallery").modal("show");
    $('html').css({
      overflow: 'hidden',
      height: '100vh'
    });
    $("body").addClass("gallery-modal-popup");
    let slickIndex = parseInt($(this).data("modal-index"));
    $(".gallary-carousel-mobile").slick("slickGoTo", slickIndex);
  });

  $(".gallary-carousel-mobile-image .close ").on("click", function () {
    $('html').css({
      overflow: '',
      height: ''
    });
    $("body").removeClass("gallery-modal-popup");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
    screen.orientation.lock("portrait-primary");
  });

  $("#fullscreenGallery .fullscreen-button").on("click", function () {
    var elem = document.getElementById("fullscreenGallery");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    } else if (elem.webkitFullscreenElement) {
      elem.webkitCancelFullScreen();
    }
    if (screen.orientation.type === "portrait-primary") {
      screen.orientation
        .lock("landscape-primary")
        .catch(function (error) {
          alert(error);
        });
    }
  });

  $('.custom-cvg-popup').simpleLightboxCustom();
});

$(document).on("click", ".gallery-download-link", function (event) {
  event.preventDefault();
  event.stopPropagation();
  downloadActiveSlideImage();
});

function downloadActiveSlideImage() {
  var imageUrl = $(
    ".slick-active .gallary-carousel-mobile-image .popup-img"
  ).attr("src");

  if (imageUrl) {
    let imageName = imageUrl.split("/");
    var link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageName[imageName.length - 1]; // file name
    link.click();
  }
}


