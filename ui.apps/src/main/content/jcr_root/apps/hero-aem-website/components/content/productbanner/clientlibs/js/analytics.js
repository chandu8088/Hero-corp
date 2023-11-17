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

  $(".ex-new-options").click(function () {
    sessionStorage.setItem("aaExchangeJourneyType", "New Customer");
    if (window.digitalData && window._satellite) {
      window.digitalData = {
        journeyType: {
          type: "New Customer",
        },
        page: getPageDetails(),
      };
      _satellite.track("Exchange Journey Initiated");
    }
  });

  $("#campaign-sub-btn").click(function () {
    var sessionVehicleDetails = getCookie("exchangeloggeddetails");
    var cookieMobileData = getCookie("data");
    let journey =
      sessionVehicleDetails && cookieMobileData
        ? "Loggedin user - Hero site"
        : "Exchange login";
    sessionStorage.setItem("aaExchangeJourneyType", journey);
    if (!$(this).hasClass("exchg-disable-login")) {
      if (window.digitalData && window._satellite) {
        window.digitalData = {
          journeyType: {
            type: sessionStorage.getItem("aaExchangeJourneyType") || "",
          },
          page: getPageDetails(),
        };
        _satellite.track("Exchange Journey Initiated");
      }
    }
  });
});
