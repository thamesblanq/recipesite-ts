

export interface UserPreferences {
    // Define the properties of UserPreferences if any
}
  


// types.ts

// types.ts
export interface User {
  $createdAt?: string;
  $id?: string;
  $updatedAt?: string;
  accessedAt?: string;
  email?: string;
  emailVerification?: boolean;
  labels?: string[];
  mfa?: boolean;
  name?: string;
  passwordUpdate?: string;
  phone?: string;
  phoneVerification?: boolean;
  prefs?: Record<string, unknown>;
  registration?: string;
  status?: boolean;
  targets?: Array<{
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    identifier: string;
    name: string;
    providerId: string | null;
    providerType: string;
    userId: string;
  }>;
}


  
export interface CustomError {
    status: 'CUSTOM_ERROR';
    error: Error;
}

export interface AppwriteDocument {
  $id: string;
  userId?: string;
  date?: string;
  $createdAt: string;
  $updatedAt: string;
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

export interface Recipe {
  id: string;
  userId?: string;
  date?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  category: string;
  area?: string;
  youtube?: string;
  time?: string;
}


export type UserFavoriteRecipe = {
  userId: string,
  recipeId: string
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

export interface UserFavorite {
  $id?: string
  userId: string;
  recipeId: string;
}

export interface AppwriteUser extends AppwriteDocument {
  email?: string;
  name?: string;
  // Add other fields as necessary
}


  