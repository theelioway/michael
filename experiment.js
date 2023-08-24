import { keyBy } from "lodash-es"
var array = [
  { dir: "left", code: 97 },
  { dir: "right", code: 100 },
  { dir: "right", code: 97 },
  { dir: "middle", code: 98 },
  { dir: "right", code: 100 },
]

keyBy(array, function (o) {
  return String.fromCharCode(o.code)
})
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }

keyBy(array, "dir")
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
