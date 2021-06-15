const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

describe("Unit test for User:", () => {
  const uri = `mongodb+srv://arif:MhkBmlmdT5cmLVMG@seteltest.omgpl.mongodb.net/setel-mart?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let connection;
  let db;

  beforeAll(async () => {
    connection = await client.connect();
    db = await connection.db("setel-mart");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Test create user", async () => {
    const users = db.collection("users");
    const id = mongoose.Types.ObjectId();
    const mockUser = {
      _id: id,
      name: "John",
      email: "john@doe.com",
      password: "12345678",
      phoneNumber: "0987654321",
      created_at: Date.now(),
      updated_at: Date.now(),
      _v: 0,
    };

    await users.insertOne(mockUser);
    const insertedUser = await users.findOne({ _id: id });
    expect(insertedUser).toEqual(mockUser);
  });
});
