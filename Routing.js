import { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Post from "./Post";
import DisplayPost from './Displaypost';
import { addDoc, collection, getDocs, deleteDoc } from "@firebase/firestore";
import { db } from './firebase'; 
import DisplayQuestion from "./DisplayQuestion";
function Routing() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "questions"));
                const questionsData = querySnapshot.docs.map((doc) => doc.data());
                setQuestions(questionsData);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    return (
        <>
            <Routes>
                <Route path='/' element={ <DisplayQuestion/>} >
                <Route index element={<Post />  }/>
                <Route path='/find' element={<DisplayPost />} /> 
                </Route>
            </Routes>

            <Outlet/>
        </>
    );
}

export default Routing;