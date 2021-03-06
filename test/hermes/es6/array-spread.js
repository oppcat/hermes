/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermes -O %s | %FileCheck --match-full-lines %s
// RUN: %hermes -O -emit-binary -out %t.hbc %s && %hermes %t.hbc | %FileCheck --match-full-lines %s

print('array spread');
// CHECK-LABEL: array spread

print([...[]].length);
// CHECK-NEXT: 0

var arr = [...[1,2,3]];
print(arr, arr.length);
// CHECK-NEXT: 1,2,3 3

var arr = [...[1,2,3],'a','b'];
print(arr, arr.length);
// CHECK-NEXT: 1,2,3,a,b 5

var arr = ['a','b',...[1,2,3],'c','d'];
print(arr, arr.length);
// CHECK-NEXT: a,b,1,2,3,c,d 7

var arr = ['a','b',...[1,2,3],'c',...[4,5,6],'d'];
print(arr, arr.length);
// CHECK-NEXT: a,b,1,2,3,c,4,5,6,d 10

var count = 4;
var iterator = {
  [Symbol.iterator]() {
    return {
      next() {
        --count;
        return {value: count, done: count < 0};
      }
    }
  }
}
var arr = [...iterator];
print(arr, arr.length)
// CHECK-NEXT: 3,2,1,0 4
