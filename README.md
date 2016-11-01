Mono repo for constelation's Components, functions, and CONSTANTS

See them in action at https://constelation.github.io/monorepo/

```
npm i -S constelation-{Block,Inline,InlineCol,InlineFlex,InlineRow,InlineBlock,BackgroundImage,Button,Col,Flex,Row,View,Text,Style_,Event_,Animate_}
```

Could be an interesting combo with webpack's `ProvidePlugin`:
```
  // Automatically loaded modules - means these imports are not needed in each file
  new webpack.ProvidePlugin({
    React: 'react',
    Block: 'constelation-Block',
    Inline: 'constelation-Inline',
    InlineBlock: 'constelation-InlineBlock',
    InlineFlex: 'constelation-InlineFlex',
    InlineCol: 'constelation-InlineCol',
    InlineRow: 'constelation-InlineRow',   
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

When thinking about base, primitive components to leverage, think about your main palette in a visual, declarative WYSIWYG tool like https://github.com/danscan/fractal. Which components would be the core set that an average user would want?
