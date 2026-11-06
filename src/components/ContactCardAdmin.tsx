'use client';
import { Contact, Note } from '@prisma/client';
import { Card, Image, ListGroup } from 'react-bootstrap';
import NoteItem from './NoteItem';

/* Renders a card element containing contact information. See admin/page.tsx. */
const ContactCardAdmin = ({ contact, notes }: { contact: Contact, notes: Note[] }) => (
  <Card className='h-100'>
    <Card.Header>
      <Image src={contact.image} width={75} alt='Profile Picture' />
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => <NoteItem key={note.id} note={note}/>)}
      </ListGroup>
      <hr></hr>
      <p className='blockquote-footer'>{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
