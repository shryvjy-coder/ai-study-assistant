const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');

const source=path.join(__dirname,'learning-integration-legacy.cjs');
const temp=path.join(__dirname,'.learning-integration-routed.cjs');
let code=fs.readFileSync(source,'utf8');
code=code.replace(
  "await ap.reload();await ap.waitForSelector('#learning-goals');",
  "await ap.reload();await ap.waitForSelector('#learning-goals',{state:'attached'});"
);
code=code.replace(
  "await ap.evaluate(()=>{state.learningGoals=[];save()});\n for(const theme of ['light','dark']){",
  "await ap.evaluate(()=>{state.learningGoals=[];save();location.hash='#planner'});await ap.waitForSelector('#planner:not([hidden])');\n for(const theme of ['light','dark']){"
);
fs.writeFileSync(temp,code);
const result=spawnSync(process.execPath,[temp],{
  cwd:path.join(__dirname,'..'),
  stdio:'inherit',
  env:process.env
});
try{fs.unlinkSync(temp)}catch(_){}
process.exit(result.status??1);
