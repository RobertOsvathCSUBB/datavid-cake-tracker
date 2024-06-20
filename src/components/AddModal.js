import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

const AddModal = ({ isOpen, onClose, title, onSubmit}) => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        BirthDate: '',
        Country: '',
        City: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onSubmit(formData);
        setFormData({
            FirstName: '',
            LastName: '',
            BirthDate: '',
            Country: '',
            City: ''
        });
    };

    const handleChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [fieldName]: value });
    };

    return (
        <Modal show={isOpen}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <Button variant='outline-dark' 
                        style={{ marginLeft: 'auto', justifyContent: 'center' }} 
                        onClick={() => onClose()}>
                    X
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='firstName'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' name='FirstName' placeholder='First Name' value={formData.FirstName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId='lastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' name='LastName' placeholder='Last Name' value={formData.LastName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId='birthDate'>
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control type='date' name='BirthDate' value={formData.BirthDate} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type='text' name='Country' placeholder='Country' value={formData.Country} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' name='City' placeholder='City' value={formData.City} onChange={handleChange} />
                    </Form.Group>
                    <Button variant='primary' type='submit' style={{ marginTop: '10px'}}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddModal;