// REST API constant
const KAKAO_JAVASCRIPT_APP_KEY = "dae9a8ed5de2c56693aa95589fa03bc2"
const KAKAO_REST_APP_KEY = "ab417ffcbe380ada776b3c30ef7ec1cd";
const HOST = "dapi.kakao.com";
const REQUEST_URI = "/v2/search/image";
const REQUEST_URL = "https://" + HOST + REQUEST_URI;

// etc Constant
const RANDOM = 1;

//Get user input when button is clicked
var btnSearch = $("#btn-search");
var btnCat = $("#btn-cat");

btnSearch.click(function() {
  var summitText = $(".input-user");
  var htmlElement = $('.wrp-output');
  var computedText = summitText.val();
  summitText.val("");
  
  htmlElement.empty();
  searchImg(computedText, htmlElement);
});

btnCat.click(function() {
  var htmlElement = $('.wrp-output');
  htmlElement.empty();
  searchImg("고양이", htmlElement);
});


function searchImg(text, htmlElement) {
  var httpRequest = new XMLHttpRequest();
  var images = new Array();

  httpRequest.open('GET', REQUEST_URL + "?query=" + text, true);
  httpRequest.setRequestHeader("Authorization", "KakaoAK " + KAKAO_REST_APP_KEY);
  httpRequest.send();

  httpRequest.onload = function() {
    var resultJson = httpRequest.response
    var resultObj = JSON.parse(resultJson)

    var resultDocuments = resultObj.documents;

    resultDocuments.forEach(function(element){
      images.push(element.image_url);
    });

    addImgTag(images, RANDOM, htmlElement);
  }
  
  return images
}

function addImgTag(arr_image_url, number, htmlElement) {

  var shuffled_arr = shuffle(arr_image_url);
  var sliced_arr = shuffled_arr.slice(0, number);

  for (let i = 0; i < number; i++){
    var img_tag = `<img src="${sliced_arr[i]}" class = "img-search">`;
    console.log(img_tag);
    htmlElement.append(img_tag);
  }  
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}