import React, { useState, useEffect } from 'react';
import "./DisplayPost.css";
import { db } from './firebase';
import { onSnapshot, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
    const [cards, setCards] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [expandedCardId, setExpandedCardId] = useState(null);
    const [titleFilter, setTitleFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        
        const unsubscribe = onSnapshot(collection(db, 'cards'), (snapshot) => {
            const updatedCards = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setCards(updatedCards);
        });

        return () => unsubscribe();
    }, []);

    const addCard = async () => {
        try {
            await addDoc(collection(db, 'cards'), {
                title,
                description,
                tag,
                date: new Date()
            });

            
            setTitle('');
            setDescription('');
            setTag('');
        } catch (error) {
            console.error('Error adding card: ', error);
        }
    };
    const deleteCard = async (cardId) => {
        try {
            await deleteDoc(doc(db, 'cards', cardId));
            
            setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        } catch (error) {
            console.error('Error deleting card: ', error);
        }
    };
    const toggleCard = (cardId) => {
        setExpandedCardId((prevId) => (prevId === cardId ? null : cardId));
    };

    return (
        <div className="App">
            <h1>Questions List</h1>
           
            <div className="card-form">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="text" placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
                <button onClick={addCard}>Add Card</button>
            </div>
            <div className="filter">
               
                <input type="text" placeholder="Filter by title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
                <input type="text" placeholder="Filter by tag" value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} />
                <input type="date" placeholder="Filter by date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            </div>
            <div className="card-list">
                {cards
                    .filter((card) =>
                        card.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
                        card.tag.toLowerCase().includes(tagFilter.toLowerCase()) &&
                        (dateFilter
                            ? card.date.toDate().toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
                            : true)
                    )
                    .map((card) => (
                        <div key={card.id} className={`card ${expandedCardId === card.id ? 'expanded' : ''}`}>
                            <h2 onClick={() => toggleCard(card.id)}>{card.title}</h2>
                            {expandedCardId === card.id && (
                                <>
                                    <p>{card.description}</p>
                                    <p>{card.tag}</p>
                                    <p>Date: {card.date.toDate().toLocaleDateString()}</p>
                                    <button onClick={() => deleteCard(card.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}
            </div>


        </div>
    );
}

export default App;