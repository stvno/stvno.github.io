var menuMobile = document.getElementById('menu-mobile');
var headerMobile = document.getElementById('header-mobile');
menuMobile.onclick = function(e){
	e.stopPropagation();
	headerMobile.className = headerMobile.className == 'active' ? '': 'active';
}
headerMobile.onclick = function() {
	headerMobile.className = '';
}