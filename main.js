let welcome_text_list = shuffle([
	("I am "+ ((new Date()).getFullYear()-2001)+" years old."),
	"Welcome to my personal website.",
	"I am always searching for new challenges.",
	"I am currently working on my diploma project.",
	"I am from Austria.",
	"I do a lot of coding in my free time."
])

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

$(window, document, undefined).ready(()=>{
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

	let show_welcome = ()=>{
		let f = ()=>{
			texttyping({
				element: $("#welcome-text-2"),
				speed: 100,
				text: welcome_text_list[Math.floor(Math.random()*welcome_text_list.length)],
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
			text: "Hello, my name is Julian.",
			finished: f
		})
	}
	show_welcome()
})