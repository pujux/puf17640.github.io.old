let startText = "Hello, my name is Julian."

let textList = [
	"Welcome to my personal website.",
	"I am a freelance web designer and full-stack dev.",
	"I am always searching for new challenges.",
	"Let's build something meaningful together.",
	"I am "+ ((new Date()).getFullYear()-2001)+" years old.",
	"I am currently working on my diploma project.",
]

$(window, document, undefined).ready(()=>{

	$(document).on("scroll", (e)=> {
		return
		var screenHeight = $("#main").height()
		if (window.scrollY >= screenHeight)
			$("#scroll-top").parent().show()
		else
			$("#scroll-top").parent().hide()

		if(window.scrollY < screenHeight || window.scrollY >= 2*screenHeight)
			$("#my-projects").parent().show()
		else
			$("#my-projects").parent().hide()
		
		if(window.scrollY < 2*screenHeight)
			$("#my-resume").parent().show()
		else
			$("#my-resume").parent().hide()
	})

	$(document).trigger("scroll")

	let textTyping = (options) => {
		let el = options["element"]
		if(el.attr("is-typing")=="true")return;
		el.attr("is-typing", true)
		let i = options["remove_chars"]||0, txt = options["text"], speed = options["speed"]||125
		if(!options["remove_chars"])el.text("")
		let functions = {
			add: ()=>{
				el.text(el.text()+txt[i])
				if(i == txt.length-1){
					el.attr("is-typing", false)
					options["finished"]&&options["finished"]()								
					return
				}else
					i++
				setTimeout(functions["add"], speed+(Math.random()*(speed*0.2)))
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
				setTimeout(functions["remove"], speed+(Math.random()*(speed*0.2)))
			}
		}
		setTimeout(functions[options["remove_chars"]?"remove":"add"], speed+(Math.random()*(speed*0.2)))
	}

	let showWelcome = ()=>{
		let i = 0;
		let f = ()=>{
			textTyping({
				element: $("#welcome-text-2"),
				speed: 100,
				text: textList[(i++)%textList.length],
				finished: ()=>{
					setTimeout(()=>textTyping({
						element: $("#welcome-text-2"),
						speed: 50,
						remove_chars: $("#welcome-text-2").text().length,
						finished: ()=>{
							setTimeout(f, 500)
						}
					}), 1000)
				}
			})
		}
		textTyping({
			element: $("#welcome-text-1"),
			speed: 125,
			text: startText,
			finished: f
		})
	}
	showWelcome()
})