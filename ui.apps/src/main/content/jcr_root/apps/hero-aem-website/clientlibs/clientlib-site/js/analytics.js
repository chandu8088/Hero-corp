$(document).ready(function () {
  function pageDetails() {
    return {
      siteType: "AEM",
      pageURL: window.location.href,
      path: window.location.pathname,
      fullURL: window.location.href,
      hostName: window.location.origin,
      fullReferringUrl: document.referrer,
      pagename: document.title,
      PageTitle: document.title,
      product: document.title,
    };
  }

  function dispatchCTADatalayer(location, ctaText, sectionType, blogName){
    if (window.digitalData && window._satellite) {
        window.digitalData = {
          CTADetails: {
            location: location || '',
            text: ctaText || '',
            sectionType: sectionType || '',
            blogName: blogName || '',
          },
          page: pageDetails() || '',
        },
        _satellite.track("CTA Button Click");
      }
  }

  var blogLinks = document.querySelectorAll(".genericteaser a");
  blogLinks?.forEach(function (links) {
    links?.addEventListener("click", function (event) {
      var parentCard = event?.currentTarget?.closest(".card");
      var titleElement = parentCard?.querySelector(".card-title");
      var blogText = titleElement?.textContent;
      var text = $(this).text().trim() || "";
      var sectionType = $(".bike-tab-section .tab-wrapper a.active").text().trim() || "";
      dispatchCTADatalayer('blogs-news-section', text, sectionType, blogText);
    });
  });

  $(".xtreme160r-blog-content").on("click", "a", function () {
    var text = $(this).find('b').text().trim() || $(this).text().trim() || "";
    var blogName =  document.title || "";
    dispatchCTADatalayer('blog-details', text, 'blog-details', blogName)
  });

  $("#modify-your-xtreme-160r-4v").on("click", "a", function () {
    var text = 'related-stories-banner' || "";
    var blogName =  $(this).find('.overlay-blogs-text-stories').text().trim() || "";
    dispatchCTADatalayer('related-stories', text, 'blog-details', blogName)
  });

});
