# -*- coding: utf-8 -*-
"""
Created on Thu Apr  2 14:20:30 2020
@author: ethan.beaman
"""

from geopy.geocoders import GoogleV3
from geopy.extra.rate_limiter import RateLimiter
import os
import pandas


def geocode(addrs, doLog=False):
    geolocator = GoogleV3(api_key='AIzaSyAPXkMfUe9cobQ86mNNwRjPVUKgE_BENaw')
    def printDotGeocode(s):
        print('.', end='', flush=True)
        return geolocator.geocode(s)
    if doLog:
        geocode = RateLimiter(printDotGeocode, min_delay_seconds=0.005)
    else:
        geocode = RateLimiter(geolocator.geocode, min_delay_seconds=0.005)
    locs = addrs.apply(geocode)
    points = [(l.latitude, l.longitude) if l else (None, None) for l in locs]
    return points

def testGeocode():
    print("Using API Key: {0}".format(os.environ['GOOGLE_GEOCODE_API_KEY']))
    df = pandas.DataFrame(["1600 Pennsylvania Ave, Washington DC"])
    print(df)
    print(geocode(df))
    
def individualGeocode(item):
    geolocator = GoogleV3(api_key='AIzaSyAPXkMfUe9cobQ86mNNwRjPVUKgE_BENaw')
    a = geolocator.geocode(item, exactly_one = True, timeout = 60)
    final = (a.latitude, a.longitude) if a else (None, None)
    return final

if __name__ == '__main__':
    testGeocode()
