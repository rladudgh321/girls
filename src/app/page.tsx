import PostList from './components/PostList'; // PostList 컴포넌트 가져오기

// ISR 설정: 5분마다 새로 고침
export const revalidate = 120;

const Home = () => {

  return (
    <div>
      <PostList />
    </div>
  );
}

export default Home;
