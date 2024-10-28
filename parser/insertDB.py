import pymongo
import json
from pymongo import MongoClient, InsertOne

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://healthier:iap2025@atlascluster.orvyczc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster")
db = client.healthier
collection = db.programs

with open("database.json") as f:
    data = json.load(f)
    
# Extract the programs list and create separate documents for each program
requesting = [InsertOne(program) for program in data.get("programs", [])]

# Bulk write the separate program documents to the MongoDB collection
result = collection.bulk_write(requesting)

client.close()

