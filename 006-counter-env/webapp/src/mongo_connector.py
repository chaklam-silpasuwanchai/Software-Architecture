import pymongo #type:ignore
from pymongo.mongo_client import MongoClient #type:ignore
import os



class Mongo:
    username=os.environ['MONGO_INITDB_ROOT_USERNAME']
    password=os.environ['MONGO_INITDB_ROOT_PASSWORD']
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