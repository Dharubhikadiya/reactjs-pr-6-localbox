import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [input,setInput] = useState({
    name : "",
    phone : "",
  })

  const [record,setRecord] = useState([]);
  const [editid,seteditid] = useState("");

  const handlechange = (e) => {
    const {name,value}  = e.target;
    setInput({
      ...input,[name] : value 
    })
  }

  const handlesubmit = () => {
    const {name,phone} = input;
    let obj = {
      id : Math.floor(Math.random()*1000),
      name : name,
      phone : phone,
    }
    let data = [...record,obj];
    setRecord(data);                
    localStorage.setItem('crud',JSON.stringify(data));

    setInput({
      name : '',
      phone : '',
    })
  }

  const deletdata = (id) => {
    let ans = record.filter((item)=>{
      return item.id !== id;
    })
    setRecord(ans);
    localStorage.setItem('crud',JSON.stringify(ans));
    alert("delet succesfully");
  }

  useEffect(()=>{
    let allrecord = JSON.parse(localStorage.getItem('crud'));
    if(allrecord===null){
      setRecord([]);
    }else{
      setRecord(allrecord);
    }
  },[]);

  return (
    <div className="App">
        <center>
          <br></br>
          <table border={1}>
            <thead>
            <tr>
              <td>name</td>
              <td><input type='text' onChange={handlechange} name='name' value={input.name}/></td>
            </tr>
            <tr>
              <td>phone</td>
              <td><input type='Number' onChange={handlechange} name='phone' value={input.phone}/></td>
            </tr> 
            <tr>
              <td></td>
              <td><input type='button' value='submit' onClick={()=>handlesubmit()}/></td>
            </tr>
            </thead>
          </table><br></br><br></br>
          <table border={1}>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>phone</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {
                record.map((item)=>{
                  const {id,name,phone} = item;
                  return(
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{phone}</td>
                      <td>
                        <button onClick={()=>deletdata()}>delet</button>
                        <button>edit</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </center>
    </div>
  );
}


