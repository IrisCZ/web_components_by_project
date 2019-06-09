class NavBar extends HTMLElement {
	constructor() {
		super();
		
		this.render = this.render.bind(this);
		this.render();
		this.optionButtons = this.shadowRoot.querySelectorAll('.option_button');
		this.optionButtons.forEach(optionButton =>
			optionButton.addEventListener('click', this.handleClick)
		);
	}

	handleClick(e) {
		const selected = e.target.textContent;
		const container = document.querySelector('#display-field');
		container.setAttribute('selected', selected);
	}

	options() {
		let options = data.options;

		return Object.keys(options).map(option => {	 
			return `
				<li value="${option}" class="nav_option">
					<button class="option_button" onclick="this.handleClick">${option}</button>
				</li>`;
		}).join('');
	}

	render() {
		const shadowRoot = this.shadowRoot || this.attachShadow({ mode: 'open'});
		shadowRoot.innerHTML = `
			<style>
				.nav_bar {
					box-sizing: border-box;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					padding: 0;
					width: 100%;
				}
				
				.nav_option {
					border-bottom: 1px solid transparent;
					box-sizing: border-box;
					display: inline-block;
				}
				
				.option_button {
					background-color: transparent;
					border: 2px solid transparent;
					border-radius: 10%/30%;
					box-sizing: border-box;
					color: white;
					cursor: pointer;
					font-family: 'Open Sans';
					font-size: 0.8em;
					opacity: 0.6;
					padding: .5em 1em;
					transition: all 0.5s ease;
				}
				
				.option_button:focus {
					border-bottom: 2px solid white;
					box-sizing: border-box;
					opacity: 1;
					outline: none;
				}
			</style>
			<ol id="${this.id}" class="nav_bar">
				${this.options()}
			</ol>
		`;
	}
}

class Display extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = `
			<style>
			.display {
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					padding: 2em;
					width: 100%;
				}
			</style>
			<div id="display" class="display">${this.setSelected()}</div>
		`;
		this.display = this.shadowRoot.querySelector('#display');
	}
	
	static get observedAttributes() {
		return ['selected'];
	}

	attributeChangedCallback() {
		this.display.innerHTML = this.setSelected();
	}
	
	setSelected() {
		const key = this.getAttribute('selected');
		const dataLength = data.options[key] ? data.options[key].length : 0;
		const randomNumber = Math.floor(Math.random() * Math.floor(dataLength));
		const selected = data.options[key] ? data.options[key][randomNumber] : '';
		return selected ? selected : 'Choose an author';
	}
}

class Title extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });

		shadowRoot.innerHTML = `
			<style>
				.title {
					font-family: 'Poiret One', cursive;
					font-size: 2.5em;
					margin: 1em auto;
					text-align: center;
					text-transform: uppercase;
				}
			</style>
			<h1  class="title">${data.title}</h1>
		`;
	}
}
class Container extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });

		shadowRoot.innerHTML = `
			<style>
			.container {
				font-family: 'Poiret One', cursive;
			}
			</style>
			<main id="${this.id}">    
				<slot></slot>            
			</main>
		`;
	}
}

customElements.define('main-container', Container);
customElements.define('title-field', Title);
customElements.define('nav-bar', NavBar);
customElements.define('display-field', Display);
