// pages/post/[id].js
// import { useParams } from 'next/navigation';

// 예시 데이터 (하드코딩)
const posts = [
  { id: 1, title: '첫 번째 게시글', tags: ['React', 'Next.js'] },
  { id: 2, title: '두 번째 게시글', tags: ['JavaScript', 'Node.js'] },
  { id: 3, title: '세 번째 게시글', tags: ['CSS', 'Tailwind CSS'] },
  { id: 4, title: '네 번째 게시글', tags: ['HTML', 'Web Development'] },
  { id: 5, title: '다섯 번째 게시글', tags: ['React', 'Web Design'] },
];

interface PostProps { params: { id: string }, searchParams: {} }
export default function Post({params}: PostProps) {
  const { id } = params;
  // 게시글 찾기
  const post = posts.find(post => post.id === parseInt(id));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
    {/* 게시글 제목 */}
    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
    
    {/* 태그들 */}
    <div className="flex space-x-3 mb-8">
      {post.tags.map((tag, idx) => (
        <span key={idx} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          {tag}
        </span>
      ))}
    </div>

    {/* 게시글 내용 및 이미지들 */}
    <div className="space-y-8">
      {/* 첫 번째 이미지 */}
      <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md mb-6">
        <img
          className="w-full h-96 object-cover"
          src="https://cdn.pixabay.com/photo/2024/11/07/18/01/spoonbill-9181508_1280.jpg"
          alt="spoonbill"
        />
      </div>

      {/* 두 번째 이미지 */}
      <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
        <img
          className="w-full h-96 object-cover"
          src="https://cdn.pixabay.com/photo/2024/11/05/07/09/elephants-9175178_1280.jpg"
          alt="elephants"
        />
      </div>

      <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
        <img
          className="w-full h-96 object-cover"
          src="https://cdn.pixabay.com/photo/2024/11/05/07/09/elephants-9175178_1280.jpg"
          alt="elephants"
        />
      </div>

      <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
        <img
          className="w-full h-96 object-cover"
          src="https://cdn.pixabay.com/photo/2024/11/05/07/09/elephants-9175178_1280.jpg"
          alt="elephants"
        />
      </div>

    </div>

    {/* 게시글 내용 추가 */}
    <div className="mt-8 text-gray-700 leading-relaxed text-lg">
      <p>
        이 게시글은 예시 데이터로, 실제 내용은 다른 정보를 담고 있습니다. 각 게시글에 대한 더 많은 내용이나 추가적인 이미지를 넣을 수 있습니다.
      </p>
    </div>
  </div>
  );
}
