// burger
const burger = document.querySelector('.header__burger'),
	menu = document.querySelector('.menu'),
	header = document.querySelector('.header');
burger.addEventListener('click', (e) => {
	if (e.target.closest('.header__burger')) {
		burger.classList.toggle('_active')
		menu.classList.toggle('_active')
		header.classList.toggle('_active')
		document.body.classList.toggle('_lock');

	}
})


// counter function
function counterFunction() {
	function digitContersInit(digitsContersItems) {
		let digitsConters = digitsContersItems ? digitsContersItems : document.querySelectorAll('[data-digits-counter]');
		if (digitsConters) {
			digitsConters.forEach(digitsConter => {
				digitsContersAtimate(digitsConter);
			});
		}
	}

	function digitsContersAtimate(digitsConter) {
		let startTimestamp = null;
		const duration = parseInt(digitsConter.dataset.digitsConter) ? parseInt(digitsConter.dataset.digitsConter) : 2000;
		const startValue = parseInt(digitsConter.innerHTML);
		const starPosition = 0;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;

			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			digitsConter.innerHTML = Math.floor(progress * (starPosition + startValue));
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}

		};
		window.requestAnimationFrame(step);
	}

	digitContersInit();
}


//scroll animation
const animItems = document.querySelectorAll('._anim-items');

if (animItems) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		animItems.forEach(animItem => {

			const animItemHeigh = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;
			const scrollDistance = window.pageYOffset;

			let animItemPoint = window.innerHeight - animItemHeigh / animStart;

			if (animItemHeigh > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((scrollDistance > animItemOffset - animItemPoint) && scrollDistance < (animItemOffset + animItemHeigh)) {
				animItem.classList.add('_show');
				if (animItem.classList.contains('statistics-experts') && !animItem.classList.contains('_animate')) {
					animItem.classList.add('_animate');
					counterFunction()
				}

			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_show');

				}
			}
		});

	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }

	}
	setTimeout(() => {
		animOnScroll();
	}, 300);

}



