import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getCategoryAccent } from './postListCategoryAccent.js'

test('getCategoryAccent: 空值與未知分類使用預設色', () => {
  assert.equal(getCategoryAccent(''), 'rgba(0, 224, 255, 0.55)')
  assert.equal(getCategoryAccent(null), 'rgba(0, 224, 255, 0.55)')
  assert.equal(getCategoryAccent('其他'), 'rgba(0, 224, 255, 0.55)')
})

test('getCategoryAccent: 已知分類對應色', () => {
  assert.equal(getCategoryAccent('專案'), 'rgba(0, 255, 255, 0.85)')
  assert.equal(getCategoryAccent('技術'), 'rgba(172, 214, 255, 0.85)')
  assert.equal(getCategoryAccent('筆記'), 'rgba(120, 255, 214, 0.75)')
})

test('getCategoryAccent: 前後空白會 trim', () => {
  assert.equal(getCategoryAccent('  專案  '), 'rgba(0, 255, 255, 0.85)')
})
