const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');

const source=path.join(__dirname,'learning-integration.cjs');
const temp=path.join(__dirname,'.learning-integration-routed.cjs');
let code=fs.readFileSync(source,'utf8');
code=code.replace(
  "await ap.reload();await ap.waitForSelector('#learning-goals');",
  "await ap.reload();await ap.waitForSelector('#learning-goals',{state:'attached'});"
);
fs.writeFileSync(temp,code);
const result=spawnSync(process.execPath,[temp],{
  cwd:path.join(__dirname,'..'),
  stdio:'inherit',
  env:process.env
});
try{fs.unlinkSync(temp)}catch(_){}
process.exit(result.status??1);
