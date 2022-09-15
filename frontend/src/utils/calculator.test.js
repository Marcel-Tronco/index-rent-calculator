import calculator from './calculator'

test('Calculator handles easy case correct [], 20, 2', () => {
  var result = calculator([], 20, 2)
  expect(result).toBe(171)
})

test('Easy edge case [], 19, 2', () => {
  var result = calculator([], 19, 2)
  expect(Math.round(result*100)/100).toBe(162.45)
})

test('Other side easy edge case [], 161, 2', () => {
  var result = calculator([], 161, 2)
  expect(Math.round(result*100)/100).toBe(1083.53)
})

test('More complex example 1 [0, 11, 13, 18, 20, 25, 26, 39,40], 49, 2', () => {
  var result = calculator([0, 11, 13, 18, 20, 25, 26, 39,40], 49, 2)
  expect(Math.round(result*100)/100).toBe(294.46)
})

test('Same with other wlz  [0, 11, 13, 18, 20, 25, 26, 39,40], 49, 1', () => {
  var result = calculator([0, 11, 13, 18, 20, 25, 26, 39,40], 49, 1)
  expect(Math.round(result*100)/100).toBe(267.69)
})

test('Worst possible [2, 10,11,12,13,25,26,27,28,29], 80,1', () => {
  // -17 -13 -5 -4-3 = 42 ... + 9 = 51 ... +3 = 54
  var result = calculator([2, 10,11,12,13,25,26,27,28,29], 80,1)
  expect(Math.round(result*100)/100).toBe(233.31)
})

test('Best possible [5, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 39, 40], 80, 3', () => {
  // 24 + 5 + 3 + 2 + 3 + 10 = 47 + 3 + 7 + 3
  var result = calculator([5, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 39, 40], 80, 3)
  expect(Math.round(result*100)/100).toBe(811.52)
})