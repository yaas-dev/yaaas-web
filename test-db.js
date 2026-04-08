const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const db = mongoose.connection;
    db.collection('artworks').find({}).toArray().then(docs => {
      console.log(docs);
      process.exit(0);
    });
  })
  .catch(console.error);
