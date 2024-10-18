import { exec } from 'child_process'

// I wanted to use the native Node22 watch command for `npm run build:watch`
// instead of `nodemon` but it looks like I can only re-run a file with this.
exec('tsc', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing build: ${error.message}`)
    return
  }

  if (stderr) {
    console.error(`Build stderr: ${stderr}`)
    return
  }

  console.log(`Build stdout: ${stdout}`)
})
