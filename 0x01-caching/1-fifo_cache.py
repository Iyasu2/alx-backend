#!/usr/bin/env python3
'''
this is a module
'''
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache inherits from BaseCaching
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
            if key not in self.cache_data:
                self.keys.append(key)
            self.cache_data[key] = item
            if len(self.keys) > BaseCaching.MAX_ITEMS:
                discarded_key = self.keys.pop(0)
                del self.cache_data[discarded_key]
                print(f"DISCARD: {discarded_key}")

    def get(self, key):
        """ Return the value in self.cache_data linked to key
        """
        return self.cache_data.get(key) if key is not None else None
