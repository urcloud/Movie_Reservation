import { useState } from 'react';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Input } from '../commons/input';
import { Button } from '../commons/button';

import { Link } from 'wouter';

export const GuestBooking = () => {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);

  const handleCheck = () => {
    if (email) {
      setBookings([
        { id: 1, movie: '인터스텔라', date: '2025-10-05', seat: 'A12' },
        { id: 2, movie: '오펜하이머', date: '2025-10-12', seat: 'C07' },
      ]);
    }
  };

  return (
    <PageLayout>
      <ContentLayout>
        <h1 className="text-xl font-bold mb-4">비회원 예매 조회</h1>

        {/* 이메일 입력 */}
        <div className="flex gap-2 mb-4">
          <Input
            type="email"
            placeholder="메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border flex-1"
          />
          <Button className="bg-blue-500 text-white" onClick={handleCheck}>
            조회하기
          </Button>
        </div>

        {/* 예매 내역 표시 */}
        {bookings.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold">내 예매 내역</h2>
            {bookings.map((b) => (
              <Link key={b.id} href={`/guest-booking/${b.id}`}>
                <div className="border p-2 rounded shadow-sm bg-gray-50 cursor-pointer hover:bg-gray-100">
                  <p>영화: {b.movie}</p>
                  <p>날짜: {b.date}</p>
                  <p>좌석: {b.seat}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </ContentLayout>
    </PageLayout>
  );
};

//   return (
//     <PageLayout>
//       <ContentLayout>
//         <h1 className="text-xl font-bold mb-4">비회원 예매 조회</h1>
        
//         {/* 이메일 입력 */}
//         <div className="flex gap-2 mb-4">
//           <Input
//             type="email"
//             placeholder="메일을 입력해주세요"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border flex-1"
//           />
//           <Button className="bg-blue-500 text-white" onClick={handleCheck}>
//             조회하기
//           </Button>
//         </div>

//         {/* 예매 내역 표시 */}
//         {bookings.length > 0 && (
//           <div className="space-y-2">
//             <h2 className="font-semibold">내 예매 내역</h2>
//             {bookings.map((b) => (
//               <div
//                 key={b.id}
//                 className="border p-2 rounded shadow-sm bg-gray-50"
//               >
//                 <p>영화: {b.movie}</p>
//                 <p>날짜: {b.date}</p>
//                 <p>좌석: {b.seat}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </ContentLayout>
//     </PageLayout>
//   );
// };
