const apikey = '?apikey=eedd9666-26c5-4420-9da8-6c05c5771dac';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let imgArr = [];
function getImages() {
  for (let i = 0; i < 100; i++) {
    imgArr.push(getRandomInt(1000000));
  }
  //console.log(imgArr);

  imgArr.forEach((index) => {
    const getdata = axios
      .get('https://api.harvardartmuseums.org/object/' + index + apikey)
      .then((result) => {
        let body = document.querySelector('.display_data');
        let wrapper = document.createElement('div');
        let img = document.createElement('img');
        img.src = result.data.images[0].baseimageurl;
        wrapper.appendChild(img);
        console.log(result.data.images[0].baseimageurl);
        body.appendChild(wrapper);
      })
      .catch((error) => {});
  });
}

const formEl = document.getElementById('searchForm');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchQuery = e.target.searchQuery.value;
  // console.log(searchQuery);
  let body = document.querySelector('.display_data');
  body.innerHTML = '';
  let wrapper = document.createElement('div');

  imgArr.forEach((index) => {
    const getdata = axios
      .get('https://api.harvardartmuseums.org/object/' + index + apikey)
      .then((result) => {
        console.log(result.data.colors);

        let dominantCol = result.data.colors[0].hue;
        //console.log(dominantCol);
        if (dominantCol == e.target.searchQuery.value) {
          let img = document.createElement('img');
          img.src = result.data.images[0].baseimageurl;
          wrapper.appendChild(img);

          console.log('Color matches search');
          console.log(result.data.images[0].baseimageurl);
        }
        console.log(wrapper);
        body.appendChild(wrapper);

        // wrapper.innerText = result.data;
        // console.log(result.data.images[0].baseimageurl);
      })
      .catch((error) => {});
  });
});

console.log(getImages());

// Search by color

// We have an populated.

// Display all images

// Take in a search query ($Colour)

// console.log(result.data.color[0].hex)

// Check if display image contains $colour
//  if true, keep in array
// if false remove from array.

// Display new array of images
