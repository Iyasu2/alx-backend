#!/usr/bin/env python3
'''
this is a module
'''
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache inherits from BaseCaching
    """
    def __init__(self):
        """ Initialize
        """
        super().__init__()
        self.keys = []

    def put(self, key, item):
        """ Assign to the dictionary self.cache_data
        the item value for the key key
        """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.keys.remove(key)
            self.cache_data[key] = item
            self.keys.append(key)
            if len(self.keys) > BaseCaching.MAX_ITEMS:
                discarded_key = self.keys.pop()
                del self.cache_data[discarded_key]
                print(f"DISCARD: {discarded_key}")

    def get(self, key):
        """ Return the value in self.cache_data linked to key
        """
        if key is not None and key in self.cache_data:
            value = self.cache_data.get(key)
            self.keys.remove(key)
            self.keys.append(key)
            return value
        return None
