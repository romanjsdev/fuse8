const URL = 'https://603e38c548171b0017b2ecf7.mockapi.io/homes'

const cards = document.querySelector('.cards>.container');
const input = document.querySelector('#filter');
const seeMore = document.querySelector('.see-more');

const getData = async(url)=>{
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

const render = async(data) =>{
	cards.innerHTML = '';

	if (data.length !=0) {
		data.forEach( el => {
			cards.innerHTML += getCardTemplate(el);
		});
		seeMore.style.display = 'block';
	} else {
		cards.innerHTML = "<div>Not found</div>";
		seeMore.style.display = 'none';
	}
}

const getCardTemplate = (el) => `<div class="card">
			<a href="https://603e38c548171b0017b2ecf7.mockapi.io/homes/details/${el.id}">
			<div class="card__img">
				<img src="/img/image.jpg">
				<p class="card__type ${el.type == 'IndependentLiving' ? 'blue':'orange'}">${el.type}</p>
			</div>
			<div class="card__body">
				<p class="card__body-title">${el.title}</p>
				<p class="card__body-address">${el.address}</p>
				<p class="card__body-price">New Properties for Sale from <span>£${el.price}<span></p>
				<p>Shared Ownership Available</p>
			</div>
		</a></div>`;

const filter = (data, inputVal) => {
	let filterData = data.filter(el => {
		if(el.title.toLowerCase().indexOf(inputVal.toLowerCase()) != -1){
			return el;
		}
	}) 
	return(filterData);
}

const run = async() =>{
	data = await getData(URL);
	render(data);
	input.oninput = () => {
		input.value.length > 3 ? render(filter(data, input.value)) : render(data);
	}
}

run();