let welcome_text_list = [
	"I am "+ (new Date()).getFullYear()-2001+" years old.",
]

$(window, document, undefined).ready(()=>{
	let rand_numbers;
	let rand_count = 0;
	
	$.ajax({
		url: `https://www.random.org/integers/?num=500&min=0&max=${welcome_text_list.length-1}&col=1&base=10&format=plain&rnd=new`,
		success: (data)=> rand_numbers = data.split("\n"),
		error: console.error
	})

	let texttyping = (options) => {
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

	let show_welcome = ()=>{
		var f = ()=>{
			let msg = welcome_text_list[rand_numbers[(rand_count%500)]]
			rand_count++
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
							setTimeout(f, 500)
						}
					}), 1000)
				}
			})
		}
		texttyping({
			element: $("#welcome-text-1"),
			speed: 125,
			text: "Hi, I'm Julian and ",
			finished: f
		})
	}
	show_welcome()
})