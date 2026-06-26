from database import user_collection
from database import documents_collection
from database import user_collections
from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
from database import emp_collection
from bson import ObjectId
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()

class Userdata(BaseModel):
    Firstname:str
    Lastname:str
    Email:str
    password:str
    confirmpassword:str
    phoneNumber:str
class usercomparision(BaseModel):
    password:str
    identifier:str
class empdata(BaseModel):
    empfirstname:str
    emplastname:str
    empphonenumber:str
    empemail:str
    emppassword:str
class forgotdata(BaseModel):
    forgotpass:str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/data')
def inserting_data(user:Userdata):
    if(len(user.phoneNumber)!=10):
        raise HTTPException(status_code=400,detail='phone number invalid ')
    if(user.password!=user.confirmpassword):
        raise HTTPException(status_code=400 ,detail="password does not match")
    result=user_collection.insert_one(user.dict())

    return{
        "id":str(result.inserted_id)
    }
# JWT authentication for HR login and session management
@app.post("/comparision")
def comparision_data(data: usercomparision):

    user = None
    emp = None

    if data.identifier.isdigit():
        user = user_collection.find_one({"phoneNumber": data.identifier})
        emp = emp_collection.find_one({"empphonenumber": data.identifier})
    else:
        user = user_collection.find_one({"Email": data.identifier})
        emp = emp_collection.find_one({"empemail": data.identifier})

    if user and user["password"] == data.password:
        return {
            "message": "Logged in HR successfully",
            "userId": str(user["_id"])
        }

    if emp and emp["emppassword"] == data.password:
        return {
            "message": "Logged in employee successfully",
            "emp_id": str(emp["_id"])
        }
    raise HTTPException(status_code=400, detail="Invalid credentials")



@app.get('/users')
def getting_data():
    user=list(
        emp_collection.find(
            {},
            {
                "_id":0,
                "empfirstname":1,
                "emplastname":1,
                "empphonenumber":1,
                "identifier":1,

            }
    )
    )
    return{"user":user}

class UserProfile(BaseModel):
    firstname: str
    lastname: str
    mobile: str
    email: str
    domain: str


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    try:

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        doc = {
            "filename": file.filename,
            "content_type": file.content_type,
            "filepath": file_path
        }
        inserted = documents_collection.insert_one(doc)

        return {
            "message": "Document uploaded successfully",
            "document_id": str(inserted.inserted_id),
            "filename": file.filename
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading document: {e}")

@app.get("/documents")
async def get_documents():
    docs = []
    for doc in documents_collection.find():
        if "filename" not in doc:
            continue 

        docs.append({
            "id": str(doc["_id"]),
            "filename": doc.get("filename"),
            "content_type": doc.get("content_type"),
            "filepath": doc.get("filepath")
        })
    return docs

@app.get("/documents/{doc_id}")
async def view_document(doc_id: str):
    doc = documents_collection.find_one({"_id": ObjectId(doc_id)})

    if not doc:
        return {"error": "Document not found"}

    file_path = doc["filepath"]

    if not os.path.exists(file_path):
        return {"error": "File missing on server"}

    return FileResponse(
        path=file_path,
        filename=doc["filename"],
        media_type=doc["content_type"]
    )

# Employee CRUD endpoints - create, read, update, delete
@app.post("/submit-profile")
def submit_profile(profile: UserProfile):
    result = user_collections.insert_one(profile.dict())

    return {
        "message": "Profile stored successfully",
        "id": str(result.inserted_id)
    }
@app.get("/view-profile")
def view_profile():
    data = []
    for item in user_collections.find():
        data.append({
            "id": str(item["_id"]),
            "firstname": item.get("firstname"),
            "lastname": item.get("lastname"),
            "mobile": item.get("mobile"),
            "email": item.get("email"),
            "domain": item.get("domain")
        })

    return data

@app.post("/submitting")
def submitting_emp(submit:empdata):
    result=emp_collection.insert_one(submit.dict())
    return{
        "message":"succesfully stored",
        "id":str(result.inserted_id)
    }

@app.post("/comparisionpass")
def getting_pass(passdata: forgotdata):

    if passdata.forgotpass.isdigit():
        user = user_collection.find_one(
            {"phoneNumber": passdata.forgotpass},
            {"_id": 0, "password": 1}
        )
        emp = emp_collection.find_one(
            {"empphonenumber": passdata.forgotpass},
            {"_id": 0, "emppassword": 1}
        )
    else:
        user = user_collection.find_one(
            {"Email": passdata.forgotpass},
            {"_id": 0, "password": 1}
        )
        emp = emp_collection.find_one(
            {"empemail": passdata.forgotpass},
            {"_id": 0, "emppassword": 1}
        )

    if user:
        return {
            "password": user["password"]
        }

    if emp:
        return {
            "password": emp["emppassword"]
        }

    raise HTTPException(status_code=404, detail="Account not found")
