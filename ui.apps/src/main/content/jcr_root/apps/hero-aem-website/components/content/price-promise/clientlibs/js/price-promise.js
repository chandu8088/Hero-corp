$(document).ready(function () {
  if ($("#price-promise").length > 0) {
    let csvPath = $("#price-promise").data("csvpath");
    if (window.location.hash) {
      $(".pp-bookservice-btn").addClass("d-none");
      $(".termscondition").addClass("d-none");
    }
    $('[data-toggle="tooltip"]').tooltip();
    var customers = new Array();
    let defaultservlet = document.getElementById("defaultservlet").value;
    $(".accordion--title").click(function (e) {
      let dropDown = $(this)
        .closest(".accordion-card")
        .find(".accordion--panel");
      $(this)
        .closest(".pp-parts-accordion")
        .find(".accordion--panel")
        .not(dropDown)
        .slideUp();
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(this)
          .closest(".pp-parts-accordion")
          .find(".accordion--title.active")
          .removeClass("active");
        $(this).addClass("active");
      }
      dropDown.stop(false, true).slideToggle();
      // e.preventDefault();
    });
    let sum = 0;
    let form = $("#pp--form-wrap");
    let statelist = form
      .find('[name="statename"]')
      .parents(".cust-drop-down")
      .find(".cust-dropdown-menu ");
    populateDropdown(
      defaultservlet + ".statelist.html",
      statelist,
      "state",
      window && window.locations ? locations.State : null,
      false
    );

    function populateDropdown(url, selector, keyword, selectedVal) {
      if (url && selector[0] !== undefined) {
        fetch(url)
          .then(function (response) {
            if (!response.ok) {
              // make the promise be rejected if we didn't get a 2xx response
              throw new Error("Not 2xx response", { cause: response });
            } else {
              return response.text();
            }
          })
          .then(function (html) {
            selector[0].innerHTML = html;
            let form = $(selector).closest("form");
            if (keyword == "state") {
              //sort in ascending order
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
                .find('[name="statename"]')
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
              form.find('[name="statename"]').text(abbrState);
              let cityField = form.find('[name="cityname"]');
              let cityValue =
                null != (window && window.locations) ? locations.City : "";
              if (
                cityField.text().trim() !== cityField.attr("data-default-label")
              ) {
                cityValue = cityField.text().trim();
              }
              let citylist = cityField
                .parents(".cust-drop-down")
                .find(".cust-dropdown-menu ");
              if (state) {
                cityField[0].disabled = false;
                populateDropdown(
                  url.substr(0, url.indexOf(".")) +
                    ".citylist." +
                    state +
                    ".html",
                  citylist,
                  "city",
                  cityValue
                );
              } else {
                cityField[0].disabled = true;
                cityField.text(
                  form.find('[name="cityname"]').attr("data-default-label")
                );
                let dealerField = form.find('[name="dealername"]');
                $(".address-input").addClass("d-none");
                dealerField[0].disabled = true;
                dealerField.text(
                  form.find('[name="dealername"]').attr("data-default-label")
                );
                cityField.removeClass("active");
                dealerField.removeClass("active");
              }
            }
            if (keyword == "city") {
              //sort in ascending order
              let cityField = form.find('[name="cityname"]');
              let dealerField = form.find('[name="dealername"]');
              cityField[0].disabled = false;
              cityField
                .parents(".cust-drop-down")
                .find(".cust-dropdown-menu li")
                .sort(sortAscending)
                .appendTo(
                  cityField
                    .parents(".cust-drop-down")
                    .find(".cust-dropdown-menu")
                );
              let abbrCity;
              let abbrDealer;
              abbrCity = cityField.attr("data-default-label");
              abbrDealer = dealerField.attr("data-default-label");
              if (selectedVal) {
                if (
                  $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value")
                ) {
                  abbrCity = $(selector[0])
                    .children("li:contains(" + selectedVal.toLowerCase() + ")")
                    .attr("value");
                  abbrCity = selectedVal;
                  form.find('[name="cityNameVal"]').val(selectedVal);
                  abbrDealer = dealerField.text().trim();
                  form
                    .find('[name="dealerNameVal"]')
                    .val(form.find('[name="dealerNameVal"]').val());
                } else {
                  cityField.removeClass("active");
                  $("#pp-search-btn").addClass("btn-disabled");
                }
              }
              cityField.text(abbrCity);
              if (abbrDealer == dealerField.attr("data-default-label")) {
                dealerField[0].disabled = true;
                $(".address-input").addClass("d-none");
                form.find('[name="dealerNameVal"]').val("");
                dealerField.removeClass("active");
              }
              dealerField.text(abbrDealer);
            }
            if (keyword == "dealer") {
              //sort in ascending order
              let dealerField = form.find('[name="dealername"]');
              dealerField[0].disabled = false;
              abbrDealer = dealerField.attr("data-default-label");
              if (
                selectedVal &&
                $(selector[0])
                  .children("li:contains(" + selectedVal.toLowerCase() + ")")
                  .attr("value")
              ) {
                abbrDealer = selectedVal;
                form
                  .find('[name="dealerNameVal"]')
                  .val(form.find('[name="dealerNameVal"]').val());
              } else {
                form.find('[name="dealerNameVal"]').val("");
                $(".address-input").addClass("d-none");
              }
              dealerField.text(abbrDealer);
            }
          })
          .catch(function (err) {
            console.warn("Something went wrong.", err);
          });
      }
    }
    $("#pp--form-wrap .cust-dropdown-menu").on("click", "li", function () {
      let selector;
      let selectionGroup = $(this).parents(".cust-drop-down");
      var button = selectionGroup.find(".dropdown-select");
      button.addClass("active");
      button.text($(this).find("a")[0].innerHTML.replaceAll("&amp;", "&"));
      var form = $(this).closest("form");
      // selectionGroup.find(".cust-dropdown-menu li").removeClass("active");
      if ("vehiclename" == button.attr("name")) {
        form.find('[name="vehicleModelNameVal"]').val($(this).attr("value"));
      } else if ("statename" == button.attr("name")) {
        let cityField = form.find('[name="cityname"]');
        let dealerField = form.find('[name="dealername"]');
        stateName = $(this).text();
        if (!$(this).hasClass("active")) {
          selectionGroup.find(".cust-dropdown-menu li").removeClass("active");
          $(this).addClass("active");
          cityField.text(cityField.attr("data-default-label"));
          dealerField.text(dealerField.attr("data-default-label"));
          cityField.removeClass("active");
          dealerField.removeClass("active");
          let dropDownSelector = cityField
            .parents(".cust-drop-down")
            .find(".cust-dropdown-menu");
          cityField[0].disabled = true;
          dealerField[0].disabled = true;
          selector = "pricepromisecities";
          let dataObj = {
            state: button.text(),
          };
          populateCityDealers(selector, dataObj, dropDownSelector);
          form.find('[name="stateNameVal"]').val(button.text());
          form.find('[name="cityNameVal"]').val("");
          form.find('[name="dealerNameVal"]').val("");
          form.find('[name="dealerNameVal"]').removeAttr("data-vas");
        }
      } else if ("cityname" == button.attr("name")) {
        let dealerName = form.find('[name="dealerNameVal"]');
        let dealerField = form.find('[name="dealername"]');
        if (!$(this).hasClass("active")) {
          selectionGroup.find(".cust-dropdown-menu li").removeClass("active");
          $(this).addClass("active");
          dealerField.removeClass("active");
          dealerField.text(dealerField.attr("data-default-label"));
          let dropDownSelector = dealerName
            .parents(".cust-drop-down")
            .find(".cust-dropdown-menu ");
          dealerField[0].disabled = true;
          selector = "pricepromisedealers";
          let dataObj = {
            state: form.find('[name="statename"]').text(),
            city: button.text(),
          };
          populateCityDealers(selector, dataObj, dropDownSelector);
          form.find('[name="cityNameVal"]').val(button.text());
          form.find('[name="dealerNameVal"]').val("");
          form.find('[name="dealerNameVal"]').removeAttr("data-vas");
        }
      } else if ("dealername" == button.attr("name")) {
        selectionGroup.find(".cust-dropdown-menu li").removeClass("active");
        $(this).addClass("active");
        form.find('[name="dealerNameVal"]').val($(this).attr("value"));
        form
          .find('[name="dealerNameVal"]')
          .attr("data-vas", $(this).data("service-price"));
      } else if ("nos" == button.attr("name")) {
        let nosVal = $(this).attr("value");
        form.find('[name="nosNameVal"]').val(nosVal);
        form.find('[name="tosNameVal"]').parent().find("li").addClass("d-none");
        form
          .find('[name="tos"]')
          .text(form.find('[name="tos"]').attr("data-default-label"));
        form.find('[name="tosNameVal"]').val("");
        form.find('[name="tos"]').removeClass("active");
        $("#pp-search-btn").addClass("btn-disabled");
        form.find('[name="tos"]').attr("disabled", false);
        if (nosVal == "FSC") {
          form
            .find('[name="tosNameVal"]')
            .parent()
            .find(".Free_Service")
            .removeClass("d-none");
        } else {
          form
            .find('[name="tosNameVal"]')
            .parent()
            .find(".Paid_Service")
            .removeClass("d-none");
        }
      } else if ("tos" == button.attr("name")) {
        form.find('[name="tosNameVal"]').val($(this).attr("value"));
        $("#pp-search-btn").removeClass("btn-disabled");
      }
      let inputField = form.find("input");
      inputField.each(function () {
        let inputVal = $(this).val();
        if (!inputVal) {
          $("#pp-search-btn").addClass("btn-disabled");
          return false;
        } else {
          $("#pp-search-btn").removeClass("btn-disabled");
        }
      });
    });

    function populateCityDealers(selector, dataObj, dropDownSelector) {
      $.ajax({
        url: `${defaultservlet}/_jcr_content.${selector}.json`,
        type: "POST",
        data: JSON.stringify(dataObj),
        dataType: "json",
        contentType: "application/json",
        success: function (resp) {
          let jsonResp = resp;
          if (typeof jsonResp != "object") {
            jsonResp = JSON.parse(resp);
          }
          let uniqueValues;
          if (selector == "pricepromisecities") {
            dropDownSelector
              .closest("form")
              .find('[name="cityname"]')[0].disabled = false;
            uniqueValues =
              jsonResp.PWSESSIONRS[0].PWPROCESSRS.PWDATA.getDealerCities.Row;
            generateCityDropDown(dropDownSelector, uniqueValues, "city");
          } else if (selector == "pricepromisedealers") {
            dropDownSelector
              .closest("form")
              .find('[name="dealername"]')[0].disabled = false;
            uniqueValues =
              jsonResp.PWSESSIONRS[0].PWPROCESSRS.PWDATA.getDealers.Row;
            generateCityDropDown(dropDownSelector, uniqueValues, "dealer");
          }
        },
        error: function (err) {
          console.log(err);
        },
      });
    }

    function generateCityDropDown(
      dropDownSelector,
      uniqueValues,
      dropdownvalue
    ) {
      let listItems = uniqueValues.map((value) => {
        return `<li class="font-montserrat-regular font-weight-500" value="${
          value["Dealer Code"]
        }" data-service-price="${
          value["service_price_list"]
        }"><a href="javascript:void(0)">${
          dropdownvalue == "city" ? value["city"] : value["Dealer Name"]
        }</a></li>`;
      });
      dropDownSelector.html(listItems.join(""));
    }
    $.ajax({
      url: csvPath,
      type: "GET",
      success: function (resp) {
        var rows = resp.split("\n");
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");
          if (cells.length > 1) {
            var customer = {};
            customer.Model = cells[0];
            customer.VAS = cells[1];
            customer.Dealer = cells[2];
            customer.Price = cells[3];
            customers.push(customer);
          }
        }
        console.log(customers);
      },
    });
    $("#pp-search-btn").on("click", function () {
      $(".pp-description-text-bikename").text(
        $("#price-promise [name='vehiclename']").text()
      );
      let dataObj = {
        dealerCode: $("#price-promise #dealer").val(),
        serviceNature: $("#price-promise [name='nosNameVal']").val(),
        serviceType: $("#price-promise [name='tosNameVal']").val(),
        model: $("#price-promise [name='vehicleModelNameVal']").val(),
      };
      $.ajax({
        url: defaultservlet + "/_jcr_content.pricepromiseparts.json",
        type: "POST",
        data: JSON.stringify(dataObj),
        dataType: "json",
        contentType: "application/json",
        success: function (resp) {
          $(".pp-total-amount-summary").addClass("d-none");
          let jsonResp = resp;
          if (typeof jsonResp != "object") {
            jsonResp = JSON.parse(resp);
          }
          let sparParts =
            jsonResp.PWSESSIONRS[0].PWPROCESSRS.PWDATA.get_pmp_parts.Row;
          let natureOfService = $("#price-promise [name='nosNameVal']").val();
          if (natureOfService == "FSC") {
            sparParts = sparParts.filter(
              (ele) => !(ele.job_code == "202001" && natureOfService == "FSC")
            );
          }

          let amountArr = [];
          $(".pp-total-amount-summary .accordion--list").html("");
          $(".accordion-card .accordion--list").html("");
          var ischecked = $(
            ".accordion-content-wrap .control-group input:checkbox"
          ).is(":checked");
          if (ischecked) {
            $(".accordion-content-wrap .control-group input:checked").trigger(
              "click"
            );
          }
          var istermsConditon = $(
            ".termscondition .control-group input:checkbox"
          ).is(":checked");
          if (istermsConditon) {
            $(".termscondition .control-group input:checkbox").trigger("click");
          }
          $(".accordion-card .accordion--list").parent().addClass("d-none");
          sparParts.forEach((ele, index) => {
            if (
              ele.mandatory_flag == "Y" &&
              ele.category == "Parts" &&
              !(ele.level_service == "Non Mandatory")
            ) {
              sparePartsList(ele, index);
              summaryList(ele, index);
            } else if (
              ele.mandatory_flag == "Y" &&
              ele.category == "Parts" &&
              ele.level_service == "Non Mandatory"
            ) {
              ele.category = "Add-On-Parts";
              sparePartsList(ele, index);
              summaryListAddOnService(ele, index);
            } else if (ele.category == "Labour") {
              ele.mandatory_flag = "Y";
              sparePartsList(ele, index);
              summaryList(ele, index);
              if (ele.job_code == "600003" || ele.job_code == "202001") {
                ele.mrp && amountArr.push(parseFloat(ele.mrp));
              }
            }
          });
          let modelName = $(
            "#price-promise [name='vehicleModelNameVal']"
          ).val();
          let serviceList = $("#price-promise #dealer")[0].dataset.vas;
          let vasList = serviceList && customers.filter(
            (ele) =>
              ele.Dealer.toLowerCase() == serviceList.trim().toLowerCase() &&
              ele.Model.toLowerCase() == modelName.trim().toLowerCase()
          );
          vasList.forEach((ele, index) => {
            ele.category = "Value-Add-Services";
            ele.mrp = ele.Price;
            ele.desc_text = ele.VAS;
            sparePartsList(ele, index);
            summaryListAddOnService(ele, index);
          });
          $(".spare-section").removeClass("d-none");
          sum = 0;
          amountArr &&
            amountArr.forEach((num) => {
              sum += num;
            });
          $(".pp-total-amount .total-amount span").text(sum.toFixed(2));
          $("#pp-total-Price-list .pp-total-amount-summary-amount span").text(
            sum.toFixed(2)
          );
          let accr = $(".accordion-card .accordion--list")
            .parent()
            .not(".d-none");
          accr.children().first().trigger("click");
          $("html, body").animate(
            {
              scrollTop: $(".spare-section").offset().top - 166,
            },
            800
          );
        },
        error: function (err) {
          console.log(err);
        },
      });
    });

    function sparePartsList(ele, index) {
      let sparePartsList = `<div class="accordion--panel ${
        ele.category == "Labour" &&
        !(ele.job_code == "600003" || ele.job_code == "202001")
          ? "d-none"
          : ""
      }">
      <div class="accordion-content-wrap">
        <div class="checkbox--wrap">
          <div class="control-group">
            <label class="control control-checkbox">
              ${ele.desc_text ? ele.desc_text : ele.job_description}
              <input type="checkbox" ${
                ele.category == "Labour" &&
                (ele.job_code == "600003" || ele.job_code == "202001")
                  ? "disabled checked"
                  : ""
              } data-amt-target="${ele.category}_${index}"
              data-job-code="${ele.job_code ? ele.job_code : ""}"/>
              <div class="control_indicator"></div>
            </label>
          </div>
        </div>
        <div class="pp-cost">₹ <span>${ele.mrp}</span></div>
      </div>
      </div>`;
      $(`#${ele.category}`).removeClass("d-none");
      $(`#${ele.category} .accordion--list`).append(sparePartsList);
    }

    function summaryList(ele, index) {
      let summaryList = `<div class="pp-total-amount-summary-text ${
        ele.job_code == "600003" || ele.job_code == "202001" ? "" : "d-none"
      }" id="${ele.category}_${index}">
      <p class="pp-total-amount-summary-label b1-bold-text-std">${
        ele.desc_text ? ele.desc_text : ele.job_description
      }</p>
      <p class="pp-total-amount-summary-amount b1-bold-text-std">₹ <span>${
        ele.mrp
      }</span></p>
      </div>`;
      if (ele.job_code == "600003" || ele.job_code == "202001") {
        $(`#pp-total-${ele.category}-list`).removeClass("d-none");
        $("#pp-total-Price-list").removeClass("d-none");
      }
      $(`#pp-total-${ele.category}-list .accordion--list`).append(summaryList);
    }

    function summaryListAddOnService(ele, index) {
      let summaryList = `<div class="pp-total-amount-summary-text d-none" id="${
        ele.category
      }_${index}">
      <p class="pp-total-amount-summary-label b1-bold-text-std">${
        ele.desc_text ? ele.desc_text : ele.job_description
      }</p>
      <p class="pp-total-amount-summary-amount b1-bold-text-std">₹ <span>${
        ele.mrp
      }</span></p>
      </div>`;
      $("#pp-total-Price-list").removeClass("d-none");
      $(`#pp-total-${ele.category}-list .accordion--list`).append(summaryList);
    }

    $(document).on(
      "change",
      ".accordion-content-wrap .control-group input:checkbox",
      function (e) {
        var ischecked = $(this).is(":checked");
        let parentEle = $(this).closest(".accordion-card");
        let amt = $(this)
          .closest(".accordion-content-wrap")
          .find(".pp-cost span")
          .text();
        let parsedAmt = parseFloat(amt);
        let totalAmt = $(".pp-total-amount .total-amount span");
        let totalAmt_2 = $(
          "#pp-total-Price-list .pp-total-amount-summary-amount span"
        );
        let amtlist = $(this).data("amt-target");
        let summaryListParentEle = $(`#${amtlist}`).closest(
          ".pp-total-amount-summary"
        );
        if (ischecked) {
          sum += parsedAmt;
          totalAmt.text(sum.toFixed(2));
          totalAmt_2.text(sum.toFixed(2));
          $(`#${amtlist}`).removeClass("d-none");
          summaryListParentEle.removeClass("d-none");
        } else if (!ischecked) {
          sum -= parsedAmt;
          totalAmt.text(sum.toFixed(2));
          totalAmt_2.text(sum.toFixed(2));
          $(`.pp-total-amount-summary #${amtlist}`).addClass("d-none");
          if (!parentEle.find("input:checkbox").is(":checked")) {
            summaryListParentEle.addClass("d-none");
          }
        }
        let selectedJobCode = $(this).data("job-code");
        if (selectedJobCode) {
          let jobCode = $(`#Labour [data-job-code="${selectedJobCode}"]`);
          let partJobCode = $(`#Parts [data-job-code="${selectedJobCode}"]`);
          let vasJobCode = $(
            `#Add-On-Parts [data-job-code="${selectedJobCode}"]`
          );

          if (
            (partJobCode.is(":checked") || vasJobCode.is(":checked")) &&
            !jobCode.is(":checked")
          ) {
            jobCode.removeAttr("disabled");
            jobCode.trigger("click");
            $(jobCode).closest(".accordion--panel ").removeClass("d-none");
            jobCode.attr("disabled", "true");
          } else if (
            !(partJobCode.is(":checked") || vasJobCode.is(":checked")) &&
            jobCode.is(":checked")
          ) {
            jobCode.removeAttr("disabled");
            jobCode.trigger("click");
            $(jobCode).closest(".accordion--panel ").addClass("d-none");
            jobCode.attr("disabled", "true");
          }
        }
      }
    );

    $(document).on(
      "change",
      ".termscondition .control-group input:checkbox",
      function (e) {
        var ischecked = $(this).is(":checked");
        if (ischecked) {
          $(".total-amount-section .pp-bookservice-btn").removeClass(
            "disabled"
          );
        } else {
          $(".total-amount-section .pp-bookservice-btn").addClass("disabled");
        }
      }
    );

    $(document).on("click", ".bookinglist-toggle-button", function (e) {
      if ($(".total-amount-section").hasClass("mobile-total-amount-section")) {
        $(this).removeClass("bookinglist-toggle-button-top");
        $(".termscondition").removeClass("termscondition-shadow");
        $(".total-amount-section").removeClass("mobile-total-amount-section");
      } else {
        $(this).addClass("bookinglist-toggle-button-top");
        $(".termscondition").addClass("termscondition-shadow");
        $(".total-amount-section").addClass("mobile-total-amount-section");
      }
    });

    $(document).on("click", ".pp-terms-show-hide", function (e) {
      let termsList = $(this).find("ul");
      if (termsList.hasClass("d-none")) {
        $(".pp-terms-arrow").addClass("pp-terms-rotate");
        termsList.removeClass("d-none");
        $(".total-amount-section").animate(
          {
            scrollTop: termsList.offset().top,
          },
          800
        );
      } else {
        $(".pp-terms-arrow").removeClass("pp-terms-rotate");
        termsList.addClass("d-none");
      }
    });

    $(document).on("click", ".terms", function (e) {
      let terms = $(".pp-terms-show-hide");
      if ($(window).width() < 768) {
        $(".bookinglist-toggle-button").trigger("click");
        terms.trigger("click");
        terms.animate(
          {
            scrollTop: terms.offset().top,
          },
          800
        );
      } else {
        $("html, body").animate(
          {
            scrollTop: terms.offset().top - 166,
          },
          800
        );
      }
    });
  }
});
