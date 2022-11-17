import './App.css';
import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {Form} from 'react-bootstrap'
import { SiDatadog } from "react-icons/si";

function App() {
  const [breed, setBreed] = useState([])
  const [selectedBreed, setSelectedBreed] = useState("")
  const [images, setImages] = useState([])

  useEffect(() => {
    var URL = 'https://dog.ceo/api/breeds/list/all';
      Axios
      .get(URL)
      .then(res => {
          for(var a in res.data.message){
            if (res.data.message[a].length !== 0)
            for (var b of res.data.message[a])
            breed.push(a + "/" + b)
            else 
            breed.push(a)
            setBreed(prev => [...breed])
          }
      }).then((r) => {
        setSelectedBreed(breed[0])
        showDog(breed[0]);
      })
  }, [])

  function showDog(category){
    
      const URL = `https://dog.ceo/api/breed/${category}/images`;
      Axios
      .get(URL)
      .then(res => {
          setImages(prev => [...res.data.message])
          
      })
  }

  

  return (
    <div className="app">
            <div className="header">
            <h1><SiDatadog/>
                  The Dog App</h1>
                
            </div>
      <Form className="form">
        <Form.Group><h1 className="breed">Breed:</h1>
          <Form.Control className="form-text"as="select" onChange={
            (e) => {
              setSelectedBreed(e.target.value);
              setImages([])
              showDog(selectedBreed)
              
            }
          }>{
            breed.map(b =>{
              return <option key={breed.key}>{b}</option>
            })
          }

          </Form.Control>
        </Form.Group>
      </Form>

      <div className="image-box">
        {
          images.map(i => {
            return (
              <img src={i} alt='dog'/>
            )
          })
        }

      </div>
    </div>
  );
}

export default App;
