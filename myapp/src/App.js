import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    salary: '',
  });

  const [record, setRecord] = useState([]);
  const [editid, setEditid] = useState("");
  const [open, setOpen] = useState(false);

  const ButtonClick = () => {
    setOpen(true);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input, [name]: value,
    })
  }

  const handlesubmit = () => {
    if (editid) {
      let ans = record.map((item) => {
        if (item.id == editid) {
          return {
            ...item,
            name: input.name,
            email: input.email,
            password: input.password,
            city: input.city,
            salary: input.salary,
          }
        }
        return item;
      });
      setRecord(ans);
      setEditid("")
    } else {
      let obj = {
        id: Math.floor(Math.random() * 1000),
        name: input.name,
        email: input.email,
        password: input.password,
        city: input.city,
        salary: input.salary,
      }
      let data = [...record, obj];
      setRecord(data);
      localStorage.setItem('crud', JSON.stringify(data));

    }
    setInput({
      name: '',
      email: '',
      password: '',
      city: '',
      salary: '',
    });
  }

  const deletedata = (id) => {
    let ans = record.filter((item) => {
      return item.id !== id;
    })
    setRecord(ans);
    localStorage.setItem('crud', JSON.stringify(ans));
    alert("delet successfully");

  }

  const editdata = (id) => {
    let ans = record.filter((item) => {
      return item.id == id;
    })
    setEditid(id);
    setInput(ans[0]);
  }
  useEffect(() => {
    let allrecord = JSON.parse(localStorage.getItem('crud'));
    if (allrecord === null) {
      setRecord([]);
    } else {
      setRecord(allrecord);
    }
  }, []);

  return (
    <>
      <center>
        <button className='mx-4 px-4 py-2 m-4 text-dark border-light fw-bold fs-5 rounded-2' onClick={ButtonClick}>Open Form</button>
        {
          open && (
            <form className='form'>
            { <table className='border border-3 rounded-3 m-4 form'>
              <tbody>
                <tr className=''>
                  <td className='text-capitalize  px-4 pb-2 text-light mt-4 pt-4 mt-4'>name</td>
                </tr>
                <tr>
                  <td><input type='text' className='mx-4 mb-3 rounded-1 bg-light' onChange={handlechange} value={input.name} name='name'></input></td>
                </tr>
                <tr>
                  <td className='px-4 pb-2  text-light'>email</td>
                </tr>
                <tr>
                  <td><input type='text' className='mx-4 mb-3 rounded-1 bg-light' onChange={handlechange} value={input.email} name='email'></input></td>
                </tr>
                <tr>
                  <td className='text-capitalize  px-4 pb-2 text-light'>password</td>
                </tr>
                <tr>
                  <td><input type='text' className='mx-4 mb-3 rounded-1 bg-light' onChange={handlechange} value={input.password} name='password'></input></td>
                </tr>
                <tr>
                  <td className='text-capitalize  px-4 pb-2 text-light'>city</td>
                </tr>
                <tr>
                  <td><input type='text' className='mx-4  mb-3 rounded-1 bg-light' onChange={handlechange} value={input.city} name='city'></input></td>
                </tr>
                <tr>
                  <td className='text-capitalize  px-4 pb-2 text-light'>salary</td>
                 </tr>
                 <tr>
                  <td><input type='text' className='mx-4 mb-3 rounded-1 bg-light' onChange={handlechange} value={input.salary} name='salary'></input></td>
                </tr>
                 <tr>
                  <div className='btn'> 
                  <td>
                  {/* {
                      editid ? (<input type='button' className='btn text-center d-flex py-2 mb-3 text-light border-light' value='edit' onClick={handlesubmit}></input>) :
                        (<input type='button' value='submit' className='mb-4 p-2 ms-3 text-light border-light' onClick={handlesubmit}></input>)
                    } */}
                    {
                      editid ? (<button className='mx-1 px-4 py-2 m-3 text-dark fw-bold border-light' onClick={handlesubmit}>edit</button>) : (<button className='mx-1 px-4 fw-bold py-2 text-dark border-light rounded-2 ms-3 mb-4' onClick={handlesubmit}>submit</button>)
                    }
                  </td>
                  </div>
                </tr>
                    
              </tbody>
            </table>
           }
            </form>
          )
        }
     <br></br>
        <table className='m-4'>
          <thead>
            <tr className='align-utems-center justify-contant-center border border-light border-bottom-1 rounded-3'>
              <td className='text-light fs-5 fw-bold px-4 text-capitalize py-3 text-center'>id</td>
              <td className='text-light fs-5 fw-bold px-4 text-capitalize py-3 text-center'>name</td>
              <td className='text-light fs-5 fw-bold px-4 text-capitalize py-3 text-center'>email</td>
              <td className='text-light fs-5 fw-bold px-4 text-capitalize py-3 text-center'>password</td>
              <td className='text-light fs-5 fw-bold px-4 text-capitalize py-3 text-center'>city</td>
              <td className='text-light fs-5 fw-bold px-4 text-capitalize py-3 text-center'>salary</td>
              <td className='text-light fs-5 fw-bold px-4 text-capitalize py-3 text-center'>action</td>
            </tr>
          </thead>
          <tbody>
            {
              record.map((item) => {
                const { id, name, email,password,city,salary } = item;
                return (
                  <tr key={id} className='pt-4'>
                    <td className='text-light px-4 text-capitalize text-center'>{id}</td>
                    <td className='text-light px-4 text-capitalize text-center'>{name}</td>
                    <td className='text-light px-4 text-capitalize text-center'>{email}</td>
                    <td className='text-light px-4 text-capitalize text-center'>{password}</td>
                    <td className='text-light px-4 text-capitalize text-center'>{city}</td>
                    <td className='text-light px-4 text-capitalize text-center'>{salary}</td>
                    <td>
                      <button className='mx-1 px-4 py-2 m-3 text-dark rounded-3 bg-danger fw-bold' onClick={() => deletedata(id)}>delete</button>
                      <button className='mx-1 px-4 py-2 m-3 text-dark rounded-3 bg-warning me-4 fw-bold' onClick={() => editdata(id)}>edit</button>
                    </td>

                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </center>
      {/* <Button/> */}
    </>
  )
}

export default App;
