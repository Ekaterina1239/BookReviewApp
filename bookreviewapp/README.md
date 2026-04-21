# Book Review App
##  About the App 
In this project is created to add books and comment on them. When adding a book you can specify the title, author, genre, description. Also in each book users can add comments and evaluation through review. This application has all the necessary functions like add, edit, delete and read everything and it is done for both comments and books.

## The application uses the following dependencies:
express
pug
dotenv
uuid
joi
method-override
express-session
express-flash
passport
passport-local
Dev-dependencies:
nodemon

# Basic Dependencies:
## Package Purpose
express Framework for creating a server and handling HTTP requests
pug Templating engine for generating HTML on the server
dotenv Loads environment variables from .env file
uuid Generate unique IDs (e.g. for new books)
joi Data validation (e.g., validating a form before saving)
method-override Allows PUT and DELETE to be used via HTML forms.
express-session Sessions for storing user data (e.g. login session)
express-flash Popup messages (success, error, etc.)
passport / passport-local User authentication (login, password)
# Dev dependencies:
## Package Purpose
nodemon Automatically restarts the server when code changes (for development)

## Links 
GitHub repository: https://github.com/00019170/bookreviewapp

Deployed site: http://localhost:3000/books/5f741ccd-1dc7-4457-9201-1abcd566369f
# Project Documentation
## Root Files
app.js: The main file where the Express server is configured and initialized.

package.json: Contains project dependencies, scripts, and metadata.

package-lock.json: Automatically generated file that locks dependencies to specific versions.

.env: Environment variables, such as sensitive information (e.g., API keys, database credentials).

.gitignore: Lists files and folders that Git should ignore, like node_modules and .env.

## Folders
1. controllers/
Contains the business logic for handling HTTP requests. This typically includes defining how data is processed and sent back to the user.

books.js: Logic for managing books (e.g., listing books, viewing details).

reviews.js: Logic for handling book reviews (e.g., creating, editing, deleting reviews).

2. routes/
Defines routes (URL endpoints) and maps them to controller functions. This is where you define how the application responds to HTTP requests.

books.js: Contains routes related to books.

reviews.js: Contains routes related to reviews.

3. services/
Handles the actual data management (usually interacting with a database or files).

books.js: Contains logic for retrieving and managing book data (likely from a JSON file in this case).

reviews.js: Contains logic for handling reviews (likely interacting with a JSON file as well).

4. data/
The "database" of your application. In this case, it’s a directory with JSON files.

books.json: Stores data for books (probably includes title, author, and other metadata).

5. views/
Contains template files for rendering HTML pages. It uses Pug for templating.

layout.pug: The main layout template, likely containing the common structure (header, footer) used across all pages.

index.pug: The homepage template, showing a list of books.

error.pug: Template to display error messages.

book.pug: Template for displaying individual book details.

edit.pug: Template for editing existing entries (book or review).

mixins/: Reusable Pug templates (components).

review-form.pug: A form for submitting a review.

reviews/: Templates specifically related to reviews.

-form.pug: A form for submitting or editing reviews.

edit.pug: Template for editing a review.

new.pug: Template for creating a new review.

6. public/
Holds static assets (files that don't change dynamically).

images/: Folder for image files used in the app.

javascripts/: Folder for JavaScript files (if used).

styles/: Folder for CSS styles.

style.css: Main stylesheet.

## Functionality Flow
Routing: The user interacts with routes defined in the routes/ folder, such as /books or /reviews. These routes correspond to controller functions in the controllers/ folder.

Controllers: The controller files handle the logic for how data should be retrieved, processed, and sent back to the user. For example, in the books.js controller, you might define a function to retrieve book information from books.json.

Views: The data is rendered dynamically into templates defined in views/ using Pug. For example, book.pug might display details of a book, and review-form.pug could render a form for submitting a review.

Services: Services are responsible for fetching or manipulating data. In your case, these files interact with the books.json and reviews.json files, providing an abstraction layer to manage data handling.
