import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import AddModal from "../components/AddModal";
import { 
checkIfFieldsExist,
validateUniqueConstraint,
validateAgeConstraint,
getSortedMembersByClosestBirthday } 
from "../utils/utils";

const Home = () => {
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const membersCollectionRef = collection(db, "Members");

    const fetchMembers = async () => {
        try {
            const data = await getDocs(membersCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filteredData);
            setMembers(filteredData);
        }
        catch (err) {
            console.log(err);
            window.alert("Error fetching members!");
        }
    };

    useEffect(() => {  
        fetchMembers();
    }, []);

    const handleAddMember = async (newMember) => {
        try {
            checkIfFieldsExist(newMember);
            await validateUniqueConstraint(newMember);
            validateAgeConstraint(newMember);
            await addDoc(membersCollectionRef, newMember);
            fetchMembers();
        }
        catch (err) {
            console.log(err);
            window.alert("Error adding member!");
        }
        setShowModal(false);
    };

    const handleDeleteMember = async (id) => {
        try {
            const memberDoc = doc(db, "Members", id);
            console.log(memberDoc);
            await deleteDoc(memberDoc);
            fetchMembers();
        }
        catch (err) {
            console.log(err);
            window.alert("Error deleting member!");
        }
    };

    const sortMembersByClosestBirthday = () => {
        setMembers(getSortedMembersByClosestBirthday(members));
    };

    return (
        <main className="min-h-screen">
        <h1 className="text-4xl font-bold text-center py-5">Members</h1>
        <div className="flex justify-center items-center gap-4">
            <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5">Add new member</button>
            <button onClick={sortMembersByClosestBirthday} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5">Sort by closest birthday</button>
        </div>
        <div class="w-full gap-4 flex-wrap flex justify-center items-center">
            {members.map((member) => (
                <div key={member.id} className="bg-white p-4 shadow-md rounded-md">
                    <div>
                        <h2 className="text-xl mb-4 font-bold">{member.FirstName + ' ' + member.LastName}</h2>
                        <p className="text-sm mb-4 text-gray-500">Birth Date: {member.BirthDate}</p>
                        <p className="text-sm mb-4 text-gray-500">Country: {member.Country}</p>
                        <p className="text-sm mb-4 text-gray-500">City: {member.City}</p>
                        <button onClick={() => handleDeleteMember(member.id)} className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                    </div>
                </div>
            ))}
        </div>
        <AddModal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)}
            title='Add new member'
            onSubmit={handleAddMember}
        />
        </main>
    );
};

export default Home;