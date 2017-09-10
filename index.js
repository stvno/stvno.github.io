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
      frameh1.innerText=e.target.getAttribute('title')+' ⤢';
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

})();


