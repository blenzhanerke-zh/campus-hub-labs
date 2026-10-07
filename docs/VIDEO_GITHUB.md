# Сценарий видео: приложение → GitHub

## 1. Показать работающий проект

«Мы создали Campus Hub на Expo и TypeScript. В одном проекте собраны темы лабораторных №1–6».
Показать четыре вкладки, добавление и редактирование задачи, изменение общего счётчика, загрузку API. Перезагрузить приложение и показать, что задача осталась в SQLite.

## 2. Показать папки

Кратко объяснить screens, components, navigation, context, services, database, types, theme, data. Открыть `database/tasks.ts`: пользовательский ввод передаётся SQL-параметрами. Открыть `services/api.ts`: GET, проверка статуса ответа. Открыть `NewsScreen.tsx`: loading/error, повтор, отмена запроса.

## 3. Подготовить Git

В новом терминале проекта:

```powershell
git --version
git init
git status
```

Если Git отсутствует, установите Git for Windows с https://git-scm.com/downloads/win и перезапустите VS Code.
Убедитесь, что `.gitignore` находится в корне, а `node_modules` и `.expo` не входят в список добавляемых файлов.

```powershell
git add .
git status
```

Просмотрите список до коммита. В репозиторий входят исходники, package.json, package-lock.json и конфигурация. Не включайте личные документы, ключи, пароли, `.env` и архив самого проекта.

```powershell
git commit -m "Add Campus Hub labs 1-6"
git branch -M main
```

Если Git запросит имя и почту, настройте их только для этого репозитория, заменив примеры своими данными:

```powershell
git config user.name "YOUR_NAME"
git config user.email "YOUR_GITHUB_EMAIL"
git commit -m "Add Campus Hub labs 1-6"
```

Можно использовать noreply-адрес из настроек GitHub. Для повторной попытки коммита новый git add не нужен, если файлы не менялись.

## 4. Создать репозиторий

На GitHub войдите в свой аккаунт → New repository. Имя: `campus-hub-labs`. Выберите видимость: Public — для открытого доступа студентам, Private — для ограниченного. Не добавляйте README, .gitignore или лицензию на этом шаге: локальный проект уже содержит README и .gitignore.
Нажмите Create repository и скопируйте HTTPS URL.

Выполните, заменив YOUR_USERNAME своим логином:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/campus-hub-labs.git
git push -u origin main
```

При запросе выполните вход в GitHub в браузере. Не показывайте вход, токены и пароли на записи. Если origin уже существует, проверьте `git remote -v`, не добавляйте другой адрес вслепую. При ошибке push не применяйте force: сначала разберите сообщение.

Обновите страницу репозитория и покажите файлы и README.

## 5. Как студент запускает проект

```powershell
git clone https://github.com/YOUR_USERNAME/campus-hub-labs.git
cd campus-hub-labs
npm ci
npx expo start
```

Эти шаги предполагают, что преподаватель уже выполнил установку всех зависимостей, включая expo install, и загрузил обновлённые package.json и package-lock.json. Студенту нужен Expo Go с поддержкой SDK проекта.

## 6. Последующие изменения

```powershell
git add .
git diff --cached
git commit -m "Improve task screen"
git push
```

Один итоговый коммит соответствует фактической подготовке готового комплекта. История отдельных лабораторных не создаётся задним числом.
