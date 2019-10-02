'use strict';

var ADS_COUNT = 8;

var TITLES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
];
var TIMES = ['12:00', '13:00', '14:00'];
var GOODS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var HouseTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var mapfiltersElement = document.querySelector('.map__filters-container');
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var showMap = function () {
  mapElement.classList.remove('map--faded');
};

var getRandomFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateFeatures = function () {
  var featuresLength = getRandomFromRange(0, GOODS.length);
  var features = [];

  for (var i = 0; i < featuresLength; i++) {
    var randomFeatureIndex = getRandomFromRange(0, GOODS.length);
    if (features.indexOf(GOODS[randomFeatureIndex]) === -1) {
      features.push(GOODS[randomFeatureIndex]);
    }
  }

  return features;
};

var generatePhotos = function () {
  var photosLength = getRandomFromRange(1, 13);
  var photos = [];

  for (var i = 1; i < photosLength - 1; i++) {
    photos.push('http://o0.github.io/assets/images/tokyo/hotel' + getRandomFromRange(1, 3) + '.jpg');
  }

  return photos;
};

var getAd = function (index) {
  var typeKeys = Object.keys(HouseTypes);
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
      type: typeKeys[getRandomFromRange(0, typeKeys.length)],
      rooms: getRandomFromRange(1, 4),
      guests: getRandomFromRange(1, 4),
      checkin: TIMES[getRandomFromRange(0, TIMES.length)],
      checkout: TIMES[getRandomFromRange(0, TIMES.length)],
      features: generateFeatures(),
      description: TITLES[getRandomFromRange(0, TITLES.length)],
      photos: generatePhotos(),
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

var renderFeatures = function (cardElement, features) {
  var featuresElement = cardElement.querySelector('.popup__features');
  featuresElement.textContent = '';

  features.forEach(function (feature) {
    var liElement = document.createElement('li');
    liElement.classList.add('popup__feature');
    liElement.classList.add('popup__feature--' + feature);
    featuresElement.appendChild(liElement);
  });
};

var renderPhotos = function (cardElement, photos) {
  var photosElement = cardElement.querySelector('.popup__photos');
  var imgElement = photosElement.querySelector('img');
  photosElement.textContent = '';

  photos.forEach(function (photo) {
    var currentImg = imgElement.cloneNode();
    currentImg.src = photo;
    photosElement.appendChild(currentImg);
  });
};

var showCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = HouseTypes[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  renderFeatures(cardElement, card.offer.features);

  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  renderPhotos(cardElement, card.offer.photos);

  mapfiltersElement.insertBefore(cardElement, mapfiltersElement.firstChild);
};

var init = function () {
  showMap();
  var ads = generateAds();
  renderAds(ads);
  showCard(ads[0]);
};

init();
