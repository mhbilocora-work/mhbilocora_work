/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Memory fallback cache in case IndexedDB is restricted in the preview iframe
const memoryCache: Record<string, string> = {};

const KEY_MAP: Record<string, string> = {
  'room-private': 'g-private-mustard',
  'room-companion': 'g-companion-french'
};

function resolveKey(key: string): string {
  return KEY_MAP[key] || key;
}

export function compressImage(file: File, maxWidth = 1200, maxHeight = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Use jpeg with 0.85 quality for good file size & pristine visual clarity
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(event.target?.result as string);
      };
    };
    reader.onerror = (err) => reject(err);
  });
}

export function initDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }

    try {
      const request = window.indexedDB.open('DukeCarePhotoDb', 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'itemId' });
        }
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = () => {
        // Fall back gracefully
        resolve(null);
      };
    } catch (e) {
      resolve(null);
    }
  });
}

export function getImage(itemId: string): Promise<string | null> {
  const resolvedId = resolveKey(itemId);
  return new Promise((resolve) => {
    // Check memory cache first
    if (memoryCache[resolvedId]) {
      resolve(memoryCache[resolvedId]);
      return;
    }

    // Try reading from localStorage first as a secondary backup
    try {
      const lsVal = localStorage.getItem(`dukecare_img_${resolvedId}`);
      if (lsVal) {
        memoryCache[resolvedId] = lsVal;
        resolve(lsVal);
        return;
      }
    } catch (e) {
      // ignore
    }

    initDb().then((db) => {
      if (!db) {
        resolve(null);
        return;
      }

      try {
        const transaction = db.transaction('images', 'readonly');
        const store = transaction.objectStore('images');
        const request = store.get(resolvedId);

        request.onsuccess = () => {
          if (request.result && request.result.dataUrl) {
            memoryCache[resolvedId] = request.result.dataUrl;
            resolve(request.result.dataUrl);
          } else {
            resolve(null);
          }
        };

        request.onerror = () => {
          resolve(null);
        };
      } catch (e) {
        resolve(null);
      }
    });
  });
}

export function saveImage(itemId: string, dataUrl: string): Promise<void> {
  const resolvedId = resolveKey(itemId);
  return new Promise((resolve) => {
    memoryCache[resolvedId] = dataUrl;

    // Try saving to localStorage for instant lookup, but wrap in try-catch in case of quota exceed
    try {
      localStorage.setItem(`dukecare_img_${resolvedId}`, dataUrl);
    } catch (e) {
      // ignore (often happens if image is > 5MB)
    }

    initDb().then((db) => {
      if (!db) {
        resolve();
        return;
      }

      try {
        const transaction = db.transaction('images', 'readwrite');
        const store = transaction.objectStore('images');
        const request = store.put({ itemId: resolvedId, dataUrl });

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          resolve();
        };
      } catch (e) {
        resolve();
      }
    });
  });
}

export function deleteImage(itemId: string): Promise<void> {
  const resolvedId = resolveKey(itemId);
  return new Promise((resolve) => {
    delete memoryCache[resolvedId];
    try {
      localStorage.removeItem(`dukecare_img_${resolvedId}`);
    } catch (e) {
      // ignore
    }

    initDb().then((db) => {
      if (!db) {
        resolve();
        return;
      }

      try {
        const transaction = db.transaction('images', 'readwrite');
        const store = transaction.objectStore('images');
        const request = store.delete(resolvedId);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          resolve();
        };
      } catch (e) {
        resolve();
      }
    });
  });
}


export function clearAllImages(): Promise<void> {
  return new Promise((resolve) => {
    Object.keys(memoryCache).forEach(k => delete memoryCache[k]);
    
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('dukecare_img_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (e) {
      // ignore
    }

    initDb().then((db) => {
      if (!db) {
        resolve();
        return;
      }

      try {
        const transaction = db.transaction('images', 'readwrite');
        const store = transaction.objectStore('images');
        const request = store.clear();

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          resolve();
        };
      } catch (e) {
        resolve();
      }
    });
  });
}
