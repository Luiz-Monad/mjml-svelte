import-module Y:\storage\Documents\powershell\Scripts\file-watcher.psm1 -Force
Push-Location ../test
@('src') |
  ForEach-Object { Get-ChildItem "../$_/*.ts" -Recurse -File } |
  Where-Object { $_.FullName -notlike "*svelte-kit*" } |
  watch -verbose |
  wait-watch |
  ForEach-Object {
    $id = $(try { Get-Content 'pid' -ErrorAction SilentlyContinue } catch { $null })
    if ($id) {
      Start-Sleep -Seconds 2
      Stop-Process -Id $id -ErrorAction Ignore
    }
    $proc = (Start-Process `
      (Get-Command node).Source `
      -NoNewWindow `
      -ArgumentList @( '--inspect', '--inspect-brk', '../node_modules/vitest/vitest.mjs' ) `
      -Environment @{ DEBUG='*vite*' } `
      -WorkingDirectory (Get-Location) `
      -PassThru)
    $proc.Id | Out-File 'pid'
  }
while ($true) {
  Start-Sleep -Seconds 1
}
Pop-Location
