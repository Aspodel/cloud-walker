import { ObjectId, Document } from 'mongodb';
import clientPromise from './mongodb';

const DataService = <T extends Document>(collectionName: string) => {
  const getCollection = async () => {
    const client = await clientPromise;
    return client.db('CloudWalker_DB').collection(collectionName);
  };

  const get = async () => {
    const collection = await getCollection();
    return collection.find({}).toArray();
  };

  const getById = async (id: string) => {
    const collection = await getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  };

  const getBySlug = async (slug: string) => {
    const collection = await getCollection();
    return collection.findOne({ slug });
  };

  const create = async (data: T) => {
    const collection = await getCollection();
    return collection.insertOne(data);
  };

  const update = async (id: string, data: T) => {
    const collection = await getCollection();
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  };

  const deleteOne = async (id: string) => {
    const collection = await getCollection();
    return collection.deleteOne({ _id: new ObjectId(id) });
  };

  return {
    get,
    getById,
    getBySlug,
    create,
    update,
    deleteOne,
  };
};

export default DataService;
