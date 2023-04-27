import { createContext, useState, useEffect, ReactNode } from "react";

import { Contact } from "../types";

interface ContactContext {
  contacts: Contact[];
  setContacts: () => void;
  filteredContacts: Contact[];
  setFilteredContacts: (contacts: Contact[]) => void;
  searchField: string;
  setSearchField: (value: string) => void;
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  contactToProcess: Contact | null;
  setContactToProcess: (contact: Contact) => void;
  deleteContact: (contactToDelete: Contact) => void;
  handleShowModal: () => void;
  handleCloseModal: () => void;
  handleEditContact: (contact: Contact) => void;
  editContact: (contact: Contact) => void;
};

interface Props {
  children: ReactNode;
};

export const ContactsContext = createContext<ContactContext>({
  contacts: [],
  setContacts: () => null,
  filteredContacts: [],
  setFilteredContacts: () => null,
  searchField: '',
  setSearchField: () => null,
  showModal: false,
  setShowModal: () => null,
  contactToProcess: null,
  setContactToProcess: () => null,
  deleteContact: () => null,
  handleShowModal: () => null,
  handleCloseModal: () => null,
  handleEditContact: () => null,
  editContact: () => null,
});

export const ContactsProvider = ({ children }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchField, setSearchField] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contactToProcess, setContactToProcess] = useState<Contact | null>(null);

  const deleteContact = (contactToDelete: Contact) => {
    const newContacts = contacts.reduce((PrevContacts: Contact[], CurrentContact) => {
      if (CurrentContact.id !== contactToDelete.id) PrevContacts.push(CurrentContact);
      return PrevContacts;
    }, []);
    setContacts(newContacts);
    setContactToProcess(null);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setContactToProcess(null);
  }

  const handleEditContact = (contact: Contact) => {
    setContactToProcess(contact);
    handleShowModal();
  }

  const editContact = (contactToEdit: Contact) => {
    const newContacts = contacts.map(contact =>
      contactToEdit.id === contact.id ? contactToEdit: contact
    );

    setContactToProcess(null);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const value = {
    contacts,
    setContacts,
    searchField,
    setSearchField,
    filteredContacts,
    setFilteredContacts,
    showModal,
    setShowModal,
    contactToProcess,
    setContactToProcess,
    deleteContact,
    handleShowModal,
    handleCloseModal,
    handleEditContact,
    editContact
  } as ContactContext;

  useEffect(() => {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    if (contactsFromLocalStorage !== null) setContacts(JSON.parse(contactsFromLocalStorage));
  }, []);

  useEffect(() => {
    const newFilteredContacts = contacts.filter(contact => 
      contact.name.toLocaleLowerCase().includes(searchField) ||
      contact.number.toString().includes(searchField)
    );

    setFilteredContacts(newFilteredContacts);
  }, [contacts, searchField]);

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
};