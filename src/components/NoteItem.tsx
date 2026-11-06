'use client';
import { Note } from '@prisma/client';
// import Link from 'next/link';
import { ListGroup } from 'react-bootstrap';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const NoteItem = ({ note }: { note: Note }) => (
   <ListGroup.Item>
    <p className="fw-lighter">{note.createdAt.toLocaleDateString('en-US')}</p>
    <p>{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
