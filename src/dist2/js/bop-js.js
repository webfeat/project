var shade = document.getElementById("shade");
var shadelight = document.getElementById("shade-light");
function materialLight(){
  var pop = document.getElementById("material-light");
  pop.style.display = "block";
  shade.style.display = "block";
}
function iosLight(){
  var pop = document.getElementById("ios-light");
  pop.style.display = "block";
  shade.style.display = "block";
}
function iosDark(){
  var pop = document.getElementById("ios-dark");
  pop.style.display = "block";
  shade.style.display = "block";
}
function modernLight(){
  var pop = document.getElementById("modern-light");
  pop.style.display = "block";
  shadelight.style.display = "block";
}
function modernDark(){
  var pop = document.getElementById("modern-dark");
  pop.style.display = "block";
  shade.style.display = "block";
}
function iosLightExit(){
  var pop = document.getElementById("ios-light");
  pop.style.display = "none";
  shade.style.display = "none";
}
function modernExit(){
  var pop = document.getElementById("modern-light");
  pop.style.display = "none";
  shadelight.style.display = "none";
}
function modernDarkExit(){
  var pop = document.getElementById("modern-dark");
  pop.style.display = "none";
  shade.style.display = "none";
}
function iosDarkExit(){
  var pop = document.getElementById("ios-dark");
  pop.style.display = "none";
  shade.style.display = "none";
}
function materialLightAnime(){
  var pop = document.getElementById("material-light-anime");
  var head = document.getElementById("head-anime");
  var text = document.getElementById("text-anime");
  pop.style.display = "block";
  shade.style.display = "block";
  
  setTimeout(function() {
      if(screen.width <600){
      pop.style.width = "90%";
      pop.style.height = "60%";
      pop.style.borderRadius = "2px";
    }
    else{
    pop.style.width = "40%";
    pop.style.height = "auto";
    pop.style.borderRadius = "2px";
  }
  }, 800);
  setTimeout(function() {
    head.style.marginTop = "0px";
    head.style.opacity = "0.8";
  }, 1200);
  setTimeout(function() {
    text.style.marginTop = "-12px";
    text.style.opacity = "1.0";
  }, 1800);
}
function materialDarkAnime(){
  var pop = document.getElementById("material-dark-anime");
  var head = document.getElementById("head-anime-dark");
  var text = document.getElementById("text-anime-dark");
  pop.style.display = "block";
  shade.style.display = "block";
  setTimeout(function() {
    
      if(screen.width <600){
      pop.style.width = "90%";
      pop.style.height = "60%";
      pop.style.borderRadius = "2px";
    }
    else{
    pop.style.width = "40%";
    pop.style.height = "auto";
    pop.style.borderRadius = "2px";
  }
  }, 800);
  setTimeout(function() {
    head.style.marginTop = "0px";
    head.style.opacity = "0.8";
  }, 1200);
  setTimeout(function() {
    text.style.marginTop = "-12px";
    text.style.opacity = "1.0";
  }, 1800);
}
function exitLightAnime(){
  var pop = document.getElementById("material-light-anime");
  var head = document.getElementById("head-anime");
  var text = document.getElementById("text-anime");
  pop.style.width = "20px";
  pop.style.height = "20px";
  pop.style.borderRadius = "100%";
  shade.style.display = "none";
  setTimeout(function(){
    pop.style.display = "none";  }, 600);
    head.style.opacity = "0.0";
    head.style.marginTop = "40px";
    text.style.opacity = "0.0";
    text.style.marginTop = "20px";
}
function exitDarkAnime(){
  var pop = document.getElementById("material-dark-anime");
  var head = document.getElementById("head-anime-dark");
  var text = document.getElementById("text-anime-dark");
  pop.style.width = "20px";
  pop.style.height = "20px";
  pop.style.borderRadius = "100%";
  shade.style.display = "none";
  setTimeout(function(){
    pop.style.display = "none";  }, 600);
    head.style.opacity = "0.0";
    head.style.marginTop = "40px";
    text.style.opacity = "0.0";
    text.style.marginTop = "20px";
}
function modernLightAnime(){
  var pop = document.getElementById("modern-light-anime");
  var head = document.getElementById("modernlight-head");
  var text = document.getElementById("modernlight-text");
  pop.style.display = "block";
  shadelight.style.display = "block";
  setTimeout(function() {
    //pop.style.transform ="translate3d(0px ,0px ,0px)";
    pop.style.top = "40%";
    pop.style.opacity = "1.0";
    head.style.top = "-120px";
}, 800);
  setTimeout(function() {
    head.style.top = "-120px";
  }, 1000);
  setTimeout(function() {
    text.style.top = "-140px";
  }, 1000);

}
function modernDarkAnime(){
  var pop = document.getElementById("modern-dark-anime");
  var head = document.getElementById("moderndark-head");
  var text = document.getElementById("moderndark-text");
  pop.style.display = "block";
  shade.style.display = "block";
  setTimeout(function() {
    //pop.style.transform ="translate3d(0px ,0px ,0px)";
    pop.style.top = "40%";
    pop.style.opacity = "1.0";
    head.style.top = "-120px";
}, 800);
  setTimeout(function() {
    head.style.top = "-120px";
  }, 1000);
  setTimeout(function() {
    text.style.top = "-140px";
  }, 1000);

}
function modernlightanimatedExit(){
  var pop = document.getElementById("modern-light-anime");
  var head = document.getElementById("modernlight-head");
  var text = document.getElementById("modernlight-text");
  pop.style.top = "60%";
  pop.style.opacity = "0.0";
  head.style.top = "-60px";
  setTimeout(function() {
    //pop.style.transform ="translate3d(0px ,0px ,0px)";
    shadelight.style.display = "none";
    pop.style.display = "none";

}, 800);
  setTimeout(function() {

  }, 1000);
  setTimeout(function() {
  }, 1200);

}
function moderndarkanimatedExit(){
  var pop = document.getElementById("modern-dark-anime");
  var head = document.getElementById("moderndark-head");
  var text = document.getElementById("moderndark-text");
  pop.style.top = "60%";
  pop.style.opacity = "0.0";
  head.style.top = "-60px";
  setTimeout(function() {
    //pop.style.transform ="translate3d(0px ,0px ,0px)";
    shade.style.display = "none";
    pop.style.display = "none";

}, 800);
  setTimeout(function() {

  }, 1000);
  setTimeout(function() {
  }, 1200);

}
function Exit(){
  var pop = document.getElementById("material-light");
  pop.style.display = "none";
  shade.style.display = "none";
}
function materialDark(){
  var pop = document.getElementById("material-dark");
  pop.style.display = "block";
  shade.style.display = "block";
}
function exitDark(){
  var pop = document.getElementById("material-dark");
  pop.style.display = "none";
  shade.style.display = "none";
}


var subUrlPipe = function (url) {
  if(url.indexOf('www') > 0&& url.indexOf('https') >= 0){
      var newUrl = 'www.' + url.substring(url.indexOf('.')+1);
  }else if(url.indexOf('www') > 0){
      newUrl = url.replace('www.','http://');
  }else if(url.indexOf('http')){
    return url;
  }
  return newUrl;
}

//保存新书签
var submitNewBook = function (url) {
    var url = document.getElementById("url").value;
    var name = document.getElementById("name").value;
    url = subUrlPipe(url);
    var postUrl = '/bug?url=' + url;
    axios.get(postUrl)
        .then(function (response) {
          Storage.property.insertNew({
              url:url,
              src:response.data,
              name:name
          });
            location.reload();
        }) .catch(function (error) {
            console.log(error);
        });
}
