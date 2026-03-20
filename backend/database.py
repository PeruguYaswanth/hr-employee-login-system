from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["user_db"]
db = client["company_db"]


documents_collection= db["documents_collection"]
user_collections=db["user"]
user_collection = db["user_collection"]
emp_collection=db["emp_collection"]

