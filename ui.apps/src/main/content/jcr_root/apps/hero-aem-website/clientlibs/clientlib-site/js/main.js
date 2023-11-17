function implementDigitalData() {
  if ($("#contact-us-container").length > 0) {
    if (window.digitalData) {
      if (!$(this).parent().is("[data-office]")) {
        window.digitalData = {
          event: "Phone Number Clicked",
          PhoneDetails: {
            phonenumber: $(this).text().replace(/[\n,]/g, "").trim(),
            DealerName: "Not Applicable",
            State: $(".showAdd h1").text().trim(),
            City: "Not Applicable",
            Vehicle: "Not Applicable",
            Page: "Contact Us",
          },
        };
      } else {
        window.digitalData = {
          event: "Phone Number Clicked",
          PhoneDetails: {
            phonenumber: $(this).text().replace(/[\n,]/g, "").trim(),
            DealerName: $(this).parent().data("office"),
            State: $(".showAdd h1").text().trim(),
            City: "Not Applicable",
            Vehicle: "Not Applicable",
            Page: "Contact Us",
          },
        };
      }
    }
  }
  if ($("#contact-metrology-datalayer").length > 0) {
    window.digitalData = {
      event: "Phone Number Clicked",
      PhoneDetails: {
        phonenumber: $(this).text().replace(/[\n,]/g, "").trim(),
        Page: "Contact Us - Legal Metrology",
      },
    };
  }
  if ($("#find-dealer-link").length > 0) {
    window.digitalData = {
      event: "Phone Number Clicked",
      PhoneDetails: {
        PhoneNumber: $(this).text().replace(/[\n,]/g, "").trim(),
        DealerName: $(this)
          .parent()
          .parent()
          .parent()
          .find(".near-you-h3")
          .text()
          .trim(),
        State: $(".near-you-section button#stateDropdown").text().trim(),
        City: $(".near-you-section button#cityDropdown").text().trim(),
        Vehicle: pageTitle,
        Page: pageTitle,
      },
    };
  }
}

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform =
      window.navigator?.userAgentData?.platform ||
      window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K", "macOS"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

let submitClicked = false;

