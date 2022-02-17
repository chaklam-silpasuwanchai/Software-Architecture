from fastapi import FastAPI

from mongo_connector import Mongo

app = FastAPI()


@app.get("/")
def read_root():
    data = Mongo.get_instance()['my-db']['my-collection'].find_one({"name":"counter"},{'_id':0})
    return data

@app.get("/count")
def add_count():
    data = Mongo.get_instance()['my-db']['my-collection'].update_one({"name":"counter"},{"$inc":{"value":1}})
    return {"result":data.modified_count}

def init_obj():
    data = [ d for d in Mongo.get_instance()['my-db']['my-collection'].find({"name":"counter"})]
    if(not data):
        new_data = {
            "name":"counter",
            "value": 0
        }
        Mongo.get_instance()['my-db']['my-collection'].insert_one(new_data)
init_obj()
