import pymongo #type:ignore
from pymongo.mongo_client import MongoClient #type:ignore
import os

class Mongo:
    username="root"
    password=1234
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
