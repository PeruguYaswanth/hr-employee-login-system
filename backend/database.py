import os
from pymongo import MongoClient

MONGODB_URL = os.environ.get("MONGODB_URL")
client = MongoClient(MONGODB_URL)

db = client["hr_management"]

user_collection = db["users"]
emp_collection = db["employees"]
user_collections = db["profiles"]
documents_collection = db["documents"]