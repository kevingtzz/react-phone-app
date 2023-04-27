import { ChangeEvent, useContext } from 'react';

import { ContactsContext } from '../../context/contacts.context';

import {
  Navbar,
  Container,
  Button,
  Form
} from 'react-bootstrap';

import { NavbarProps } from '../../types';

const Nav = ({ handleShowModal }: NavbarProps) => {
  const { searchField, setSearchField } = useContext(ContactsContext);

  const handleOnChangeSearchField = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container className='justify-content-between'>
        <Navbar.Brand href="#home">Phone Contacts</Navbar.Brand>
      </Container>
      <Container className='d-flex flex-row justify-content-end'>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchField}
            onChange={handleOnChangeSearchField}
          />
        </Form>
        <Button variant="primary" onClick={handleShowModal}>
          New Contact
        </Button>
      </Container>
    </Navbar>
  );
};

export default Nav;