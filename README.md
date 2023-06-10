<h1 align="center"> Qriku </h1>

## 🎶 Key Features 

- A website application
- Allows performers to display a list of songs they are able to perform
- Allows users to view that list and request for song with shout-outs
- Automatically adds song requests to a queue that can be viewed by anyone but managed solely by the performer

## 📀 Install 

[ frontend → ](https://github.com/juju927/qriku/tree/main/frontend)

```bash
npm run dev
```

[ backend → ](https://github.com/juju927/qriku/tree/main/backend) 

Activate the project's virtual environment

```bash
pipenv shell
```

Install project dependencies

```bash
pipenv install
```

```bash
flask run
```

## 👨‍💻 Tech stack 

This full-stack web application was built using the **PFRN** stack. 

[ PostgreSQL ](https://www.postgresql.org/) - the database for persistent storage of user and song information.

[ Flask ](https://flask.palletsprojects.com/en/2.3.x/) - web-application framework used in the back-end

[ React ](https://react.dev/) - front-end library to build the user interface

[ Node.js ](https://nodejs.org/en) - runtime environment for the application 

## 🎤 Performer UI 

This application was made for a **tablet view** or a desktop view for performers. 

Upon entering the site, users will be prompted to register or login 

![][login/register] 

Logging in as a performer will bring the user to the songs page... 

![][songs]

<!-- ... where they will be able to add (delete) songs to (from) their list of songs and request them too.
![][addsong] ![][requestsong] -->
... where they will be able add/ delete songs to/ from their list of songs and add them to the live queue.
<div align="center">
  <img src="https://github.com/juju927/qriku/blob/main/readmedocs/2bi.png" height="400">
  <img src="https://github.com/juju927/qriku/blob/main/readmedocs/2bii.png" height="400">
</div>

Clicking on the live tab from the navigation bar at the top will lead the user to their own queue page, 
where they can start/ end a live session and manage any active live sessions. 

![][live] 

## 🤳🏻 Audience UI

This application was made for a mobile view for audience. 

A key feature of the application is that non-users are also able to view and request songs from the song library and also view the live session's queue. 

Performer's song library can be found at `/songs/<performer username>` and their live queue can be accessed at `/live/<performer username>` 

<div align="center">
  <img src="https://github.com/juju927/qriku/blob/main/readmedocs/2a.png" height="400">
  <img src="https://github.com/juju927/qriku/blob/main/readmedocs/3a.png" height="400">
</div>

The only difference is that they will not be allowed to make shout-outs during requests (as there is no way of tracking possible hate comments). 

<div align="center">
  <img src="https://github.com/juju927/qriku/blob/main/readmedocs/2biii.png" width="200">
</div>


## 🐰 

This application was created as my final project during my 3 month course at [General Assembly](https://generalassemb.ly/). 

[ [Reflections & Details → ](https://github.com/juju927/qriku/blob/main/Reflections.md) ]

[login/register]: https://github.com/juju927/qriku/blob/main/readmedocs/1.png
[songs]: https://github.com/juju927/qriku/blob/main/readmedocs/2.png
[addsong]: https://github.com/juju927/qriku/blob/main/readmedocs/2bi.png
[requestsong]: https://github.com/juju927/qriku/blob/main/readmedocs/2bii.png
[live]: https://github.com/juju927/qriku/blob/main/readmedocs/3.png
[audiencerequestsong]: https://github.com/juju927/qriku/blob/main/readmedocs/2biii.png

