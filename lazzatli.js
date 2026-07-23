0)function confirmOrder(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderId > 0) {
        resolve({ id: orderId, status: 'confirmed' });
      } else {
        reject(new Error('Invalid order number'));
      }
    }, 1500);
  });
}

export default confirmOrder;


1)import confirmOrder from './0-confirm_order.js';

function handleOperation(orderId) {
  return confirmOrder(orderId)
    .then((data) => console.log(`Order ${data.id} accepted`))
    .catch((err) => console.log(`An error occurred: ${err.message}`))
    .finally(() => console.log('Operation finished.'));
}

export default handleOperation;

2)// --- copy to the top of your file ---
export function getMenuFromRestaurant(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} menu is ready`);
    }, 1000);
  });
}

function loadAllMenus() {
  return Promise.all([
    getMenuFromRestaurant('Firuza'),
    getMenuFromRestaurant('Shirvanshah'),
    getMenuFromRestaurant('Khazar'),
  ])
    .catch((err) => console.log(`Menus failed to load: ${err.message}`));
}

export default loadAllMenus;

3)// --- copy to the top of your file ---
export function checkRestaurant(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === 'Nargiz') reject(new Error(`${name} is closed`));
      else resolve(`${name} is open`);
    }, 800);
  });
}

function openRestaurants() {
  return Promise.allSettled([
    checkRestaurant('Firuza'),
    checkRestaurant('Nargiz'),
    checkRestaurant('Khazar'),
  ]).then((results) => results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => r.value));
}

export default openRestaurants;

4)// --- copy to the top of your file ---
export function driver(name, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(name), ms);
  });
}

function fastestDriver() {
  return Promise.race([
    driver('Aydin', 1200),
    driver('Kamran', 600),
    driver('Elvin', 900),
  ]);
}

export default fastestDriver;

5)const cache = { home: 'Nizami St. 10', work: '28 May St. 5' };

function readFromCache(key) {
  if (key in cache) {
    return Promise.resolve(cache[key]);
  }
  return Promise.reject(new Error('Address not found in cache'));
}

export default readFromCache;

6)function validateAddress(address) {
  if (typeof address !== 'string' || address.length === 0) {
    throw new Error('Address cannot be empty');
  }
  if (address.length < 10) {
    throw new Error('Address is too short');
  }
  return `Delivery address: ${address}`;
}

export default validateAddress;
