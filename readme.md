# React Hook useUpdateEveryFullMinute ⏰🕰️🕐

A hook to have state updated every full minute. Of course, scheduled timers are [most likely not 100% accurate](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#reasons_for_delays_longer_than_specified), so is this hook. But do you really need it?

## Usage

```js
const myState = useUpdateEveryFullMinute()

useEffect(() => {
  // do sth every full minute
}, [myState])
```


## Test

Run tests with jest and @testing-library/react-hooks:

```bash
npm run test
```
