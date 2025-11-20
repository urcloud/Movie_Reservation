const signup = async (
    member_name: string,
    email: string, 
    birthday: string,
    password: string
) => {
  const res = await fetch(`api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, birthday, member_name }),
    credentials: "include", // 쿠키 포함
  });
  return res.json();
}
export const usersApi = {
    signup
}