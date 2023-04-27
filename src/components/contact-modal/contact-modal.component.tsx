import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import { ContactModalProps } from "../../types";
import { Contact } from "../../types";

import {
  Modal,
  Button,
  Container,
  Form
} from 'react-bootstrap';

import { ContactsContext } from "../../context/contacts.context";

const ContactModal = ({ showModal, handleCloseModal, contacts, setContacts, contactToProcess }: ContactModalProps) => {
  const CONTACT_INITIAL_STATE = { id: '', name: '', lastname: '', number: '' };

  const [contact, setContact] = useState<Contact>(CONTACT_INITIAL_STATE);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [number, setNumber] = useState('');
  const [validated, setValidated] = useState(false);

  const { editContact } = useContext(ContactsContext);

  useEffect(() => {
    if (contactToProcess) {
      setName(contactToProcess.name);
      setLastname(contactToProcess.lastname);
      setNumber(contactToProcess.number);
      setContact(contactToProcess);
    } else {
      setName('');
      setLastname('');
      setNumber('');
    }
  }, [contactToProcess]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContact(
      {
        ...contact,
        [e.target.id]: e.target.value
      }
    );
    if (e.target.id === 'name') setName(e.target.value);
    if (e.target.id === 'lastname') setLastname(e.target.value);
    if (e.target.id === 'number') setNumber(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (!contactToProcess) {
        console.log('no contactToProcess');
        let contactWithId = {...contact, id: uuidv4() };
        let newContacts = [
          ...contacts,
          contactWithId
        ];
        setContacts(newContacts);
        localStorage.setItem('contacts', JSON.stringify(newContacts));
        resetValues();
      } else {
        editContact(contact);
        resetValues();
      }
      handleCloseModal();
    }
    setValidated(true);
  };

  const resetValues = () => {
    setName('');
    setLastname('');
    setNumber('');
    setValidated(false);
    setContact(CONTACT_INITIAL_STATE);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Add Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="d-flex flex-column gap-2">
          <Form className="d-flex flex-column gap-2" noValidate validated={validated} onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Control
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={onChangeHandler}
                required
              />
              <Form.Control.Feedback type="invalid">
                Name is a requiered field.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Control
              type="text"
              id="lastname"
              placeholder="Lastname"
              value={lastname}
              onChange={onChangeHandler}
            />
            <Form.Control
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              id="number"
              placeholder="Number"
              value={number}
              onChange={onChangeHandler}
            />
            <Button type="submit">Done</Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;