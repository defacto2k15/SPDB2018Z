import googlemaps
from datetime import datetime
import ast

def directions(jsonRequest):

    gmaps = googlemaps.Client(key='AIzaSyDCLwOaPymlOIpbOZcVZLzhqLZVHxaIbf8')

    now = datetime.now()
    direction_result = gmaps.directions(origin=ast.literal_eval(jsonRequest['startPosition']),
                                        destination=ast.literal_eval(jsonRequest['endPosition']),
                                        mode=jsonRequest['travelMode'],
                                        departure_time=now)

    numberOfPlaces = len(direction_result[0]['legs'][0]['steps'])
    tabPlaces = []
    for x in range(numberOfPlaces):
        place = gmaps.places(jsonRequest['pointsOfInterestKeyword'],
                             location=direction_result[0]['legs'][0]['steps'][x]['start_location'],
                             radius=100, region='PL', language='pl-PL', min_price=1, max_price=4, open_now=True)
        for y in range(len(place['results'])):
            tabPlaces.append(place['results'][y]['place_id'])

    tabPlaces = list(set(tabPlaces))

    return {'routes': direction_result, 'place_id': tabPlaces}
