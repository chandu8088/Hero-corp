$("document").ready(function () {
  if ($("#prebook-wrapper").length) {
    $("#festpaynowcheck").change(function () {
      if ($(this).is(":checked")) {
        $("#fest-sub-btn").prop("disabled", false);
      } else {
        $("#fest-sub-btn").prop("disabled", true);
      }
    });

    $(".mobile-number").on("keyup", function () {
      if ($(this).val().length == 10 && $(this).valid()) {
        $(this)
          .parent(".cust-form-group")
          .find(".send-otp-btn")
          .addClass("show");
      } else {
        $(this)
          .parents("form")
          .find(".test-drive-otp-link")
          .removeClass("show");
        $(this).parents("form").find(".otp-field").prop("disabled", true);
      }
    });
    function checkHidden(form) {
      var allHiddenInputsHaveValue = true;
      form.find("input").each(function () {
        if ($(this).val() === "") {
          allHiddenInputsHaveValue = false;
          return false;
        }
      });
      return allHiddenInputsHaveValue;
    }
    function isValidOtp(mobile, otp) {
      const reqId = sessionStorage.getItem("tempID");
      return (
        otp.toString() ===
        (Math.abs(hashCode(mobile + reqId)) % 1000000)
          .toString()
          .padStart(6, "0")
      );
    }
    function dec2hex(dec) {
      return dec.toString(16).padStart(2, "0");
    }
    function generateId(len) {
      var arr = new Uint8Array((len || 40) / 2);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, dec2hex).join("");
    }
    function sendOtp(currentForm) {
      let category = window.location.pathname.split("/")[2];
      let splitedUrl = window.location.origin.split("//");
      let splitedDomain = splitedUrl[1].split(".");
      let siteCategory;
      if (splitedDomain[1] === "heromotocorp") {
        siteCategory = "corporate";
      }
      if (splitedDomain[1] === "dealers") {
        siteCategory = "dealer";
      }
      var pageType = $(currentForm).find('[name="pageType"]').val();
      sessionStorage.setItem("tempID", generateId());
      var otpdata = {
        phoneNum: $(currentForm).find('[name="mobileno"]').val(),
        pageType: pageType,
        vehicleName:
          pageType == "homepage"
            ? $(currentForm).find('[name="vehicleNameVal"]').val()
            : "",
        reqID: sessionStorage.getItem("tempID"),
      };
      $.ajax({
        url: defaultservlet + ".sendotp.html",
        type: "POST",
        data: otpdata,
        success: function (resp) {
          resp = JSON.parse(resp);
          if (window.digitalData) {
            window.digitalData = {
              event: "OTP sent Successful",
              form: {
                formname: currentForm.data("aa-formname"),
                formtype: currentForm.attr("id"),
              },
              page: {
                siteType: "AEM",
                siteCategory: siteCategory,
                fullReferringUrl: document.referrer,
                pageName: pageTitle,
                pageUrl: window.location.href,
                path: window.location.pathname,
                category: category ? category : "",
              },
            };
          }
        },
        error: function () {
          $(currentForm).find(".invalid-otp-message").show();
          if (window.digitalData && window._satellite) {
            window.digitalData = {
              event: "OTP fails",
              form: {
                formname: currentForm.data("aa-formname"),
                formtype: currentForm.attr("id"),
                fieldlist: "otp",
              },
              page: {
                siteType: "AEM",
                siteCategory: siteCategory,
                fullReferringUrl: document.referrer,
                pageName: pageTitle,
                pageUrl: window.location.href,
                path: window.location.pathname,
                category: category ? category : "",
              },
            };
            _satellite.track("formError");
          }
        },
      });
    }

    $(".send-otp-btn").on("click", function () {
      var currentForm = $(this).parents("form");
      $(currentForm).find(".resend-otp-btn").addClass("show");
      $(currentForm).find(".otp-field").attr("disabled", false);
      $(currentForm).find(".otp-field").focus();
      if ($("#prebook-wrapper").length) {
        $(this).text("Resend OTP");
        $(currentForm).find(".otp-form").removeClass("d-none");
        $(".invalid-otp-message").hide();
      } else {
        $(this).removeClass("show");
      }
      sendOtp(currentForm);
    });

    $(".resend-otp-btn").on("click", function () {
      var currentForm = $(this).parents("form");
      sendOtp(currentForm);
      $(this).attr("data-attempt", parseInt($(this).attr("data-attempt")) + 1);
      let attempts = $(this).attr("data-attempt");
      if (attempts == 3) {
        $(this).removeClass("show");
      }
    });
    $(".otp-value").on("keyup", function () {
      $(".invalid-otp-message").hide();
      if ($(this).val().length == 6) {
        let form = $(this).parents("form");
        let mobNumber;
        if ($(".modal-comp #number")?.val()?.length > 0)
          mobNumber = $(".modal-comp #number").val();
        else mobNumber = $("#number").val();
        let otpEntered = $(this).val();
        if (isValidOtp(mobNumber, otpEntered)) {
          $(this).parent().addClass("valid--otp");
          if (checkHidden(form)) {
            form.find("input").each(function (index) {
              if ($(this).attr("name") !== "otp") {
                let inputValue = $(this).val();
                form
                  .parent()
                  .parent()
                  .siblings()
                  .find(".grey-text span")
                  .eq(index)
                  .text(inputValue);
              }
            });
            $(".accordion-card")
              .eq(2)
              .find(".accordion--title")
              .removeClass("pe-none");
            $(".accordion-card").eq(2).find(".accordion--title").click();
            form
              .parent()
              .parent()
              .siblings()
              .find(".grey-text")
              .removeClass("d-none");
          }
          $(".invalid-otp-message").hide();
        } else {
          $(this).parent().removeClass("valid--otp");
          $(this).parent().addClass("invalid--otp");
          $(".invalid-otp-message").show();
        }
      } else {
        $(this).parent().removeClass("valid--otp");
      }
    });

    const vehicleForm = $("#vehicle-form");
    const locationForm = $("#location-form");
    const defaultservlet = document.getElementById("defaultservlet").value;

    let vehicleList = vehicleForm
      .find('[name="vehiclename"]')
      .parents(".cust-drop-down")
      .find(".cust-dropdown-menu ");

    let stateList = locationForm
      .find('[name="statename"]')
      .parents(".cust-drop-down")
      .find(".cust-dropdown-menu ");

    populateDropdownPreBook(
      defaultservlet + ".modellist.html",
      vehicleList,
      "vehicle",
      window && window.locations ? locations.State : null,
      false
    );

    populateDropdownPreBook(
      defaultservlet + ".statelist.html",
      stateList,
      "state",
      window && window.locations ? locations.State : null,
      false
    );

    function checkForms(form) {
      var allHiddenInputsHaveValue = true;
      form.find("input").each(function () {
        if ($(this).val() === "") {
          allHiddenInputsHaveValue = false;
          return false;
        }
      });
      return allHiddenInputsHaveValue;
    }

    $(".festive-accordion .accordion--title").click(function (e) {
      let dropDown = $(this)
        .closest(".accordion-card")
        .find(".accordion--panel");
      $(this)
        .closest(".festive-accordion")
        .find(".accordion--panel")
        .not(dropDown)
        .slideUp();
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(this)
          .closest(".festive-accordion")
          .find(".accordion--title.active")
          .removeClass("active");
        $(this).addClass("active");
      }
      dropDown.stop(false, true).slideToggle();
      e.preventDefault();
    });

    $(".festive-accordion .accordion--title").first().click();

    $(".festive-accordion .cust-dropdown-menu").on("click", "li", function () {
      let selectionGroup = $(this).parents(".cust-drop-down");
      let button = selectionGroup.find(".dropdown-select");
      let variantButton = $('[name="variantname"]');
      let colorButton = $('[name="colorname"]');
      let cityButton = $('[name="cityname"]');
      let form = $(this).closest("form");

      button.text($(this).find("a")[0].innerHTML.replaceAll("&amp;", "&"));
      $(this).addClass("active");

      if ("vehiclename" == button.attr("name")) {
        button.addClass("active");
        variantButton.removeClass("active");
        variantButton.text(variantButton.attr("data-default-label"));
        $("[name=variantNameVal]").val("");
        $("[name=colorNameVal]").val("");
        colorButton.removeClass("active");
        colorButton.text(colorButton.attr("data-default-label"));
        form.find('[name="vehicleNameVal"]').val($(this).attr("value"));

        let list = variantButton
          .parents(".cust-drop-down")
          .find(".cust-dropdown-menu ");

        variantPath =
          defaultservlet +
          ".modelsdata." +
          $(this).attr("value") +
          ".ap.adoni" +
          ".html";

        let variantValue =
          null != (window && window.locations) ? locations.State : "";

        populateDropdownPreBook(
          variantPath,
          list,
          "variant",
          variantValue,
          true
        );

        variantButton[0].disabled = false;
        colorButton[0].disabled = true;

        if (checkForms(form)) {
          form.find("input").each(function (index) {
            let inputValue = $(this).parent().find("button").text();
            form
              .parent()
              .parent()
              .siblings()
              .find(".grey-text span")
              .eq(index)
              .text(inputValue);
          });
          form
            .parent()
            .parent()
            .siblings()
            .find(".grey-text")
            .removeClass("d-none");
          $(".accordion-card")
            .eq(1)
            .find(".accordion--title")
            .removeClass("pe-none");
          $(".accordion-card").eq(1).find(".accordion--title").click();
        } else {
          form
            .parent()
            .parent()
            .siblings()
            .find(".grey-text")
            .addClass("d-none");
        }
      } else if ("variantname" == button.attr("name")) {
        button.addClass("active");
        colorButton.removeClass("active");
        colorButton.text(colorButton.attr("data-default-label"));
        $("[name=colorNameVal]").val("");
        form
          .find('[name="variantNameVal"]')
          .val($(this).text().toLowerCase().replace(/ /g, "_").trim());
        colorButton[0].disabled = false;
        if (checkForms(form)) {
          form.find("input").each(function (index) {
            let inputValue = $(this).parent().find("button").text();
            form
              .parent()
              .parent()
              .siblings()
              .find(".grey-text span")
              .eq(index)
              .text(inputValue);
          });
          form
            .parent()
            .parent()
            .siblings()
            .find(".grey-text")
            .removeClass("d-none");
          $(".accordion-card")
            .eq(1)
            .find(".accordion--title")
            .removeClass("pe-none");
          $(".accordion-card").eq(1).find(".accordion--title").click();
        } else {
          form
            .parent()
            .parent()
            .siblings()
            .find(".grey-text")
            .addClass("d-none");
        }
      } else if ("colorname" == button.attr("name")) {
        button.addClass("active");
        form.find('[name="colorNameVal"]').val($(this).attr("value"));
        if (checkForms(form)) {
          form.find("input").each(function (index) {
            let inputValue = $(this).parent().find("button").text();
            form
              .parent()
              .parent()
              .siblings()
              .find(".grey-text span")
              .eq(index)
              .text(inputValue);
          });
          form
            .parent()
            .parent()
            .siblings()
            .find(".grey-text")
            .removeClass("d-none");
          $(".accordion-card")
            .eq(1)
            .find(".accordion--title")
            .removeClass("pe-none");
          $(".accordion-card").eq(1).find(".accordion--title").click();
        }
      } else if ("statename" == button.attr("name")) {
        button.addClass("active");
        cityButton.removeClass("active");
        cityButton.text(cityButton.attr("data-default-label"));
        $("[name=cityNameVal]").val("");
        form.find('[name="stateNameVal"]').val($(this).attr("value"));

        let list = cityButton
          .parents(".cust-drop-down")
          .find(".cust-dropdown-menu ");

        cityPath =
          defaultservlet + ".dealercities." + $(this).attr("value") + ".html";

        let cityValue =
          null != (window && window.locations) ? locations.City : "";

        populateDropdownPreBook(cityPath, list, "city", cityValue, true);
        cityButton[0].disabled = false;
      } else if ("cityname" == button.attr("name")) {
        button.addClass("active");
        form.find('[name="cityNameVal"]').val($(this).attr("value"));
        let selectedState = $('[name="stateNameVal"]').val();
        dealerPath =
          defaultservlet +
          ".dealerdata." +
          selectedState +
          "." +
          $(this).attr("value") +
          ".html";

        getDealers(dealerPath);

        if (checkForms(form)) {
          form.find("input").each(function (index) {
            let inputValue = $(this).parent().find("button").text();
            form
              .parent()
              .parent()
              .siblings()
              .find(".grey-text span")
              .eq(index)
              .text(inputValue);
          });
          form
            .parent()
            .parent()
            .siblings()
            .find(".grey-text")
            .removeClass("d-none");
          $(".accordion-card")
            .eq(2)
            .find(".accordion--title")
            .removeClass("pe-none");
          $(".accordion-card").eq(2).find(".accordion--title").click();
        } else {
          form
            .parent()
            .parent()
            .siblings()
            .find(".grey-text")
            .addClass("d-none");
        }
      }
    });

    function populateDropdownPreBook(url, selector, keyword, selectedVal) {
      if (url && selector[0] !== undefined) {
        fetch(url)
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Not 2xx response", { cause: response });
            } else {
              return response.text();
            }
          })
          .then(function (html) {
            selector[0].innerHTML = html;
            let form = $(selector).closest("form");
            if (keyword == "vehicle") {
              form
                .find('[name="vehiclename"]')
                .parents(".cust-drop-down")
                .find(".cust-dropdown-menu li")
                .sort(sortAscending)
                .appendTo(
                  form
                    .find('[name="vehiclename"]')
                    .parents(".cust-drop-down")
                    .find(".cust-dropdown-menu")
                );
              let vehicle;
              let abbrVehicle = form
                .find('[name="vehicle"]')
                .attr("data-default-label");
              if (selectedVal) {
                if (
                  $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value")
                ) {
                  vehicle = $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value");
                  abbrVehicle = selectedVal;
                  form.find('[name="vehicleNameVal"]').val(selectedVal);
                }
              }
            }

            if (keyword == "variant") {
              form
                .find('[name="variantname"]')
                .parents(".cust-drop-down")
                .find(".cust-dropdown-menu li")
                .sort(sortAscending)
                .appendTo(
                  form
                    .find('[name="variantname"]')
                    .parents(".cust-drop-down")
                    .find(".cust-dropdown-menu")
                );

              let variant;
              let abbrVariant = form
                .find('[name="variantname"]')
                .attr("data-default-label");
              if (selectedVal) {
                if (
                  $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value")
                ) {
                  variant = $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value");
                  abbrVariant = selectedVal;
                  form.find('[name="variantNameVal"]').val(selectedVal);
                }
              }
            }

            if (keyword == "state") {
              form
                .find('[name="statename"]')
                .parents(".cust-drop-down")
                .find(".cust-dropdown-menu li")
                .sort(sortAscending)
                .appendTo(
                  form
                    .find('[name="statename"]')
                    .parents(".cust-drop-down")
                    .find(".cust-dropdown-menu")
                );
              let state;
              let abbrState = form
                .find('[name="vehicle"]')
                .attr("data-default-label");
              if (selectedVal) {
                if (
                  $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value")
                ) {
                  state = $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value");
                  abbrState = selectedVal;
                  form.find('[name="stateNameVal"]').val(selectedVal);
                }
              }
            }

            if (keyword == "city") {
              form
                .find('[name="cityname"]')
                .parents(".cust-drop-down")
                .find(".cust-dropdown-menu li")
                .sort(sortAscending)
                .appendTo(
                  form
                    .find('[name="cityname"]')
                    .parents(".cust-drop-down")
                    .find(".cust-dropdown-menu")
                );
              let city;
              let abbrCity = form
                .find('[name="vehicle"]')
                .attr("data-default-label");
              if (selectedVal) {
                if (
                  $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value")
                ) {
                  city = $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value");
                  abbrCity = selectedVal;
                  form.find('[name="cityNameVal"]').val(selectedVal);
                }
              }
            }
          });
      }
    }
    function handleItemClick() {
      // Remove the 'selected-border' class from all items with class 'dealer-locator-info'
      $(".dealer-locator-info").removeClass("selected-border");

      // Add the 'selected-border' class to the clicked item
      $(this).addClass("selected-border");
      const dealerName = $(this).find(".dealer-locator-name").text();

      $("#dealer-address").find("span").eq(0).text(dealerName);
      $("#dealer-address").removeClass("d-none");
      $(".accordion-card")
        .eq(3)
        .find(".accordion--title")
        .removeClass("pe-none");
      $(".accordion-card").eq(3).find(".accordion--title").click();
    }

    function getDealers(dealerPath) {
      $.ajax({
        type: "GET",
        url: dealerPath,
        success: function (response) {
          const $responseHtml = $(response);
          const $dealerItems = $responseHtml.filter(".near-you-common-div");

          // Clear the content of the dealer locator container
          $("#dealer-locator-container").empty();

          // Append each sorted dealer item to the container
          $dealerItems.each(function () {
            // Extract the desired information
            const dealerName = $(this).find(".near-you-h3").text();
            // const phoneNumber = $(this)
            //   .find(".near-you-no-p a")
            //   .eq(0)
            //   .text()
            //   .trim(); // Trim whitespace

            const phoneNumbers = [];

            // Loop through all phone number links and extract them
            $(this)
              .find(".near-you-no-p a")
              .each(function () {
                const phoneNumber = $(this).text().trim().replace(/,/g, ""); // Remove commas
                phoneNumbers.push(phoneNumber);
              });

            const address = $(this).find(".near-you-p").eq(0).text();

            // Create a new element with the desired structure
            const $dealerItem = $("<div class='dealer-locator-info'></div>");

            const $dealerContact = $(
              "<div class='dealer-locator-contact'></div>"
            );
            const $dealerAddress = $(
              "<div class='dealer-locator-address'></div>"
            );

            $dealerContact.append(
              "<p class='dealer-locator-name'>" + dealerName + "</p>"
            );
            // $dealerContact.append(
            //   "<p class='dealer-locator-phone'>" + phoneNumber + "</p>"
            // );

            if (phoneNumbers.length > 0) {
              $dealerContact.append(
                "<p class='dealer-locator-phone'>" +
                  phoneNumbers.join(", ") +
                  "</p>"
              );
            }

            $dealerAddress.append(
              "<p class='dealer-locator-address'>" + address + "</p>"
            );
            $dealerItem.append($dealerContact);
            $dealerItem.append($dealerAddress);
            $dealerItem.on("click", handleItemClick);

            // Append the dealer item to the dealer locator container
            $("#dealer-locator-container").append($dealerItem);
          });
        },
        error: function (err) {
          console.log("Error: ", err);
        },
      });
    }
  }
});
