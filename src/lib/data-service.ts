import { ObjectId, Document } from 'mongodb';
import clientPromise from './mongodb';

const DataService = <T extends Document>(collectionName: string) => {
  const getCollection = async () => {
    const client = await clientPromise;
    return client.db('CloudWalker_DB').collection(collectionName);
  };

  const get = async () => {
    const collection = await getCollection();
    const data = await collection.find({}).toArray();
    return data.map((item) => {
      const mappedItem: T = { ...item } as unknown as T;
      return mappedItem;
    });
  };

  const getById = async (id: string) => {
    const collection = await getCollection();
    const data = await collection.findOne({ _id: new ObjectId(id) });
    const mappedData: T = { ...data } as unknown as T;
    return mappedData;
  };

  const getBySlug = async (slug: string) => {
    const collection = await getCollection();
    const data = await collection.findOne({ slug });
    const mappedData: T = { ...data } as unknown as T;
    return mappedData;
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
