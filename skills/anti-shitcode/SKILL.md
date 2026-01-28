---
name: anti-shitcode
description: Clean code principles - make your code shine. Automatically reference these guidelines when writing or reviewing code.
---

# Anti-Shitcode Principles

A list of clean code principles your project should follow to earn the "State-of-the-Art Clean Code" badge.

_Inspired by: the opposite of [state-of-the-art-shitcode](https://github.com/trekhleb/state-of-the-art-shitcode)_

## Applicable Languages

These principles are **universal** and apply to almost all programming languages:

| Type | Examples |
|------|----------|
| **Dynamic** | JavaScript, TypeScript, Python, Ruby, PHP |
| **Static** | Java, C#, Go, Rust, C/C++ |
| **Functional** | Haskell, Scala, Elixir, Clojure |
| **Scripting** | Shell, Lua, Perl |

> Code examples are primarily in JavaScript/TypeScript, but the principles are language-agnostic.

## Get Your Badge

If your code follows these principles, you may use this badge:

[![State-of-the-art Clean Code](https://img.shields.io/static/v1?label=State-of-the-art&message=Clean%20Code&color=2E8B57)](https://github.com/trekhleb/state-of-the-art-shitcode)

## The Principles

### ✨ Use clear variable names that speak for themselves

A few extra keystrokes save hours of confusion.

_Bad 👎_

```javascript
let a = 42;
```

_Good 👍_

```javascript
let userAge = 42;
```

### ✨ Keep naming style consistent

Pick one style and stick with it.

_Bad 👎_

```javascript
let wWidth = 640;
let w_height = 480;
```

_Good 👍_

```javascript
let windowWidth = 640;
let windowHeight = 480;
```

### ✨ Write comments that explain "why", not "what"

Code tells you what, comments tell you why.

_Bad 👎_

```javascript
const cdr = 700;
```

_Good 👍_

```javascript
// 700ms debounce rate determined by UX A/B testing
// @see: <link to experiment or JIRA task>
const callbackDebounceRate = 700;
```

### ✨ Write comments in the team's common language

Make sure everyone can understand.

_Bad 👎_

```javascript
// Закриваємо модальне віконечко при виникненні помилки.
toggleModal(false);
```

_Good 👍_

```javascript
// Hide modal window on error.
toggleModal(false);
```

### ✨ Keep formatting style consistent

Quotes, spaces, commas - be consistent.

_Bad 👎_

```javascript
let i = ['tomato', 'onion', 'mushrooms'];
let d = [ "ketchup", "mayonnaise" ];
```

_Good 👍_

```javascript
let ingredients = ['tomato', 'onion', 'mushrooms'];
let dressings = ['ketchup', 'mayonnaise'];
```

### ✨ One line, one thing - keep it readable

Code is for humans to read, and incidentally for machines to execute.

_Bad 👎_

```javascript
document.location.search.replace(/(^\?)/,'').split('&').reduce(function(o,n){n=n.split('=');o[n[0]]=n[1];return o},{})
```

_Good 👍_

```javascript
document.location.search
  .replace(/(^\?)/, '')
  .split('&')
  .reduce((searchParams, keyValuePair) => {
    keyValuePair = keyValuePair.split('=');
    searchParams[keyValuePair[0]] = keyValuePair[1];
    return searchParams;
  }, {});
```

### ✨ Handle errors gracefully and log them

Errors aren't meant to be hidden, they're meant to be fixed.

_Bad 👎_

```javascript
try {
  // Something unpredictable.
} catch (error) {
  // tss... 🤫
}
```

_Good 👍_

```javascript
try {
  // Something unpredictable.
} catch (error) {
  setErrorMessage(error.message);
  logError(error);
}
```

### ✨ Avoid global variables, use pure functions

Global variables are a breeding ground for bugs.

_Bad 👎_

```javascript
let x = 5;

function square() {
  x = x ** 2;
}

square(); // Now x is 25.
```

_Good 👍_

```javascript
let x = 5;

function square(num) {
  return num ** 2;
}

x = square(x); // Now x is 25.
```

### ✨ Don't create unused variables

Every variable should have a purpose.

_Bad 👎_

```javascript
function sum(a, b, c) {
  const timeout = 1300;
  const result = a + b;
  return a + b;
}
```

_Good 👍_

```javascript
function sum(a, b) {
  return a + b;
}
```

### ✨ Use type checking

Catch errors at compile time, not runtime.

_Bad 👎_

```javascript
function sum(a, b) {
  return a + b;
}

const guessWhat = sum([], {}); // -> "[object Object]"
```

_Good 👍_

```typescript
function sum(a: number, b: number): number {
  return a + b;
}

// TypeScript will error at compile time
// const guessWhat = sum([], {});
```

### ✨ Remove unreachable code

Dead code is a burden on the living.

_Bad 👎_

```javascript
function square(num) {
  if (typeof num === 'undefined') {
    return undefined;
  } else {
    return num ** 2;
  }
  return null; // This is my "Plan B". (never executes)
}
```

_Good 👍_

```javascript
function square(num) {
  if (typeof num === 'undefined') {
    return undefined;
  }
  return num ** 2;
}
```

### ✨ Avoid deep nesting, use early returns

Flat is better than nested.

_Bad 👎_

```javascript
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
      });
    }
  }
}
```

_Good 👍_

```javascript
async function someFunction() {
  if (!condition1 || !condition2) {
    return;
  }

  const result = await asyncFunction(params);
  if (!result) {
    return;
  }

  for (;;) {
    if (condition3) {
    }
  }
}
```

### ✨ Keep indentation consistent

Indentation is the skeleton of your code.

_Bad 👎_

```javascript
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

_Good 👍_

```javascript
const fruits = ['apple', 'orange', 'grape', 'pineapple'];
const toppings = ['syrup', 'cream', 'jam', 'chocolate'];
const desserts = [];

fruits.forEach(fruit => {
  toppings.forEach(topping => {
    desserts.push([fruit, topping]);
  });
});
```

### ✨ Lock your dependencies

Reproducible builds are the foundation of stability.

_Bad 👎_

```
$ ls -la

package.json
```

_Good 👍_

```
$ ls -la

package.json
package-lock.json
```

### ✨ Use is/has/should prefixes for booleans

Let variable names carry type information.

_Bad 👎_

```javascript
let flag = true;
```

_Good 👍_

```javascript
let isDone = false;
let isEmpty = false;
let hasPermission = true;
```

### ✨ Keep functions short with single responsibility

One function, one job.

- A file should ideally be under 300 lines
- A function should ideally be under 30 lines
- If a function does too much, split it

### ✨ Write tests - they're your safety net

Tests don't waste time, they save debugging time.

```javascript
describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('should handle negative numbers', () => {
    expect(sum(-1, 1)).toBe(0);
  });
});
```

### ✨ Use code linters

Let tools help you maintain code quality.

- ESLint / Prettier for JavaScript
- Pylint / Black for Python
- Rustfmt for Rust

### ✨ Every project needs a README

README is the face of your project.

- What the project is
- How to install
- How to use
- How to contribute

### ✨ Delete unused code, don't comment it out

Git remembers history, you don't have to.

_Bad 👎_

```javascript
// function oldImplementation() {
//   // ... 100 lines of commented code
// }

function newImplementation() {
  // ...
}
```

_Good 👍_

```javascript
function implementation() {
  // ...
}
```

---

**Anti-Shitcode** | Make your code shine ✨
