import googlemaps
from datetime import datetime


def directions(jsonRequest):

    gmaps = googlemaps.Client(key='AIzaSyDCLwOaPymlOIpbOZcVZLzhqLZVHxaIbf8')

    now = datetime.now()
    direction_result = gmaps.directions(origin={"lat":52.2288242, "lng":21.0130819},
                                        destination={"lat": 52.2285690, "lng": 21.0155288},
                                        mode="driving",
                                        departure_time=now)

    numberOfPlaces = len(direction_result[0]['legs'][0]['steps'])
    tabPlaces = []
    for x in range(numberOfPlaces):
        place = gmaps.places('restaurant', location=direction_result[0]['legs'][0]['steps'][x]['start_location'],
                             radius=100, region='PL', language='pl-PL',
                             min_price=1, max_price=4, open_now=True)
        tabPlaces.append(place)

    return (direction_result, tabPlaces)
