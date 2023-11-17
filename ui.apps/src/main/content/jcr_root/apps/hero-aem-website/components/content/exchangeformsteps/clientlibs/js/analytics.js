$(document).ready(function () {
  function getPageDetails() {
    let slug = window.location.pathname?.replace(".html", "").split("/");
    let fullSplit = window.location.origin?.split("//");
    let pcSplit = fullSplit[1]?.split(".");
    return {
      siteType: "AEM",
      pageURL: window.location.href,
      fullURL: window.location.href,
      hostName: window.location.origin,
      fullReferringUrl: document.referrer,
      pagename: document.title,
      PageTitle: document.title,
      product: document.title,
      category: slug[2] || "",
      categorylevel1: slug[3] || "",
      categorylevel2: slug[4] || "",
      categorylevel3: slug[5] || "",
      siteCategory: pcSplit[0] || "",
    };
  }

  $("#ex-submit-city").click(function () {
    let exchangeVehicleInfo = {
      exchangeVehicleType:
        document
          .querySelector('[data-target="vehicleList"]')
          .children[1].textContent.trim() || "",
      exchangeVehicleBrand:
        document
          .querySelector('[data-target="brandList"]')
          .children[1].textContent.trim() || "",
      exchangeVehicleModel:
        document
          .querySelector('[data-target="modelList"]')
          .children[1].textContent.trim() || "",
      exchangeVehicleYear:
        document
          .querySelector('[data-target="yearList"]')
          .children[1].textContent.trim() || "",
      exchangeVehicleMonth:
        document
          .querySelector('[data-target="monthList"]')
          .children[1].textContent.trim() || "",
      exchangeVehicleState:
        document
          .querySelector('[data-target="stateList"]')
          .children[1].textContent.trim() || "",
      exchangeVehicleCity:
        document
          .querySelector('[data-target="cityList"]')
          .children[1].textContent.trim() || "",
      exchangeVehiclePincode: $("#pincode").val() || "",
    };
    sessionStorage.setItem(
      "exchangeVehicleInfo",
      JSON.stringify(exchangeVehicleInfo)
    );
    let getData = sessionStorage.getItem("exchangeVehicleInfo");
    let vehicleData = JSON.parse(getData) || "";
    if ($("#selectedExchangeType").text()) {
      if ($("#selectedExchangeType").text() === "Another Vehicle") {
        vehicleData.aaExchangeType = "Another Vehicle";
      } else {
        vehicleData.aaExchangeType = "Hero own Vehicle";
        vehicleData.aaOwnVehiclename = $("#selectedExchangeType").text() || "";
        let getVehicleYearMonth = $("#ownVehicleYearMonth")?.text().split(",");
        let getVehicleStateCity = $("#ownVehicleStateCity")?.text().split(",");
        vehicleData.aaOwnVehicleMonth = getVehicleYearMonth[0] || "";
        vehicleData.aaOwnVehicleYear = getVehicleYearMonth[1] || "";
        vehicleData.aaOwnVehicleState = getVehicleStateCity[0] || "";
        vehicleData.aaOwnVehicleCity = getVehicleStateCity[1] || "";
      }
    } else {
      vehicleData.aaExchangeType = "Another Vehicle";
    }

    sessionStorage.setItem("exchangeVehicleInfo", JSON.stringify(vehicleData));
    let getFinalData = sessionStorage.getItem("exchangeVehicleInfo");
    let getVehicleDatalayer = JSON.parse(getFinalData) || "";

    if (window.digitalData) {
      window.digitalData = {
        event: "Exchange Vehicle Details Submitted",
        exchangeDetails: getVehicleDatalayer || "",
        journeyType: {
          type: sessionStorage.getItem("aaExchangeJourneyType") || "",
        },
        page: getPageDetails(),
      };
    }
  });

  $("#partsList .exchg-options-condition-wrap").click(function () {
    let getFinalData = sessionStorage.getItem("exchangeVehicleInfo");
    let getVehicleDatalayer = JSON.parse(getFinalData) || "";
    let exchangeVehicleCondition = {
      silencer:
        document
          .querySelector('[data-target="silencerList"]')
          .children[1].textContent.trim() || "",
      problemInStarting:
        document
          .querySelector('[data-target="startingList"]')
          .children[1].textContent.trim() || "",
      lights:
        document
          .querySelector('[data-target="lightsList"]')
          .children[1].textContent.trim() || "",
      frontTyres:
        document
          .querySelector('[data-target="tyresList"]')
          .children[1].textContent.trim() || "",
      rearTyres: 
        document
          .querySelector('[data-target="rearTyresList"]')
          .children[1].textContent.trim() || "",
      bodyParts: $(this).find('input').val(),
    };

    function objectToPipeSeparatedKey(obj) {
      return Object.entries(obj)
        .map(([key, value]) => `${key}=${value}`)
        .join("|");
    }

    const pipeSeparatedConditions = objectToPipeSeparatedKey(
      exchangeVehicleCondition
    );
    sessionStorage.setItem("vehicleCondition", pipeSeparatedConditions);
    if (window.digitalData) {
      window.digitalData = {
        event: "Exchange Vehicle Conditions Submitted",
        exchangeDetails: getVehicleDatalayer || "",
        vehicleCondition: {
          condition: sessionStorage.getItem('vehicleCondition') || "",
        },
        journeyType: {
          type: sessionStorage.getItem("aaExchangeJourneyType") || "",
        },
        page: getPageDetails(),
      };
    }
  });
 
  $(".exchg-wheelers-options").click(function () {
    sessionStorage.setItem("wheelerExchangePrice", $(this).find('.exchg-wheelers-details-wrap .exchg-wheelers-price').contents().get(0).nodeValue.replaceAll("*", "") || '');
    sessionStorage.setItem("wheelerActualPrice", $(this).find('.exchg-wheelers-details-wrap .exchg-wheelers-price s').text() || '');
  });


});
