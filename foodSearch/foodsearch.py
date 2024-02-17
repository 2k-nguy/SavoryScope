#in order to store results
import json
#in order to get coordinates
import geopy

apiKey = "&key=INSERT_API_KEY"

#to be reworked into using buttons soon enough
keyword = input("Resturant Type").lower
#to be used in a range of 10ish dollars
optimalprice = input("Preferred price (more than zero)").lower

radius = input("Optimal radius from you")

deliver = input("Looking for tasty treat to your location?")

#to add: response -> json -> list of viable resturants