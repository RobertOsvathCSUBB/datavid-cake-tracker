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

export const getSortedMembersByClosestBirthday = (members) => {
    const sortedMembers = [...members].sort((a, b) => {
        const today = new Date();
        const aBirthDate = new Date(a.BirthDate);
        const bBirthDate = new Date(b.BirthDate);

        // In order to compare the dates, we need to set the year of the birth date to the current year
        // If the birth date has already passed this year, we set it to the next year
        if (today.getMonth() > aBirthDate.getMonth()) {
            aBirthDate.setFullYear(today.getFullYear() + 1);
        }
        else if (today.getMonth() === aBirthDate.getMonth() && today.getDate() > aBirthDate.getDate()) {
            aBirthDate.setFullYear(today.getFullYear() + 1);
        }
        else {
            aBirthDate.setFullYear(today.getFullYear());
        }

        // Same for the other member
        if (today.getMonth() > bBirthDate.getMonth()) {
            bBirthDate.setFullYear(today.getFullYear() + 1);
        }
        else if (today.getMonth() === bBirthDate.getMonth() && today.getDate() > bBirthDate.getDate()) {
            bBirthDate.setFullYear(today.getFullYear() + 1);
        }
        else {
            bBirthDate.setFullYear(today.getFullYear());
        }

        const aDiff = aBirthDate - today;
        const bDiff = bBirthDate - today;
        return aDiff - bDiff;
    });
    return sortedMembers;
};