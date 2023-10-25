import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";
import Card from './components/cards/card';

function App() {
  const [values,setValues] = useState();
  const [listGames, setListGames] = useState();
  const handleChangeValues = (value) =>{
    setValues((prevValue) =>({
      ...prevValue,
      [value.target.name]: value.target.value,

    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register",{
      name: values.name,
      cost: values.cost,
      category: values.category
    }).then(()=>{
      setListGames([
        ...listGames,
        {
          nome: values.name,
          cost: values.cost,
          category: values.category
        },
      ])
    });
    
  };

    useEffect(()=>{
      Axios.get("http://localhost:3001/getCards").then((response)=>{
        setListGames(response.data)
      })
    },[])
  return (
    <div className="app--container" >
      
      <div className='register--container'>
        <h1 className='register--title'>Scrim Shop</h1>
        <input type='text' name='name' placeholder='nome' className='register--input' onChange={handleChangeValues} />
        <input type='text' name='cost' placeholder='preço' className='register--input' onChange={handleChangeValues}/>
        <input type='text' name='category' placeholder='categoria' className='register--input' onChange={handleChangeValues}/>

        <button className='register--button' onClick={()=> handleClickButton()}>Cadastrar</button>
      </div>

      {typeof listGames !== "undefined" && listGames.map((values=>{
        return <Card 
        key={values.id} 
        listCard={listGames} 
        setListGames= {setListGames} 
        id={values.idgames} 
        name = {values.nome} 
        cost= {values.cost} 
        category = {values.category}
        ></Card>
      }
        ))}
      

  </div >
  );
}

export default App;
