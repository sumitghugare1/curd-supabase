import CreateFaqForm from '@/components/CreateFaqForm';
import { getAllActiveFaqs } from '@/services/db'; // We'll show existing FAQs

export default async function FaqsAdminPage() {
  const faqs = await getAllActiveFaqs();

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Manage FAQs</h1>
      
      <CreateFaqForm />

      <h2 style={{ marginTop: '40px' }}>Existing FAQs</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {faqs.map(faq => (
          <div key={faq.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <strong>Q: {faq.question}</strong>
            <p>A: {faq.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
}