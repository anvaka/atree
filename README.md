Christmas Tree
===============

I found animated Christmas tree on reddit:

![reddit tree](http://i.imgur.com/Fy4S1jR.gif)

Was curious to make it in js. Current results are here: [Happy new  2024!](https://anvaka.github.io/atree/). Wish you all great successes and joy, doing what you love!

How it's built?
---------------
The tree is built of two spirals. These [11 lines of code](https://github.com/anvaka/atree/blob/2937249242a0204929aca45cdb8b937cfb5af3e5/index.js#L86-L97) render one line on spiral. It includes 3d projection and background shadow. _Almost_ the same as this [wiki image](http://en.wikipedia.org/wiki/File:ComplexSinInATimeAxe.gif):

![spiral](http://upload.wikimedia.org/wikipedia/commons/a/a5/ComplexSinInATimeAxe.gif)

It's almost perfect now
-----------------------

**EDIT:** Thank you reddit. With your help we made it almost perfect. You are awesome! 

Huge appreciation goes to [@CensoredUsername](https://github.com/CensoredUsername) who made [significant improvement](http://www.reddit.com/r/programming/comments/1tswai/t_sin_t_christmas_tree/cebhvu9). 

[@Yazuak](https://github.com/Yazuak) first gave and implemented [idea](http://www.reddit.com/r/programming/comments/1tswai/t_sin_t_christmas_tree/cebajpt) of how to manage even distribution of points along the curves.

* Vitaliy Kaurov implemented the same tree in Wolfram language... in just [15 lines of code](http://community.wolfram.com/groups/-/m/t/175891).
* [David Librera](https://github.com/davidlibrera) rewrote this in CoffeeScript. Checkout [his repository](https://github.com/davidlibrera/atree/tree/master/js/coffee) for nice OO design. 
* Chris Warren-Smith [wrote it in SmallBASIC](https://gist.github.com/chrisws/3cf97b7b7f1c2d6f9741464a2dfb3c3b)
* Mike Mallin made it [available in C](https://github.com/mremallin/christmas_tree) using SDL2 and OpenGL 3.2
* SFML port by [@deniskropp](https://github.com/deniskropp) is available here: https://github.com/deniskropp/christmas_tree


So, what's left? Just small changes which could make this tree perfect:

* Shadows are not accurate
* I think code is more complex than it should be (subjectively).

# Happy Holidays!

# license

MIT
