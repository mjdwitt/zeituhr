Zeituhr
=======

Zeituhr is a simple Angular app for logging time that aims to be as simple as 
`dongola7`'s [Time-Track-CLI](https://github.com/dongola7/Time-Track-CLI/) but 
a whole lot prettier. In its current version, it simply stores all logged time 
in localStorage. Perhaps I'll build another app for syncing data for registered 
users at some point in the future and extend this to use that. Who knows.

## Demo

I currently don't have Zeituhr up and running anywhere, so you'll have to build 
it yourself.

## Building

I'm building this with [Middleman](http://middlemanapp.com), so after cloning 
this, you can just run `middleman` in the project's root directory and navigate 
to `localhost:4567` to see the results. Feel free to build it to static files 
with `middleman build` and host it yourself, if you'd rather.

## TODOs (and there a lot of them)

If you went and did what I just told you to in the last section, you've probably 
noticed by now that I lied. ~~A lot. Nothing really works right now.~~ Only some 
of the things are working right now.

Here's what I've actually got working so far:

- Toggle the start/stop button
- Start timer when button is pressed and update display every second.
- Stop timer when the button is pressed again.
- Store all of that in localStorage. (This one really matters.)
- Prompt user to write down what it was that they were doing while the clock 
  ran.
- Allow them to enter a project/client code as well.

And here's what Zeituhr *ought* to do in a little while:

- Display a summary of the last 24 hours below the button.
- Allow editing of past entries.
- Allow removal of individual entries.
- Add filtering of all kinds over the entries.

And here's a more vague wish-list for the future:

- Allow user to click on a calendar to view any day's summary. (Most likely 
  to be implemented.)
- Display pretty graphs for all of the data.
- Build invoices for client codes.
- Build out a service for storing and syncing all of the data for registered 
  users.
