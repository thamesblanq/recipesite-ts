

export interface UserPreferences {
    // Define the properties of UserPreferences if any
}
  
export interface User {
    $id: string;
    $createdAt: string;
    name: string;
    email: string;
    emailVerification: boolean;
    prefs: UserPreferences;
}
  
export interface CustomError {
    status: 'CUSTOM_ERROR';
    error: any;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  description: string; // Fixed typo here
  instructions: string;
  imageUrl: string;
  category: string;
  area?: string;
  youtube?: string;
  time?: string;
}

export interface AppwriteDocument {
  $id: string;
  title?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string;
  imageUrl?: string;
  category?: string;
  area?: string;
  youtube?: string;
  time?: string;
}


export interface YouTubeVideo {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
  }
  
export interface YouTubeResponse {
    items: YouTubeVideo[];
}

export interface MixkitVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string; // Adjust based on actual fields
}

export interface MixkitResponse {
  results: MixkitVideo[];
}

// src/types/index.ts
export interface CustomErrorForAppwrite {
  status: string;
  error: string;
}



  