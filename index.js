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

if(hash!=undefined&&hash!='#nav') $(hash).click();