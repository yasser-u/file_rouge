// FIXME : a readapter pour notre cas
export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}


export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  username: string;
  email: string;
  imageId: string;
  imageUrl: string;
  name: string;
  artisanId: string; // Relationship with artisanId
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type INewArtisan = {
  name: string;
  email: string;
  username?: string;
  password: string;
  categorie_activite: string;
  adresse?: string;
  code_postal?: string;
  ville: string;
  telephone?: string;
};

// produits
export interface IProduct {
  id: string;
  nom: string;
  description: string;
  tags: string;
  createur: string;
  imagesUrl: string;
  imageIds: string;
}
