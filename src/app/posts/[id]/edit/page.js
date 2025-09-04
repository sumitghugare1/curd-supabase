import { getPostById } from '@/services/db';
import EditPostForm from '@/components/EditPostForm';

export default async function EditPostPage({ params }) {
  
  const post = await getPostById(params.id);

 
  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Edit Post</h1>
      {/* We pass the fully-loaded 'post' object as a prop to the Client Component */}
      <EditPostForm post={post} />
    </main>
  );
}