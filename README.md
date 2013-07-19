# Simple Todo #
[![Build Status](https://travis-ci.org/DylanTS/simple-todo.png)](https://travis-ci.org/DylanTS/simple-todo)

Another todo application!!!  Yay!!!

## Overview ##
Created with the [TodoMVC Application](http://todomvc.com/) in mind, this is an attempt to show the
various layers of a normal Backbone.js app in a simple format.  I wanted to create a Backbone app
that showcased how to use all the REST verbs (GET/POST/PUT/DELETE) in a single package.  Todos fit
that format well, allowing you to initially retrieve any existing todos (GET), add a todo (POST),
update an existing todo (PUT), and finally removing a todo (DELETE).

In addition, to keep the todos separate for each user, this application requires that you "login"
by entering in a name, which links the todos stored in the backend with a given user ID.  Because
of that, this application contains two pages: a login page and a todo page.

## Technical Implementation Details ##
As stated in the Overview, this is a Backbone.js application at it's core, but because of the need
to support the REST operations, a backend was necessary.  Node.js is used on the backend, and is
also responsible for serving up the initial page, using Express.  The Node stack provides three
REST resources: one for sessions (logging in and out), one for todos, and one for user information.
An in memory "todo database" was created to store the todos, and is reset each time the Node app
is restarted (this was done just for simplicity).  Also, a mock security layer is provided to store
the user authentication information in a cookie.

As for the Backbone portion, the initial HTML page uses RequireJS, which is responsible for loading
the app on the client side.  The todo-main.js includes a dependency on todo-app.js, which creates
the Backbone router, and starts Backbone's history, invoking the router.  The router sends the user
to either the login page (if they are not logged in) or the todo page (if they are logged in), and
each view then reacts to events to update the models or transition the user to another page.

Mocha, Chai, and Zombie were used to test the application, which was hooked up to a continuous
integration service via Travis CI.  The status of the tests can be determined by looking at the
build icon at the top of this readme.

More information on the details of the application can be found here:  
http://blog.dylants.com/2013/04/19/backbone-revisited/

## Getting Started ##
Since this application requires a running backend, you must clone the project and run it locally.
[Install Node.js and NPM](http://nodejs.org/), then clone the repository.  Once cloned,
cd into the directory and run <code>npm install</code> to install all Node dependencies.

To start the application run <code>npm start</code>.  Once running, the simple-todo application
can be viewed at: [http://localhost:3000/simple-todo](http://localhost:3000/simple-todo).  A live
running demo of the application may also be available via a link in the description field of this
GitHub project (though I don't guarantee it will exist forever).

You can also run the tests via <code>npm test</code>.
