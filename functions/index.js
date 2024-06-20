const {setGlobalOptions} = require("firebase-functions/v2");
setGlobalOptions({maxInstances: 10});

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

const app = initializeApp();

exports.checkIfFieldsExist = onDocumentCreated("Members/{id}",
    async (snapshot) => {
  const data = snapshot.data();
  if (!data.FirstName || !data.LastName ||
    !data.BirthDate || !data.Country || !data.City) {
    throw new Error("One or more required fields are missing.");
  }
  return null;
});

exports.validateUniqueConstraint = onDocumentCreated("Members/{id}",
     async (snapshot) => {
  const data = snapshot.data();
  const membersCollectionRef = getFirestore(app).collection("Members");
  const querySnapshot = await membersCollectionRef
    .where("FirstName", "==", data.FirstName)
    .where("LastName", "==", data.LastName)
    .where("Country", "==", data.Country)
    .where("City", "==", data.City)
    .get();
  if (!querySnapshot.empty) {
    throw new Error("Member already exists.");
  }
  return null;
});

exports.validateAgeConstraint = onDocumentCreated("Members/{id}",
     async (snapshot) => {
  const data = snapshot.data();
  const birthDate = new Date(data.BirthDate);
  const today = new Date();
  const yearDifference = today.getFullYear() - birthDate.getFullYear();
  if (yearDifference < 18) {
    throw new Error("Member must be at least 18 years old.");
  }
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0) {
    throw new Error("Member must be at least 18 years old.");
  }
  if (monthDifference === 0) {
    const dayDifference = today.getDate() - birthDate.getDate();
    if (dayDifference < 0) {
      throw new Error("Member must be at least 18 years old.");
    }
  }
  return null;
});