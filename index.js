console.log('Hi there! ッ\n\nSince you are looking: most of the applications are loaded in iFrames. They are all quite heavy and loading them all in the background tends to kill any browser. When you click on one a title it will create a new iFrame and load the url into it, thoug that shouldn\'t be to hard to figure out for you.\n If you need help you can drop me an email at helpme@minst.net. \n\nCheers, stvno');
(function () {
var hash = window.location.hash;


$('.content_map').click(function(e){
    if($(e.target).attr('href')==undefined) {
    var frame = $(this).next();    
    var url = frame.attr('link');    
    if(frame.css('display')=='none'){    
    window.location.hash = $(this).attr('id');
        var iframe = '<iframe src="'+url+'"></iframe>';
        frame.append($(iframe));
        frame.show('blind');
         $('html,body').animate({scrollTop: $(this).offset().top}, 500);
    }
    else {
        frame.hide('blind');
        frame.children().remove();
    }
    }
    else if($(e.target).hasClass('glyphicon')){
        var frame = $(this).next();   
        frame.hide('blind');
        frame.children().remove();
    }
    
});
 
$('.content_other').click(function(e){
    if($(this).next().css('display')=='none') {
        window.location.hash = $(this).attr('id');
        $('html,body').animate({scrollTop: $(this).offset().top}, 500);
    }
    $(this).next().toggle('blind');
    
});

$('.menuheader').click(function(e){
 $(this).next().toggle('blind');
})
$('.menu').click(function(e){
    var target = $(this).attr('target');   
    $(target).click();
   $(this).parent().parent().hide('blind');
   
})
$('#nav').hover(function(e){
$('#menulabel').fadeIn();
},function(e){
$('#menulabel').fadeOut();
});

var dymaxionimages = ['detail.png','map.png'];
var dymaxionchosen = 1;
$('#dymaxion-switcher').click(function(e){
dymaxionchosen=dymaxionchosen?0:1;
$(this).find('img').attr('src','page/dymaxion/'+dymaxionimages[dymaxionchosen]);
});



if(hash!=undefined&&hash!='#nav') $(hash).click();



})();


