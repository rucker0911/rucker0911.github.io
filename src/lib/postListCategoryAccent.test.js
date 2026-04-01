import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  getCategoryAccent,
  CATEGORY_ACCENT_MAP,
  DEFAULT_CATEGORY_ACCENT,
} from './postListCategoryAccent.js'

test('getCategoryAccent: 空值與未知分類使用預設色', () => {
  assert.equal(getCategoryAccent(''), DEFAULT_CATEGORY_ACCENT)
  assert.equal(getCategoryAccent(null), DEFAULT_CATEGORY_ACCENT)
  assert.equal(getCategoryAccent('其他'), DEFAULT_CATEGORY_ACCENT)
})

test('getCategoryAccent: 已知分類與對照表一致', () => {
  for (const [name, rgba] of Object.entries(CATEGORY_ACCENT_MAP)) {
    assert.equal(getCategoryAccent(name), rgba)
  }
})

test('getCategoryAccent: 前後空白會 trim', () => {
  assert.equal(getCategoryAccent('  專案  '), CATEGORY_ACCENT_MAP['專案'])
})
