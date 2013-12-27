Christmas Tree
===============

I found animated Christmas tree on reddit:

![reddit tree](http://i.imgur.com/Fy4S1jR.gif)

Was curious to make it in js. This is work in progress. Current results are here: [Merry Christmas!](http://anvaka.github.io/atree/)

How it's built?
---------------
The tree is built of two spirals. These [11 lines of code](https://github.com/anvaka/atree/blob/2937249242a0204929aca45cdb8b937cfb5af3e5/index.js#L86-L97) render one line on spiral. It includes 3d projection and background shadow. _Almost_ the same as this [wiki image](http://en.wikipedia.org/wiki/File:ComplexSinInATimeAxe.gif):

![spiral](http://upload.wikimedia.org/wikipedia/commons/a/a5/ComplexSinInATimeAxe.gif)

I tried to replicate original animated gif of a tree, but...

It's not perfect yet
--------------------
Want to help make it better? There are small things which are not perfect:

* I do not properly mimic spiral's curvature at the top of the tree
* Colors need to change more gradually, depending on Z coordinate
* Shadows are not accurate
* I think code is more complex than it should be.

# Happy Holidays!

# license

MIT
