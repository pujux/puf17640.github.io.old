$(window, document, undefined).ready(()=>{
	var scram = (el) => {
		var f = ()=>el.text(el.attr("scramble")).scramble().animate({opacity: 1}, 3000)
		if(el.is(":visible")) el.animate({opacity: 0}, 1500, f)
		else f()
	}

	var params = () => {
		var qs = document.location.search.split('+').join(' '),
				p = {},
				re = /[?&]?([^=]+)=([^&]*)/g,
				t
		while (t = re.exec(qs)) {
				p[decodeURIComponent(t[1])] = decodeURIComponent(t[2])
		}
		return p
	}

	$("#main").onepage_scroll({
		sectionContainer: ".slide",     
		easing: "ease",                 
		animationTime: 1000,
		pagination: true,
		updateURL: true,
		beforeMove: function(index) {
			switch(index){
				case 1:
					scram($("div[data-index=1]").find(".scramble"))
			}
		},
		afterMove: function(index) {console.log(`moved to ${index}`)},
		loop: false,
		keyboard: true,
		responsiveFallback: false,
		direction: "vertical"  
	});

	scram($("#welcome-scramble"))
})