import React, { ChangeEvent, FormEvent, useState } from "react"
type FormData = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
}

interface FormProps {
    onSubmit: (data: FormData) => void;
}

export const Form: React.FC<FormProps> = ({onSubmit}) => {
    const [newData, setData] = useState<FormData>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        debugger
        setData(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => 
    {
        debugger
        e.preventDefault();
        onSubmit(newData);
        setData({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        });
    }

    return <form onSubmit={handleSubmit} action="">
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>email</th>
                    <th>phone</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input onChange={handleChange} value={newData.id} id="id"></input></td>
                    <td><input onChange={handleChange} value={newData.firstName} id="firstName"></input></td>
                    <td><input onChange={handleChange} value={newData.lastName} id="lastName"></input></td>
                    <td><input onChange={handleChange} value={newData.email} id="email"></input></td>
                    <td><input onChange={handleChange} value={newData.phone} id="phone"></input></td>
                </tr>
            </tbody>
        </table>
        <button type="submit">Добавить в таблицу</button>
    </form>
}