// link 사용 예제
import { Link } from 'react-router-dom'

export const Homt = () =>
  <div className="home">
    <h1>[홈페이지]</h1>
    <nav>
      <Link to="about">[회사 소개]</Link>
      <Link to="events">[이벤트]</Link>
      <Link to="products">[제품]</Link>
      <Link to="contact">[고객 지원]</Link>
    </nav>
  </div>
