Mono repo for constelation's Components, functions, and CONSTANTS

See them in action at https://constelation.github.io/monorepo/

```
npm i -S constelation-{BackgroundImage,Button,Col,Flex,Row,View,Text,Style_,Event_,Animate_}
```

Could be an interesting combo with webpack's `ProvidePlugin`:
```
  // Automatically loaded modules - means these imports are not needed in each file
  new webpack.ProvidePlugin({
    React: 'react',
    Col: 'constelation-Col',
    Button: 'constelation-Button',
    BackgroundImage: 'constelation-BackgroundImage',
    Row: 'constelation-Row',
    Flex: 'constelation-Flex',
    Text: 'constelation-Text',
    View: 'constelation-View',
    Style_: 'constelation-Style_',
    Event_: 'constelation-Event_',
    Animate_: 'constelation-Animate_',
  }),

```

NOTE: If using `flow-type`, you can also add Declaration files to your `.flowconfig`'s `[lib]` section like:
```
[libs]
./node_modules/constelation-Animate_/dist/index.js.flow
./node_modules/constelation-Col/dist/index.js.flow
./node_modules/constelation-Event_/dist/index.js.flow
./node_modules/constelation-Flex/dist/index.js.flow
./node_modules/constelation-Row/dist/index.js.flow
./node_modules/constelation-Style_/dist/index.js.flow
./node_modules/constelation-Text/dist/index.js.flow
./node_modules/constelation-View/dist/index.js.flow
```

When thinking about base, primitive components to leverage, think about your main palette in a visual, declarative WYSIWYG tool like https://github.com/danscan/fractal. Which components would be the core set that an average user would want?
