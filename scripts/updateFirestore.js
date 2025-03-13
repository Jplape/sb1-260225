// scripts/updateFirestore.js
import admin from 'firebase-admin';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get current module path
const __dirname = dirname(fileURLToPath(import.meta.url));

// Verify arguments
const [issueNumber, issueTitle, issueStatus] = process.argv.slice(2);
if (!issueNumber || !issueTitle || !issueStatus) {
  console.error('Usage: node updateFirestore.js <issueNumber> <issueTitle> <issueStatus>');
  process.exit(1);
}

// Load credentials from file
const credentialsPath = join(__dirname, '../firebase-admin.json');
if (!fs.existsSync(credentialsPath)) {
  console.error('Firebase credentials file not found at:', credentialsPath);
  process.exit(1);
}
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://planning-software-46048.firebaseio.com',
    projectId: 'planning-software-46048',
    storageBucket: 'planning-software-46048.appspot.com',
    locationId: 'europe-west1'
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Failed to initialize Firebase Admin:', error);
  process.exit(1);
}

const path = require('path');

try {
  const serviceAccountPath = path.resolve(__dirname, 'firebase-adminsdk.json');
  console.log('Loading service account from:', serviceAccountPath);

  const firestoreSettings = {
    projectId: 'planning-software-46048',
    keyFilename: serviceAccountPath,
    databaseId: '(default)',
    servicePath: 'firestore.googleapis.com',
    apiEndpoint: 'europe-west1-firestore.googleapis.com'
  };

  const app = admin.initializeApp({
    credential: admin.credential.cert(firestoreSettings),
    databaseURL: `https://${firestoreSettings.projectId}.firebaseio.com`,
    storageBucket: 'planning-software-46048.appspot.com',
    locationId: 'europe-west1'
  });

  const db = app.firestore();
  db.settings({
    timestampsInSnapshots: true,
    ignoreUndefinedProperties: true,
    host: 'europe-west1-firestore.googleapis.com',
    ssl: true
  });

  console.log('Firestore initialized successfully');
} catch (error) {
  console.error('Firestore initialization failed:', {
    message: error.message,
    stack: error.stack,
    code: error.code,
    details: error.details
  });
  process.exit(1);
}

async function updateFirestore() {
  const status = issueStatus === 'closed' ? 'Terminé' : 'En cours';
  
  try {
    // Verify Firestore connection
    const collections = await db.listCollections();
    if (!collections.some(col => col.id === 'projectProgress')) {
      console.error('Collection "projectProgress" does not exist in Firestore');
      process.exit(1);
    }

    await db.collection('projectProgress').doc(issueNumber).set({
      id: issueNumber,
      title: issueTitle,
      status: status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`✅ Issue #${issueNumber} successfully synchronized with Firestore.`);
  } catch (error) {
    console.error('Firestore error:', error);
    console.log('Please verify:');
    console.log('1. Firestore database exists in your Firebase project');
    console.log('2. "projectProgress" collection exists');
    console.log('3. Firebase Admin credentials are correct');
    process.exit(1);
  }
}

// Lancer la fonction et gérer les erreurs
updateFirestore().catch(console.error);
