Mono repo for constelation's Components, functions, and CONSTANTS. See them in action at https://constelation.github.io/monorepo/.

When thinking about these components, it is best to picture them in a WYSIWYG editor (like the image at https://github.com/danscan/fractal). What are the essential pieces of this editor, and how would you convert them to code components?
- `View`, `ScrollView`, `Space`, `Text`, `Image`, and `Video` would exist on the left side as your palette
- `Style_`, `Event_`, `Animate_` would exist as tabs on the right side for editing properties of the palette components
- Future `Layer` would exist to coordinate `z-index`
- Future `Timeline` would exist to time/choreograph events

## Use
```
npm i -S
constelation-{view,scroll-view,space,text,image,style_,event_,animate_,keydown-decorator,media-decorator,resize-decorator,scroll-decorator,dom}
```

## Dev
To add back .js.flow files into dist, when https://github.com/facebook/flow/issues/945 is fixed, use this script:
```
"build": "lerna exec -- babel *.js -d dist --ignore *.native.js,*.js.flow && lerna exec -- find . -maxdepth 1 -name *.native.js -exec cp {} dist \\; && lerna exec -- find . -maxdepth 1 -name *.js.flow -exec cp {} dist \\;",
```

