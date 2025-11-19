// src/data/reservations.ts

// 백엔드에서 내려오는 예매 한 건에 대응하는 타입
export type ReservItem = {
  id: string;
  movie: string;
  date: string;
  time: string;
  theater: string;
  seat: string;
  // 아래 필드는 백엔드에서 더 줄 수도 있어서 optional로만 둠
  reservation_status?: 'CONFIRMED' | 'CANCELED';
  created_at?: string;
};

// 공통 fetch 래퍼
async function api<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let msg = '요청에 실패했습니다.';
    try {
      const text = await res.text();
      msg = text || msg;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }

  if (res.status === 204) {
    // no content
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

// 1) 회원 예매 목록: GET /api/reservations/member?email=...
async function listMember(email: string): Promise<ReservItem[]> {
  const data = await api<{ items: ReservItem[] }>(
    `/api/reservations/member?email=${encodeURIComponent(email)}`,
  );
  return data.items ?? [];
}

// 2) 비회원 예매 목록: POST /api/reservations/guest { email }
async function listGuest(email: string): Promise<ReservItem[]> {
  const data = await api<{ items: ReservItem[] }>('/api/reservations/guest', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return data.items ?? [];
}

// 3) 예매 상세: GET /api/reservations/:id
async function getById(id: string): Promise<ReservItem> {
  const data = await api<{ detail: ReservItem }>(`/api/reservations/${id}`);
  return data.detail;
}

// 4) 예매 취소: DELETE /api/reservations/:id
//    (백엔드에 이 엔드포인트가 없다면 나중에 추가하면 됨)
async function cancel(id: string): Promise<void> {
  await api<void>(`/api/reservations/${id}`, {
    method: 'DELETE',
  });
}

async function cancelGuest(id: string): Promise<void> {
  // 게스트/회원 구분 안 하고 동일한 취소 엔드포인트 사용
  await cancel(id);
}

async function cancelMember(id: string): Promise<void> {
  await cancel(id);
}

// 기존에 쓰던 이름 그대로 export
export const Reservs = {
  listMember,
  listGuest,
  getById,
  cancelGuest,
  cancelMember,
};
