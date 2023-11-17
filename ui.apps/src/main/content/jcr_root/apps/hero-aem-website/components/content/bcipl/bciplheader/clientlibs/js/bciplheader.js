$(document).ready(function () {
    var $window = $(window), $html = $('html');
    $("#siteMnuBtn").click(function () {
        $(".bcipl-navPan").toggleClass("bcipl-navPan-left");
    });

    $('.outer--ul li').mouseover(function () {
        if ($(this).find('ul.second-level-ul').length > 0) {
            if ($window.width() < 990) {
                $(this).find('ul.second-level-ul').css({ "position": "relative" })
            }
        }
    })

    $('.outer--ul li ul.second-level-ul li').mouseover(function () {
        if ($(this).find('ul.third-level-ul').length > 0) {
            $(this).parent().css({ "overflow": "visible" })
        }
        if ($window.width() < 990) {
            $(this).find('ul.second-level-ul').css({ "position": "relative" })
        }
    })

    $('.outer--ul li ul.third-level-ul li').mouseover(function () {
        if ($(this).find('ul.fourth-level-ul').length > 0) {
            $(this).parent().css({ "overflow": "visible" })
        }
    })

    $('.outer--ul li').mouseleave(function () {
        $(this).find('ul.second-level-ul').css({ "overflow": "hidden" });
        $(this).find('ul.third-level-ul').css({ "overflow": "hidden" });
        $(this).find('ul.fourth-level-ul').css({ "overflow": "hidden" })
    })

    let count = $(".breadcrumb .breadcrumb-item").length;
    if (count < 2) {
        $(".breadcrumb .breadcrumb-item").addClass("d-none");
    }

    let primary_category = window.location.origin;
    let fullSplit = primary_category.split("//");
    let pcSplit = fullSplit[1].split(".");
    let pagePath = window.location.pathname;
    let slug = pagePath.split("/");
    let actualSlug = slug[1].replace(".html", "");
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
            Sitetype: 'AEM',
            SiteCategory: pcSplit[0],
            fullReferringUrl: document.referrer,
            fullSlug: actualSlug,
            fullURL: window.location.href,
            hostName: window.location.origin,
            pagename: $("title").text(),
            PageTitle: $("title").text(),
            pageURL: window.location.href,
            path: window.location.pathname,
            category: sub1,
            categorylevel1: sub2,
            categorylevel2: sub3,
            categorylevel3: sub4,
            country: current_country,
            Language: current_language,
            product: $("title").text()
        }
    }

    $('a[href^="tel"]').on("click", function(){
        window.digitalData = {
            event: "Phone Number Clicked",
            PhoneDetails: {
              phonenumber: $(this).text().replace(/[\n,]/g, "").trim(),
              DealerName: "Not Applicable",
              State: "Not Applicable",
              City: "Not Applicable",
              Vehicle: "Not Applicable",
              Page: $('.bcipl-container .bcipl-registerDetail h1').text(),
            },
        };
    })
});
