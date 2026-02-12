/**
 * 目录树顺序缓存工具
 *
 * 设计目标：
 * - 同一棵目录树，既要保存「原始顺序」，也要保存「用户拖拽后的本地顺序」
 * - 只负责读写/合并顺序，不关心拖拽实现（事件和 UI 交互在组件里处理）
 *
 * 使用建议：
 * - 每棵目录树用一个独立的 key（例如：'folderTree', 'tagTree'）
 * - 开发者在首次拿到后端返回的原始树时，调用 `initOriginalOrder`
 * - 拖拽结束、计算出新顺序后，调用 `saveCustomOrder`
 * - 渲染时用 `applyTreeOrder` 把顺序应用到原始数据上
 */

/**
 * @typedef {Object} TreeOrder
 * @property {string} id   - 节点唯一 id
 * @property {number} order - 排序索引（越小越靠前）
 */

const STORAGE_PREFIX = 'tree-order:'

/**
 * 组合本地缓存 key
 * @param {string} treeKey
 * @returns {string}
 */
function getStorageKey(treeKey) {
  return `${STORAGE_PREFIX}${treeKey}`
}

/**
 * 读取某棵树在本地的顺序数据
 * @param {string} treeKey
 * @returns {{ original: TreeOrder[]; custom: TreeOrder[] }}
 */
export function getTreeOrder(treeKey) {
  const key = getStorageKey(treeKey)
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      return { original: [], custom: [] }
    }
    const parsed = JSON.parse(raw)
    return {
      original: Array.isArray(parsed.original) ? parsed.original : [],
      custom: Array.isArray(parsed.custom) ? parsed.custom : []
    }
  } catch (e) {
    console.warn('[useTreeOrder] 读取本地顺序失败:', e)
    return { original: [], custom: [] }
  }
}

/**
 * 写入某棵树在本地的顺序数据
 * @param {string} treeKey
 * @param {{ original?: TreeOrder[]; custom?: TreeOrder[] }} payload
 */
function setTreeOrder(treeKey, payload) {
  const key = getStorageKey(treeKey)
  const current = getTreeOrder(treeKey)
  const next = {
    original: payload.original ?? current.original,
    custom: payload.custom ?? current.custom
  }
  try {
    localStorage.setItem(key, JSON.stringify(next))
  } catch (e) {
    console.warn('[useTreeOrder] 写入本地顺序失败:', e)
  }
}

/**
 * 初始化「原始顺序」
 * - 一般在首次拿到接口返回的目录树时调用
 * - 如果已存在 original，会覆盖原有的 original（但不会动 custom）
 *
 * @param {string} treeKey - 当前目录树的标识 key
 * @param {{ id: string }[]} flatNodes - 扁平化后的节点数组（顺序即原始顺序）
 */
export function initOriginalOrder(treeKey, flatNodes) {
  const original = flatNodes.map((node, index) => ({
    id: String(node.id),
    order: index
  }))
  setTreeOrder(treeKey, { original })
}

/**
 * 保存「拖拽后的本地顺序」
 * - 拖拽结束后，组件根据最新顺序生成扁平数组传入即可
 *
 * @param {string} treeKey - 当前目录树的标识 key
 * @param {{ id: string }[]} flatNodes - 拖拽后、按当前显示顺序排好的一维数组
 */
export function saveCustomOrder(treeKey, flatNodes) {
  const custom = flatNodes.map((node, index) => ({
    id: String(node.id),
    order: index
  }))
  setTreeOrder(treeKey, { custom })
}

/**
 * 清除某棵树的自定义顺序（恢复到原始顺序）
 *
 * @param {string} treeKey
 */
export function resetCustomOrder(treeKey) {
  const key = getStorageKey(treeKey)
  const current = getTreeOrder(treeKey)
  try {
    // 只保留 original，清空 custom
    localStorage.setItem(
      key,
      JSON.stringify({ original: current.original, custom: [] })
    )
  } catch (e) {
    console.warn('[useTreeOrder] 重置本地顺序失败:', e)
  }
}

/**
 * 完全清除某棵树在本地的所有顺序缓存（包括 original + custom）
 * @param {string} treeKey
 */
export function clearTreeOrder(treeKey) {
  const key = getStorageKey(treeKey)
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn('[useTreeOrder] 清除本地顺序失败:', e)
  }
}

/**
 * 根据本地缓存，对一维节点数组应用排序
 *
 * 规则：
 * 1. 如果存在 custom，则优先按 custom 排序
 * 2. 否则如果存在 original，则按 original 排序
 * 3. 找不到任何记录的节点，排在最后，且按原数组顺序
 *
 * @template T extends { id: string }
 * @param {string} treeKey - 当前目录树 key
 * @param {T[]} flatNodes - 待排序的一维节点数组
 * @returns {T[]} 排好序的新数组（不会修改原数组）
 */
export function applyTreeOrder(treeKey, flatNodes) {
  const { original, custom } = getTreeOrder(treeKey)
  const orderSource = custom.length > 0 ? custom : original

  if (!orderSource.length) {
    return flatNodes.slice()
  }

  const orderMap = new Map()
  orderSource.forEach(item => {
    orderMap.set(String(item.id), item.order)
  })

  // 为没有记录的节点分配一个较大的基数，保证排在已记录之后
  const base = orderSource.length

  return flatNodes
    .map((node, index) => {
      const id = String(node.id)
      const order = orderMap.has(id) ? orderMap.get(id) : base + index
      return { node, order }
    })
    .sort((a, b) => a.order - b.order)
    .map(item => item.node)
}
