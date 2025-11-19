import React from "react";
import { isLoggedIn } from "../data/session";

// 기존 파일들 default export 기준으로 import (파일 경로/별칭 맞춰 조정)
import {GuestReserv} from "../reservations/guest-reservation";
import {MemberResrv} from "../reservations/mem-reservation";

/**
 * /reservations 접속 시, 로그인 여부로 목록 화면을 스위칭
 */
export default function ReservationsGate() {
  return isLoggedIn() ? <MemberResrv /> : <GuestReserv />;
}
