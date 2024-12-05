// components/PostContent.tsx
import { imagesObject, StringToArrayProps, tagObject } from "../types";
// 클라이언트 컴포넌트로 정의
interface PostContentProps {
  post: StringToArrayProps; // 부모로부터 전달된 게시글 데이터
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <div>
      {/* 게시글 제목 */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        <div>{post.title}</div>
      </h1>

      {/* 태그들 */}
      <div className="flex space-x-3 mb-8">
        {post.tags.map((tag: tagObject) => (
          <span key={tag.id} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {tag.name}
          </span>
        ))}
      </div>

      <section>
      {/* 게시글 이미지들 */}
      <div className="space-y-8">
        {post.images.map((image: imagesObject, i) => (
          <div key={image.src + i} className="bg-gray-200 rounded-lg shadow-md mb-6">
            <img 
              referrerPolicy="no-referrer"
              className="w-full"
              src={image.src}
              alt={`image${image.src}`}
            />
          </div>
        ))}
      </div>

      {/* 게시글 내용 */}
      <p className="space-y-8">
        {post.content}
      </p>
      </section>

    </div>
  );
}
