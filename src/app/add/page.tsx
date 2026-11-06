import { loggedInProtectedPage } from '@/lib/page-protection';
import AddContactForm from '@/components/AddContactForm';
import { auth } from '@/lib/auth';

const AddContact = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  return (
    <main>
      <AddContactForm />
    </main>
  );
};

export default AddContact;
