

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
  