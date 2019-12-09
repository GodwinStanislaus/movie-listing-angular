export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    genre_ids: number[];
    poster_path: string;
    popularity: number;
    backdrop_path: string;
    video: boolean;
    adult: false;
    original_language: string;
    vote_count: number;
    vote_average: number;
    release_date: string;
    image: string;
}
/*
{
"popularity": 55.385,
"vote_count": 750,
"video": false,
"poster_path": "/uTALxjQU8e1lhmNjP9nnJ3t2pRU.jpg",
"id": 453405,
"adult": false,
"backdrop_path": "/c3F4P2oauA7IQmy4hM0OmRt2W7d.jpg",
"original_language": "en",
"original_title": "Gemini Man",
"genre_ids": [
28,
53
],
"title": "Gemini Man",
"vote_average": 5.7,
"overview": "Ageing assassin, Henry Brogen tries to get out of the business but f",
"release_date": "2019-10-02"
}
*/
