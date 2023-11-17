
$(document).ready(function () {

    var sessionVehicleDetails = getCookie("exchangeloggeddetails");
    var cookieMobileData = getCookie("data");

    if(sessionVehicleDetails && cookieMobileData) {
        sessionVehicleDetails = JSON.parse(decodeURIComponent(atob(sessionVehicleDetails)));
        cookieMobileData = JSON.parse(decodeURIComponent(atob(cookieMobileData)));
        $('.ex-form-tab-content').addClass('d-none');
        $('.ex-form-tab-content.addressPan').addClass('d-flex flex-column');
        $('.ex-form-heading.ex-form-tab-list').replaceWith(`<div class="d-flex justify-content-center align-items-center mt-sm-4 pt-sm-1 pt-3">
            <img src="/content/dam/hero-aem-website/in/exchange---assets/exchg-smile-gif.gif" class="exchg-logged-smile-gif" alt="gif smile">
            <div class="exchg-logged-user-text">Hello ${sessionVehicleDetails.username}</div></div>`);
        $('.ex-form-subhead-label p').html('Excited to know the price of 2-wheeler you want to exchange');
        $('.exchange-banner .otp-form-wrap').addClass('d-none');
        $('.exchange-banner .ex-form-cta-label').addClass('d-none');
        $('#exchangeLoginForms').append(`<div>
            <div class="exchg-content-title text-center mt-3 mb-sm-2 mb-3">Or</div>
            <div>
                <div class="check-popup-text mb-2" id="exchangeLogout">Try with another registered mobile number</div>
                <div class="exchg-landing-logout-note mb-2">(You will be logged out after clicking this link)</div>
            </div>
        </div>`);
        if(cookieMobileData?.mobile) {
            $('.exchange-banner-bg #mobnumber').val(cookieMobileData?.mobile);      
            $('.ex-form-tab-content #otpnumber, .exchange-banner-bg #mobnumber').prop('disabled', true);
            $('.exchange-banner-bg #campaign-sub-btn').removeClass('exchg-disable-login');
        }
    }

    $('.mob-exchange-cta-product').click(function (e) {
        const productEntry = $(this).attr('data-href');
        if (productEntry) {
            window.location.href = productEntry;
        }
    })

    var tipsLanding = $('.exchange-form .ex-bulb-wrap');
    var landingTipsIndex = 0;

    function showNextDivLanding(tipsEle, tipsIndex) {
        tipsEle.eq(tipsIndex).fadeIn(500, function() {
            setTimeout(function() {
                tipsEle.eq(tipsIndex).fadeOut(500, function() {
                    tipsIndex = (tipsIndex + 1) % tipsEle.length;
                    showNextDivLanding(tipsEle, tipsIndex);
            });
            }, 5000); // 5 seconds
        }).css({'display': 'flex', 'align-items': 'center'});
    }

    showNextDivLanding(tipsLanding, landingTipsIndex);

    $('#exchangeLogout').on('click', function() {
	    var d = new Date();
        d.setTime(d.getTime());

	    document.cookie="data=null; path=/; expires=" + d.toGMTString();
	    document.cookie="selectedVehicleData=null; path=/; expires=" + d.toGMTString();
	    document.cookie="vehicleDetails=null; path=/; expires=" + d.toGMTString();
        document.cookie="exchangeloggeddetails=null; path=/; expires=" + d.toGMTString();
        sessionStorage.removeItem("exchangeLoginType");

	    $('.log-in-link').removeClass('d-none');
        $('.logout-header').addClass('d-none');

        window.location.href = "/content/hero-aem-website/in/en-in/exchange.html";
	 });

     $('.exchange-form #landingCheckHere').on('click', function() {
        $('#tab1').prop('checked', true);
     })

    $(document).on('click', '.exchange-banner .ex-new-options input', function(e) {
        sessionStorage.setItem("exchangeVehicleType", $(this).filter(":checked").val());
        let ctcRedirectLink = $(this).attr("data-component-relativePath");
        window.location.href = ctcRedirectLink;
    });

    $(document).on('click', '.outer-calc-wrap .exchg-form-viewall, .exchange-step-4-faq .exchg-form-viewall, #mobViewExchgCTA', function(e) {
        sessionStorage.removeItem("exchangeVehicleType");
        let ctcRedirectLink = $(this).attr("data-component-relativePath");
        window.location.href = ctcRedirectLink;
    });

    $("#mobnumber").on("keyup", function () {
        if ($(this).val().length == 10 && $(this).valid() && !sessionVehicleDetails) {
          $(this)
            .parent(".cust-form-group")
            .find("#send-otp")
            .removeClass("d-none");
        } else {
          $(this).parents("form").find("#send-otp").addClass("d-none");
          $(this).closest('.exchange-banner-bg').find('.exchg-landing-err-mobile').hide();
        }
        if($(this).val().length == 10 && $(this).valid() && sessionVehicleDetails) {
            $('.exchange-banner-bg #campaign-sub-btn').removeClass('exchg-disable-login');
        }

      });

    $("#otpnumber").on("keyup", function () {
    if ($(this).val().length == 6 && $(this).valid() && $('#mobnumber').val().length == 10) {
        $('.exchange-banner-bg #campaign-sub-btn').removeClass('exchg-disable-login');
        $(this).closest('.exchange-banner-bg').find('.exchg-landing-err-otp').hide();
    } else {
        $(this).closest('.exchange-banner-bg').find('.exchg-landing-err-otp').show();
        $('.exchange-banner-bg #campaign-sub-btn').removeClass('exchg-disable-login');
        $('.exchange-banner-bg #campaign-sub-btn').addClass('exchg-disable-login');
    }
    });

    $(".exchange-banner #send-otp").click(function (e) {
        e.preventDefault();
        if (window.digitalData) {
            window.digitalData = {
            event: "OTP Requested",
            form:{
              formname:'Exchange existing customer login',
              formtype:'Exchange journey',
            },
            page:{
              siteType: "AEM",
              pageURL: window.location.href,
              path: window.location.pathname,
              fullURL: window.location.href,
              hostName: window.location.origin,
              fullReferringUrl: document.referrer,
              pagename: document.title,
              product: document.title,
            }
         }
        }
        validateExchgMobileNo($(this));
    });

    function validateExchgMobileNo(otpElement) {
        var checkDMSRow = [{
            "0": otpElement.closest('.exchange-banner-bg').find('#mobnumber').val()
        }]
        var dmsRequest = createRequestBody("oa_verifyDMS", checkDMSRow, "2");
        $('#hero-loader').removeClass('d-none');
        sendAjaxCall(window.aemConfigs.apiEndpoints.middleWareAPI, dmsRequest, checkDMSRow).then(function(data) {
        	if(data.PWSESSIONRS[0].PWPROCESSRS.PWERROR == '') {
	        	if (data.PWSESSIONRS[0].PWPROCESSRS.PWDATA.oa_verifyDMS.Row[0].status == "success") {
	                var sendOTPRow = [{
	                    "0": "+91",
	                    "1": otpElement.closest('.exchange-banner-bg').find('#mobnumber').val()
	                }]
	                var sendOTPRequest = createRequestBody("oa_sendOTP", sendOTPRow, "10");
	                sendAjaxCall(window.aemConfigs.apiEndpoints.middleWareAPI, sendOTPRequest, sendOTPRow).then(function(data) {
	                    if (data.PWSESSIONRS[0].PWPROCESSRS.PWDATA.oa_sendOTP.Row[0].status == "sent.") {
                            otpElement.closest('.exchange-banner-bg').find('.exchg-landing-err-mobile').hide();
                            otpElement.closest('.exchange-banner-bg').find('#mobnumber').removeClass('exchg-error-input-border');
                            otpElement.closest('.exchange-banner-bg').find('.exchg-landing-success-mobile').show();
                            otpElement.closest('.exchange-banner-bg').find('#mobnumber').addClass('exchg-success-input-border');
	                    	var $sendOTP = $(this);
                            var $timer = $("#timer");
                            var count = 30;
                            if (!$(".otp-field").val("")) {
                                $(".otp-field").val("");
                            }
                            // onSendOTP();
                            $(this).text("Resend OTP");
                            $timer.text("00:30");
                            $timer.show();
                            $(this).attr("disabled", true);
                            $('.otp--sent').removeClass('d-none');
                            var timerInterval = setInterval(function () {
                                count--;
                                var minutes = Math.floor(count / 60).toString().padStart(2, "0");
                                var seconds = (count % 60).toString().padStart(2, "0");
                                $timer.text(minutes + ":" + seconds);

                                if (count <= 0) {
                                clearInterval(timerInterval);
                                $timer.text("00:00");
                                $timer.hide();
                                $('.otp--sent').addClass('d-none');
                                $sendOTP.removeAttr("disabled");
                                }
                            }, 1000);
	                    }
	                    $('#hero-loader').addClass('d-none');
	                })
	
	            } else {
	                otpElement.closest('.exchange-banner-bg').find('.exchg-landing-err-mobile').show();
                    otpElement.closest('.exchange-banner-bg').find('#mobnumber').addClass('exchg-error-input-border');
                    otpElement.closest('.exchange-banner-bg').find('.exchg-landing-success-mobile').hide();
                    otpElement.closest('.exchange-banner-bg').find('#mobnumber').removeClass('exchg-success-input-border');
	                $('#hero-loader').addClass('d-none');
	            }
        	}else{
        		otpElement.closest('.exchange-banner-bg').find('.exchg-landing-fail-mobile').show();
                otpElement.closest('.exchange-banner-bg').find('.exchg-landing-success-mobile').hide();
                otpElement.closest('.exchange-banner-bg').find('#mobnumber').removeClass('exchg-success-input-border');
                $('#hero-loader').addClass('d-none');
        	}
        })
    }

    function createRequestBody(process_ID, create_row, in_process_ID) {
        var createRequestBody = {
            "PWSESSIONRS": {
                "PWPROCESSRS": {
                    "PWHEADER": {
                        "IN_PROCESS_ID": in_process_ID == null ? "1" : in_process_ID,
                        "APP_ID": "ONEAPP",
                        "ORG_ID": "ONEAPP",
                        "OUT_PROCESS_ID": process_ID,
                        "LOGIN_ID": ""
                    },
                    "PWDATA": {
                        [process_ID]: {
                            "Row": create_row
                        }
                    },
                    "PWERROR": ""
                }
            }
        }
        return createRequestBody;
    }

    function sendAjaxCall(URL, data) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                type: "POST",
                url: URL,
                data: JSON.stringify(data),
                headers: {
                    'Authorization': getCookie('data') != null ? JSON.parse(atob(getCookie('data'))).token : ''
                },
                success: function(response) {
                    resolve(response); // Resolve promise and go to then()
                    if (window.digitalData) {
                        window.digitalData = {
                          event: "OTP Success",
                          form:{
                            formname:'Exchange existing customer login',
                            formtype:'Exchange journey',
                          },
                          page:{
                            siteType: "AEM",
                            pageURL: window.location.href,
                            path: window.location.pathname,
                            fullURL: window.location.href,
                            hostName: window.location.origin,
                            fullReferringUrl: document.referrer,
                            pagename: document.title,
                          }
                      }
                    }
                },
                error: function(err) {
                    reject(err) // Reject the promise and go to catch()
                    if (window.digitalData) {
                        window.digitalData = {
                          event: "OTP fails",
                          form:{
                            formname:'Exchange existing customer login',
                            formtype:'Exchange journey',
                          },
                          page:{
                            siteType: "AEM",
                            pageURL: window.location.href,
                            path: window.location.pathname,
                            fullURL: window.location.href,
                            hostName: window.location.origin,
                            fullReferringUrl: document.referrer,
                            pagename: document.title,
                          }
                        }
                    }
                }
            })
        })
    }

    function exchangeFormValidation($form) {
        jQuery.validator.addMethod("validNumber", function(value) {
            const disallowedNumbers = [
                "0123456789",
                "1111111111",
                "2222222222",
                "3333333333",
                "4444444444",
                "5555555555",
                "6666666666",
                "7777777777",
                "8888888888",
                "9999999999",
                "0000000000",
                "1234567890",
                "1010101010",
                "2020202020",
                "3030303030",
                "4040404040",
                "5050505050",
            ];
            if (disallowedNumbers.indexOf(value) !== -1) {
                return false;
            }
            if (value.length < 10) {
                return false;
            } else {
                return true;
            }
        });

        jQuery.validator.addMethod("validOtp", function(value) {
            if (value.length < 6) {
                return false;
            } else {
                return true;
            }
        });

        jQuery.validator.addMethod("indianNumber", function(value) {
            return /^[6789]\d{9}$/i.test(value);
        });

        $form.validate({
            ignore: [],
            rules: {
                mobileno: {
                    required: true,
                    validNumber: true,
                    indianNumber: true,
                },
                otp: {
                    required: true,
                    validOtp: true,
                },
                agreement: {
                    required: true,
                },
            },
            messages: {
                mobileno: {
                    required: $("#mobnumber").data("validation-msg-req"),
                    validNumber: "Please enter a valid number",
                    indianNumber: "Please enter a valid number",
                },
                otp: {
                    required: $("#otpnumber").data("validation-msg-req"),
                    validOtp: "Please enter valid mobile otp",
                },
                agreement: {
                    required: $("#exLoginAgree").data("validation-msg-req"),
                },
            },
        });
    }

    if ($("#exchangeLoginForms").length > 0) {
        exchangeFormValidation($("#exchangeLoginForms"));
    }
});