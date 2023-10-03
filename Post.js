import React, { useState } from "react";
import { storage } from './firebase';
import { db, doc} from './firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import './Post.css';
import { addDoc, collection, deleteDoc } from "@firebase/firestore";
import { useData } from "./Data";

function Post() {

  const { updateData} = useData();

  const [question, setQuestion] = useState(false);
  const [article, setArticle] = useState(false);
  const [upload, setUpload] = useState([]);
  const [download, setDownload] = useState(null);
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState("");
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [data, setData] = useState(null);
  

  const [postQuestion, setPostQuestion] = useState({
    titleQuestion:'',
    describeQuestion:"",
    tagQuestion:"",
  });

  
  const handleQuestionClick = () => {
    setQuestion(true);
    setArticle(false);
  };

  const handleArticleClick = () => {
    setArticle(true);
    setQuestion(false);
  };

  const handleUpload = async () => {
    if (upload === null) {
      alert("Please select a file to upload.");
      return;
    }
    const imagePush = ref(storage, `images/${v4()}${upload.name}`);
    try {
      await uploadBytes(imagePush, upload);
      const downloadRef = await getDownloadURL(imagePush);
      setDownload(downloadRef);
      alert("You have successfully uploaded the image");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUpload(selectedFile);
  };
  
 
  //   const Clickhandle = () => {
  //     console.log("Sending....");
  // updateData((prevData) => (prevData ? [...prevData, postQuestion] : [postQuestion]));
  //   };

  
  
  const handlePost = async () => {
    if (!title || !abstract || !text || !tags) {
      alert("Fill all the fields");
      return;
    }

    try {
      const postData = {
        title: title,
        abstract: abstract,
        text: text,
        tags: tags,
      };
      const docRef = await addDoc(collection(db, "data"), postData);
  
      console.log("Data is added with ID:", docRef.id);
      alert("Data is added successfully");
    } catch (err) {
      console.error("Error:", err);
    }
  };
  // const deleteData = async (data) => {
  //   try {
  //     // Delete the data from Firestore
  //     await deleteDoc(doc(db, "data", /* specify the document ID you want to delete */));
  //     console.log("Data is deleted.");
  //     alert("Data is deleted successfully");
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // };
  
 
 
  return (
    <>
   
    
      <div className="First">
        <h2 className="h_tag">New Post</h2>
      </div>

      <form className="form">
        <h2 className="Heading">Select post option: </h2>

        <input type="radio" id="question" name="language" value="Question" onClick={handleQuestionClick} />
        <label htmlFor="question" className="label">Question</label><br />

        <input type="radio" id="article" name="language" value="Article" onClick={handleArticleClick} />
        <label htmlFor="article" className="label">Article</label>
      </form>

      
          
          
      {article && (
        <div className="Article_Margin">
          <div className="Heading_Border">
            <p className="Text_Adding">What do you want to ask or share</p>
          </div>

          <div className="Title_add">
            <label htmlFor="title" className="Title-1">Title</label>
            <input className="Title" type="text" placeholder="Start your question" name="title" onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="Extra_Content">
            <label className="Title-1" htmlFor="image">Add an image: </label>
            <input type="file" id="image" accept="image/*" name="image" className="Title" onChange={handleFileChange} />
            <div className="Adding_Button">
              <label htmlFor="image" className="B_button">
                Browse
              </label>
              <button className="B_button" onClick={handleUpload}>Upload</button>
            </div>
          </div>

          <div>
            <h3 className="textbox">Abstract</h3>
            <textarea id="area" rows="10" cols="30" onChange={(e) => setAbstract(e.target.value)}>Enter a 1-paragraph abstract</textarea>
          </div>

          <div className="Second">
            <h3 className="textbox">Article text</h3>
            <textarea id="area" rows="10" cols="30" onChange={(e) => setText(e.target.value)}>Enter the article text</textarea>
          </div>

          <div className="Tags">
            <p className="Adding">Tags</p>
            <input type="text" id="Input" placeholder="Add up to 3 tags to describe abstract" onChange={(e) => setTags(e.target.value)} />
          </div>

          <div className="button">
            <button onClick={handlePost}>Post</button>
          </div>
         <div>
            {
              download && (
                <div>
                  <div className="List">
                    <img src={download} alt='img' />
                  </div>
                  <h2 className="Added_Data">Title: {data.title}</h2>
                  <h2 className="Added_Data" >Abstract: {data.abstract}</h2>
                  <h2 className="Added_Data" >Text: {data.text}</h2>
                  <h2 className="Added_Data" >Tags: {data.tags}</h2>
                </div>
              )
            }
          </div> 
        </div>
      )}





    </>
  );
}

export default Post;