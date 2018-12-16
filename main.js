$(window, document, undefined).ready(()=>{
	CURRENT_INDEX = parseInt(window.location.href.split("#")[1]||"1")
	console.log(CURRENT_INDEX)

	let texttyping = (options) => {
		let el = options["element"]
		if(el.attr("is-typing")=="true")return;
		el.attr("is-typing", true)
		let i = options["remove_chars"]||0, txt = options["text"], speed = options["speed"]||125
		let functions = {
			add: ()=>{
							el.html(el.html()+txt[i])
							if(i == txt.length-1){
								el.attr("is-typing", false)
								options["finished"]&&options["finished"]()								
								return
							}else
								i++
							setTimeout(functions["add"], speed+(Math.random()*(speed*0.2)-speed*0.1))
						},
			remove: ()=>{
							let txt = el.html()
							el.html(txt.substr(0, txt.length-1))
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

	let params = () => {
		let qs = document.location.search.split('+').join(' '),
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
			let div = $(`div[data-index=${index}]`)
			$(div).find(".container").css("opacity", 0)
		},
		afterMove: (index) => {
			CURRENT_INDEX = index
			let div = $(`div[data-index=${index}]`)
			$(div).find(".container").animate({opacity: 1}, 250)
			switch(index){
				case 1:
					welcome_text()
			}
		},
		loop: false,
		keyboard: true,
		responsiveFallback: false,
		direction: "vertical"  
	});

	let welcome_text_list = [
		"programming is my passion.",
		"this is my website.",
		"I love writing code.",
		"I am 17 years old.",
		"I am from Austria.",
		"I still go to school.",
		"you can find me on GitHub.",
		"this website is work in progress.",
		"I participate in Advent of Code."
	]

	let welcome_text = ()=>{
			if(CURRENT_INDEX != 1)return
			let msg = welcome_text_list[Math.floor(Math.random()*welcome_text_list.length)]
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
							setTimeout(welcome_text, 500)
						}
					}), 1000)
				}
			})
		}
	texttyping({
		element: $("#welcome-text"),
		speed: 125,
		text: "Hey, I'm Julian and ",
		finished: welcome_text
	})
})