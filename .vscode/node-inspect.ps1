import-module Y:\storage\Documents\powershell\Scripts\file-watcher.psm1 -Force
Push-Location ..
@('src', 'test') |
  ForEach-Object { Get-ChildItem "./$_/*.ts" -Recurse -File } |
  Where-Object { $_.FullName -notlike "*svelte-kit*" } |
  watch -verbose |
  wait-watch |
  ForEach-Object {
    Get-Process node | Stop-Process
    node './node_modules/vitest/vitest.mjs'
  }
Pop-Location
