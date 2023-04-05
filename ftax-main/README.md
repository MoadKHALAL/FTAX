# FTAX Plaform

## Development Environment

### Pre-Requisites

- Node Runtime (Node.js) must be installed
- NPM (Node Package Manager) must be installed. It comes package with Node already. Installing Node on your machine will install npm as well.

### Run

Clone this repository to your local machine using `git` and open the terminal in your Code Editor and install all the dependencies of this project.

```
npm install
```
This will locally install the dependencies you need to run each service i.e `frontend` and `backend`.


Now, to run all both services, run the following command:

```
turbo run dev
```
This command runs both services on the following ports of your local machine:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000 (This Port 4000 also corresponds to FTAX's db-server containers where our database connects to our backend for custom logic)
