import React, { useEffect, useState } from "react";
import "./App.css";
import { Table } from "./Table"
import axios from "axios";
import { Form } from "./Form";

export type DataT =
  {
    id: number, firstName: string, lastName: string, email: string, phone: string, address: any, description: string
  }

function App() {
  const [small, setSmall] = useState<Array<DataT>>([]);
  const [hideForm, setHF] = useState<boolean>(true)

  const getLarge = () => {
    return axios.get(
      " http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    );
  };

  useEffect(() => {

    getLarge().then((res) => {
      setSmall(res.data);
    });
  }, []);

  const handleAddData = (data: { id: string; firstName: string; lastName: string; email: string; phone: string }) => {
    debugger
    let id = parseInt(data.id, 10);
    if (isNaN(id)) { id = 0 }
    const updatedData = {
      id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: {},
      description: ''
    }
    setSmall([updatedData, ...small,])
  }

  return (
    <div className="App">
      <Table small={small}></Table>
      <div>
        <button onClick={() => { setHF(!hideForm) }}>Добавить</button>
        <div>
          {!hideForm && <div>
            <Form onSubmit={handleAddData}></Form>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
