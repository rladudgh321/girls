// app/post/[id]/page.tsx
import { notFound } from "next/navigation"; // 404 페이지를 위한 Next.js 내장 함수
import { getPostAPI } from "../../api/post"; // API 함수 임포트
import PostContent from "../../components/PostContent"; // 자식 컴포넌트 임포트
import PostList from "../../components/PostList";
import { getPostsAllAPI } from "../../api/post";
import { generateMetadataPostType, StringToArrayProps } from "../../types";

export const revalidate = 60;

export interface PostListProps {
  searchParams?: { postsPerPage?: string; page?: string; tag?: string; };
}

interface PostProps extends PostListProps {
  params: { id: string }
}

// 페이지 컴포넌트는 서버 컴포넌트로, 데이터를 서버에서 바로 가져옵니다.
export default async function Post({ params }: PostProps) {
  const { id } = params;

  // 서버에서 데이터 직접 가져오기
  const data = await getPostAPI(id);
  // 데이터가 없으면 404 페이지로 리디렉션
  if (!data) {
    notFound();
  }

  // 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* 자식 컴포넌트에 데이터 전달 */}
      <PostContent post={data} />
      <PostList />
    </div>
  );
}


export async function generateStaticParams() {
  // API 호출하여 게시글 목록 가져오기
  const posts = await getPostsAllAPI();

  if(posts) {
    const result = posts.posts.map((post: StringToArrayProps) => ({
      id: post.id.toString(), // 동적 경로에서 사용되는 파라미터
    }));
  
    // 각 게시글의 ID를 기반으로 동적 경로를 생성
    return result;
  } else {
    return null;
  }
}


export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const post:generateMetadataPostType = await getPostAPI(params.id);  // URL 파라미터 'id'를 기반으로 데이터를 가져옵니다.
    // const originUrl = process.env.NODE_ENV === 'production'
    //   ? process.env.CLIENT_URL
    //   : 'http://127.0.0.1:3000'
    return {
      title: post.title,
      description: post.content3,
      openGraph: {
        title: post.title,
        description: post.content3,
        url: post.images3[0].src,
        images: post.images3[0]?.src || [],

      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.content3,
        images: post.images3[0]?.src || [],
      },
    };
  } catch (err){
    console.error(err);
    return {};
  }
}

