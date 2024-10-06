const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/firebase/credentials.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Endpoint to fetch professor ratings
app.get('/api/professors/:name', async (req, res) => {
  const professorName = req.params.name;
  
  try {
    const professorRef = db.collection('professors').doc(professorName);
    const doc = await professorRef.get();
    
    if (!doc.exists) {
      return res.status(404).send('Professor not found');
    }
    
    res.send(doc.data());
  } catch (error) {
    console.error('Error fetching professor data: ', error);
    res.status(500).send('Error fetching data');
  }
});

// Endpoint to submit a rating for a professor
app.post('/api/professors', async (req, res) => {
  const { name, rating, feedback } = req.body;
  
  try {
    const professorRef = db.collection('professors').doc(name);
    await professorRef.set({
      ratings: admin.firestore.FieldValue.arrayUnion({ rating, feedback }),
    }, { merge: true });

    res.send('Rating submitted successfully');
  } catch (error) {
    console.error('Error submitting rating: ', error);
    res.status(500).send('Error submitting rating');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
