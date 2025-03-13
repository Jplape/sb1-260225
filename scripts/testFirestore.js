// 1️⃣ Importer Firebase Admin SDK
const admin = require("firebase-admin");

// 2️⃣ Charger le fichier firebase-admin.json
const serviceAccount = require("./firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)  // Authentification avec le compte de service
});

// 3️⃣ Tester l'accès à Firestore
const db = admin.firestore();

async function testFirestore() {
  try {
    // Essayer de récupérer un document dans une collection "test"
    const snapshot = await db.collection("test").get();

    // Vérifier si des documents existent
    if (snapshot.empty) {
      console.log("✅ Connexion réussie, mais la collection 'test' est vide.");
    } else {
      console.log("✅ Connexion réussie, Firestore est accessible !");
    }
  } catch (error) {
    console.error("❌ Erreur de connexion à Firestore :", error);
  }
}

// 4️⃣ Exécuter le test
testFirestore();
