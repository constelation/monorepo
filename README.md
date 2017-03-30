Mono repo for constelation's Components, functions, and CONSTANTS

See them in action at https://constelation.github.io/monorepo/

```
npm i -S constelation-{view,scroll-view,space,text,image,style_,event_,animate_}
```

NOTE: If using `flow-type`, you can also add Declaration files to your `.flowconfig`'s `[lib]` section like:
```
[libs]
./node_modules/constelation-animate_/dist/index.js.flow
./node_modules/constelation-event_/dist/index.js.flow
./node_modules/constelation-style_/dist/index.js.flow
./node_modules/constelation-text/dist/index.js.flow
./node_modules/constelation-view/dist/index.js.flow
```

NOTE: to add back .js.flow files into dist, when https://github.com/facebook/flow/issues/945 is fixed, use this script:
```
"build": "lerna exec -- babel *.js -d dist --ignore *.native.js,*.js.flow && lerna exec -- find . -maxdepth 1 -name *.native.js -exec cp {} dist \\; && lerna exec -- find . -maxdepth 1 -name *.js.flow -exec cp {} dist \\;",
```

When thinking about base, primitive components to leverage, think about your main palette in a visual, declarative WYSIWYG tool like https://github.com/danscan/fractal. Which components would be the core set that an average user would want?
