export const runTimer = (callback) => {
  setTimeout(() => {
    callback()
  }, 5000)
}
