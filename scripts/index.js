const apikey = '?apikey=eedd9666-26c5-4420-9da8-6c05c5771dac';

let imgArr = [];

function popArray() {
  for (let i = 0; i < 50; i++) {
    const populateArray = axios
      .get(
        'https://api.harvardartmuseums.org/object/' + apikey + '&page=' + [i]
      )
      .then((result) => {
        for (let i = 0; i < 10; i++) {
          if (!imgArr.includes(result.data.records[i].id)) {
            imgArr.push(result.data.records[i].id);
          }
        }
      })
      .catch((error) => {});
  }
}

function getImages() {
  imgArr.forEach((index) => {
    const getdata = axios
      .get('https://api.harvardartmuseums.org/object/' + index + apikey)
      .then((result) => {
        let dataContainer = document.querySelector('.display-data');
        let itemCard = document.createElement('div');
        itemCard.classList.add('display-data__card');
        let itemLink = document.createElement('a');
        itemLink.classList.add('display-data__link');
        itemLink.href = result.data.images[0].baseimageurl;
        itemCard.appendChild(itemLink);
        let img = document.createElement('img');
        img.classList.add('display-data__img');
        img.src = result.data.images[0].baseimageurl;
        itemLink.appendChild(img);
        let itemTitle = document.createElement('p');
        itemTitle.classList.add('display-data__title');
        itemTitle.innerText = result.data.title;
        itemCard.appendChild(itemTitle);
        let itemArtist = document.createElement('p');
        itemArtist.classList.add('display-data__artist');
        itemArtist.innerText = '-' + result.data.people[0].name;
        itemCard.appendChild(itemArtist);

        dataContainer.appendChild(itemCard);
      })
      .catch((error) => {});
  });
}

popArray();

getImages();

const formEl = document.getElementById('searchForm');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchQuery = e.target.searchQuery.value;
  let dataContainer = document.querySelector('.display-data');
  dataContainer.innerHTML = '';

  if (e.target.searchQuery.value == '') {
    getImages();
  }

  imgArr.forEach((index) => {
    const getdata = axios
      .get('https://api.harvardartmuseums.org/object/' + index + apikey)
      .then((result) => {
        let dominantCol = result.data.colors[0].hue;
        if (dominantCol == e.target.searchQuery.value) {
          let dataContainer = document.querySelector('.display-data');
          let itemCard = document.createElement('div');
          itemCard.classList.add('display-data__card');
          let itemLink = document.createElement('a');
          itemLink.classList.add('display-data__link');
          itemLink.href = result.data.images[0].baseimageurl;
          itemCard.appendChild(itemLink);
          let img = document.createElement('img');
          img.classList.add('display-data__img');
          img.src = result.data.images[0].baseimageurl;
          itemLink.appendChild(img);
          let itemTitle = document.createElement('p');
          itemTitle.classList.add('display-data__title');
          itemTitle.innerText = result.data.title;
          itemCard.appendChild(itemTitle);
          let itemArtist = document.createElement('p');
          itemArtist.classList.add('display-data__artist');
          itemArtist.innerText = '-' + result.data.people[0].name;
          itemCard.appendChild(itemArtist);

          dataContainer.appendChild(itemCard);
        }
        // dataContainer.appendChild(itemCard);
      })
      .catch((error) => {});
  });
});
