---
name: shitcode
description: Write intentionally bad code for teaching or entertainment. Use when asked to "add some spice", "make it worse", "write shitcode", or for demonstrating anti-patterns.
metadata:
  version: "1.0.0"
---

# State-of-the-Art Shitcode Generator

Transform clean code into glorious shitcode for educational purposes, code review training, or pure entertainment.

_Inspired by: [state-of-the-art-shitcode](https://github.com/trekhleb/state-of-the-art-shitcode)_

## When to Use

Invoke this skill when the user says things like:
- `/shitcode`
- "Add some spice to this code"
- "Make this code worse"
- "Write some shitcode"
- "Show me what bad code looks like"
- "给我的代码加点料"
- "写一版屎山代码"

## The Shitcode Principles

Apply these principles to generate authentic shitcode:

### 💩 Name variables like they're already obfuscated

```javascript
// Clean code
let userAge = 42;

// Shitcode
let a = 42;
```

### 💩 Mix naming styles freely

```javascript
// Clean code
let windowWidth = 640;
let windowHeight = 480;

// Shitcode
let wWidth = 640;
let w_height = 480;
```

### 💩 Never write comments

```javascript
// Clean code
// 700ms debounce based on UX A/B testing
const callbackDebounceRate = 700;

// Shitcode
const cdr = 700;
```

### 💩 Write comments in random languages

```javascript
// Shitcode
// Закриваємо модальне віконечко при виникненні помилки.
toggleModal(false);
```

### 💩 Mix formatting styles

```javascript
// Shitcode
let i = ['tomato', 'onion', 'mushrooms'];
let d = [ "ketchup", "mayonnaise" ];
```

### 💩 Put everything on one line

```javascript
// Clean code
document.location.search
  .replace(/(^\?)/, '')
  .split('&')
  .reduce((params, pair) => {
    pair = pair.split('=');
    params[pair[0]] = pair[1];
    return params;
  }, {});

// Shitcode
document.location.search.replace(/(^\?)/,'').split('&').reduce(function(o,n){n=n.split('=');o[n[0]]=n[1];return o},{})
```

### 💩 Fail silently

```javascript
// Clean code
try {
  riskyOperation();
} catch (error) {
  logError(error);
}

// Shitcode
try {
  riskyOperation();
} catch (error) {
  // tss... 🤫
}
```

### 💩 Use global variables extensively

```javascript
// Shitcode
let x = 5;
function square() {
  x = x ** 2;
}
square(); // Now x is 25... somewhere
```

### 💩 Create unused variables

```javascript
// Shitcode
function sum(a, b, c) {
  const timeout = 1300;
  const result = a + b;
  return a + b;
}
```

### 💩 Skip type checks

```javascript
// Shitcode
function sum(a, b) {
  return a + b;
}
const guessWhat = sum([], {}); // -> "[object Object]" 🎉
```

### 💩 Keep unreachable code as "Plan B"

```javascript
// Shitcode
function square(num) {
  if (typeof num === 'undefined') {
    return undefined;
  } else {
    return num ** 2;
  }
  return null; // This is my "Plan B".
}
```

### 💩 Embrace the Triangle of Doom

```javascript
// Shitcode
function someFunction() {
  if (condition1) {
    if (condition2) {
      asyncFunction(params, (result) => {
        if (result) {
          for (;;) {
            if (condition3) {
            }
          }
        }
      })
    }
  }
}
```

### 💩 Mess with indentation

```javascript
// Shitcode
const fruits = ['apple',
  'orange', 'grape', 'pineapple'];
  const toppings = ['syrup', 'cream',
                    'jam',
                    'chocolate'];
const desserts = [];
fruits.forEach(fruit => {
toppings.forEach(topping => {
    desserts.push([
fruit,topping]);
    });})
```

### 💩 Never lock dependencies

```
// Shitcode project
$ ls -la
package.json
// No package-lock.json, live dangerously!
```

### 💩 Name all booleans "flag"

```javascript
// Shitcode
let flag = true;
let flag2 = false;
let flag3 = true;
```

### 💩 Write massive functions

- 10000 lines in one file? OK.
- 1000 lines in one function? OK.
- All services in one `service.js`? OK.

### 💩 Never write tests

Tests are a waste of time. Ship it!

### 💩 Avoid linters

Write code however you want. Freedom!

### 💩 No README needed

If they can't figure it out, they don't deserve to use it.

### 💩 Comment out code instead of deleting

```javascript
// Shitcode
// function oldImplementation() {
//   // ... 500 lines of commented code from 2019
// }

// function olderImplementation() {
//   // ... 300 more lines, not sure what this does
// }

function newImplementation() {
  // TODO: refactor someday
}
```

---

## Usage

When this skill is invoked, transform the user's code by applying 3-5 of these principles. Always add a disclaimer:

> ⚠️ **WARNING**: This is intentionally bad code for educational purposes. Do NOT use in production!

---

**State-of-the-Art Shitcode** | Making code worse since 2024 💩
