// src/features/services/youtubeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { YouTubeResponse } from '@/types';

const API_KEY = ''; // Replace with your API key
const SEARCH_QUERY = 'cooking';

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/youtube/v3' }),
  endpoints: (builder) => ({
    searchVideos: builder.query<YouTubeResponse, void>({
      query: () => ({
        url: 'search',
        params: {
          part: 'snippet',
          q: SEARCH_QUERY,
          type: 'video',
          maxResults: 6,
          key: API_KEY,
        },
      }),
    }),
  }),
});

export const { useSearchVideosQuery } = youtubeApi;
