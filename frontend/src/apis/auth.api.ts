const getUser = async () => {
  try{
    const res = await fetch(`api/auth/getUser`,{
      method:"GET",
      credentials: "include" // 쿠키 포함
    })
    if (!res.ok) throw new Error("Not logged in");
    
    const data = await res.json()
    console.log("응답상태:", data);
    return data;
  }catch(error){
    console.log("error",error)
    throw new Error('유저를 불러오지 못했습니다.');
  }
}

const login = async (email: string, password: string) => {
  const res = await fetch(`api/auth/login`, {
    method: "POST",
    credentials: "include",  // 쿠키 받으려면 필수
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  console.log(data)
  return data;
};

const logout= async () =>  {
  const res = await fetch(`api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}

export const authApi = {
  getUser,
  login,
  logout,
}