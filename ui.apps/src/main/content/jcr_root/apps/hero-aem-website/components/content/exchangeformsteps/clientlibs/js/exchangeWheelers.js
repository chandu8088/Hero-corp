$(document).ready(function() {

  const wheelersListJSON = $('.exchg-wheeler-wrap .exchg-wheeler-carousel').attr('data-wheelerList');

  const response2WheelerData =  JSON.parse(wheelersListJSON);
  const wheelerHtmlList = $('#step-4 .exchg-wheeler-carousel');
  const wheelerModalHtmlList = $('.wheeler-modal-content .wheeler-modal-body');
  response2WheelerData?.forEach(function(wheelerData, index) {
      if (index < 8) {
          const appendHtml = `<div class="wheelers-outer-wrap">
          <div class="exchg-wheelers-options d-flex">
              <input id="${'wheeler' + index}" type="radio" name="exchgWheeler" value="${wheelerData.name}"
                  class="active mt-1 position-absolute exchg-wheeler-input">
              <label class="text-center m-0 exchg-wheeler-label pr-0" data-toggle="modal"
                  data-target="#wheelerConfirmModal" for="${'wheeler' + index}">
                  <div class="exchg-wheelers-contents">
                      <div class="exchg-wheelers-tag-wrap">
                          <img src="/content/dam/hero-aem-website/in/exchange---assets/exchange_exclusive.png"
                              class="exchg-wheelers-tag-img" alt="exchange tag">
                          <div class="exchg-wheelers-tag-text">Exchange Price</div>
                      </div>
                      <div class="exchg-wheelers-img-wrap">
                          <img src="${wheelerData.image}" class=""
                              alt="exchange image">
                      </div>
                      <div class="exchg-wheelers-details-wrap">
                          <div class="exchg-wheelers-name">${wheelerData.name}</div>
                          <div class="exchg-wheelers-price">₹ ${wheelerData.price}*</div>
                      </div>
                  </div>
              </label>
          </div>
      </div>`
          $(wheelerHtmlList).append(appendHtml);
      } else if (index >= 8) {
          const appendHtml = `<div class="wheelers-outer-wrap">
          <div class="exchg-wheelers-options d-flex">
              <input id="${'wheelerModal' + index}" type="radio" name="exchgWheeler" value="${wheelerData.name}"
                  class="active mt-1 position-absolute exchg-wheeler-input">
              <label class="text-center m-0 exchg-wheeler-label pr-0" data-toggle="modal"
                  data-target="#wheelerConfirmModal" for="${'wheelerModal' + index}">
                  <div class="exchg-wheelers-contents">
                      <div class="exchg-wheelers-tag-wrap">
                          <img src="/content/dam/hero-aem-website/in/exchange---assets/exchange_exclusive.png"
                              class="exchg-wheelers-tag-img" alt="exchange tag">
                          <div class="exchg-wheelers-tag-text">Exchange Price</div>
                      </div>
                      <div class="exchg-wheelers-img-wrap">
                          <img src="${wheelerData.image}"
                              class="" alt="exchange image">
                      </div>
                      <div class="exchg-wheelers-details-wrap">
                          <div class="exchg-wheelers-name">${wheelerData.name}</div>
                          <div class="exchg-wheelers-price">₹ ${wheelerData.price}*</div>
                      </div>
                  </div>
              </label>
          </div>
      </div>`
          $(wheelerModalHtmlList).append(appendHtml);
      }
  });

  $('.exchg-wheeler-carousel input, .wheeler-modal-body input').click(function() {
    const checkedDealer = $('.exchg-dealers-wrap input').filter(":checked").parent().find('label .exchg-dealers-name').html();
    if(!checkedDealer) {
      $('.wheeler-confirm-butons .booknow-btn').removeClass('exchg-disable-login');
      $('#wheelerConfirmModal #confirmDealerText').removeClass('text-danger');
      $('.wheeler-confirm-butons .booknow-btn').addClass('exchg-disable-login');
      $('#wheelerConfirmModal #confirmDealerText').addClass('text-danger');
    } else {
      $('.wheeler-confirm-butons .booknow-btn').removeClass('exchg-disable-login');
      $('#wheelerConfirmModal #confirmDealerText').removeClass('text-danger');
    }
    $('#wheelerConfirmModal #confirmDealerText').html(checkedDealer ? checkedDealer : "Please select Dealer to continue");
    $('#wheelerConfirmModal #confirmModelText').html($(this).filter(":checked").parent().find('label .exchg-wheelers-name').html());
})

  $(document).on('click', '.exchg-dealers-wrap input', function(e) {
      const eleWheelerWrap = document.getElementById("exchange-wheeler-wrapper");
      eleWheelerWrap.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  });

    $('.edit-number-exchg').click(function() {
        $('#otp-modal').modal('toggle');
        const eleStepMobileInput = document.getElementById("exchangemobnumber");
        eleStepMobileInput.focus();
        $('.otp-form .otp-field').val('');
    });

    $('#otp-modal').on('hidden.bs.modal', function () {
        $('.otp-form .otp-field').val('');
    })

  $('.exchg-wheeler-wrap .exchg-form-viewall').click(function() {
      $('.wheeler-modal-body .wheelers-outer-wrap').removeClass('wheelers-modal-wrap');
      $('.wheeler-modal-body .exchg-wheelers-options').removeClass('w-100');
      $('.wheeler-modal-body .wheelers-outer-wrap').addClass('wheelers-modal-wrap');
      $('.wheeler-modal-body .exchg-wheelers-options').addClass('w-100');
  })

  
  $('#wheelerConfirmModal').on('hidden.bs.modal', function () {
    $('.modal-backdrop').eq(0).removeClass('wheeler-confirm-modal-backdrop');
    $('#wheelerConfirmModal').removeClass('wheeler-confirm-modal-main');
  })


  $('#wheelerConfirmModal').on('shown.bs.modal', function (e) {
    $('.modal-backdrop').eq(0).removeClass('wheeler-confirm-modal-backdrop');
    $('#wheelerConfirmModal').removeClass('wheeler-confirm-modal-main');
    $('.modal-backdrop').eq(0).addClass('wheeler-confirm-modal-backdrop');
    $('#wheelerConfirmModal').addClass('wheeler-confirm-modal-main');
  })

  const exchangeWheelerSlick = {
      infinite: false,
      autoplay: false,
      dots: true,
      prevArrow: false,
      nextArrow: false,
      autoplaySpeed: 5000,
      responsive: [{
              breakpoint: 9999,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
              }
          },
          {
              breakpoint: 1200,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
              }
          },
          {
              breakpoint: 900,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
              }
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
      ],
  };

  $(".exchg-wheeler-wrap .exchg-wheeler-carousel").slick(exchangeWheelerSlick);
});