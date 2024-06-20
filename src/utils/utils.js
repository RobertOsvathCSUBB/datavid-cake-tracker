import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const checkIfFieldsExist = (member) => {
    if (!member.FirstName || !member.LastName ||
        !member.BirthDate || !member.Country || !member.City) {
        throw new Error("One or more required fields are missing.");
    }
    return null;
};

export const validateUniqueConstraint = async (member) => {
    const membersCollectionRef = collection(db, "Members");
    const data = await getDocs(membersCollectionRef);
    const filteredData = data.docs.map((doc) => doc.data());
    const isDuplicate = filteredData.some((data) => {
        return data.FirstName === member.FirstName &&
            data.LastName === member.LastName &&
            data.BirthDate === member.BirthDate;
    });
    if (isDuplicate) {
        throw new Error("Member already exists.");
    }
    return null;
};

export const validateAgeConstraint = (member) => {
    const birthDate = new Date(member.BirthDate);
    const today = new Date();
    const yearDifference = today.getFullYear() - birthDate.getFullYear();
    if (yearDifference < 18) {
        throw new Error("Member must be at least 18 years old.");
    }
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference > 0) {
        throw new Error("Member must be at least 18 years old.");
    }
    if (monthDifference === 0) {
        const dayDifference = today.getDate() - birthDate.getDate();
        if (dayDifference < 0) {
            throw new Error("Member must be at least 18 years old.");
        }
    }
    return null;
};