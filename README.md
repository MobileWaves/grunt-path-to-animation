# grunt-path-to-animation

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-path-to-animation --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-path-to-animation');
```

## path-to-animation task
_Run this task with the `grunt path-to-animation` command._

### Usage Examples

```js
'path-to-animation': {
	'customTask': {
		
		// Points to the file containing animation path arrays
		src: 'animation-paths.json',
  
        // where to save the sass file when ready
        dest: './output/outputfile.scss',
        
        // property name to read from. It will be used for the css class name
        //  and for the css @keyframes name.
        // the namespace should contain valid css class names characters
        namespace: 'custom-namespace-name',
        
        // we need the size of the animated element in order to calculate the translate values
        elementSize: {
          width: 100,
          height: 100
        },
        
        // which sass mixin to @include (this should be  created by the user)s
        //  the default is 'curved-animation'
        sassMixin: 'sassence',
      }
  },
},
```

### options:
#### src
* Description: The JSON file contains animation path arrays
* Type: `String`
* Default: `animation-paths.json`
* Example file: [JSON file example](#jsonexample)

#### dest
* Description: The destination path for the output SASS file
* Type: `String`

#### namespace
* Description: Current subtask namespace to read the animations from. It will be used for the generates `@keyframes` and `css` class name.
* Type: `String`

#### elementSize
* Description: The Object contains `width` and `height` of the animated element. It's needed in order to calculate the path related to its size in percentages.
* Type: `Object`
* elementSize.width - Type: `Number|String`
* elementSize.height - Type: `Number|String`

#### sassMixin
* Description: The name of the sass mixin to be used for the generated css class.
* Type: `String`
* Default: `curved-animation`

### <a name="jsonexample"></a>JSON file example:
Here is how we expect your JSON file to look like:

```
{
	"custom-namespace-name": {
		"item1": [50,50, 70,400, 500, 600, 100, 100],
		"item2": [100, 200, 300, 400]
	},
	"another-namespace": {
		"item1": [400,500, 600, 700]
	}
}

// The path could be flat array in that format:
"item1": [x,y, x,y, x,y]

// or it could be nested:
"item2": [
	[x,y],
	[x,y]
]

```
The @keyframes name and the css class name will be as follows:

```
// the @keyframes:
@keyframes custom-namespace-name-item1 { ... }

// the class that will be applied to trigger the animation:
.animated-namespace-name-item1 { ... }
```

## Dependancies
We depend on SASS. We expect the developers to use SASS in the project they plan to use `path-to-animation`

### Why?
In order to give to the developers the freedom to add any animation rules to the generated animations without configuring templates we rely on using SASS for the generated content.

You will be obligated to provide `sassMixin` for the mixin name you have created already.

### Example:
There should be an existing sass code in your project containing mixin like this:

```css
@mixin my-custom-mixin-name($animationName) {
	animation-duration: 10s;
	animation-delay: 300ms;
	animation-name: $animationName
}
```

The Gruntfile configuration contains:

```js
namespace: 'my-namespace',
sassMixin: 'my-custom-mixin-name',
```

When we are ready, we will generate css class for you containing:

```css
@include my-custom-mixin-name(my-namespace-item1);
```

### Test
Run

```
npm install
npm test
```

# Contributions
If you have any suggestions or the tool doesn't cover your needs, don't hasitate to fork us or send us an email <opensource@mobilewaves.com>. Every comment or contribution will be very appreciated.

# MIT License

Copyright (c) 2016 Mobile Wave Solutions (<opensource@mobilewaves.com>)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.