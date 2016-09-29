Mono repo for constelation's Components, functions, and CONSTANTS

```
npm i -S constelation-{Block,Inline,InlineBlock,BackgroundImage,Button,Col,Flex,InlineCol,InlineFlex,InlineRow,Row,Text}
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
  }),

```
