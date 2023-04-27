import ContactCard from "../contact-card/contact-card.component";

import { ListWrapper, CardsContainer } from "./contact-list.styles";

import { ContactListProps } from "../../types";


const ContactList = ({ contacts }: ContactListProps) => {
  return (
    <ListWrapper>
      <CardsContainer>
        {contacts && contacts.map(contact => (
          <ContactCard key={contact.id} contact={contact}/>)
          )  
        }
      </CardsContainer>
    </ListWrapper>
  );
};

export default ContactList;