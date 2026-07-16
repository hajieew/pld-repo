// 1. Returns clean data (valid === true and positive fare)
export function cleanTrips(trips) {
  return trips.filter(trip => trip.valid === true && trip.fare > 0);
}

// 2. Calculates total revenue of cleaned trips
export function totalRevenue(trips) {
  return trips.reduce((sum, trip) => sum + trip.fare, 0);
}

// 3. Collects unique passengers into a Set and checks the blacklist
export function uniquePassengers(trips) {
  return new Set(trips.map(trip => trip.cardId));
}

// 2. Calculates total revenue of cleaned trips
export function isBlocked(cardId, blacklist) {
  return new Set(blacklist).has(cardId);
}

// 4. Revenue distribution by stations
export function revenueByStation(trips) {
  return trips.reduce((map, trip) => {
    map.set(trip.station, (map.get(trip.station) || 0) + trip.fare);
    return map;
  }, new Map());
}

// 5. WeakMap to store device status (prevents memory leaks)
export function createDeviceCache() {
  const cache = new WeakMap();
  return {
    remember: (device, status) => cache.set(device, status),
    recall: (device) => cache.get(device),
    knows: (device) => cache.has(device)
  };
}

// 6. Registers processed trips
export function createProcessedRegistry() {
  const registry = new WeakSet();
  return {
    markProcessed: (trip) => registry.add(trip),
    isProcessed: (trip) => registry.has(trip)
  };
}

// 7. Decoding binary packets
export function decodeCounter(packet) {
  const total = packet.reduce((acc, count) => acc + count, 0);
  const busiestMinute = packet.indexOf(Math.max(...packet));
  const activeMinutes = packet.filter(count => count > 0).length;
  return { total, busiestMinute, activeMinutes };
}

export function packCounter(numbers) {
  return new Uint8Array(numbers);
}
