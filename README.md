# Reimbursomatic - An Expense Reimbursement System

## Overview
Reimbursomatic is a barebones web application that allows employees of a company to submit reimbursement tickets and human resource managers to approve or decline these tickets. 

## Purpose
The purpose of this project was, and is, a means of training for myself, as well as a way to showcase my skills in full-stack development. Beyond that, there is not much use to it.

## Features
- Users can login programmatically, such that they will be redirected to their correct dashboard based on their role within the company.
- Users will not be able to access data and pages that are beyond their access level
- Users can view and create reimbursement tickets
- Human Resource Managers will be able to view all tickets, and all pending tickets, and approve or decline them.

## Technologies Used
### Database
- PostgreSQL
- AWS RDS
- DBeaver

### Backend
- Java
- Servlets/Apache Tomcat
- JDBC
- Jackson
- CORS
- Spring Tool Suite

### Frontend
- HTML/CSS
- TypeScript
- Node.js
- axios
- React.js
- Material-UI
- Visual Studio Code

## Setup Guide
The project is not packaged very simply, as such it will be tricky to get everything setup.

Firstly, the database script will need to be run in an active database instance to create the schema and tables.

Secondly, the backend will require you to configure an Apache Tomcat server, or a web server of some kind that is ready to handle a Java servlet. After which point, JDBC will require you to set environment variables so that you are able to gain access to the database that you've setup. This project was developed in Spring Tool Suite and it will be easiest to build the project, and set up a Tomcat server, on that environment in this instance.

Thirdly, the frontend will require node.js, and 'npm install' + 'npm start' in the index's location will be necessary, as it is not deployed.

## Contributors and License Information
I am the only person who worked on this project, and as far as I know, all technologies used are under the GPL or less restrictive licences.
