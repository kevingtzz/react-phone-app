import { useContext } from 'react';

import Nav from './components/navbar/navbar.component';
import ContactList from './components/contact-list/contact-list.component';
import ContactModal from './components/contact-modal/contact-modal.component';

import { ContactsContext } from './context/contacts.context';

function App() {
  const {
    contacts,
    setContacts,
    filteredContacts,
    showModal,
    handleShowModal,
    handleCloseModal,
    contactToProcess,
  } = useContext(ContactsContext);
  
  return (
    <div className="App">
      <Nav handleShowModal={handleShowModal} />
      <ContactList contacts={filteredContacts}/>
      <ContactModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        contacts={contacts}
        setContacts={setContacts}
        contactToProcess={contactToProcess}
      />
    </div>
  );
}

export default App;
