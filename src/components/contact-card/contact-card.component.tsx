import { useContext } from "react";

import { Card, Button, Container } from "react-bootstrap";

import { ContactsContext } from "../../context/contacts.context";

import { ContactProps } from "../../types";

const ContactCard = ({ contact }: ContactProps) => {
  const { deleteContact, handleEditContact } = useContext(ContactsContext);

  return (
    <Card style={{ width: '12rem' }}>
      <Card.Body>
        <Card.Title>{`${contact.name} ${contact.lastname}`}</Card.Title>
        <Card.Text>{contact.number}</Card.Text>
        <Container className="d-flex gap-2">
          <Button variant="secondary" onClick={() => handleEditContact(contact)}>Edit</Button>
          <Button variant="danger" onClick={() => deleteContact(contact)}>Delete</Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default ContactCard;