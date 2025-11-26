export type Movie = {
  id: number; // movie_id에서 변경
  user_email: string // 유저ID -> email로 변경함
  title: string;
  description: string;
  release_date: string;       
  close_date: string;         
  running_time: number;
  viewing_age: number | null; // null = 전체 관람가
  genre: string;
  director: string;
  main_actor: string;
  created_at?: string;
  modified_at?: string
};
