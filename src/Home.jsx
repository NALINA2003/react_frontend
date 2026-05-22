import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

const Home = () => {

const[name,setName] = useState("")
const[author_name,setAuthor_name] = useState("")
const[general,setGeneral] = useState("")
const[date,setDate] = useState("")
const[description,setDescription] = useState("")
const[error,setError] = useState({})
 
const validate = () => {
    const newError = {};
    
    if (!name.trim()) {
      console.log("Enter the Name here");
      newError.name = `Enter the Name here`;
    } else if (!/^[A-Za-z0-9\s.,'":!?()-]{2,100}$/.test(name)) {
      console.log("Invalid Name");
      newError.name = 'Invalid Name';
    }
     if (!author_name.trim()) {
      console.log("Enter the Name of the author here");
      newError.author_name = `Enter the Name of the author here`;
    } else if (!/^[A-Za-z ]{2,50}$/.test(author_name)) {
      console.log("Invalid Name");
      newError.author_name = 'Invalid Name';
    }
    if (!general.trim()) {
      console.log("Enter the general here");
      newError.general = `Enter the general here`;
    } else if (!/^[A-Za-z0-9\s.,'":!?()-]{2,100}$/.test(general)) {
      console.log("Invalid");
      newError.general = 'Invalid';
    }
    if (!date.trim()) {
      console.log("Enter the published date");
      newError.date = `Enter the  published date`;
    } else if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(date)) {
      console.log("Invalid");
      newError.date = 'Invalid';
    }
    if (!description.trim()) {
      console.log("Enter the description");
      newError.description = `Enter the  description`;
    } else if (!/^[A-Za-z0-9\s.,'":!?()@#&%-]{5,500}$/.test(date)) {
      console.log("Invalid");
      newError.description = 'Invalid';
    }
    
   setError(newError);
    return Object.keys(newError).length === 0; 
}
 const book = async () => {
    if (validate()) {
      console.log("form submitted sucessfully");
    }
    try {
      const data = {
        
        name: name,
        author_name:author_name,
        general:general,
        date:date,
        description:description
      };
      const res = await axios.post(
        `http://127.0.0.1:8000/api/book/create`,
        data,
      );
      console.log(res, "rsds");
      get_books();
    } catch (err) {
      console.log(err);
    }
  };
  const [data, setData] = useState([]);

  const get_books = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/book/get/`);
      console.log(res.data.data, "rsds");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const get_book_id = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/book/get/${id}`);
   setName(res.data.data.name)
   setAuthor_name(res.data.data.author_name)
   setGeneral(res.data.data.general)
   setDate(res.data.data.date)
   setDescription(res.data.data.description)
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
    get_books();
  }, []);
  return (
    <div>
    <div style={{display:'flex',flexDirection:'column',width:'200px'}}>
        <input type="text" placeholder='Enter Name of the book' value={name} onChange={(e) => setName(e.target.value)}/>
        {error.name ? <p>{error.name}</p> : ""}
        <input type="text" placeholder='Enter the author_name' value={author_name} onChange={(e) => setAuthor_name(e.target.value)}/>
        {error.author_name ? <p>{error.author_name}</p> : ""}
        <input type="text" placeholder='General of the book' value={general} onChange={(e) => setGeneral(e.target.value)}/>
        {error.general ? <p>{error.general}</p> : ""}
        <input type="text" placeholder='date published' value={date} onChange={(e) => setDate(e.target.value)}/>  
        {error.date ? <p>{error.date}</p> : ""}
        <textarea placeholder='Give your text here'></textarea>
        {error.description ? <p>{error.description}</p> : ""}
        <button onClick={book}>Submit</button>
    </div>
     <table border="1">
  <thead>
    <tr>
      <th>Name</th>
      <th>Author_name</th>
      <th>General</th>
      <th>Date</th>
      <th>Description</th>
      <th>Image</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {data.map((c) => (
      <tr key={c.id}>
        <td>{c.name}</td>
        <td>{c.author_name}</td>
        <td>{c.general}</td>
        <td>{c.date}</td>
        <td>{c.description}</td>

        <td>
          <img
            src={`http://127.0.0.1:8000${c.image}`}
            alt=""
            width="100"
          />
        </td>

        <td>
          <button onClick={() => get_book_id(c.id)}>
            Edit
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  )
}

export default Home