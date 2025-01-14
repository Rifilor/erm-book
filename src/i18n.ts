import { createI18n } from 'vue-i18n';

// Оголосіть ваші переклади
const messages = {
    en: {
        email: 'Email',
        password: 'Password',
        login: 'Login',
        error_email: 'Enter a valid email',
        users: 'Users',
        books: 'Books',
        settings: 'Settings',
        admin: 'Admin',
        user: 'User',
        mentor: 'Mentor',
        author: 'Author',
        publication_date: 'Publication date',
        pages: 'Pages',
        search: 'Search',
        pages_from: 'Pages from',
        to: 'to',
        publication_date_from: 'Publication date from',
        clear: 'Clear',
        genre: 'Genre',
        language: 'Language',
        name_book: 'Name book',
        url_book: 'Book cover URL',
        description: 'Description',
        save: 'Save',
        notifications: 'Notifications',
        book_change: 'The book has been changed',
        add_new_book: 'Add new book',
        create: 'Create',
        book_add: 'Book added',
        delete: 'Delete',
        cancel: 'Cancel',
        delete_book: 'Delete book',
        are_your_sure_delete_book: 'Are you sure you want to delete this book?',
        role: 'Role',
        add_new_user: 'Add new user',
        avatar: 'Avatar',
        username: 'Username',
        date_created: 'Date created',
        delete_user: 'Delete user',
        are_your_sure_delete_user: 'Are you sure you want to delete this user?',
        user_add: 'User added',
        user_edit: 'The user has been changed',
        list_is_empty: 'List is empty',
        logout: 'Logout',
        filter: 'Filter',
        english: 'English',
        ukraine: 'Ukrainian',
        error_text: 'Error',
        error_wrong: 'Please check your login and password',
    },
    ua: {
        email: 'Пошта',
        password: 'Пароль',
        login: 'Вхід',
        error_email: 'Введіть дійсну електронну адресу',
        users: 'Користувачі',
        books: 'Книги',
        settings: 'Налаштування',
        admin: 'Адміністратор',
        user: 'Користувач',
        mentor: 'Наставник',
        author: 'Автор',
        publication_date: 'Дата публікації',
        pages: 'Сторінки',
        search: 'Пошук',
        pages_from: 'Сторінки з',
        to: 'до',
        publication_date_from: 'Дата публікації з',
        clear: 'Очистити',
        genre: 'Жанр',
        language: 'Мова',
        name_book: 'Іменна книга',
        url_book: 'URL-адреса обкладинки книги',
        description: 'Опис',
        save: 'Зберегти',
        notifications: 'Сповіщення',
        book_change: 'Книгу було змінено',
        add_new_book: 'Додати',
        create: 'Створити',
        book_add: 'Книга додана',
        delete: 'Видалити',
        cancel: 'Скасувати',
        delete_book: 'Видалити книгу',
        are_your_sure_delete_book: 'Ви впевнені, що хочете видалити цю книгу?',
        role: 'Роль',
        add_new_user: 'Додати',
        avatar: 'Аватар',
        username: 'Ім\'я користувача',
        date_created: 'Дата створення',
        delete_user: 'Видалити користувача',
        are_your_sure_delete_user: 'Ви впевнені, що хочете видалити цього користувача?',
        user_add: 'Користувач доданий',
        user_edit: 'Користувача було змінено',
        list_is_empty: 'Список порожній',
        logout: 'Вийти',
        filter: 'Фільтр',
        english: 'Англійська',
        ukraine: 'Українська',
        error_text: 'Помилка',
        error_wrong: 'Будь ласка, перевірте свій логін і пароль',
    }
};

// Створіть екземпляр i18n
const i18n = createI18n({
    legacy: false,
    locale: 'en', // Мова за замовчуванням
    fallbackLocale: 'en', // Резервна мова
    messages, // Переклади
});

export default i18n;