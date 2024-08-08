export interface IUser {
    id: number,
    username: string,
    email: string,
    role: 'admin' | 'mentor' | 'user',
    password: string,
    avatar_url: string,
    created_at: Date,
}
export interface IBook {
    id: number; // Унікальний ідентифікатор книги
    title: string; // Назва книги
    author: string; // Автор книги
    publicationDate: Date | null; // Дата публікації
    genre: string; // Жанр книги (необов'язкове)
    pages: number; // Кількість сторінок
    language: string; // Мова книги
    coverImageUrl: string; // URL обкладинки книги (необов'язкове)
    summary: string; // Короткий опис книги (необов'язкове)
}

export interface IRoles {
    id: number,
    name: 'admin' | 'mentor' | 'user',
    permissions: Permissions,
}

export interface Permissions {
    can_edit_book: boolean;
    can_remove_book: boolean;
    can_create_user: boolean;
    can_edit_user: boolean;
    can_delete_user: boolean;
    can_view_user: boolean;
}

export interface IFromSaveData {
    users: IUser[],
    books: IBook[],
}

export interface IMockStore {
    users: IUser[],
    books: IBook[],
    roles: IRoles[],
    searchBooks: string,
    pagesFrom: number | string,
    pagesTo: number | string,
    publicationDateFrom: null | Date | string,
    publicationDateTo: null | Date | string,
    searchUser: string,
    selectedRole: string,
}

export interface ILoginData {
    email: string,
    password: string,
}

export interface IUserLogin {
    id: number,
    username: string,
    email: string,
    role: IRoles,
    password: string,
    avatar_url: string,
    created_at: Date,
}

export interface ILoginStore {
    userLogin: IUserLogin | null
}

export interface IFormSaveBook {
    searchBooks: string,
    pagesFrom: string | number,
    pagesTo: string | number,
    publicationDateFrom: null | Date | string,
    publicationDateTo: null | Date | string,
}

export interface ILink {
    name: string,
    linkName: string,
}
export interface IStore {
    links: ILink[],
    transitionName: string,
}

export interface IFormSaveUserFilter {
    searchUser: string,
    selectedRole: string,
}