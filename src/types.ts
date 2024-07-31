

export interface UserPreferences {
    // Define the properties of UserPreferences if any
}
  
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  favoriteRecipeIds?: string[]; // Array of recipe IDs the user has marked as favorites
}
  
export interface CustomError {
    status: 'CUSTOM_ERROR';
    error: any;
}

export interface Recipe {
  id: string;
  userId?: string
  title: string;
  ingredients: string[];
  description: string; // Missing in the current implementation
  instructions: string;
  imageUrl: string;
  category: string;
  area?: string;
  youtube?: string;
  time?: string;
}

export interface AppwriteDocument {
  $id: string;
  userId?: string
  email?: string;
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


  