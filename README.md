Mono repo for constelation's Components, functions, and CONSTANTS

See them in action at https://constelation.github.io/monorepo/

```
npm i -S constelation-{Block,Inline,InlineBlock,BackgroundImage,Button,Col,Flex,InlineCol,InlineFlex,InlineRow,Row,View,Painter,Text}
```

Could be an interesting combo with webpack's `ProvidePlugin`:
```
  // Automatically loaded modules - means these imports are not needed in each file
  new webpack.ProvidePlugin({
    React: 'react',
    Radium: 'radium',
    Block: 'constelation-Block',
    Col: 'constelation-Col',
    Button: 'constelation-Button',
    BackgroundImage: 'constelation-BackgroundImage',
    Row: 'constelation-Row',
    Flex: 'constelation-Flex',
    Inline: 'constelation-Inline',
    InlineBlock: 'constelation-InlineBlock',
    InlineFlex: 'constelation-InlineFlex',
    InlineCol: 'constelation-InlineCol',
    InlineRow: 'constelation-InlineRow',   
    Text: 'constelation-Text',
    View: 'constelation-View',
    Painter: 'constelation-Painter',
  }),

```

When thinking about base, primitive components to leverage, think about your main palette in a visual, declarative WYSIWYG tool like https://github.com/danscan/fractal. Which components would be the core set that an average user would want?
