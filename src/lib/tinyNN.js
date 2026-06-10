// A tiny multilayer perceptron trained with hand-rolled backprop.
// Pure JS, no deps, node-testable. Used by the Neural Playground lab.

export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// sizes e.g. [2, 8, 1] — tanh hidden layers, sigmoid output.
export function makeNet(sizes = [2, 8, 1], seed = 42) {
  const rnd = mulberry32(seed)
  const layers = []
  for (let l = 0; l < sizes.length - 1; l++) {
    const nIn = sizes[l]
    const nOut = sizes[l + 1]
    const scale = Math.sqrt(1 / nIn)
    layers.push({
      W: Array.from({ length: nOut }, () =>
        Array.from({ length: nIn }, () => (rnd() * 2 - 1) * scale),
      ),
      b: new Array(nOut).fill(0),
      vW: Array.from({ length: nOut }, () => new Array(nIn).fill(0)),
      vb: new Array(nOut).fill(0),
    })
  }
  return { sizes, layers }
}

const sigmoid = (z) => 1 / (1 + Math.exp(-z))

// Forward pass returning all activations (needed for backprop).
function forward(net, x) {
  const acts = [x]
  let a = x
  net.layers.forEach((layer, li) => {
    const isLast = li === net.layers.length - 1
    const out = layer.W.map((row, j) => {
      let z = layer.b[j]
      for (let i = 0; i < row.length; i++) z += row[i] * a[i]
      return isLast ? sigmoid(z) : Math.tanh(z)
    })
    acts.push(out)
    a = out
  })
  return acts
}

export function predict(net, x) {
  return forward(net, x).at(-1)[0]
}

// One full-batch gradient step with momentum. data: [{x:[a,b], y:0|1}]
// Returns mean binary cross-entropy loss.
export function trainStep(net, data, lr = 0.3, momentum = 0.9) {
  const L = net.layers.length
  const gW = net.layers.map((l) => l.W.map((r) => new Array(r.length).fill(0)))
  const gb = net.layers.map((l) => new Array(l.b.length).fill(0))
  let loss = 0

  for (const { x, y } of data) {
    const acts = forward(net, x)
    const p = acts.at(-1)[0]
    loss += -(y * Math.log(p + 1e-9) + (1 - y) * Math.log(1 - p + 1e-9))

    // output delta (sigmoid + BCE simplifies to p - y)
    let delta = [p - y]
    for (let l = L - 1; l >= 0; l--) {
      const aPrev = acts[l]
      for (let j = 0; j < delta.length; j++) {
        gb[l][j] += delta[j]
        for (let i = 0; i < aPrev.length; i++) gW[l][j][i] += delta[j] * aPrev[i]
      }
      if (l > 0) {
        // propagate through tanh layer below
        const aHere = acts[l] // activations of layer l (tanh outputs)
        const next = new Array(aHere.length).fill(0)
        for (let i = 0; i < aHere.length; i++) {
          let sum = 0
          for (let j = 0; j < delta.length; j++) sum += net.layers[l].W[j][i] * delta[j]
          next[i] = sum * (1 - aHere[i] * aHere[i])
        }
        delta = next
      }
    }
  }

  const n = data.length || 1
  net.layers.forEach((layer, l) => {
    for (let j = 0; j < layer.W.length; j++) {
      layer.vb[j] = momentum * layer.vb[j] - (lr * gb[l][j]) / n
      layer.b[j] += layer.vb[j]
      for (let i = 0; i < layer.W[j].length; i++) {
        layer.vW[j][i] = momentum * layer.vW[j][i] - (lr * gW[l][j][i]) / n
        layer.W[j][i] += layer.vW[j][i]
      }
    }
  })
  return loss / n
}

export function accuracy(net, data) {
  if (!data.length) return 0
  let ok = 0
  for (const { x, y } of data) if ((predict(net, x) > 0.5 ? 1 : 0) === y) ok++
  return ok / data.length
}

// Probabilities over an n×n grid spanning [-1,1]² — for the decision boundary.
export function predictGrid(net, n = 60) {
  const out = new Float32Array(n * n)
  for (let r = 0; r < n; r++) {
    const y = (r / (n - 1)) * 2 - 1
    for (let c = 0; c < n; c++) {
      const x = (c / (n - 1)) * 2 - 1
      out[r * n + c] = predict(net, [x, y])
    }
  }
  return out
}

// Preset datasets, coordinates in [-1, 1]².
export function makeDataset(name, n = 120, seed = 7) {
  const rnd = mulberry32(seed)
  const pts = []
  const noise = () => (rnd() - 0.5) * 0.25
  if (name === 'blobs') {
    for (let i = 0; i < n; i++) {
      const y = i % 2
      pts.push({
        x: [(y ? 0.5 : -0.5) + noise(), (y ? 0.45 : -0.45) + noise()],
        y,
      })
    }
  } else if (name === 'xor') {
    for (let i = 0; i < n; i++) {
      const qx = rnd() > 0.5 ? 1 : -1
      const qy = rnd() > 0.5 ? 1 : -1
      pts.push({
        x: [qx * (0.2 + rnd() * 0.65), qy * (0.2 + rnd() * 0.65)],
        y: qx * qy > 0 ? 1 : 0,
      })
    }
  } else if (name === 'circle') {
    for (let i = 0; i < n; i++) {
      const inner = i % 2 === 0
      const r = inner ? rnd() * 0.32 : 0.6 + rnd() * 0.3
      const th = rnd() * Math.PI * 2
      pts.push({ x: [r * Math.cos(th), r * Math.sin(th)], y: inner ? 1 : 0 })
    }
  } else if (name === 'spiral') {
    const half = Math.floor(n / 2)
    for (let cls = 0; cls < 2; cls++) {
      for (let i = 0; i < half; i++) {
        const t = (i / half) * 3.2 + 0.3
        const phase = cls * Math.PI
        pts.push({
          x: [
            ((t * Math.cos(t + phase)) / 3.6) + noise() * 0.3,
            ((t * Math.sin(t + phase)) / 3.6) + noise() * 0.3,
          ],
          y: cls,
        })
      }
    }
  }
  return pts
}
