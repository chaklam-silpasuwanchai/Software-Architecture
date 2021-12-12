import pymongo #type:ignore
from pymongo.mongo_client import MongoClient #type:ignore
import os

def read_mongo_user()->str:
    with open("/run/secrets/mongo_user") as read_file:
        return read_file.read()

def read_mongo_password()->str:
    with open("/run/secrets/mongo_password") as read_file:
        return read_file.read()

class Mongo:
    username=read_mongo_user()
    password=read_mongo_password()
    hostname="mongo"
    uri=f"mongodb://{username}:{password}@{hostname}:27017"
    client:MongoClient
    @staticmethod
    def init():
        if('MONGO_STRING_OPTIONS' in os.environ):
            Mongo.uri+=os.environ['MONGO_STRING_OPTIONS']
        temp=pymongo.MongoClient(Mongo.uri)
        Mongo.client=temp

    @staticmethod
    def get_instance():
        if not hasattr(Mongo,'client'):
            Mongo.init()

        return Mongo.client