from pymongo import MongoClient

client = MongoClient("mongodb+srv://peruguyaswanth910_db_user:Yaswanth@cluster0.8sbtiqx.mongodb.net/?appName=Cluster0")

db = client["hr_management"]

user_collection = db["users"]
emp_collection = db["employees"]
user_collections = db["profiles"]
documents_collection = db["documents"]