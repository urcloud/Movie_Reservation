# React.js

[리액트][react-dev-ko]는 JSX를 이용하여 리액트 컴포넌트(component)를 만들고 이것을 이용하여 웹 페이지를 만드는 라이브러리입니다.

## JSX

자바스크립트와 XML(HTML)을 함께 사용할 수 있는 마크업입니다.

```jsx
function VideoList({ videos, emptyHeading }) {
  const count = videos.length;
  let heading = emptyHeading;
  if (count > 0) {
    const noun = count > 1 ? 'Videos' : 'Video';
    heading = count + ' ' + noun;
  }
  return (
    <section>
      <h2>{heading}</h2>
      {videos.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </section>
  );
}
```

- 리액트가 jsx 구문을 해석하여 자바스크립트 구문으로 변경

## 컴포넌트(Component)

React 컴포넌트는 데이터를 받고 화면에 표시할 내용을 반환합니다.

```jsx
import { useState } from 'react';

function SearchableVideoList({ videos }) {
  const [searchText, setSearchText] = useState('');
  const foundVideos = filterVideos(videos, searchText);
  return (
    <>
      <SearchInput
        value={searchText}
        onChange={(newText) => setSearchText(newText)}
      />
      <VideoList
        videos={foundVideos}
        emptyHeading={`No matches for “${searchText}”`}
      />
    </>
  );
}
```

- 자바스크립트 함수
- 함수이름의 첫 글자를 대문자 사용
- 함수를 호출할 때는 HTML 태그처럼 호출
- 함수의 인수는 HTML 태그의 속성처럼 지정

## 타입스크립트

## 참조

- [리액트](https://ko.react.dev/)

[react-dev-ko]: https://ko.react.dev/
