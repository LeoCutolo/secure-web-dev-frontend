# web-frontend

## Project Setup

Create an `.env` file at the root of your project containing (replace with your data):
   > VITE_BACK_URL=url to backend

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## User Stories
US1: As a random visitor, I want to be able to register an account or log-in, so I can access all features

US2: As a random visitor, I want to be redirected to the login/register page when I click on “location" tab, so that I know I must log-in to see its content

US3: As a logged-in user, I want to see locations and be able to click on one location to open a modal containing details, so that the website is useful

US4: As an “admin" user, I want to see a “Add Location” button in the location page, so 
that I can create a new location

US5: As an “admin" user, I want to see a button to edit locations in the array of locations, 
so that I can edit existing locations

US6: As an “admin" user, I want to see a button to delete locations in the array of locations so that I can delete existing locations

US7: As a logged-in user, I want to be able to sign-out

## Information 
It is necessary to use the HMI of mongo atlas to create an admin user