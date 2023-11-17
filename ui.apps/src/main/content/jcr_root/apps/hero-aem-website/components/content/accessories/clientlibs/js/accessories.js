$(document).ready(function () {
  let jsonObj = {};
  let accessoriesImageFolder = $("#accessories").data("accessoriesimages");
  const bikeImagePath = $("#accessories").data("accessoriesimagepath");
  let randomNo = `_${Math.floor(100000 + Math.random() * 900000)}`;
  if ($("#accessories").length > 0) {
    getData();
  }
  function getData() {
    let defaultservlet = document.getElementById("defaultservlet").value;
    let base_url = defaultservlet + "/_jcr_content.accessories.json";
    $.ajax({
      url: base_url,
      type: "GET",
      data: { accessoriesPath: accessoriesImageFolder, random: randomNo },
      success: function (resp) {
        jsonObj = resp;
        if (typeof jsonObj != "object") {
          jsonObj = $.parseJSON(jsonObj);
        }
        let bikeType = [...new Set(jsonObj.map((item) => item.type))];
        let modBikeType = bikeType.filter(
          (item) =>
            !["all models", "all scooters", "all bikes", ""].includes(
              item.toLowerCase()
            )
        );
        generateDropDown(modBikeType, "bike-type-dropdown");
      },
      error: function () {},
    });
  }

  function generateDropDown(uniqueValues, dropdownId, selectedValue = null) {
    let listItems = uniqueValues.map((value) => {
      let activeClass = selectedValue && value == selectedValue ? "active" : "";
      return (
        '<li class="font-montserrat-regular font-weight-500 ' +
        activeClass +
        '"><a href="javascript:void(0)">' +
        value +
        "</a></li>"
      );
    });
    $("#" + dropdownId).html(listItems.join(""));
  }

  function generateModelDropdown(jsonObj, bikeType) {
    const allModelsType = bikeType == "BIKE" ? "all bikes" : "all scooters";
    if (bikeType) {
      $(".accessorie-items").addClass("d-none");
      let filteredModels = jsonObj.filter(
        (item) =>
          item.type === bikeType || item.type.toLowerCase() == allModelsType
      );
      let uniqueModels = [...new Set(filteredModels.map((item) => item.model))];
      let arrModels = [];
      for (let i = 0; i < uniqueModels.length; i++) {
        let a = uniqueModels[i].split(",");
        for (let j = 0; j < a.length; j++) {
          let finalModel = a[j].trim();
          arrModels.push(finalModel);
        }
      }
      //let modarrModels = arrModels.filter(item=>!['HF 100','HF DELUX'].includes(item));
      //arrModels = [...new Set(arrModels)]
      let uniqueArray = arrModels.filter(
        (item) =>
          ![
            "all bike model",
            "all models",
            "all scooters",
            "all bike models",
            "all scooter model",
          ].includes(item.toLowerCase())
      );
      const uniqueValues = uniqueArray.filter((item, index, arr) => {
        const lowercaseItem = item.toLowerCase();
        return (
          index === arr.findIndex((val) => val.toLowerCase() === lowercaseItem)
        );
      });
      generateDropDown(uniqueValues, "model-dropdown");
    }
  }

  function generateCategoryDropdown(jsonObj, bikeType, modelType) {
    if (bikeType && modelType) {
      $(".accessorie-items").addClass("d-none");
      let allModelType =
        bikeType.toLowerCase() == "bike" ? "all bike model" : "all scooters";
      let filteredModels = jsonObj.filter(
        (item) =>
          (item.type === bikeType && item.model === modelType) ||
          item.model.includes(modelType) ||
          item.model.toLowerCase() == allModelType ||
          item.type.toLowerCase() == "all models" ||
          item.model.toLowerCase() == "all bike models"
      );
      let uniqueModels = [
        ...new Set(filteredModels.map((item) => item.category)),
      ];
      const uniqueValues = uniqueModels.filter((item, index, arr) => {
        const lowercaseItem = item.toLowerCase();
        return (
          index === arr.findIndex((val) => val.toLowerCase() === lowercaseItem)
        );
      });
      generateDropDown(uniqueValues, "category-dropdown");
    }
  }

  $("#accessories--form-wrap .dropdown-menu").on("click", "li", function () {
    let selectionGroup = $(this).parents(".cust-drop-down");
    let button = selectionGroup.find(".dropdown-select");
    button.text($(this).find("a")[0].innerHTML.replaceAll("&amp;", "&"));
    selectionGroup.find(".cust-dropdown-menu li").removeClass("active");
    $(this).parents("ul").siblings(".btn-drop").addClass("active");
    $(this).addClass("active");
    if ("bike" === button.attr("name").toLowerCase()) {
      let bikeType = $(this).text();
      $('[name="bikeType"]').val($(this).text());
      // if (bikeType.toLowerCase() == 'bike') {
      //   $('.accessorie-items').removeClass('d-none');
      // } else {
      //   $('.accessorie-items').addClass('d-none');
      // }
      if ($('[name="model"]').hasClass("active")) {
        $('[name="model"]').removeClass("active");
        $('[name="model"]').text("Select Model");
      }
      if ($('[name="category"]').hasClass("active")) {
        $('[name="category"]').removeClass("active");
        $('[name="category"]').text("Select Category");
      }
      generateModelDropdown(jsonObj, bikeType);
      $('[name="model"]').prop("disabled", false);
      $('[name="category"]').prop("disabled", true);
    } else if ("model" === button.attr("name")) {
      modelType = $(this).text();
      $('[name="modelNameVal"]').val($(this).text());
      bikeType = $('[name="bikeType"]').val();
      if ($('[name="category"]').hasClass("active")) {
        $('[name="category"]').removeClass("active");
        $('[name="category"]').text("Select Category");
      }
      generateCategoryDropdown(jsonObj, bikeType, modelType);
      $('[name="category"]').prop("disabled", false);
    } else if ("category" === button.attr("name")) {
      generateBikeImage(jsonObj, modelType, bikeType);
    }
  });

  function generateBikeImage(jsonObj, bikeModel, bikeType) {
    const buttonTag = document.querySelector('button[name="category"]');
    const buttonValue = buttonTag.textContent.toLowerCase();

    let allModelType =
      bikeType.toLowerCase() == "bike" ? "all bike model" : "all scooters";
    const bikeImagepath =
      bikeImagePath +
      "/" +
      bikeModel.replaceAll(" ", "").toLowerCase() +
      ".jpg";
    $(".accessorie-items").empty();
    let bikeModels = jsonObj.filter(
      (item) =>
        item.category.toLowerCase() == buttonValue &&
        (item.model === bikeModel ||
          item.model.includes(bikeModel) ||
          item.model.toLowerCase() == allModelType ||
          item.type.toLowerCase() == "all models" ||
          item.model.toLowerCase() == "all bike models")
    );
    let bikeImage = [...new Set(bikeModels.map((item) => item.images))];
    $(".accessorie-items").removeClass("d-none");
    $("#accessories-bike-image").empty();
    if (bikeModels.length > 0) {
      for (let i = 0; i < bikeModels.length; i++) {
        $(".accessorie-items").prepend(
          '<div class="accessories-image-wrapper"><a href="' +
            bikeModels[i].eshop +
            '"><img id="theImg" class="accessorie-img" src="' +
            accessoriesImageFolder +
            "/" +
            bikeModels[i].images +
            '" /><p class="b1-text-std text-center">' +
            bikeModels[i].description +
            "</p></div>"
        );
      }
    }
    $("#accessories-bike-image").append(
      '<img class="bike-image" src="' + bikeImagepath + '"/>'
    );
  }
});
