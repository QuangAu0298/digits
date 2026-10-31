import { notFound } from 'next/navigation';
import { Contact } from '@prisma/client';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import EditContactForm from '@/components/EditContactForm';

export default async function EditContactPage({ params }: { params: { id: string | string[] } }) {
  const { id } = await params;
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const editID: number = +id;
  const contact: Contact | null = await prisma.contact.findUnique({
    where: {
      id: editID,
    },
  });
  if (!contact) {
    return notFound();
  }

  return (
    <main>
      <EditContactForm contact={contact} />
    </main>
  );
}
