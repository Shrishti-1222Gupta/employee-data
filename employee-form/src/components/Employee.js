import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; 

const Employee = () => {
    const [formData, setFormData] = useState({
        FName: '',
        LName: '',
        email: '',
        phone: '',
        address: ''
    });

    const [employees, setEmployees] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/employees', formData)
            .then((response) => {
                console.log(response.data);
                fetchEmployees();
            })
            .catch((error) => {
                console.error('There was an error submitting the form!', error);
            });
    };

    const fetchEmployees = () => {
        axios.get('http://localhost:5000/employees')
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the employees!', error);
            });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div>
            <h1>Employee Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="FName" placeholder="First Name" value={formData.FName} onChange={handleChange} required />
                <input type="text" name="LName" placeholder="Last Name" value={formData.LName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
            <h2>Employee List</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.FName}</td>
                            <td>{employee.LName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employee;