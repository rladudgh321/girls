-- posts 테이블 (게시글)
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tags 테이블 (태그)
CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE -- 태그 이름은 유니크하게 설정
);

-- post_tags 테이블 (게시글과 태그의 관계)
CREATE TABLE post_tags (
  post_id INT,
  tag_id INT,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- images 테이블 (이미지)
CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT, -- posts 테이블과 연결되는 외래 키
  src VARCHAR(255) NOT NULL, -- 이미지 URL
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE -- 외래 키 제약조건
);


데이터베이스 연동 실패시 재연결 로직 짜기