const apikey = '?apikey=eedd9666-26c5-4420-9da8-6c05c5771dac';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getImages() {
  let imgArr = [];
  for (let i = 0; i < 100; i++) {
    imgArr.push(getRandomInt(1000000));
  }
  console.log(imgArr);

  imgArr.forEach((index) => {
    const getdata = axios
      .get('https://api.harvardartmuseums.org/object/' + index + apikey)
      .then((result) => {
        let body = document.querySelector('.display_data');
        let wrapper = document.createElement('div');
        let img = document.createElement('img');
        img.src = result.data.images[0].baseimageurl;
        wrapper.appendChild(img);
        // wrapper.innerText = result.data;
        console.log(result.data.images[0].baseimageurl);
        body.appendChild(wrapper);
      })
      .catch((error) => {});
  });
}

console.log(getImages());
