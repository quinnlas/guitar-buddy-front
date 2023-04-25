# guitar-buddy-front

The front end of Guitar Buddy, a web app that analyzes text tabs. The tool will read the text tab and interpret the rhythm and notes in the tab. Then it allows the user to hear the tab played back to them through their browser. It also allows the user to run the tab through an implementation of [simulated annealing](http://en.wikipedia.org/wiki/simulated_annealing) to optimize the distance between the notes. Most notes can be played in multiple places on a guitar, and therefore there is an optimization problem of deciding where to play each note for the easiest method of playing a song. This is one way to attempt to solve that problem.

See a demo here:
https://www.youtube.com/watch?v=IwBbrkSDDko

## Project Setup

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

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
