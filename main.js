$(window, document, undefined).ready(()=>{

	var texttyping = (options) => {
		var el = options["element"]
		if(el.attr("is-typing")=="true")return;
		el.attr("is-typing", true)
		var i = options["remove_chars"]||0, txt = options["text"], speed = options["speed"]||125
		var functions = {
			add: ()=>{
							el.text(el.text()+txt[i])
							if(i == txt.length-1){
								el.attr("is-typing", false)
								options["finished"]&&options["finished"]()								
								return
							}else
								i++
							setTimeout(functions["add"], speed+(Math.random()*(speed*0.2)-speed*0.1))
						},
			remove: ()=>{
							var txt = el.text()
							el.text(txt.substr(0, txt.length-1))
							if(i == 1){
								el.attr("is-typing", false)
								options["finished"]&&options["finished"]()
								return
							}else
								i--
							setTimeout(functions["remove"], speed+(Math.random()*(speed*0.2)-speed*0.1))
						}
		}
		setTimeout(functions[options["remove_chars"]?"remove":"add"], speed+(Math.random()*(speed*0.2)-speed*0.1))
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
		beforeMove: (index) => {
			var div = $(`div[data-index=${index}]`)
			$(div).find(".container").css("opacity", 0)
		},
		afterMove: (index) => {
			var div = $(`div[data-index=${index}]`)
			$(div).find(".container").animate({opacity: 1}, 250)
		},
		loop: false,
		keyboard: true,
		responsiveFallback: false,
		direction: "vertical"  
	});

	var welcome_text_list = [
		"programming is my passion.",
		"this is my website.",
		"I love writing code."
	]

	var welcome_text = ()=>{
		texttyping({
			element: $("#welcome-text"),
			speed: 125,
			text: "Hi, I'm Julian and ",
			finished: f
		})
		var f = ()=>{
			var msg = welcome_text_list[Math.floor(Math.random()*welcome_text_list.length)]
			texttyping({
				element: $("#welcome-text"),
				speed: 100,
				text: msg,
				finished: ()=>{
					setTimeout(()=>texttyping({
						element: $("#welcome-text"),
						speed: 200,
						remove_chars: msg.length,
						finished: ()=>{
							setTimeout(f, 500)
						}
					}), 1000)
				}
			})
		}
	}
	welcome_text()
})