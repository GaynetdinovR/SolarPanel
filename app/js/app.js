$(document).ready(function(){

	$('.green-tariff__link').click(function(){
		if(!$(this).hasClass('green-tariff__link--active')){
			$('.green-tariff__link--active').removeClass('green-tariff__link--active')
			$(this).addClass('green-tariff__link--active')
		} else {
			$(this).removeClass('green-tariff__link--active')
		}
	});

});
