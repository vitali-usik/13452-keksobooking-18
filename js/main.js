'use strict';

var ADS_COUNT = 8;

var TITLES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var GOODS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var showMap = function () {
  mapElement.classList.remove('map--faded');
};

var getRandomFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getAd = function (index) {
  var x = getRandomFromRange(0, 1200);
  var y = getRandomFromRange(130, 630);

  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: TITLES[getRandomFromRange(0, TITLES.length)],
      address: x + ', ' + y,
      price: getRandomFromRange(1, 300),
      type: TYPES[getRandomFromRange(0, TYPES.length)],
      rooms: getRandomFromRange(1, 4),
      guests: getRandomFromRange(1, 4),
      checkin: TIMES[getRandomFromRange(0, TIMES.length)],
      checkout: TIMES[getRandomFromRange(0, TIMES.length)],
      features: GOODS, // массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
      description: TITLES[getRandomFromRange(0, TITLES.length)],
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg'], // 1 - 13
    },
    location: {
      x: x,
      y: y
    }
  };
};

var generateAds = function () {
  var ads = [];

  for (var i = 0; i < ADS_COUNT; i++) {
    ads.push(getAd(i));
  }

  return ads;
};

var renderAds = function (ads) {
  var fragment = document.createDocumentFragment();

  ads.forEach(function (ad) {
    var adElement = adTemplate.cloneNode(true);

    adElement.style.left = ad.location.x + 'px';
    adElement.style.top = ad.location.y + 'px';

    var imgElement = adElement.querySelector('img');
    imgElement.src = ad.author.avatar;
    imgElement.alt = ad.title;

    fragment.appendChild(adElement);
  });

  mapPinsElement.appendChild(fragment);
};

var init = function () {
  showMap();
  var ads = generateAds();
  renderAds(ads);
};

init();
