// 로그인 상태/유저 정보 유틸 (네 login.tsx가 localStorage에 저장하는 키에 맞춤)
export const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";
export const userEmail = () => localStorage.getItem("userEmail") || "";

export const login = (email: string) => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email);
};

export const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
};
