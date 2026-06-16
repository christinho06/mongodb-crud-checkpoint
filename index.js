const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('contact');
    const collection = db.collection('contactlist');

    // ── INSERT ──────────────────────────────────────────────────────────
    await collection.insertMany([
      { lastName: 'Ben',    firstName: 'Moris',  email: 'ben@gmail.com',    age: 26 },
      { lastName: 'Kefi',   firstName: 'Seif',   email: 'kefi@gmail.com',   age: 15 },
      { lastName: 'Emilie', firstName: 'Nora',   email: 'emilie@gmail.com', age: 22 },
      { lastName: 'Smith',  firstName: 'John',   email: 'john@gmail.com',   age: 32 },
    ]);
    console.log('Documents inserted');

    // ── READ ─────────────────────────────────────────────────────────────
    const allContacts = await collection.find({}).toArray();
    console.log('All contacts:', allContacts);

    // Find contacts older than 18
    const adults = await collection.find({ age: { $gt: 18 } }).toArray();
    console.log('Adults (age > 18):', adults);

    // ── UPDATE ───────────────────────────────────────────────────────────
    await collection.updateOne(
      { lastName: 'Ben' },
      { $set: { email: 'ben_updated@gmail.com', age: 27 } }
    );
    console.log('Ben updated');

    // ── DELETE ───────────────────────────────────────────────────────────
    await collection.deleteOne({ lastName: 'Kefi' });
    console.log('Kefi deleted');

    // ── FINAL STATE ──────────────────────────────────────────────────────
    const final = await collection.find({}).toArray();
    console.log('Final contactlist:', final);

  } finally {
    await client.close();
  }
}

run().catch(console.error);
