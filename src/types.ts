export type Contact = {
  id: string;
  name: string;
  lastname: string;
  number: string;
};

export type ContactProps = {
  contact: Contact;
};

export type ContactListProps = {
  contacts: Contact[];
};

export type NavbarProps = {
  handleShowModal: () => void;
};

export type ContactModalProps = {
  showModal: boolean;
  handleCloseModal: () => void;
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  contactToProcess: Contact | null;
};