$(document).ready(function () {

  $('form').attr('translate', 'no')

  if ($('#joyride-img-margin').length > 0) {
    $('.image').each(function () {
      if ($(this).find('.d-sm-block.d-none').length > 0) {
        $(this).css('margin', '0');
      }
    });
  }

  $('a[href^="tel"]').bind("click", implementDigitalData);

  $("a, button").on("click", function () {
    let btnVal = $(this).text();
    let bookNow = "book now";
    let requestCallBack = "request call back";
    let requestCallBack2 = "request callback";
    let knowMore = "know more";
    let knowMore2 = "Know More >";
    let view = "view 360";
    let view2 = "explore";
    let testRide = "test ride";
    let component = $(this).parent().attr("id");
    let slideNum = 0;
    if ($(this).parent().attr("id") == "adcarousel") {
      $(".carousel-item#adcarousel").each(function () {
        if ($(this).hasClass("active")) {
          slideNum = $(this).index() + 1;
        }
      });
    } else {
      $(".carousel-item#carousel").each(function () {
        if ($(this).hasClass("active")) {
          slideNum = $(this).index() + 1;
        }
      });
    }
    if ($(this).attr("aa-data-cta")) {
      component = $(this).attr("aa-data-cta");
    } else if ($(this).parent().attr("id")) {
      component = $(this).parent().attr("id");
    }
    if (component == undefined) {
      component = "Not a Slider";
      slideNum = 0;
    }
    if (btnVal && btnVal.toLowerCase().trim() == bookNow.toLowerCase()) {
      window.digitalData = {
        event: "CTA Button Click",
        CTADetails: {
          text: btnVal.trim(),
          location: pageTitle + "-" + component + "-" + slideNum,
        },
      };
    }
    if (
      (btnVal &&
        btnVal.toLowerCase().trim() == requestCallBack.toLowerCase()) ||
      btnVal.toLowerCase().trim() == requestCallBack2.toLowerCase()
    ) {
      window.digitalData = {
        event: "CTA Button Click",
        CTADetails: {
          text: btnVal.trim(),
          location: pageTitle + "-" + component + "-" + slideNum,
        },
      };
    }
    if (
      (btnVal && btnVal.toLowerCase().trim() == knowMore.toLowerCase()) ||
      btnVal.toLowerCase().trim() == knowMore2.toLowerCase()
    ) {
      window.digitalData = {
        event: "CTA Button Click",
        CTADetails: {
          text: btnVal.trim(),
          location: pageTitle + "-" + component + "-" + slideNum,
        },
      };
    }
    if (
      (btnVal && btnVal.toLowerCase().trim() == view.toLowerCase()) ||
      btnVal.toLowerCase().trim() == view2.toLowerCase()
    ) {
      window.digitalData = {
        event: "CTA Button Click",
        CTADetails: {
          text: btnVal.trim(),
          location: pageTitle + "-" + component + "-" + slideNum,
        },
      };
    }
    if (btnVal && btnVal.toLowerCase().trim() == testRide.toLowerCase()) {
      window.digitalData = {
        event: "CTA Button Click",
        CTADetails: {
          text: btnVal.trim(),
          location: pageTitle + "-" + component + "-" + slideNum,
        },
      };
    }
  });

  let pagePath = window.location.pathname;
  let slug = pagePath.split("/");
  let actualSlug = slug[1].replace(".html", "");
  let primary_category = window.location.origin;
  let fullSplit = primary_category.split("//");
  let pcSplit = fullSplit[1].split(".");
  let title = $("title").text();
  let sub1 = "";
  let sub2 = "";
  let sub3 = "";
  let sub4 = "";
  if ($(".cmp-breadcrumb .breadcrumb-item:eq(0) span").text()) {
    sub1 = $(".cmp-breadcrumb .breadcrumb-item:eq(0) span").text();
    if ($(".cmp-breadcrumb .breadcrumb-item:eq(1) span").text())
      sub2 = $(".cmp-breadcrumb .breadcrumb-item:eq(1) span").text();
    if ($(".cmp-breadcrumb .breadcrumb-item:eq(2) span").text())
      sub3 = $(".cmp-breadcrumb .breadcrumb-item:eq(2) span").text();
    if ($(".cmp-breadcrumb .breadcrumb-item:eq(3) span").text())
      sub4 = $(".cmp-breadcrumb .breadcrumb-item:eq(3) span").text();
  } else {
    if (slug[2]) sub1 = slug[2].replace(".html", "");
    if (slug[3]) sub2 = slug[3].replace(".html", "");
    if (slug[4]) sub3 = slug[4].replace(".html", "");
    if (slug[5]) sub4 = slug[5].replace(".html", "");
  }

  window.digitalData = {
    event: "pageView",
    page: {
      siteType: "AEM",
      siteCategory: pcSplit[0],
      fullReferringUrl: document.referrer,
      fullSlug: actualSlug,
      fullURL: window.location.href,
      hostName: window.location.origin,
      pagename: pageTitle,
      PageTitle: title,
      pageURL: window.location.href,
      path: window.location.pathname,
      category: sub1,
      categorylevel1: sub2,
      categorylevel2: sub3,
      categorylevel3: sub4,
      country: current_country,
      Language: current_language,
      product: pageTitle,
    },
  };

  $(".top-bar-link").on("click", function () {
    let clickedText = $(this).text();
    if (clickedText && clickedText.trim().toLowerCase() == "login") {
      window.digitalData = {
        event: "Header Login Clicked",
        LoginDetails: {
          CTAText: clickedText.trim(),
        },
      };
    }
  });

  $('header .dropdown-item.logout-dd-linkWrap').click(function (event) {
    let spanText = $(this).find('span').text();
    let lowercaseString = spanText.replace(/\s+/g, '').toLowerCase();
    // let cookieData = decodeURIComponent(atob(getCookie('data')));
    // let parseCookieData = JSON.parse(cookieData);
    // let userId = parseCookieData && parseCookieData.mobile;
    if (window.digitalData) {
      if (lowercaseString == "myaccount") {
        window.digitalData = {
          event: "My Account Link Clicked",
        };
      }
      else if (lowercaseString == "myvehicle") {
        window.digitalData = {
          event: "My Vehicles Link Clicked",
        };
      }
      else if (lowercaseString == "logout") {
        window.digitalData = {
          event: "Logout Link Clicked",
        };
      }
    }
  });

  $('.profile-update .myvehicle-profile-pic a').click(function (event) {
    let ctaString = $(this).text().replace(/\s+/g, '').toLowerCase();
    if (window.digitalData) {
      if (ctaString == "viewaccount") {
        window.digitalData = {
          event: "View Account Link Clicked",
          profileDetails: {
          },
        };
      }
    }
  });

  $('.cardTiles .my-vehicle-card .card a.cardFooter').click(function (event) {
    let ctaString = $(this).find('.cardFootLink').text().replace(/\s+/g, '').toLowerCase();
    let clickSection = $(this).parent().data('subtype')
    if (window.digitalData) {
      if (clickSection == "book-service") {
        if (ctaString == "booknow") {
          window.digitalData = {
            event: "Service Book Now Link Clicked",
            serviceDetails: {
              VehicleName: $('.myVehicle-name .myVehicle-modal').text().toLowerCase(),
              VehicleVinNumber: $('.details .vin-no').text().toLowerCase()
            }
          }
        }
        else if (ctaString == "viewdetails") {
          window.digitalData = {
            event: "Service View Details Link Clicked",
            serviceDetails: {
              VehicleName: $('.myVehicle-name .myVehicle-modal').text().toLowerCase(),
              VehicleVinNumber: $('.details .vin-no').text().toLowerCase()
            }
          }
        }
      }
      else if (clickSection == "goodlife") {
        if (ctaString == "joinnow") {
          window.digitalData = {
            event: "Good Life Join Now Link Clicked",
            serviceDetails: {
              VehicleName: $('.myVehicle-name .myVehicle-modal').text().toLowerCase(),
              VehicleVinNumber: $('.details .vin-no').text().toLowerCase()
            }
          }
        }
        else if (ctaString == "viewdetails") {
          window.digitalData = {
            event: "Good Life View Details Link Clicked",
            serviceDetails: {
              VehicleName: $('.myVehicle-name .myVehicle-modal').text().toLowerCase(),
              VehicleVinNumber: $('.details .vin-no').text().toLowerCase()
            }
          }
        }
      }
      else if (clickSection == "joyride") {
        if (ctaString == "joinnow") {
          window.digitalData = {
            event: "Joy Ride Join Now Link Clicked",
            serviceDetails: {
              VehicleName: $('.myVehicle-name .myVehicle-modal').text().toLowerCase(),
              VehicleVinNumber: $('.details .vin-no').text().toLowerCase()
            }
          }
        }
      }
    }
  })

  $('#book-serve-first .book-now-btn.nxt-btn').click(function (event) {
    if (window.digitalData) {
      window.digitalData = {
        event: "Service Booking Step 1",
        vehicleDetails: {
          VehicleName: $('.hero-text .bikeName').text().toLowerCase(),
          VehicleVinNumber: JSON.parse(atob(getCookie('selectedVehicleData'))).vinNO,
          SelectedDate: $('.rescalendar_controls .refDate').val(),
          SelectedTime: $('.active.selected .time-wrap').text(),
          ServiceType: $('.service-type-container .service-type-process.active .service-type-form-chk .servicetype-label').text().toLowerCase()
        }
      }
    }
  })

  $('#details .location-icon').click(function (event) {
    if (window.digitalData) {
      window.digitalData = {
        event: "Use Location Link Clicked",
        serviceDetails: {
          VehicleName: $('.hero-text .bikeName').text().toLowerCase(),
          VehicleVinNumber: JSON.parse(atob(getCookie('selectedVehicleData'))).vinNO
        }
      }
    }
  })

  $('#dealer-sec-container .dealer-button-container .foot-btn .book-now-btn.nxt-btn.dealer-nxt').click(function (event) {
    if (window.digitalData) {
      window.digitalData = {
        event: "Service Booking Step 2",
        vehicleDetails: {
          VehicleName: $('.hero-text .bikeName').text().toLowerCase(),
          VehicleVinNumber: JSON.parse(atob(getCookie('selectedVehicleData'))).vinNO,
          DealerState: $('#details .formfield #dealerstateDropdown').text().toLowerCase(),
          DealerCity: $('#details .formfield #dealercityDropdown').text().toLowerCase(),
          DealerName: $('.dealers-card input[type="checkbox"]:checked').siblings('.dealer-address').find('#dealerName').text().toLowerCase(),
        }
      }
    }
  })

  $('#self-jobcard-container .dealer-button-container .foot-btn #job-crd-nxt-btn').click(function (event) {
    if (window.digitalData) {
      let checkedValues = [];
      $('.job-card-check-box input[type="checkbox"]:checked').each(function () {
        checkedValues.push($(this).data('checkbox-value'));
      });
      let displayedValues = checkedValues.join(' | ');
      if (displayedValues.length > 0) {
        displayedValues = displayedValues.substring(displayedValues.indexOf(' ') + 1);
        displayedValues = displayedValues.replace(/^[\s|]+/g, '');
      }
      window.digitalData = {
        event: "Service Booking Step 3",
        vehicleDetails: {
          VehicleName: $('.hero-text .bikeName').text().toLowerCase(),
          VehicleVinNumber: JSON.parse(atob(getCookie('selectedVehicleData'))).vinNO,
          SelectedIssues: displayedValues,
        }
      }
    }
  })

  // Popup on Inactivity

  let inactivityTime = 10000;
  let modalTimer;

  function modalIsOpen() {
    return $("#requestCallBack").hasClass("show");
  }

  function resetTimer() {
    clearTimeout(modalTimer);
    modalTimer = setTimeout(function () {
      if (!modalIsOpen() && !submitClicked) {
        openModal();
      }
    }, inactivityTime);
  }

  function openModal() {
    $("#requestCallBack").modal("show");
  }

  if (window.location.href.indexOf("/en-in/scooters") !== -1 || window.location.href.indexOf("/en-in/motorcycles") !== -1) {
    modalTimer = setTimeout(function () {
      if (!modalIsOpen()) {
        openModal();
      }
    }, inactivityTime);
    $("#requestCallBack").on("hidden.bs.modal", function () {
      resetTimer();
    });

    $(window).on("scroll", function () {
      resetTimer();
    });

    $('#requestCallBack .modal-body button.close:not(.form-close)').click(function () {
      submitClicked = true;
    })

    $(document).on("click", function () {
      resetTimer();
    });
  }

  if ($(window).width() < 992) {
    console.log('abc')
    var lastScrollTop = 0;
    var navbar = $('.hide-navigation');
    var navbarHeight = navbar.outerHeight();
    $(window).scroll(function () {
      var scrollTop = $(this).scrollTop();

      if (Math.abs(lastScrollTop - scrollTop) <= Math.round(navbarHeight))
        return;

      // Scroll down
      if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
        navbar.css('top', '-100%');
        navbar.closest('body').find('main .hero-breadcrumb').css('margin-top', '0');
      }
      // Scroll up
      else {
        navbar.css('top', '0');
        navbar.closest('body').find('main .hero-breadcrumb').css('margin-top', navbarHeight);
      }

      lastScrollTop = scrollTop;
    });
  }

  $('#logIn .login-modal .login-content .close').on('click', function () {
    if(window.location.href.includes('/en-in/good-life/goodlife-plans/gold-enrollment-form'))
    {
      history.back()
    } 
  })

  $('.header-main .navbar-toggler').on('click', function(){
    let countryFlag = $('.top-bar-option:first-child').hasClass('d-none');
    let hamburgerClose = '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/hamburger-close.svg';
    let hamburger= '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/hamburger-icon.svg';
    if(countryFlag){
      $('.navbar-toggler .img-fluid').attr('src' , hamburgerClose);
      $('.top-bar-option:first-child').removeClass('d-none');
    }else{
      $('.navbar-toggler .img-fluid').attr('src' , hamburger);
      $('.top-bar-option:first-child').addClass('d-none');
    }
  })
  if (window.innerWidth <= 991) {
    $('.top-bar-option:first-child').addClass('d-none');
  }
});
