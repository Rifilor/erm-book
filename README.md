# ERP Система для Управління Книгами

## Опис Проекту

Цей проект представляє собою ERP систему для управління книгами, яка підтримує три ролі користувачів:
- **Юзер**
- **Ментор**
- **Адміністратор**

Кожна роль має свої права і можливості по управлінню книгами.

## Аутентифікація та Доступ

- Система доступна тільки авторизованим користувачам. Незареєстровані користувачі будуть перенаправлені на сторінку входу.
- Після входу в систему користувач не може повернутися на сторінку входу.

**Тестові облікові записи:**
- Роль **Адмін**: `admin@admin.com` / пароль `admin`
- Роль **Ментор**: `mentor@mentor.com` / пароль `mentor`
- Роль **Юзер**: `user@user.com` / пароль `user`

## Функціональність

- **Анімації:** Включено анімації переходів між сторінками та індивідуальна анімація для логіна.
- **Локалізація:** Використовується бібліотека i18n для підтримки двох мов: англійська та українська. Змінити мову можна у налаштуваннях.
- **Адаптивний Дизайн:** Проект адаптивний для всіх пристроїв: десктопів, планшетів і мобільних телефонів.
- **Збереження Даних:** Всі дані зберігаються в localStorage. При видаленні або зміні даних, при повторному вході вони зберігаються разом із станами фільтрів.

## Як Вийти з Аккаунта

Щоб вийти з акаунта, потрібно зайти в налаштування і натиснути "Вихід".

## Демо Функціональності

- **Flex Layout:** Список книг відображено у вигляді плитки, демонструючи використання flex.
- **Grid Layout:** Список користувачів відображено за допомогою гридів, демонструючи використання grid.

## Технології

Проект побудовано з використанням таких ключових технологій:

- **Vue 3:** Основний фреймворк для побудови інтерфейсу користувача.
- **Pinia:** Хранилище стану для управління даними.
- **Vue Router:** Інструмент для маршрутизації в додатку.
- **Vue I18n:** Для реалізації локалізації і підтримки багатомовності.
- **Moment.js:** Бібліотека для роботи з датами і часом.
- **Vitest:** Для юніт-тестування компонентів і функціоналу.
- **TypeScript:** Для статичної типізації коду.
- **Sass:** Для написання стилів і роботи з препроцесором.

## Перший Запуск

Перед першим запуском проекту потрібно встановити всі модулі:

npm install


## Тести

Тести для перевірки хранилища та логіна розміщені у папці `src/components/__tests__`. Щоб запустити тести, використовуйте команду:

npm run test:unit



## Запуск Проекту

Щоб запустити проект, використовуйте команду:

npm run dev

## Сборка Проекту

Щоб збілдити проект, використовуйте команду:

npm run build

