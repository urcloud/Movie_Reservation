export const getHomeMovies = async () => {
    try {
    const response = await fetch('/api/home/movies');
    if (!response.ok) {
        throw new Error('응답에 문제가 있습니다.');
        //throw new HttpError(response.status); 
    }
    const data = await response.json();
    return data;
    } catch (error) {
        console.log('error', error);
    }
}