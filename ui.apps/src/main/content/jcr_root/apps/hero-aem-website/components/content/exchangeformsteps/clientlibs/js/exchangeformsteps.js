$(document).ready(function() {

    var sessionVehicleType = sessionStorage.getItem("exchangeVehicleType");
    var sessionLoginType = sessionStorage.getItem("exchangeLoginType");
    var sessionVehicleDetails = getCookie("vehicleDetails");
    var sessionLoggedDetails = getCookie("exchangeloggeddetails");
    var cookieLoggedData = getCookie("data");
    var selectedVehicleObject = {};
    var countIdleProspect = 0;
    
    if (cookieLoggedData) cookieLoggedData = JSON.parse(decodeURIComponent(atob(cookieLoggedData)));
    const popularBrandText = $('#modelList .exchg-content-subtitle').html();


    if (sessionLoginType == 'existing') {
        $('.form-step-one .exchg-left-nav-items:first').addClass('d-flex active');
        $('.exchange-form-wrap #exchangeList').addClass('d-flex active-tab');

        textAnimationAutoPosition();

        if ($('#exchangeList .exchg-content-options-wrap > div').length == 0) {
            getExchanageList(sessionVehicleDetails);
        }
        $('#clickStep3li').addClass('d-none');
        window.innerWidth < 568 && $('#multiStepperWrap').css({'padding-left': '3.25rem'})
        $('#multi-step-form-container .exchg-multi-progress-bar').addClass('exchg-three-progress-bar');
        $('.exchange-banner ul.form-stepper').addClass('exchg-ul-stepper-wrap');
        $('.exchange-banner .form-stepper .label').addClass('three-stepper-label-view');
        $('#partsList input').attr('step_number', '4');
    } else {
        $('.form-step-one .exchg-left-nav-items').eq(1).addClass('active');
        $('.exchange-form-wrap #vehicleList').addClass('active-tab');
        $('#partsList input').attr('step_number', '3');

        textAnimationAutoPosition();
        
        if (sessionVehicleType) {
            $('#vehicleList .exchg-content-options-wrap .exchg-options-alt input').each(function() {
                if (sessionVehicleType == $(this).val()) {
                    $(this).prop('checked', true);
                    $(this).parent().parent().find('.exchg-content-options').removeClass('active-option-checks');
                    $(this).parent().addClass('active-option-checks');
                    $('#step-1 #selectedVehicleType').html($(this).val());
                    $('.form-step-one .exchg-left-nav-items').eq(1).removeClass('active');
                    $('.exchange-form-wrap #vehicleList').removeClass('active-tab');
                    $('.form-step-one .exchg-left-nav-items').eq(2).addClass('active');
                    $('.exchange-form-wrap #brandList').addClass('active-tab');
                    getBrandJsonList($(this).val());
                }
            });
        }
    }

    if ($('#userAccountSetupForm #step-1').length > 0) {
        $('.footer-wrapper').addClass('d-none');
        $('.navbar-wrapper .navbar-nav').eq(0).addClass('invisible');
        $('#multiStepperWrap').css ({'position': 'fixed', 'z-index': 2});
        $('#userAccountSetupForm').css ({'padding-top': document.getElementById('multiStepperWrap').offsetHeight});
    }

    function textAnimationAutoPosition () {
        const headerNavigation = Math.round($('.navbar-expand-lg').outerHeight());
        const stepperNavigation = Math.round($('#multiStepperWrap').outerHeight());
        const animationWrap = Math.round($('#vehicleList .exchg-tips-wrapper').outerHeight())
        const offSetAnimationTop = window.innerHeight - stepperNavigation - headerNavigation - animationWrap - 100;
        if (window.innerHeight < $('#vehicleList .exchg-tips-wrapper').offset().top || window.innerHeight < $('#exchangeList .exchg-tips-wrapper').offset().top) {
            $(".exchg-tips-wrapper").css({'top': window.innerWidth > 568 ? offSetAnimationTop : offSetAnimationTop + 25 + 'px', 'bottom': 'unset'});
        }
        if (window.innerHeight < 600) {
            $(".exchg-tips-wrapper").css({'position': 'unset', 'width': 'fit-content'});
        }
    }

    if(window.innerHeight < 650) {
        $('#checkModal .modal-content').addClass('low-check-modal-content');
        $('#checkModal .modal-body').addClass('low-check-modal-body');
    }

    const $inp = $('.otp-form .otp-field');

    $inp.on({
        paste(ev) { // Handle Pasting
        
            const clip = (ev.clipboardData || ev.originalEvent.clipboardData || window.clipboardData).getData('text/plain').trim();
            // Allow numbers only
            if (!/\d{6}/.test(clip)) return ev.preventDefault(); // Invalid. Exit here
            // Split string to Array or characters
            const s = [...clip];
            // Populate inputs. Focus last input.
            $inp.val(i => s[i]).eq(5).focus(); 
        },
        input(ev) { // Handle typing
            
            const i = $inp.index(this);
            if (this.value) $inp.eq(i + 1).focus();
        },
        keydown(ev) { // Handle Deleting
            
            const i = $inp.index(this);
            if (!this.value && ev.key === "Backspace" && i) $inp.eq(i - 1).focus();
        }
    
    });

    var offsetModalPosition = 0;

    $("#pincodeModal, #checkModal, #exchg-loader-modal, #otp-modal, #wheelerModal, #wheelerConfirmModal, #resaleModal").on("shown.bs.modal", function (e) {
        offsetModalPosition = window.scrollY;
        $("body").addClass("exchg-non-scrollable-body");
        $("body").css({'top': -offsetModalPosition + 'px'});
    }).on("hidden.bs.modal", function () {
        $("body").removeClass("exchg-non-scrollable-body");
        $(window).scrollTop(offsetModalPosition);
    });

    var leftSelectedNav = '';
    var lastVisitedStepper = '';

    const yearHtmlList = $('#yearList .exchg-content-options-wrap');
    for (let index = 0; index < 16; index++) {
        $('<div>').addClass('exchg-content-options')
            .append($('<input>').attr({
                id: 'year' + index,
                type: "radio",
                name: "radioYear",
                value: new Date().getFullYear() - index,
                "data-target": "monthList",
                "data-from": "yearList"
            }))
            .append($('<label>').attr('for', 'year' + index).text(new Date().getFullYear() - index))
            .appendTo(yearHtmlList);
    }

    // Left Navigation Click Function
    $('.exchg-left-nav-items').click(function(e) {
        if (!$(this).find('.exchg-nav-subheading').html().length > 0) {
            $(this).style.pointerEvents = 'none'
        }
        if ($(this).find('.exchg-nav-subheading').html().length > 0) {
            $(this).prop('disabled', false);
            leftSelectedNav = $(this).find('.exchg-nav-subheading').html();
        }
        $('.exchg-left-nav-items').removeClass('active');
        $(this).addClass('active');

        e.preventDefault();

        // Get the target content ID from the 'data-target' attribute
        var target = $(this).data('target');

        if ($(this).find('.exchg-nav-subheading').html().length > 0) {
            const radioTextVal = $(this).find('.exchg-nav-subheading').html();
            let selectedRadioVal = $(".exchg-content-options-wrap").find(`[value='${radioTextVal}']`);
            selectedRadioVal.prop('checked', true);
        }

        // Remove 'active' class from all panels
        $('.exchg-vehicle-content').removeClass('active-tab');

        // Add 'active' class to the target panel
        $('#' + target).addClass('active-tab');
        const afterSelectSearch = $('#' + target).find('.searchInput input');
        handleSearchClick(afterSelectSearch);
        afterSelectSearch.val('');
    });

    $('#exchangeList .exchg-old-user-new').click(function(e) {
        var fromData = $(this).data('from');
        var target = $(this).data('target');

        let selectedValueSubHead = $("div").find(`[data-target='${fromData}']`);
        selectedValueSubHead.find('.exchg-nav-subheading').html('Another Vehicle');

        $('.form-step-one .exchg-left-nav-items').eq(1).addClass('d-flex active');

        $('.form-step-one .exchg-left-nav-items').removeClass('d-none');
        $('.form-step-one .exchg-left-nav-items').addClass('d-flex');

        let checkDiv = $("div").find(`[data-target='${target}']`);

        if (!($(this).html()?.toLowerCase().includes(leftSelectedNav?.toLowerCase())) &&
            checkDiv.index() !== $('.form-step-one .exchg-left-nav-items').length - 1) {
            $('.form-step-one .exchg-left-nav-items').each(function(index, item) {
                if (index > checkDiv.index() - 1) {
                    $(item).find('.exchg-nav-subheading').html('');
                    $(`#${$(item).attr('data-target')} .exchg-content-options`).removeClass("active-option-checks");
                    $('.form-step-two .exchg-left-nav-items .exchg-nav-subheading').html('');
                    $('.exchg-options-condition-wrap input').prop("checked", false);
                    $('.exchg-options-condition-wrap').removeClass("active-option-checks");
                    if($(item).attr('data-target') == 'cityList') {
                        $('#cityList .exchg-content-options input').prop("checked", false);
                        $('#pincodeModal .exchange-pincode-search').val('')
                    }
                    $('#clickStep2li.form-stepper-list .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/condition-multistep.svg');
                    $('#clickStep3li.form-stepper-list .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/customer-multistep.svg');
                    $('#clickStep3li .exchg-multi-progress-bar, #clickStep2li .exchg-multi-progress-bar').removeClass('progress-bar-one-third');
                    $('#clickStep3li .exchg-multi-progress-bar, #clickStep2li .exchg-multi-progress-bar').removeClass('progress-bar-two-third');
                    $('#step-3 #exchangefullname, #step-3 #exchangemobnumber').val('');
                    $('#formAgreementRadio').prop('checked', false);
                }
            });
        }

        $('#exchangeList .exchg-content-options-wrap > div').removeClass('active-option-checks');
        $(this).addClass('active-option-checks');
        
        $('#exchangeList input').prop("checked", false );

        $('.exchg-left-nav-items').removeClass('active');
        checkDiv.addClass('active');

        // Remove 'active' class from all panels
        $('.exchg-vehicle-content').removeClass('active-tab');

        checkProgressiveStep1();

        // Add 'active' class to the target panel
        $('#' + target).addClass('active-tab');
        
        selectedVehicleObject = {};
    })

    $("#pincode").on("keyup", function() {
        if ($(this).val().length == 6 && exchangePincodeValidation($(this).val())) {

            $('#pincodeModal .pincode-error-msg').removeClass('d-block');
            $('#pincodeModal .pincode-error-msg').addClass('d-none');
            $('#pincodeModal .exchg-pincode-wrap').removeClass('exchg-err-pin-border');
            $('#pincodeModal #ex-submit-city').css({"color":"#EE2326", "pointer-events":"unset", "cursor": "pointer", "border": "1px solid #EE2326"});
        } else {
            $('#pincodeModal .pincode-error-msg').removeClass('d-none');
            $('#pincodeModal .pincode-error-msg').addClass('d-block');
            $('#pincodeModal .exchg-pincode-wrap').addClass('exchg-err-pin-border');
            $('#pincodeModal #ex-submit-city').css({"color":"#A5A5A5", "pointer-events":"none", "cursor": "not-allowed", "border": "1px solid #A5A5A5"});
        }
    });

    function exchangePincodeValidation(value) {
        const disallowedPincodes = [
            "012345",
            "111111",
            "222222",
            "333333",
            "444444",
            "555555",
            "666666",
            "777777",
            "888888",
            "999999",
            "000000",
            "123456",
            "101010",
            "202020",
            "303030",
            "404040",
            "505050",
        ];
        const regexPincode = /^[1-9][0-9]{5}$/;
        if (disallowedPincodes.indexOf(value) !== -1) {
            return false;
        } else {
            return regexPincode.test(value);
        }
    }

    $("#ex-submit-city").click(function () {
        let targetDiv = $("div").find(`[data-target='silencerList']`);

        if ($('#selectedExchangeType').html() !== 'Another Vehicle' && $('#selectedExchangeType').html().length !== 0) {
            navigateToFormStep(2);
        }

        $('.exchg-left-nav-items').removeClass('active');
        targetDiv.addClass('active');

        const afterSelectSearch = $('#cityList').find('.searchInput input');
        afterSelectSearch.val('');
        handleSearchClick(afterSelectSearch);

        $('.exchg-vehicle-content').removeClass('active-tab');
        $('#silencerList').addClass('active-tab');
        $("html, body").animate({ scrollTop: 0 }, "slow");
    })

    $(window).bind("orientationchange", function(evt){
        if (window.innerWidth < 1000) {
            $('.exchange-banner .exchange-form-wrap').addClass('exchange-form-oriented-wrap');
            $('#pincodeModal .exchg-pincode-wrap').addClass('exchange-pincode-oriented-wrap');
            $('#checkModal .modal-image-gaps').addClass('flex-wrap');
        } else {
            $('.exchange-banner .exchange-form-wrap').removeClass('exchange-form-oriented-wrap');
            $('#pincodeModal .exchg-pincode-wrap').removeClass('exchange-pincode-oriented-wrap');
            $('#checkModal .modal-image-gaps').removeClass('flex-wrap');
        }
    });
    
    $(document).on('click', '.exchg-content-options-wrap input', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var target = $(this).data('target');
        var fromData = $(this).data('from');

        if (target && target == 'brandList') {
            if ($('#brandList .exchg-content-options-wrap .exchg-content-options').length > 0) {
                $('#brandList .exchg-content-options').remove();
            }
            getBrandJsonList($(this).filter(":checked").val());
        } else if (target && target == 'modelList') {
            if ($('#modelList .exchg-content-options-wrap .exchg-content-options').length > 0) {
                $('#modelList .exchg-content-options').remove();
            }
            getModelJsonList($(this).filter(":checked").val());
            $('#modelList .exchg-content-subtitle').html(popularBrandText + $(this).filter(":checked").val());
        } else if ($('#stateList .exchg-content-options-wrap .exchg-content-options').length === 0 && target && target == 'stateList') {
            getStateJsonList();
        } 
        else if (target && target == 'cityList') {
            if ($('#cityList .exchg-city-content-options-wrap .exchg-content-options').length > 0) {
                $('#cityList .exchg-content-options').remove();
            }
            getCityJsonList($(this).filter(":checked").val());
            $(this).prop("checked", true);
        }

        if (fromData == 'exchangeList' && $(this).filter(":checked").val() !== 'Another Vehicle') {
            filterStep1LeftNavs();
            $('#exchangeList .exchg-content-options-wrap > div').removeClass('active-option-checks');
            const selectedOption = $(this).filter(":checked").val();
            const sessionVehicleData = JSON.parse(decodeURIComponent(atob(sessionVehicleDetails)));
            [selectedVehicleObject] = sessionVehicleData.filter(function( obj ) {
                return obj.modelName == selectedOption;
            });
        }

        let selectedValueSubHead = $("div").find(`[data-target='${fromData}']`);
        selectedValueSubHead.find('.exchg-nav-subheading').html($(this).filter(":checked").val());
        // Get the target content ID from the 'data-target' attribute

        let checkDiv = $("div").find(`[data-target='${target}']`);

        const checkStep = $(this).parent().parent().parent().parent().parent().attr('id')

        if (checkStep === 'step-1' && leftSelectedNav !== $(this).filter(":checked").val() &&
            checkDiv.find('.exchg-nav-subheading').html()?.length > 0 &&
            checkDiv.index() !== $('.form-step-one .exchg-left-nav-items').length) {
            $('.form-step-one .exchg-left-nav-items').each(function(index, item) {
                if (index > checkDiv.index() - 1) {
                    $(item).find('.exchg-nav-subheading').html('');
                    $(`#${$(item).attr('data-target')} .exchg-content-options`).removeClass("active-option-checks");
                    $('.form-step-two .exchg-left-nav-items .exchg-nav-subheading').html('');
                    $('.exchg-options-condition-wrap input').prop("checked", false);
                    $('.exchg-options-condition-wrap').removeClass("active-option-checks");
                    if($(item).attr('data-target') == 'cityList') {
                        $('#cityList .exchg-content-options input').prop("checked", false);
                        $('#pincodeModal .exchange-pincode-search').val('');
                    }
                    $('#clickStep2li.form-stepper-list .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/condition-multistep.svg');
                    $('#clickStep3li.form-stepper-list .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/customer-multistep.svg');
                    $('#clickStep3li .exchg-multi-progress-bar').removeClass('progress-bar-one-third');
                    $('#clickStep3li .exchg-multi-progress-bar').removeClass('progress-bar-two-third');
                    $('#step-3 #exchangefullname, #step-3 #exchangemobnumber').val('');
                    $('#formAgreementRadio').prop('checked', false);
                }
            });
        }

        $(this).parent().parent().find('.exchg-content-options').removeClass('active-option-checks');
        $(this).parent().addClass('active-option-checks');

        $('.exchg-left-nav-items').removeClass('active');
        checkDiv.addClass('active');

        // Remove 'active' class from all panels
        $('.exchg-vehicle-content').removeClass('active-tab');

        // Add 'active' class to the target panel
        $('#' + target).addClass('active-tab');

        if (checkDiv.find('.exchg-nav-subheading').html().length > 0) {
            const targetArrayList = aa = $('#' + target).find('input')?.toArray()
            targetArrayList.forEach(element => {
                if (checkDiv.find('.exchg-nav-subheading').html() == $(element).attr('value')) {
                    $(element).prop('checked', true);
                }
            }); 
        }

        checkProgressiveStep1();
        checkProgressiveStep2();

        leftSelectedNav = '';
        $(this).parent().parent().parent().find('.searchInput input').val('');
        const afterSelectSearch = $(this).parent().parent().parent().find('.searchInput input');
        handleSearchClick(afterSelectSearch);
        $('#step-1 .exchg-content-noresults').addClass('d-none');
        $('#step-1 .exchg-content-subtitle').removeClass('d-none');

        if (target && target == 'monthList') {
            showFilteredMonths($(this).filter(":checked").val());
        }
    });

    $(document).on('click', '.exchg-city-content-options-wrap input', function(e) {
        var fromData = $(this).data('from');
        let selectedValueSubHead = $("div").find(`[data-target='${fromData}']`);
        selectedValueSubHead.find('.exchg-nav-subheading').html($(this).filter(":checked").val());
        $('#pincodeModal').modal('toggle');
        const eletPincode = document.getElementById("pincode");
        // eletPincode.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        eletPincode.focus();

        $(this).parent().parent().find('.exchg-content-options').removeClass('active-option-checks');
        $(this).parent().addClass('active-option-checks');

        checkProgressiveStep1();
        
        leftSelectedNav = '';
        $(this).parent().parent().parent().find('.searchInput input').val('');
        const afterSelectSearch = $(this).parent().parent().parent().find('.searchInput input');
        handleSearchClick(afterSelectSearch);
        $('#step-1 .exchg-content-noresults').addClass('d-none');
        $('#step-1 .exchg-content-subtitle').removeClass('d-none');
    })

    function showFilteredMonths(selectedYear) {
        const currentyear = new Date().getFullYear();
        if (selectedYear == currentyear) {
            $('#monthList label').each((wheelerElement, data) => {
                if (new Date().getMonth() >= wheelerElement) {
                    $(data).parent().css("cssText", "display : table !important;");
                } else {
                    $(data).parent().css("cssText", "display : none !important;");
                }
            });
        } else if (selectedYear == currentyear - 15) {
            $('#monthList label').each((wheelerElement, data) => {
                if (new Date().getMonth() <= wheelerElement) {
                    $(data).parent().css("cssText", "display : table !important;");
                } else {
                    $(data).parent().css("cssText", "display : none !important;");
                }
            });
        } else {
            $('#monthList label').each((wheelerElement, data) => {
                $(data).parent().css("cssText", "display : table !important;");
            });
        }
    }

    function checkProgressiveStep1() {
        if (sessionLoginType == 'existing' && $('#selectedExchangeType').html() != 'Another Vehicle') {
            if ($('#selectedExchangeType').html() != '') {
                $('#clickStep1li .exchg-multi-progress-bar').addClass('progress-bar-one-third');
            } else {
                $('#clickStep1li .exchg-multi-progress-bar').removeClass('progress-bar-one-third');
            }
            if ($('#selectedState').html() != '') {
                $('#clickStep1li .exchg-multi-progress-bar').addClass('progress-bar-two-third');
            } else {
                $('#clickStep1li .exchg-multi-progress-bar').removeClass('progress-bar-two-third');
            }
            if ($('#selectedCity').html() != '') {
                $('#clickStep1li .exchg-multi-progress-bar').addClass('progress-bar-full');
            } else {
                $('#clickStep1li .exchg-multi-progress-bar').removeClass('progress-bar-full');
            }

        } else {
            if (sessionLoginType == 'existing') {
                if ($('#selectedExchangeType').html() != '' && $('#selectedVehicleType').html() != '' && $('#selectedBrand').html() != '') {
                    $('#clickStep1li .exchg-multi-progress-bar').addClass('progress-bar-one-third');
                } else {
                    $('#clickStep1li .exchg-multi-progress-bar').removeClass('progress-bar-one-third');
                }
            } else {
                if ($('#selectedVehicleType').html() != '' && $('#selectedBrand').html() != '') {
                    $('#clickStep1li .exchg-multi-progress-bar').addClass('progress-bar-one-third');
                } else {
                    $('#clickStep1li .exchg-multi-progress-bar').removeClass('progress-bar-one-third');
                }
            }
            if ($('#selectedModel').html() != '' && $('#selectedYear').html() != '' && $('#selectedMonth').html() != '') {
                $('#clickStep1li .exchg-multi-progress-bar').addClass('progress-bar-two-third');
            } else {
                $('#clickStep1li .exchg-multi-progress-bar').removeClass('progress-bar-two-third');
            }
            if ($('#selectedState').html() != '' && $('#selectedCity').html() != '') {
                $('#clickStep1li .exchg-multi-progress-bar').addClass('progress-bar-full');
            } else {
                $('#clickStep1li .exchg-multi-progress-bar').removeClass('progress-bar-full');
            }
        }
    }

    function checkProgressiveStep2() {
        if ($('#selectedCity').html() != '' && $('#selectedSilencer').html() != '' && $('#selectedStarting').html() != '') {
            $('#clickStep2li .exchg-multi-progress-bar').addClass('progress-bar-one-third');
        } else {
            $('#clickStep2li .exchg-multi-progress-bar').removeClass('progress-bar-one-third');
        }
        if ($('#selectedCity').html() != '' && $('#selectedLights').html() != '' && $('#selectedTyres').html() != '') {
            $('#clickStep2li .exchg-multi-progress-bar').addClass('progress-bar-two-third');
        } else {
            $('#clickStep2li .exchg-multi-progress-bar').removeClass('progress-bar-two-third');
        }
        if ($('#selectedCity').html() != '' && $('#selectedRearTyres').html() != '' && $('#selectedParts').html() != '') {
            $('#clickStep2li .exchg-multi-progress-bar').addClass('progress-bar-full');
        } else {
            $('#clickStep2li .exchg-multi-progress-bar').removeClass('progress-bar-full');
        }
    }

    $("#step-3 #exchangefullname, #step-3 #exchangemobnumber").on("keyup", function() {
        if ($('#selectedCity').html() != '' && $('#selectedParts').html() != '' && $('#exchangefullname').val().length > 0 && $('#exchangemobnumber').val().length == 10) {
            $('#clickStep3li .exchg-multi-progress-bar').addClass('progress-bar-one-third');
        } else {
            $('#clickStep3li .exchg-multi-progress-bar').removeClass('progress-bar-one-third');
        }
    });

    $("#step-3 #formWhatsappRadio, #step-3 #formAgreementRadio").on("change load", function() {
        if ($('#selectedCity').html() != '' && $('#selectedParts').html() != '' && $('#formWhatsappRadio').is(':checked') && $('#formAgreementRadio').is(':checked')) {
            $('#clickStep3li .exchg-multi-progress-bar').addClass('progress-bar-two-third');
        } else {
            $('#clickStep3li .exchg-multi-progress-bar').removeClass('progress-bar-two-third');
        }
    });

    function filterStep1LeftNavs() {
        $('.form-step-one .exchg-left-nav-items').each(function() {
            let attributeVal = $(this).attr('data-target');
            if (attributeVal !== 'exchangeList' && attributeVal !== 'stateList' && attributeVal !== 'cityList') {
                $(this).removeClass('d-flex');
                $(this).addClass('d-none');
            }
        })

        $('#step-1 .exchg-vehicle-content').each(function() {
            let attributeVal = $(this).attr('id');
            if (attributeVal !== 'exchangeList' && attributeVal !== 'stateList' && attributeVal !== 'cityList') {
                $(this).removeClass('d-flex');
                $(this).addClass('d-none');
            }
        })
    }

    function getBrandJsonList(brandOption) {
        let exchgBrandListUrl = $("#userAccountSetupForm #brandList").attr("data-component-relativePath");
        var exchgBrandListPath = exchgBrandListUrl?.replace(
            "jcr:content",
            "_jcr_content"
        );
        const dataObject = new FormData();
        dataObject.append("category", brandOption);
        $.ajax({
            url: exchgBrandListPath,
            type: "POST",
            data: dataObject,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            success: function(resp) {
                let finalDataBrand = typeof resp == "string" ? JSON.parse(resp): resp;
                const brandHtmlList = $('#brandList .exchg-content-options-wrap');
                // finalDataBrand.jsonData.sort((firstObj, secondObj) => (firstObj.brand_name  > secondObj.brand_name ) ? 1 : ((secondObj.brand_name  > firstObj.brand_name ) ? -1 : 0));
                finalDataBrand.jsonData.forEach(function(brandName, index) {
                    $('<div>').addClass('exchg-content-options')
                        .append($('<input>').attr({
                            id: 'brand' + index,
                            type: "radio",
                            name: "radio",
                            value: brandName.brand_name,
                            "data-target": "modelList",
                            "data-from": "brandList"
                        }))
                        .append($('<label>').addClass('text-center m-auto').attr('for', 'brand' + index).text(brandName.brand_name))
                        .appendTo(brandHtmlList);
                })
            },
            error: function(error) {},
        });
    }

    function getModelJsonList(modelOption) {
        let exchgModelListUrl = $("#userAccountSetupForm #modelList").attr("data-component-relativePath");
        var exchgModelListPath = exchgModelListUrl?.replace(
            "jcr:content",
            "_jcr_content"
        );
        
        const dataObject = new FormData();
        dataObject.append("make", modelOption);
        dataObject.append("category", $('#step-1 #selectedVehicleType').html());
        $.ajax({
            url: exchgModelListPath,
            type: "POST",
            data: dataObject,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            success: function(resp) {
                let finalDataModel = typeof resp == "string" ? JSON.parse(resp): resp;
                const modelHtmlList = $('#modelList .exchg-content-options-wrap');
                finalDataModel.jsonData.sort((firstObj, secondObj) => (firstObj.brand_model  > secondObj.brand_model ) ? 1 : ((secondObj.brand_model  > firstObj.brand_model ) ? -1 : 0));
                finalDataModel.jsonData.forEach(function(modelName, index) {
                    $('<div>').addClass('exchg-content-options')
                        .append($('<input>').attr({
                            id: 'model' + index,
                            type: "radio",
                            name: "radio",
                            value: modelName.brand_model,
                            "data-target": "yearList",
                            "data-from": "modelList"
                        }))
                        .append($('<label>').addClass('exchg-all-label-allign').attr('for', 'model' + index).text(modelName.brand_model))
                        .appendTo(modelHtmlList);
                });
            },
            error: function(error) {},
        });
    }

    function getStateJsonList() {
        let exchgStateListUrl = $("#userAccountSetupForm #stateList").attr("data-component-relativePath");
        var exchgStateListPath = exchgStateListUrl?.replace(
            "jcr:content",
            "_jcr_content"
        );
        $.ajax({
            url: exchgStateListPath,
            type: "POST",
            success: function(resp) {
                let finalDataState = typeof resp == "string" ? JSON.parse(resp): resp;
                const stateHtmlList = $('#stateList .exchg-content-options-wrap');
                finalDataState.jsonData.sort((firstObj, secondObj) => (firstObj.state_name  > secondObj.state_name ) ? 1 : ((secondObj.state_name  > firstObj.state_name ) ? -1 : 0));
                finalDataState.jsonData.forEach(function(stateName, index) {
                    $('<div>').addClass('exchg-content-options')
                        .append($('<input>').attr({
                            id: 'state' + index,
                            type: "radio",
                            name: "radio",
                            value: stateName.state_name,
                            "data-target": "cityList",
                            "data-from": "stateList"
                        }))
                        .append($('<label>').addClass('exchg-all-label-allign').attr('for', 'state' + index).text(stateName.state_name))
                        .appendTo(stateHtmlList);
                })
            },
            error: function(error) {},
        });
    }

    function getCityJsonList(stateOption) {
        let exchgCityListUrl = $("#userAccountSetupForm #cityList").attr("data-component-relativePath");
        var exchgCityListPath = exchgCityListUrl?.replace(
            "jcr:content",
            "_jcr_content"
        );
        const dataObject = new FormData();
        dataObject.append("state", stateOption);
        $.ajax({
            url: exchgCityListPath,
            type: "POST",
            data: dataObject,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            success: function(resp) {
                let finalDataCity = typeof resp == "string" ? JSON.parse(resp): resp;
                const cityHtmlList = $('#cityList .exchg-city-content-options-wrap');
                finalDataCity.jsonData.sort((firstObj, secondObj) => (firstObj.district_name  > secondObj.district_name ) ? 1 : ((secondObj.district_name  > firstObj.district_name ) ? -1 : 0));
                finalDataCity.jsonData.forEach(function(cityName, index) {
                    const capitalizedCity = cityName.district_name.charAt(0).toUpperCase() + cityName.district_name.substring(1).toLowerCase();
                    $('<div>').addClass('exchg-content-options')
                        .append($('<input>').attr({
                            id: 'city' + index,
                            type: "radio",
                            name: "radiocity",
                            value: capitalizedCity,
                            "data-from": "cityList"
                        }))
                        .append($('<label>').addClass('exchg-all-label-allign').attr('for', 'city' + index).text(capitalizedCity))
                        .appendTo(cityHtmlList);
                })
            },
            error: function(error) {},
        });
    }

    function getCalculatedPriceDetails() {
        let exchgCalcPriceUrl = selectedVehicleObject?.modelName ? $("#otp-modal #resendStepperOtp").attr("data-component-relativePath") :
            $("#otp-modal #otp-verification-proceed").attr("data-component-relativePath");
        var exchgCalcPricePath = exchgCalcPriceUrl?.replace(
            "jcr:content",
            "_jcr_content"
        );
        const dataObject = getPriceDataObj();
        $.ajax({
            url: exchgCalcPricePath,
            type: "POST",
            data: dataObject,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            success: function(resp) {
                try {
                    const finalDataPrice = typeof resp == "string" ? JSON.parse(resp): resp;
                    if (finalDataPrice?.jsonData) {
                        sessionStorage.setItem("exchangeEnquiryId", finalDataPrice.jsonData.enquiry_id);
                        $('.outer-calc-wrap .calc-price-text').html('₹ ' + finalDataPrice.jsonData.lower_limit_price + ' - ' + '₹ ' + finalDataPrice.jsonData.upper_limit_price);
                        $('.outer-calc-wrap #calc-condition').html(finalDataPrice.jsonData.vehicle_condition.toLowerCase());
                        if ($('.outer-calc-wrap .calc-price-text').html()?.length > 17) $('.outer-calc-wrap .calc-price-text').addClass('mob-calc-price-text-long');
                        document.querySelectorAll('.exchg-wheeler-carousel .exchg-wheelers-price, #wheelerModal .exchg-wheelers-price').forEach((wheelerElement) => {
                            let exchangePriceVal = $(wheelerElement).html();
                            exchangePriceVal = exchangePriceVal.substring(2, exchangePriceVal.indexOf('*'))?.replace(/\,/g,'');
                            let strikedVal =  parseInt(exchangePriceVal) - finalDataPrice.jsonData.upper_limit_price;
                            if(strikedVal > 0) {
                                $(wheelerElement).html(`₹ ${strikedVal.toLocaleString("en-IN")}*`);
                                $(wheelerElement).append(`<s class="striked-price-value ml-sm-2">₹ ${parseInt(exchangePriceVal).toLocaleString("en-IN")}*</s>`);
                            }
                        });
                        $('#step-4 .exchg-calculate-wrap img').removeClass('d-none');
                    } else {
                        $('.outer-calc-wrap #estimatedId').addClass('d-none');
                        $('.outer-calc-wrap .calc-estimate-text p').html('We will get back to you shortly with the estimated resale value of your vehicle.');
                        $('.outer-calc-wrap .calc-estimate-text p').addClass('text-center');
                        $('.outer-calc-wrap .calc-assess-text').addClass('d-none');
                    }
                }
                catch (e) {
                    $('.outer-calc-wrap #estimatedId').addClass('d-none');
                    $('.outer-calc-wrap .calc-estimate-text p').html('We will get back to you shortly with the estimated resale value of your vehicle.');
                    $('.outer-calc-wrap .calc-estimate-text p').addClass('text-center');
                    $('.outer-calc-wrap .calc-assess-text').addClass('d-none');
                }
                onInactive(14000, function () {
                    if(countIdleProspect < 1) {
                        sessionStorage.setItem("exchangeInactivity",'yes');
                        callProspectApi();
                        countIdleProspect++;
                    }
                });
                
                function onInactive(ms, cb) {
                
                    var wait = setTimeout(cb, ms);
                
                    document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
                        clearTimeout(wait);
                        wait = setTimeout(cb, ms);
                
                    };
                }
            },
            error: function(error) {
                $('.outer-calc-wrap #estimatedId').addClass('d-none');
                $('.outer-calc-wrap .calc-estimate-text p').html('We will get back to you shortly with the estimated resale value of your vehicle.');
                $('.outer-calc-wrap .calc-estimate-text p').addClass('text-center');
                $('.outer-calc-wrap .calc-assess-text').addClass('d-none');

                
                onInactive(14000, function () {
                    if(countIdleProspect < 1) {
                        sessionStorage.setItem("exchangeInactivity",'yes');
                        callProspectApi();
                        countIdleProspect++;
                    }
                });
                
                function onInactive(ms, cb) {
                
                    var wait = setTimeout(cb, ms);
                
                    document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
                        clearTimeout(wait);
                        wait = setTimeout(cb, ms);
                
                    };
                }
            },
        });
        if ($(window).width() < 577) {
            $('#step-4').append($('.calculate-right-wrap'));
            $('.outer-calc-wrap .calculate-right-wrap').remove();
        }
        $('.footer-wrapper').removeClass('d-none');
        $('.navbar-wrapper .navbar-nav').eq(0).removeClass('invisible');
    }

    function getExchanageList(sessionData) {
        const sessionVehicleData = JSON.parse(decodeURIComponent(atob(sessionData)));
        const exchangeHtmlList = $('#exchangeList .exchg-content-options-wrap');
        if(sessionLoggedDetails && sessionData?.length > 0) {
            sessionLoggedDetails = JSON.parse(decodeURIComponent(atob(sessionLoggedDetails)));
            sessionVehicleData?.forEach(function(vehicleData, index) {
                const formattedDate = new Date(vehicleData.purchaseDate);
                const appendHtml = `<div class="d-flex exchg-old-user-options">
                    <input id="${"exchange" + index}" type="radio" name="radio" value="${vehicleData.modelName}"
                        data-target="stateList" data-from="exchangeList">
                    <label class="m-auto pr-2 w-100" for="${"exchange" + index}">
                        <div class="d-flex justify-content-between w-100 ml-sm-2 pl-sm-1 old-user-mob-content">
                            <div class="d-flex flex-column">
                                <div class="exchange-old-heading">
                                    ${vehicleData.modelName}
                                </div>
                                <div class="d-flex mt-sm-3 exchg-old-gap-cont">
                                    <div class="d-flex flex-column">
                                        <div class="exchange-old-subheading">Reg. Month & Year:</div>
                                        <div class="exchange-old-vals">${formattedDate.toLocaleString('default', { month: 'long' })} , ${formattedDate.getFullYear()}</div>
                                    </div>
                                    ${sessionLoggedDetails?.state && `<div class="d-flex flex-column">
                                        <div class="exchange-old-subheading">State & City:</div>
                                        <div class="exchange-old-vals">${capitalizedString(sessionLoggedDetails.state)} , ${capitalizedString(sessionLoggedDetails.city)}</div>
                                    </div> `}
                                </div>
                            </div>
                            <img src="/content/dam/hero-aem-website/in/exchange---assets/Fevicon.png"
                                class="exchg-old-hero-icon" alt="Hero Icon">
                        </div>
                    </label>
                </div>`;
                $(exchangeHtmlList).append(appendHtml);
            });
        }
        $(exchangeHtmlList).append(`<div class="d-flex justify-content-center exchg-old-user-new" data-from="exchangeList" data-target="vehicleList">Check your another vehicle</div>`);
    }

    function capitalizedString(value) {
        if(value) {
            let capitalizedValue = value.toLowerCase();
            capitalizedValue = capitalizedValue[0].toUpperCase() + capitalizedValue.substring(1);
            return capitalizedValue;
        }
    }

    function getDealersList(state, city) {
        let exchgDealersListUrl = $("#step-4 .exchg-dealers-wrap").attr("data-component-relativePath");
        var exchgDealersListPath = exchgDealersListUrl?.replace(
            "jcr:content",
            "_jcr_content"
        );
        const dataObject = new FormData();
        dataObject.append("state", state);
        dataObject.append("city", city);
        $.ajax({
            url: exchgDealersListPath,
            type: "POST",
            data: dataObject,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            success: function(resp) {
                const finalDataDealer = typeof resp == "string" ? JSON.parse(resp): resp;
                const dealerHtmlList = $('#step-4 .exchg-dealers-wrap');
                finalDataDealer.jsonData.forEach(function(dealerName, index) {
                  const appendHtml = `<div class="exchange-dealers">
                            <div class="exchg-dealers-options d-flex">
                                <input id="${"dealers" + index}" type="radio" name="exchgDealer" value="${dealerName.dealer_code}"
                                    class="active mt-sm-1 position-absolute">
                                <label class="text-center m-0 exchg-dealer-label pr-0" for="${"dealers" + index}">
                                    <div class="exchg-dealers-contents">
                                        <div class="exchg-dealers-name">${dealerName.center_name}</div>
                                        <div class="exchg-dealers-contacts">
                                            <img src="/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/exchg_call_icon.svg"
                                                class="" alt="dealers call">
                                            <div class="exchg-dealers-mob">${dealerName.webapp_number}</div>
                                        </div>
                                        <div class="exchg-dealers-contacts">
                                            <img src="/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/exchg_mail_icon.svg"
                                                class="" alt="dealers mail">
                                            <div class="exchg-dealers-mob">${dealerName.email}</div>
                                        </div>
                                        <div class="exchg-dealers-contacts">
                                            <img src="/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/exchg_address_icon.svg"
                                                class="" alt="dealers mail">
                                            <div class="exchg-dealers-location">${dealerName.webapp_address}</div>
                                        </div>
                                  </label>
                              </div>
                          </div>`
                    $(dealerHtmlList).append(appendHtml);
                })
                const exchangeSliderLength = $('.exchange-dealers').length;
                const browserWidth = $(window).width();

                if(browserWidth > 1200 && exchangeSliderLength < 5) {
                    $('.exchg-dealers-wrap .exchange-dealers').addClass('dealers-outer-wrap');
                    $('.exchg-dealers-wrap .exchg-dealers-options').addClass('w-100');
                    }

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
                        }
                    ],
                };

                
                $(".exchange-banner .exchg-dealers-wrap").slick(exchangeDealerSlick);
            },
            error: function(error) {},
        });
    }

    function getPriceDataObj() {
        var priceObj = new FormData();
        $('.form-step-one .exchg-left-nav-items').each(function() {
            var thisHeaderValue = $(this).find('.exchg-nav-heading p').html();
            const formattedDate = new Date(selectedVehicleObject?.purchaseDate);
            switch (thisHeaderValue) {
                case 'Year':
                    priceObj.append("year_of_mfg", selectedVehicleObject?.purchaseDate ? formattedDate.getFullYear() : $(this).find('.exchg-nav-subheading').html());
                    break;
                case 'City':
                    priceObj.append("city", $(this).find('.exchg-nav-subheading').html());
                    break;
                case 'State':
                    priceObj.append("state", $(this).find('.exchg-nav-subheading').html());
                    break;
                case 'Brand':
                    priceObj.append("make", selectedVehicleObject?.make ? selectedVehicleObject.make : $(this).find('.exchg-nav-subheading').html());
                    break;
                case 'Model':
                    priceObj.append("model", selectedVehicleObject?.modelName ? selectedVehicleObject.modelName : $(this).find('.exchg-nav-subheading').html());
                    break;
                case 'Month':
                    priceObj.append("month", selectedVehicleObject?.purchaseDate ? formattedDate.getMonth() + 1 : getMonthFromString($(this).find('.exchg-nav-subheading').html()));
                    break;
                case 'Vehicle Type':
                    priceObj.append("vehicle_type", selectedVehicleObject?.category_code ? selectedVehicleObject.category_code : $(this).find('.exchg-nav-subheading').html());
                    break;
                default:
                    console.log('Default case step 1');
            }
        });

        $('.form-step-two .exchg-left-nav-items').each(function() {
            var thisHeaderValue = $(this).find('.exchg-nav-heading p').html();
            switch (thisHeaderValue) {
                case 'Silencer':
                    priceObj.append("smoke", $(this).find('.exchg-nav-subheading').html() == 'Smoke' ? 'Y' : 'N');
                    break;
                case 'Problem in Starting':
                    priceObj.append("starting", $(this).find('.exchg-nav-subheading').html() == 'Starts Normally' ? 'Y' : 'N');
                    break;
                case 'Lights':
                    priceObj.append("light_indicator", $(this).find('.exchg-nav-subheading').html() == 'Working' ? 'Y' : 'N');
                    break;
                case 'Front Tyres':
                    priceObj.append("front_tyre", $(this).find('.exchg-nav-subheading').html() == 'Ok' ? 'Y' : 'N');
                    break;
                case 'Rear Tyres':
                    priceObj.append("rear_tyre", $(this).find('.exchg-nav-subheading').html() == 'Ok' ? 'Y' : 'N');
                    break;
                case 'Body Parts':
                    priceObj.append("body_part", $(this).find('.exchg-nav-subheading').html() == 'Ok' ? 'Y' : 'N');
                    break;
                default:
                    console.log('Default case step 2');
            }
        });

        priceObj.append("name", cookieLoggedData?.name ? cookieLoggedData.name : $('#exchangefullname').val());
        priceObj.append("phone", cookieLoggedData?.mobile ? cookieLoggedData.mobile : $('#exchangemobnumber').val());
        priceObj.append("pincode", $('#pincodeModal #pincode').val());

        return priceObj;

    }

    function callProspectApi() {
        const cityName = $('#step-1 #selectedCity')?.html();
        const dealerValue = $('.exchg-dealers-wrap .exchg-dealers-options input').filter(":checked").val();
        const modelName = selectedVehicleObject?.modelName  ? selectedVehicleObject.modelName : $('#step-1 #selectedModel')?.html();
        const exchgProspectUrl = $("#wheelerConfirmModal").attr("data-component-relativePath");
        const prospectObject = JSON.stringify({
            "dse_login": "",
            "comments": "",
            "referal_gl_No": "",
            "fName": cookieLoggedData?.name ? cookieLoggedData.name : $('#exchangefullname').val(),
            "enquirySource": "",
            "next_followup_Dt": "",
            "prospect_source": "",
            "emailId": "",
            "referal_VIN": "",
            "testride_Flag": "",
            "lName": ".",
            "app_Source": "",
            "modelInterested_In": "",
            "mobile_Number": cookieLoggedData?.mobile ? cookieLoggedData.mobile : $('#exchangemobnumber').val(),
            "expected_purchaseDt": "",
            "city": cityName,
            "dealer_code": dealerValue ? dealerValue : '',
        });
        $.ajax({
            url: exchgProspectUrl,
            type: "POST",
            contentType: "application/json",
            data: prospectObject,
            success: function(resp) {
                console.log('Exchange Prospect response', resp);
                let getFinalData = sessionStorage.getItem("exchangeVehicleInfo");
                let getVehicleDatalayer = JSON.parse(getFinalData) || '';
                let aainactivity = sessionStorage.getItem("exchangeInactivity") || '';
                if (window.digitalData && window._satellite) {
                    window.digitalData = {
                        exchangeDetails: getVehicleDatalayer || '',
                        vehicleCondition: {
                          condition : sessionStorage.getItem('vehicleCondition') || '',
                        },
                        journeyType: {
                          type: sessionStorage.getItem("aaExchangeJourneyType") || "",
                        },
                        responseDetails:{
                          resaleValue: $('.calc-price-text').text() || '',
                          dealerName: $('#confirmDealerText').text() || '',
                          heroExchangeVehicleName: $('#confirmModelText').text() || '',
                          wheelerExchangePrice: sessionStorage.getItem("wheelerExchangePrice") || "",
                          wheelerActualPrice: sessionStorage.getItem("wheelerActualPrice") || "",
                          type: aainactivity != "yes" || !aainactivity || aainactivity == "" ? 'User submit' : 'inActivityCall',
                        },
                        page: {
                          siteType: "AEM",
                          pageURL: window.location.href,
                          fullURL: window.location.href,
                          hostName: window.location.origin,
                          fullReferringUrl: document.referrer,
                          pagename: document.title,
                          product:document.title,
                        }
                    }
                    _satellite.track("Exchange Journey Completed");
                }
            },
            error: function(error) {},
        });
    }

    function callExchangeSubmitApi() {
        const dealerValue = $('.exchg-dealers-wrap .exchg-dealers-options input').filter(":checked").val();
        const modelName = selectedVehicleObject?.modelName  ? selectedVehicleObject.modelName : $('#step-1 #selectedModel')?.html();
        const exchangeSubmitUrl = $("#wheelerModal").attr("data-component-relativePath");
        var exchangeSubmitPath = exchangeSubmitUrl?.replace(
            "jcr:content",
            "_jcr_content"
        );
        const exchgSubObj = new FormData();
        exchgSubObj.append("enquiry_id", sessionStorage.getItem("exchangeEnquiryId"));
        exchgSubObj.append("dealer_id", dealerValue);
        exchgSubObj.append("model", modelName);
        const submitData = exchgSubObj;
        $.ajax({
            url: exchangeSubmitPath,
            type: "POST",
            data: submitData,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            success: function(resp) {
                console.log('Exchange Submit response', resp);
            },
            error: function(error) {
                console.log('Exchange Submit error', error);
            },
        });
    }

    function getMonthFromString(mon) {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
    }

    /**
     * Define a function to navigate betweens form steps.
     * It accepts one parameter. That is - step number.
     */
    const navigateToFormStep = (stepNumber) => {
        /**
         * Hide all form steps.
         */
        document.querySelectorAll(".form-step").forEach((formStepElement) => {
            formStepElement.classList.add("d-none");
        });
        /**
         * Mark all form steps as unfinished.
         */
        document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
            formStepHeader.classList.add("form-stepper-unfinished");
            formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
        });
        /**
         * Show the current form step (as passed to the function).
         */
        document.querySelector("#step-" + stepNumber).classList.remove("d-none");
        /**
         * Select the form step circle (progress bar).
         */
        const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');
        /**
         * Mark the current form step as active.
         */
        formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
        formStepCircle.classList.add("form-stepper-active");
        /**
         * Loop through each form step circles.
         * This loop will continue up to the current step number.
         * Example: If the current step is 3,
         * then the loop will perform operations for step 1 and 2.
         */
        for (let index = 0; index < stepNumber; index++) {
            /**
             * Select the form step circle (progress bar).
             */
            const formStepCircle = document.querySelector('li[step="' + index + '"]');
            /**
             * Check if the element exist. If yes, then proceed.
             */
            if (formStepCircle) {
                /**
                 * Mark the form step as completed.
                 */
                formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
                formStepCircle.classList.add("form-stepper-completed");
            }
        }

        if ($('#clickStep2li.form-stepper-active .form-stepper-circle img').length > 0) {
            $('#clickStep2li.form-stepper-active .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/condition-multistep-visited.svg');
        } else if ($('#clickStep3li.form-stepper-active .form-stepper-circle img').length > 0) {
            $('#clickStep3li.form-stepper-active .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/customer-multistep-visited.svg');
        } else if ($('#clickStep4li.form-stepper-active .form-stepper-circle img').length > 0) {
            $('#clickStep4li.form-stepper-active .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/valuation-multistep-visited.svg');
        }

        if ($('#clickStep3li.form-stepper-completed .form-stepper-circle img').length > 0) {
            $('#clickStep3li.form-stepper-completed .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/customer-multistep-completed.svg');
        } else if ($('#clickStep2li.form-stepper-completed .form-stepper-circle img').length > 0) {
            $('#clickStep2li.form-stepper-completed .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/condition-multistep-completed.svg');
        }
        if ($('#clickStep1li.form-stepper-completed .form-stepper-circle img').length > 0) {
            $('#clickStep1li.form-stepper-completed .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/vehicle-multistep-completed.svg');
        }
    };
    /**
     * Select all form navigation buttons, and loop through them.
     */
    document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
        /**
         * Add a click event listener to the button.
         */
        formNavigationBtn.addEventListener("click", () => {
            /**
             * Get the value of the step.
             */
            const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
            const fromStepper = formNavigationBtn.getAttribute("navigation_from");
            let pincodeEle = document.getElementById("ex-submit-city");
            if (formNavigationBtn.getAttribute("navigation_from")?.length > 0) {
                if ($('.calc-intro-text').html().length> 0 || $('#clickStep4li').hasClass("form-stepper-active")) return;
                switch (stepNumber) {
                    case 1:
                        if (!($('#stateList .exchg-content-options').hasClass("active-option-checks"))) return;
                        $('#clickStep1li.form-stepper-completed .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/vehicle-multistep.svg');
                        $('.exchg-left-nav-items').removeClass('active');
                        $('.exchg-vehicle-content').removeClass('active-tab');
                        $('.form-step-one').find(`[data-target='cityList']`).addClass('active');
                        $('.exchange-form-wrap #cityList').addClass('active-tab');
                        if (lastVisitedStepper == "3" || lastVisitedStepper == "2") {
                            $('#clickStep2li.form-stepper-list .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/condition-multistep-visited.svg');
                        }
                        lastVisitedStepper = "1";
                        break;
                    case 2:
                        if($('#cityList input').filter(":checked").length > 0 && $('.exchange-pincode-search').val().length == 6 && !$('#rearTyresList .exchg-content-options').hasClass("active-option-checks")){
                            if(lastVisitedStepper == "1" && fromStepper == 'steppers' && stepNumber == $("#ex-submit-city").attr("step_number")){
                                $('#pincodeModal').modal('toggle');
                                return;
                            }
                            $('.exchg-left-nav-items').removeClass('active');
                            $('.exchg-vehicle-content').removeClass('active-tab');
                            $('.form-step-two').find(`[data-target='silencerList']`).addClass('active');
                            $('.exchange-form-wrap #silencerList').addClass('active-tab');
                            let checkDiv = $("div").find(`[data-target='silencerList']`);
                            if (checkDiv.find('.exchg-nav-subheading').html().length > 0) {
                                const targetArrayList = aa = $('#silencerList').find('input')?.toArray()
                                targetArrayList.forEach(element => {
                                    if (checkDiv.find('.exchg-nav-subheading').html() == $(element).attr('value')) {
                                        $(element).prop('checked', true);
                                    }
                                }); 
                            }
                            lastVisitedStepper = "2";
                            break;
                        }
                        if (!($('#cityList input').filter(":checked").length > 0 && $('.exchange-pincode-search').val().length == 6)) return;
                        if (!($('#rearTyresList .exchg-content-options').hasClass("active-option-checks"))) return;
                        if(lastVisitedStepper == "1" && fromStepper == 'steppers' && stepNumber == $("#ex-submit-city").attr("step_number")){
                                $('#pincodeModal').modal('toggle');
                                return;
                            }
                        if(lastVisitedStepper == "1" && fromStepper == 'steppers' && stepNumber != $("#ex-submit-city").attr("step_number")){
                            pincodeEle.setAttribute("step_number", "2");
                            $('#pincodeModal').modal('toggle');
                            return;
                        }
                        $('.exchg-left-nav-items').removeClass('active');
                        $('.exchg-vehicle-content').removeClass('active-tab');
                        $('.form-step-two').find(`[data-target='partsList']`).addClass('active');
                        $('.exchange-form-wrap #partsList').addClass('active-tab');
                        let checkDiv = $("div").find(`[data-target='partsList']`);
                        if (checkDiv.find('.exchg-nav-subheading').html().length > 0) {
                            const targetArrayList = aa = $('#partsList').find('input')?.toArray()
                            targetArrayList.forEach(element => {
                                if (checkDiv.find('.exchg-nav-subheading').html() == $(element).attr('value')) {
                                    $(element).prop('checked', true);
                                }
                            }); 
                        }
                        lastVisitedStepper = "2";
                        break;
                    case 3:
                        if (!($('#cityList input').filter(":checked").length > 0 && $('.exchange-pincode-search').val().length == 6 && $('#partsList .exchg-content-options').hasClass("active-option-checks"))) return;
                        if(lastVisitedStepper == "1" && fromStepper == 'steppers' && stepNumber != $("#ex-submit-city").attr("step_number")){
                            pincodeEle.setAttribute("step_number", "3");
                            $('#pincodeModal').modal('toggle');
                            return;
                        }
                        $('#clickStep1li').addClass('form-stepper-completed');
                        lastVisitedStepper = "3";
                        break;
                    default:
                        console.log('Default case');
                }
            }
            if (sessionLoggedDetails && sessionLoginType == 'existing' && $(formNavigationBtn).data('from') == 'partsList') {
                $('#exchg-loader-modal').modal('show');
                setTimeout($('.after-success-loader').removeClass('d-none'), 5000);
                setTimeout(() => {
                    sessionLoggedDetails = sessionLoggedDetails?.username ? sessionLoggedDetails : JSON.parse(decodeURIComponent(atob(sessionLoggedDetails)));
                    $('#exchg-loader-modal').modal('hide');
                    const stateName = $('#step-1 #selectedState')?.html();
                    const cityName = $('#step-1 #selectedCity')?.html();
                    navigateToFormStep(stepNumber);
                    if ($('#clickStep2li.form-stepper-completed .form-stepper-circle img').length > 0) {
                        $('#clickStep2li.form-stepper-completed .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/condition-multistep-completed.svg');
                    }
                    getCalculatedPriceDetails();
                    getDealersList(stateName, cityName);
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                    const brandName = selectedVehicleObject?.make  ? selectedVehicleObject.make : $('#step-1 #selectedBrand')?.html();
                    const modelName = selectedVehicleObject?.modelName  ? selectedVehicleObject.modelName : $('#step-1 #selectedModel')?.html();
        
                    if (brandName.length > 0 || modelName.length > 0 || stateName.length > 0 || cityName.length > 0) {
                        $('#step-4 #calcBrand').html(brandName + ' ' + modelName);
                        $('#step-4 #calcState').html(stateName);
                        $('#step-4 #calcCity').html(cityName);
                    }
                    calculateScreenDisplay();
                    $('.calc-intro-text').html(`Hi ${sessionLoggedDetails.username}`);
                    $('.exchange-step-4-faq').addClass('d-block');
                    $('.exchg-wheeler-wrap .exchg-wheeler-carousel').slick('refresh');
                }, 5000);
            } else {
                const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
                /**
                 * Call the function to navigate to the target form step.
                 */
                navigateToFormStep(stepNumber);
            }
            if (fromStepper == 'pincodestep' && lastVisitedStepper == "3") {
                pincodeEle.setAttribute("step_number", "2");
            }
        });
    });

    $('#wheelerConfirmModal .booknow-btn').click(function() {
        const checkedDealer = $('.exchg-dealers-wrap input').filter(":checked").parent().find('label .exchg-dealers-name').html();
        if(checkedDealer) {
            $('.wheeler-confirm-modal-body').addClass('d-none');
            $('.wheeler-congrats-modal').removeClass('d-none');
            setInterval(function() {
                $('#wheelerConfirmModal').modal('hide');
                $('#wheelerModal').modal('hide');
                setTimeout(function() {
                    $('.exchg-dealer-main-heading, .exchg-dealers-wrap').remove();
                    $('.exchg-wheeler-main-heading, .exchg-wheeler-wrap').remove();
                }, 500)
            }, 3000);

            const dealerValue = $('.exchg-dealers-wrap .exchg-dealers-options input').filter(":checked").val();
            const modelName = selectedVehicleObject?.modelName  ? selectedVehicleObject.modelName : $('#step-1 #selectedModel')?.html();
            callProspectApi();

            callExchangeSubmitApi();

            const exchgEnquireUrl = $("#wheelerConfirmModal .booknow-btn").attr("data-component-relativePath");
            const brandName = selectedVehicleObject?.make  ? selectedVehicleObject.make : $('#step-1 #selectedBrand')?.html();
            let exchangePriceVal = $('.calc-price-text').html();
            let formattedYear = new Date(selectedVehicleObject?.purchaseDate)
            formattedYear = selectedVehicleObject?.purchaseDate ? formattedYear.getFullYear().toString() : $('#step-1 #selectedYear')?.html();
            exchangePriceVal = exchangePriceVal && exchangePriceVal !== '' ? exchangePriceVal.substring(exchangePriceVal.indexOf('-') + 4) : '20000';
            const enquiryObject = JSON.stringify({
                    "body":{
                        "FstName":cookieLoggedData?.name ? cookieLoggedData.name : $('#exchangefullname').val(),
                        "LstName":".",
                        "Mobile":cookieLoggedData?.mobile ? cookieLoggedData.mobile : $('#exchangemobnumber').val(),
                        "Model": $('#wheelerModal').hasClass('show') ? $('#wheelerModal .wheeler-modal-body input').filter(":checked").val().toUpperCase() :
                            $('.exchg-wheeler-carousel input').filter(":checked").val().toUpperCase(),
                        "Dealer":dealerValue,
                        "ExchangeReq":"Y",
                        "FinanceReq":"N",
                        "EnquirySource":"Activity WOT",
                        "VehicleMake":brandName,
                        "VehicleModel":modelName,
                        "ModelYear":formattedYear,
                        "Priceoffered":exchangePriceVal,
                        "PropensityScore":"6",
                        "Source":"WOT"
                    }
                });
            $.ajax({
                url: exchgEnquireUrl,
                type: "POST",
                contentType: "application/json",
                data: enquiryObject,
                success: function(resp) {
                    console.log('Exchange Enquiry response', resp);
                },
                error: function(error) {},
            });
            $('#clickStep4li.form-stepper-list .form-stepper-circle img').attr('src', '/etc.clientlibs/hero-aem-website/clientlibs/clientlib-site/resources/images/icons/valuation-multistep-completed.svg');
            setTimeout(function() {
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 3000);
        }
      })

    function handleSearchClick(thisValue) {
        var searchValue = $(thisValue) && ($(thisValue).val() == '' || $(thisValue).val() == undefined) ? '' : $(thisValue).val().toLowerCase();
        $('.exchg-content-options-wrap label, .exchg-city-content-options-wrap label').each(function() {
            const exceptionFilterList = $(this)?.parent()?.parent()?.parent()?.attr('id');
            var optionText = $(this).text().toLowerCase();
            if(exceptionFilterList && exceptionFilterList != 'monthList') {
                if (optionText.indexOf(searchValue) > -1) {
                    $(this).parent().css("cssText", "display : table !important;");
                } else {
                    $(this).parent().css("cssText", "display : none !important;");
                }
            }
        });
        const searchSuperParent = $(thisValue).parent().parent().parent();
        if(searchSuperParent.find('.exchg-content-options')?.length == searchSuperParent.find('.exchg-content-options:hidden').length) {
            searchSuperParent.find('.exchg-content-noresults').removeClass("d-none");
            searchSuperParent.find('.exchg-content-subtitle').addClass("d-none");
        } else {
            searchSuperParent.find('.exchg-content-noresults').addClass("d-none");
            searchSuperParent.find('.exchg-content-subtitle').removeClass("d-none");
        }
    }

    // Search functionality for Multistep Form
    $('.exchange-brand-search, .exchange-model-search, .exchange-state-search, .exchange-city-search, .exchange-year-search').on('input', function() {
        handleSearchClick($(this));
    });

    $('.check-popup-text').click(function() {
        var checkId = $(this).data('check-id');
        let checkWrappers = document.querySelectorAll('.exchg-modal-contents-wrap');
        checkWrappers.forEach(wrapperPanel => {
            wrapperPanel.style.display = wrapperPanel.id === checkId ? 'block' : 'none';
        });
    })


    $(".otp-form *:input[type!=hidden]:first").focus();
    let otp_fields = $(".otp-form .otp-field"),
        otp_value_field = $(".otp-form .otp-value");
    otp_fields
        .on("input", function(e) {
            $(this).val(
                $(this)
                .val()
                .replace(/[^0-9]/g, "")
            );
            let opt_value = "";
            otp_fields.each(function() {
                let field_value = $(this).val();
                if (field_value != "") opt_value += field_value;
            });
            otp_value_field.val(opt_value);
        })
        .on("keyup", function(e) {
            let key = e.keyCode || e.charCode;
            if (key == 8 || key == 46 || key == 37 || key == 40) {
                $(this).prev().focus();
            } else if (key == 38 || key == 39 || $(this).val() != "") {
                $(this).next().focus();
            }
        })

    $('#otp-verification-proceed').on("click", async function() {
        let mobNumber = $(".ex-form-tab-content #exchangemobnumber").val();
        if (isValidOtp(mobNumber, otp_value_field.val())) {
            $('#clickStep3li .exchg-multi-progress-bar').addClass('progress-bar-full');
            $('.otp-verfication').addClass('d-none');
            $('.otp-verified').removeClass('d-none');
            let getFinalData = sessionStorage.getItem("exchangeVehicleInfo");
            let getVehicleDatalayer = JSON.parse(getFinalData) || "";
            if (window.digitalData) {
                window.digitalData = {
                  event: "Exchange Customer Details Submitted",
                  exchangeDetails: getVehicleDatalayer || "",
                  vehicleCondition: {
                    condition: sessionStorage.getItem('vehicleCondition') || "",
                  },
                  journeyType: {
                    type: sessionStorage.getItem("aaExchangeJourneyType") || "",
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
                };
            }
            setTimeout(contentLoader, 3000);

        } else {
            $('.otp-verfication').addClass('d-none');
            $('.otp-failed').removeClass('d-none');
        }
    })

    function calculateScreenDisplay() {
        setTimeout(() => {
            $('.exchg-calculate-wrap #calculatingId').css('display', 'none');
            $('.exchg-calculate-wrap #estimatedId').css('display', 'block')
        }, 3000);
        setTimeout(() => {
            $('.exchg-calculate-wrap #estimatedId').css('display', 'none');
            $('.exchg-calculate-wrap #calcPriceWrap').css('display', 'block')
        }, 5000);
    }

    function contentLoader() {
        $('.otp-verfication').addClass('d-none');
        $('.otp-verified').addClass('d-none');
        $('#otp-modal .modal-content').removeClass('modal-mob-content');
        $('#otp-modal .modal-dialog').removeClass('modal-mob-bottom');
        setTimeout($('.after-success-loader').removeClass('d-none'), 5000);
        const stateName = $('#step-1 #selectedState')?.html();
        const cityName = $('#step-1 #selectedCity')?.html();
        getCalculatedPriceDetails();
        getDealersList(stateName, cityName);
        setTimeout(() => {
            navigateToFormStep(4);
            $('#otp-modal').modal('hide');
            $("html, body").animate({ scrollTop: 0 }, "slow");
            const brandName = $('#step-1 #selectedBrand')?.html();
            const modelName = $('#step-1 #selectedModel')?.html();

            if (brandName.length > 0 || modelName.length > 0 || stateName.length > 0 || cityName.length > 0) {
                $('#step-4 #calcBrand').html(brandName + ' ' + modelName);
                $('#step-4 #calcState').html(stateName);
                $('#step-4 #calcCity').html(cityName);
            }
            calculateScreenDisplay();
            $('.calc-intro-text').html('Hi ' + $('#exchangefullname').val())
            $('.exchange-step-4-faq').addClass('d-block');
            $('.exchg-wheeler-wrap .exchg-wheeler-carousel').slick('refresh');
            $(window).width() > 576 && $('.exchg-dealers-wrap .exchange-dealers').length > 4 && $('.exchg-dealers-wrap').slick('refresh');
            $(window).width() < 577 && $('.exchg-dealers-wrap').slick('refresh');
            if ($(window).width() < 577 && $('.exchg-dealers-wrap .exchange-dealers').length == 1) $('.exchg-dealers-wrap .slick-dots').addClass('d-none');
        }, 5000);
    }

    function isValidOtp(mobile, otp) {
        const reqId = sessionStorage.getItem("tempID");
        return (
            otp.toString() ===
            (Math.abs(hashCode(mobile + reqId)) % 1000000).toString().padStart(6, "0")
        );
    }

    function generateId(len) {
        var arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, dec2hex).join("");
    }

    function dec2hex(dec) {
        return dec.toString(16).padStart(2, "0");
    }

    function hashCode(s) {
        var h = 0,
            l = s.length,
            i = 0;
        if (l > 0)
            while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
        return h;
    }

    function  requestOtp(contactNumber, pageType) {
        sessionStorage.setItem("tempID", generateId());
        var otpdata = {
            phoneNum: contactNumber,
            pageType: pageType,
            reqID: sessionStorage.getItem("tempID"),
        };

        let defaultservlet = $("#exchange-jounery-servlet").val();
        $.ajax({
            url: defaultservlet + ".sendotp.html",
            type: "POST",
            data: otpdata,
            success: function(resp) {
                console.log(resp);
                if (window.digitalData) {
                    window.digitalData = {
                      event: "OTP Success",
                      form:{
                        formname:'Exchange customer login',
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
                console.log(err);
                if (window.digitalData) {
                    window.digitalData = {
                      event: "OTP fails",
                      form:{
                        formname:'Exchange customer login',
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
        });
    }

    function onSendOTP() {
        let mobNumber = $(".ex-form-tab-content #exchangemobnumber").val();
        const pageType = "homepage"; // Exchange Vehicle
        if (mobNumber) {
            requestOtp(mobNumber, pageType);
        }
    }

    $("#exchange-userdata").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let isFormValid = $("#exchangeUserValidation");
        if (isFormValid.valid()) {
            if (window.digitalData && window._satellite) {
                window.digitalData = {
                  form:{
                    formname:'Exchange customer login',
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
                _satellite.track("OTP Requested");
              }
            onSendOTP();
            $(".verifyNumber").text(
                $(".ex-form-tab-content #exchangemobnumber").val()
            );
            $(".otp-verfication").removeClass("d-none");
            $(".otp-failed").addClass("d-none");
            $(".otp-verified").addClass("d-none");
            $("#otp-modal").modal("show");
        }
    });

    $("#resendStepperOtp").click(function(e) {
        e.stopImmediatePropagation();
        if (window.digitalData && window._satellite) {
            window.digitalData = {
              form:{
                formname:'Exchange customer login',
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
            _satellite.track("OTP Requested");
          }
        $('.otp-form .otp-field').val('');
        onSendOTP();
    });

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

        jQuery.validator.addMethod("indianNumber", function(value) {
            return /^[6789]\d{9}$/i.test(value);
        });

        $form.validate({
            ignore: [],
            rules: {
                mobile: {
                    required: true,
                    validNumber: true,
                    indianNumber: true,
                },
                fullname: {
                    required: true,
                },
                agreement: {
                    required: true,
                },
            },
            messages: {
                mobile: {
                    required: $("#exchangemobnumber").data("validation-msg-req"),
                    validNumber: "Please enter a valid number",
                    indianNumber: "Please enter a valid number",
                },
                fullname: {
                    required: $("#exchangefullname").data("validation-msg-req"),
                },
                agreement: {
                    required: $("#exchangefullname").data("validation-msg-req"),
                },
            },
        });
    }

    if ($("#exchangeUserValidation").length > 0) {
        exchangeFormValidation($("#exchangeUserValidation"));
    }
});