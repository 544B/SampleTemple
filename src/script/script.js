class Test {
	constructor() {
		this.text = 'hoge';
	}

	init() {
		console.log(this.text);
	}
}

let test = new Test();

window.addEventListener('load', () => {
	test.init();
});
