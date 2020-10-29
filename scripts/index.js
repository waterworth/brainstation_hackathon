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
        // Item -- Card Element
        let itemCard = document.createElement('div');
        itemCard.classList.add('display-data__card');

        // Item - Image Link
        let itemLink = document.createElement('a');
        itemLink.classList.add('display-data__link');
        itemLink.href = result.data.images[0].baseimageurl;
        itemCard.appendChild(itemLink);
        let img = document.createElement('img');
        img.classList.add('display-data__img');
        img.src = result.data.images[0].baseimageurl;
        itemLink.appendChild(img);

        // Item -- Artist
        let itemArtist = document.createElement('p');
        itemArtist.classList.add('display-data__artist');
        itemArtist.innerText = result.data.people[0].name;

        // Item -- Artist Life
        let artistLife = document.createElement('p');
        artistLife.classList.add('display-data__item-date');
        if (result.data.people[0].displaydate == null) {
          artistLife.innerText = 'Unknown';
        } else {
          artistLife.innerText = '(' + result.data.people[0].displaydate + ')';
        }

        itemCard.appendChild(itemArtist);
        itemCard.appendChild(artistLife);

        // Item  -- Title
        let itemTitle = document.createElement('p');
        itemTitle.classList.add('display-data__title');
        itemTitle.innerText = result.data.title + ', ' + result.data.dated;
        itemCard.appendChild(itemTitle);

        // Item -- Medium
        let itemMedium = document.createElement('p');
        itemMedium.classList.add('display-data__medium');
        itemMedium.innerText = result.data.medium;
        itemCard.appendChild(itemMedium);

        // Item -- Credit Line
        let itemCredit = document.createElement('p');
        itemCredit.classList.add('display-data__credit');
        itemCredit.innerText = result.data.creditline;
        itemCard.appendChild(itemCredit);

        dataContainer.appendChild(itemCard);
      })
      .catch((error) => {});
  });
}

popArray();

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
          // Item -- Card Element
          let itemCard = document.createElement('div');
          itemCard.classList.add('display-data__card');

          // Item - Image Link
          let itemLink = document.createElement('a');
          itemLink.classList.add('display-data__link');
          itemLink.href = result.data.images[0].baseimageurl;
          itemCard.appendChild(itemLink);
          let img = document.createElement('img');
          img.classList.add('display-data__img');
          img.src = result.data.images[0].baseimageurl;
          itemLink.appendChild(img);

          // Item -- Artist
          let itemArtist = document.createElement('p');
          itemArtist.classList.add('display-data__artist');
          itemArtist.innerText = result.data.people[0].name;

          // Item -- Artist Life
          let artistLife = document.createElement('p');
          artistLife.classList.add('display-data__item-date');
          if (result.data.people[0].displaydate == null) {
            artistLife.innerText = 'Unknown';
          } else {
            artistLife.innerText =
              '(' + result.data.people[0].displaydate + ')';
          }

          itemCard.appendChild(itemArtist);
          itemCard.appendChild(artistLife);

          // Item  -- Title
          let itemTitle = document.createElement('p');
          itemTitle.classList.add('display-data__title');
          itemTitle.innerText = result.data.title + ', ' + result.data.dated;
          itemCard.appendChild(itemTitle);

          // Item -- Medium
          let itemMedium = document.createElement('p');
          itemMedium.classList.add('display-data__medium');
          itemMedium.innerText = result.data.medium;
          itemCard.appendChild(itemMedium);

          // Item -- Credit Line
          let itemCredit = document.createElement('p');
          itemCredit.classList.add('display-data__credit');
          itemCredit.innerText = result.data.creditline;
          itemCard.appendChild(itemCredit);

          dataContainer.appendChild(itemCard);
        }
        // dataContainer.appendChild(itemCard);
      })
      .catch((error) => {});
  });
});

// Card layout to reflect Museum object label
// result.data.people[0].name + "("result.data.people[0].displaydate+")";
// result.data.title + ", " + result.data.dated;
// result.data.medium
// result.data.creditline
