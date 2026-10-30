'use client';
import { Contact } from '@/lib/validationSchemas';
// import { Stuff } from '@prisma/client';
// import Link from 'next/link';
import { Card, Image } from 'react-bootstrap';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ContactCard = ({ contact }: { contact: Contact }) => (
  <Card className='h-100'>
    <Card.Header>
      <Image src={contact.image} width={75} alt='Profile Picture' />
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
  </Card>
);

export default ContactCard;
