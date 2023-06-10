<h1 align="center"> SEI Project 4 </h1>

## 🪦 

In this file I promise I will fulfill all project requirements for the README. I decided to move all these details here so I can write as much as I want without bloating up the main readme page. 

## 💭 General Approach

I brainstormed a bit and ended up on trying to create a website similar to [StreamerSonglist](https://www.streamersonglist.com/). 

I did intend to make Qriku a replacement for this site eventually - to facilitate performances that take audience song requests. 

However the task was too daunting and I ended up having to scale it down, A LOT. 😓 

Regardless, I started with thinking about user stories/ what I wanted my application to help users accomplish. 

After that, I designed the database - what information I needed to store -> what tables were needed -> how they would be linked. 

Then I made sketches of how the major pages in my application should look and what information I needed from my database to show in those pages. 

Then, I thought about how my back-end should be designed to link my front-end views to my database. 

Then, I spent the next five years writing code and banging my head against the wall. 💀

## 📖 User Stories 

In this section I will write all the things I wanted my application to accomplish, many of which were really huge goals that never came through... 🥲 

I will indicate with a tick the user stories I managed to implement! 

#### 🎤 Performer user stories

- [x] Add songs they know how to perform to a library that audience can access 
- [ ] Add songs in bulk/ allow songs to be easily migrated from other websites
- [ ] Tag the songs to allow or deny songs for different performances/ streams (themed requests)
- [ ] Add song notes that can be easily viewed in the application during performance - eg. lyrics/ chords/ sheet music/ key
- [ ] Integrate [Genius](https://genius.com/) to automatically add song lyrics to songs added to the library
- [ ] Integrate [Ultimate Guitar](https://www.ultimate-guitar.com/) to automatically add chords to songs added to the library
- [x] Add songs to their own live session's queue
- [x] View & manage songs in their own live session's queue
- [ ] Have the app automatically determine queue order by time OR popularity (number of requests) OR payment (if tips were given during requests) 
- [ ] View song notes alongside the queue so that performers need not "tab out" from the page for notes while performing
- [ ] Create a profile that can be viewed by audience
- [ ] Add social links to public profile
- [ ] Schedule upcoming performances so that audience can anticipate them and plan to attend them
- [ ] Integration to [twitch](https://www.twitch.tv/) - live-streaming platform
- [ ] Integration to [YouTube](https://www.youtube.com/) - live-streaming platform
- [ ] Integration to [PayPal](https://www.paypal.com/sg/business) - online payment method
- [ ] Integration to [Ko-fi](https://ko-fi.com/) - online tipping method
- [ ] Integration to [PayNow](https://abs.org.sg/consumer-banking/pay-now) - sg mobile payment method
- [ ] Real-time updates to queue and song library updates (can't have the users keep having to refresh all the time!)

#### 🤳 Audience user stories

- [x] Request songs from performer's library
- [x] Add shout-outs to song requests
- [x] View the song queue of a performer's session
- [ ] View the current song being performed by a performer
- [ ] View the lyrics of the song being performed by a performer
- [ ] View performer details
- [ ] Follow a performer and see if they are currently performing/ have scheduled sessions
- [ ] View all followed performers' profiles

## ✏️ Wireframes

Please pardon the bad handwriting and photographs of writing on paper. 

I could only include these 2 because the others just look like scribbles on paper 🙂
![image](https://github.com/juju927/qriku/assets/126443829/7bb89d92-a9d8-4d52-afcd-e64ea2d5f0b0)
![image](https://github.com/juju927/qriku/assets/126443829/47cd69da-a8b1-4d6b-bf6c-095175d619c9)

## 🐱‍💻 Technologies used/ Problems/ Hurdles

It was with great excitement that I started this project thinking, 
> *"I'M GONNA LEARN SO MANY NEW THINGS! MERN WAS SO LAST WEEK! PYTHON IS LOVE PYTHON IS LIFE!"*

I end this project in shambles, knowing that implementing a MERN stack would have saved hours upon hours of troubleshooting and headaches, but if it's any consolation I definitely learned a lot. (I know nothing)

#### 🖍️ ui design

On the front-end side, I picked up using [tailwind CSS](https://tailwindcss.com/) alongside [daisyUI](https://daisyui.com/) and a little bit of [Headless UI](https://headlessui.com/) for my styling. 

Why use so many things? You might wonder. I had to use daisyUI to do things I couldn't do on tailwind CSS, then headless UI to do things that couldn't work for me on daisyUI (even though I took the code wholesale from daisyUI's website). *The specific example: A modal I took from daisyUI did not work on my code, but worked perfectly on Jovy's. Yet, other components I took from daisyUI worked on my code.* Coding is truly a mystery. 

Using the long lines of `className`s in tailwind's styling method was very scary at first, but turned out being really useful as it eliminated the need for extra files and wondering where all the styling for different parts of the components were. It kept things (amazingly) neat, though I'm sure I didn't follow the proper order of which I'm supposed to put the styling............ whatever works, works 😅 (Sorry makers of tailwind css)

#### 💻 back-end framework

On the back-end, I picked up using [Flask](https://flask.palletsprojects.com/en/2.3.x/) as the framework to design the back-end of the web application. *Flask is lightweight!* I was told, and yeah it **SURE WAS**! It has the bare absolute minimum and everything has to be imported and everyone online has different ideas as to what was best and what to use and this was a complete nightmare for the little me who started exploring this dark cave with a tiny entrance but a huge interior using a little matchstick for guidance. 

While we learned Django and express.js in class, the back-end was nicely partitioned with many parts of the application having their own homes. The developers of Flask definitely did not have this in mind as they loved throwing everything into `App.py`. It was with great difficulty and a lot of assistance that I made use of [Flask Blueprint](http://exploreflask.com/en/latest/blueprints.html) to segregate my back-end into different folders for better organisation of things. *(Huge thanks to whoever made [cookiecutter-flask](https://github.com/cookiecutter-flask/cookiecutter-flask), you're an absolute lifesaver.)*

#### 🔐 back-end security

With the requirements of implementing jwt-tokens, my ~~googling~~ extended research brought me to [Flask-praetorian](https://flask-praetorian.readthedocs.io/en/latest/) which I absolutely tried to make work for good 10 hours before ending up **completely uninstalling** because I just could not make it work. I ended up using [PyJWT](https://pyjwt.readthedocs.io/en/stable/) to create jwt-tokens, with the help of an online guide. Of course, I later find out that [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/en/stable/) was the superior way of doing things that I didn't manage to implement but I'm going to write it here so I remember to use it in the future. 🙃 I used [bcrypt](https://flask-bcrypt.readthedocs.io/en/1.0.1/) to encrypt and decrypt the passwords that were saved in the database. This one I fully understood how to use. 😃 because it was gone through in class *(duh)*.

#### 🗄️ database management

I picked up [SQLAlchemy](https://www.sqlalchemy.org/) to query my PostgreSQL database. It was with it that I created tables and schemas (I think). Then, I used [Flask-Marshmallow](https://flask-marshmallow.readthedocs.io/en/latest/) to de-serialise data gotten back from the database (I think). These 2 programs were exciting to work with to begin with, but after working with them more I kind of get the feeling that documentation writers are in cahoots with those fellas making tutorials on YouTube to make profits. I might also just be stupid.

## 🧐 What's next?

Even though the project has come to an end, I do intend to continue working on this project in the near future. Implementing more user stories, fixing up my styling, there's so much to do.

## 💕

Even though the project is small to many others, it was a huge undertaking for me - and it really didn't help that I was ultra busy with other things during the 2 week timeframe I was given to work on it. Regardless, it was a fun and enriching experience - I truly struggled and learnt a lot, and I'm happy I made it to the end! 

Huge thanks to 
- **bing**: who was almost like my personal Google, teaching me what was good practice and guiding me so much along the way, looking at my bugs and squishing them 
- **my instructor, desmond**: for teaching us for the past 3 months - it was truly a crazy journey, thank you for always being so encouraging to and patient with me
- **my TA, barry**: for helping me out all the time (even though you think you didn't) and for your p2w code for the modal, it was an absolute lifesaver - would love to import barry for all future projects
- **my classmate, justinn**: for helping me with so many things related to flask, sqlalchemy and marshmallow - u r truly (in khai's words) *fking smart*
- **my parents**: for being so understanding and encouraging when i wanted to swap careers, and for sponsoring me without doubt 
- **my friends**: especially tiff, chon, asch, krystal, kokpit for keeping me company night after night while i struggled through life and coding
- **general assembly**: for organising this course and giving me an opportunity to pick up skills for a career switch
- **sei 43**: especially jovy, binghong, ziming, khai, and michael - for being such a fun class, it's been an absolute blast going through this course with you guys. all of you inspire me to learn more and do better, and i'm glad to have gotten to know all of you.

