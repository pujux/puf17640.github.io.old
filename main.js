$(window, document, undefined).ready(()=>{
	CURRENT_INDEX = parseInt(window.location.href.split("#")[1]?window.location.href.split("#")[1].substr(0, 1):"1")
	console.log(CURRENT_INDEX)

	let texttyping = (options) => {
		let el = options["element"]
		if(el.attr("is-typing")=="true")return;
		el.attr("is-typing", true)
		let i = options["remove_chars"]||0, txt = options["text"], speed = options["speed"]||125
		let functions = {
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
							let txt = el.text()
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

	$("#main").onepage_scroll({
		sectionContainer: ".slide",     
		easing: "ease",                 
		animationTime: 1000,
		pagination: true,
		updateURL: true,
		beforeMove: (index) => {
			let div = $(`div[data-index=${index}]`)
			//$(div).find(".container").css("opacity", 0)
		},
		afterMove: (index) => {
			CURRENT_INDEX = index
			let div = $(`div[data-index=${index}]`)
			//$(div).find(".container").animate({opacity: 1}, 250)
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
		"I am from Vienna, Austria.",
		"I still go to school.",
		"you can find me on GitHub.",
		"this is a work in progress. ☺",
	]

	let welcome_text = ()=>{
			if(CURRENT_INDEX != 1)return
			let msg = welcome_text_list[Math.floor(Math.random()*welcome_text_list.length)]
			texttyping({
				element: $("#welcome-text-2"),
				speed: 100,
				text: msg,
				finished: ()=>{
					setTimeout(()=>texttyping({
						element: $("#welcome-text-2"),
						speed: 200,
						remove_chars: $("#welcome-text-2").text().length,
						finished: ()=>{
							setTimeout(welcome_text, 500)
						}
					}), 1000)
				}
			})
		}
	texttyping({
		element: $("#welcome-text-1"),
		speed: 125,
		text: "Hi, I'm Julian and ",
		finished: welcome_text
	})
})