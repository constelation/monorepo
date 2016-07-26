Mono repo for @kylpo's Components, functions, and CONSTANTS

```
npm i -S kylpo-{Block,Inline,InlineBlock,BackgroundImage,Button,Col,Flex,InlineCol,InlineFlex,InlineRow,Row,Text}
```

Could be an interesting combo with webpack's `ProvidePlugin`:
```
  // Automatically loaded modules - means these imports are not needed in each file
  new webpack.ProvidePlugin({
    React: 'react',
    Radium: 'radium',
    Block: 'kylpo-Block',
    Col: 'kylpo-Col',
    Button: 'kylpo-Button',
    BackgroundImage: 'kylpo-BackgroundImage',
    Row: 'kylpo-Row',
    Flex: 'kylpo-Flex',
    Inline: 'kylpo-Inline',
    InlineBlock: 'kylpo-InlineBlock',
    InlineFlex: 'kylpo-InlineFlex',
    InlineCol: 'kylpo-InlineCol',
    InlineRow: 'kylpo-InlineRow',   
    Text: 'kylpo-Text',
  }),

```
