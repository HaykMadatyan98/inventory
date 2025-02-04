export function saveToLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
}
