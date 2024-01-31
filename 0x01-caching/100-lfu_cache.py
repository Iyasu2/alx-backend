#!/usr/bin/env python3
'''
this is a module
'''
from base_caching import BaseCaching
from collections import Counter


class LFUCache(BaseCaching):
    """ LFUCache inherits from BaseCaching
    """
    def __init__(self):
        """ Initialize
        """
        super().__init__()
        self.keys = []
        self.counter = Counter()

    def put(self, key, item):
        """ Assign to the dictionary self.cache_data
        the item value for the key key
        """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.keys.remove(key)
            self.cache_data[key] = item
            self.counter[key] += 1
            self.keys.append(key)
            if len(self.keys) > BaseCaching.MAX_ITEMS:
                least_freq = min(self.counter.values())
                candidates = [k for k, v in self.counter.items() if v == least_freq]
                if len(candidates) > 1:
                    # If there is more than one candidate, use LRU
                    for k in self.keys:
                        if k in candidates:
                            discarded_key = k
                            break
                else:
                    discarded_key = candidates[0]
                self.keys.remove(discarded_key)
                del self.cache_data[discarded_key]
                del self.counter[discarded_key]
                print(f"DISCARD: {discarded_key}")

    def get(self, key):
        """ Return the value in self.cache_data linked to key
        """
        if key is not None and key in self.cache_data:
            self.counter[key] += 1
            self.keys.remove(key)
            self.keys.append(key)
            return self.cache_data.get(key)
        return None
