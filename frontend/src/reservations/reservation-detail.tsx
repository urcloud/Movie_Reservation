import React from "react";
import { Route } from "wouter";
import { isLoggedIn } from "../data/session";

// default export 기준 (경로는 네 프로젝트 구조에 맞춰 조정)
import {GuestReservDetail} from "../reservations/guest-res-detail";
import {MemberReservDetail} from "../reservations/mem-res-detail";

/**
 * /reservations/:id 접속 시, 로그인 여부로 상세 화면을 스위칭
 * 두 상세 컴포넌트가 id, backTo를 props로 받는 구조를 가정.
 * 타입 충돌을 피하려면 any로 넉넉히 전달.
 */
// reservation-detail.tsx (게이트)
export default function ReservationDetailGate() {
  return (
    <Route path="/reservations/:id">
      {(params: { id: string }) =>
        isLoggedIn()
          ? <MemberReservDetail id={params.id} />
          : <GuestReservDetail id={params.id} />
      }
    </Route>
  );
}

