console.log("Hi there! ッ\n\nSince you are looking: most of the applications are loaded in iFrames.\
 They are all quite heavy and loading them all in the background tends to kill any browser. When you\
  click on one a thumbnail it will create a new iFrame and load the url into it, though that shouldn\'t \
  be to hard to figure out for you.\n If you need help you can drop me an email at helpme@minst.net. \
  \n\nCheers, stvno");
(function () {
var main = document.getElementById('content');
var popup = document.getElementById('projectpage');
var close = document.getElementById('close');
var iframe =  document.getElementById('iframecontent');
var frameh1 =  document.getElementById('frameh1');

[].forEach.call(document.getElementsByClassName('placeholder'), function (input) {
    input['onclick' in input ? 'onclick' : 'ontouchend'] = function (e) {
      e.stopPropagation();
      var url = e.target.getAttribute('url');      
      frameh1.innerHTML=e.target.getAttribute('titel')+' <svg viewBox="0 0 6.8791633 6.8791633" height="6.8791633mm" width="6.8791633mm">\
  <path d="M 0.13229,5.4239564 V 6.7468731 H 1.4552066"/>\
  <path d="M 5.4239567,0.1322898 H 6.7468733 V 1.4552064"/>\
  <path d="M 1.4552066,4.1010398 V 5.4239564 H 2.7781234"/>\
  <path d="M 4.10104,1.4552064 H 5.4239567 V 2.7781231"/>\
  <path d="m 1.4552066,5.4239564 3.9687501,-3.96875"/>\
</svg>';
      frameh1.setAttribute('href',url);
      iframe.setAttribute('src',url);

      popup.style.display = 'flex';
      popup.style.opacity = 1;
    };
});

function closePopup(e) {
  e.stopPropagation();
  iframe.setAttribute('src','redirect/blank.html');
  popup.style.opacity = 0;
  setTimeout(function() {popup.style.display = 'none';  }, 1000);
}

main.onclick = closePopup;
close.onclick = closePopup;

[].forEach.call(document.getElementsByClassName('thumb'), function (input) {
    input['onclick' in input ? 'onclick' : 'ontouchend'] = function (e) {
      e.stopPropagation();
      var id = 'y'+e.target.innerText;
      ScrollTo(id);
      history.pushState(null, null, '#'+id);
    };
});


function ScrollTo(name) {
  ScrollToResolver(document.getElementById(name));
}

function ScrollToResolver(elem) {
  var jump = parseInt(elem.getBoundingClientRect().top * .2);
  document.body.scrollTop += jump;
  document.documentElement.scrollTop += jump;
  if (!elem.lastjump || elem.lastjump > Math.abs(jump)) {
    elem.lastjump = Math.abs(jump);
    setTimeout(function() { ScrollToResolver(elem);}, "100");
  } else {
    elem.lastjump = null;
  }
}
})();


