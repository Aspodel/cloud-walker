import { ObjectId, Document } from 'mongodb';
import clientPromise from './mongodb';

const DataService = <T extends Document>(collectionName: string) => {
  const getCollection = async () => {
    const client = await clientPromise;
    return client.db('CloudWalker_DB').collection(collectionName);
  };

  const get = async (): Promise<T[]> => {
    const collection = await getCollection();
    const data = await collection.find({}).toArray();
    return data.map(item => item as unknown as T);
  };

  const getById = async (id: string): Promise<T | null> => {
    const collection = await getCollection();
    const data = await collection.findOne({ _id: new ObjectId(id) });
    return data ? (data as unknown as T) : null;
  };

  const getBySlug = async (slug: string): Promise<T | null> => {
    const collection = await getCollection();
    const data = await collection.findOne({ slug });
    return data ? (data as unknown as T) : null;
  };

  const create = async (data: T): Promise<void> => {
    const collection = await getCollection();
    await collection.insertOne(data);
  };

  const update = async (id: string, data: T): Promise<void> => {
    const collection = await getCollection();
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  };

  const deleteOne = async (id: string): Promise<void> => {
    const collection = await getCollection();
    await collection.deleteOne({ _id: new ObjectId(id) });
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
