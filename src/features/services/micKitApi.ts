// src/features/services/mixkitApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MixkitResponse } from '@/types';

export const mixkitApi = createApi({
  reducerPath: 'mixkitApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mixkit.co/api/' }),
  endpoints: (builder) => ({
    searchVideos: builder.query<MixkitResponse, string>({
      query: (query) => `search/?query=${query}`,
    }),
  }),
});

export const { useSearchVideosQuery } = mixkitApi;
