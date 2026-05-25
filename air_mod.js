window.AIR_ACTIVE=1;
const ABILITY_MAP={1040:[0,1],971:[0,1,2],972:[1],901:[0,1]};
function cycleUnitAbilities(unitId,typeId){
let abilities=ABILITY_MAP[typeId];
if(!abilities||!_0x529b6b||!_0x529b6b.instance)return;
abilities.forEach((abilityIndex,delayIndex)=>{
setTimeout(()=>{
if(typeof _0x529b6b!=='undefined'&&_0x529b6b.instance&&_0x529b6b.instance.OrderUnitUseAbility){
try{_0x529b6b.instance.OrderUnitUseAbility(unitId,abilityIndex,new _0x5c276f());}catch(e){}
}
},delayIndex*200);
});
}
function executeDeployBatch(req,uids,typeTracking){
for(let i=0;i<_0x3f69cc._airAvailable.length;i++){
let it=_0x3f69cc._airAvailable[i].iterator();
while(it.hasNext()){
let arr=it.next();
for(let j=0;j<<arr.length;j++){
let d=arr[j]._data;
if(!d)continue;
let t=d._type;
if(req[t]&&req[t]>0){
if(d._deployed===0||(d.get_deployed&&d.get_deployed()===0)){
let id=d._uniqueID||d.get_uid();
let res=_0x3f69cc.AirDeploy(i,t,true,1,id);
if(res===1){
uids.push(id);
typeTracking[id]=t;
req[t]--;
}
}
}
}
}
}
function commandDeployedUnits(uids,typeTracking){
if(uids.length===0)return;
let cl=[{x:1398,y:192},{x:-946,y:-646},{x:746,y:232},{x:-380,y:-412},{x:-200,y:-210},{x:-224,y:92},{x:22,y:-28},{x:150,y:300},{x:-150,y:-300},{x:300,y:150},{x:-300,y:-150},{x:0,y:400}],dt=0;
uids.forEach(function(id,idx){
let o=cl[idx%cl.length],tx=o.x,ty=o.y;
setTimeout(function(){
if(_0x529b6b&&_0x529b6b.instance){
let tType=typeTracking[id];
if(tType===1004){
let bgs=Object.values(_0x43bb26._buildingsAll._h.h).filter(b=>!b._destroyed);
let t357=bgs.find(b=>b._type===357),t14=bgs.find(b=>b._type===14);
if(t357&&_0x529b6b.instance.SendGroupAttackOrder){
_0x529b6b.instance.SendGroupAttackOrder([id],1,1,t357.get_id(),0,2,0);
if(t14){
setTimeout(()=>{
if(!_0x529b6b.instance.SendGroupAttackOrder)return;
let u=_0x21a3fc._units.find(x=>x.get_id()===id);
if(u&&u._health>0){
_0x529b6b.instance.SendGroupAttackOrder([id],1,1,t14.get_id(),0,2,0);
}
},4000);
}
}else if(t14&&_0x529b6b.instance.SendGroupAttackOrder){
_0x529b6b.instance.SendGroupAttackOrder([id],1,1,t14.get_id(),0,2,0);
}
}else{
if(_0x529b6b.instance.OrderUnitPoint)_0x529b6b.instance.OrderUnitPoint(id,tx,ty);
if(_0x529b6b.instance.SendGroupMoveOrder)_0x529b6b.instance.SendGroupMoveOrder([id],0,0,[{x:tx,y:ty},{x:0,y:0}],0,false,0);
if(_0x529b6b.instance.SendGroupAttackOrder)_0x529b6b.instance.SendGroupAttackOrder([id],3,tx,ty,0,0);
}
cycleUnitAbilities(id,tType);
}
},dt);
dt+=300;
});
}
window.airModLaunch=function(t1,c1,t2,c2,t3,c3){
if(!_0x3f69cc||!_0x3f69cc._airAvailable)return;
let instantReq={},delayedReq={};
let instantUids=[],delayedUids=[];
let typeTracking={};
[[t1,c1],[t2,c2],[t3,c3]].forEach(([type,count])=>{
if(count>0){
if(type===1004){delayedReq[type]=count;}
else{instantReq[type]=count;}
}
});
executeDeployBatch(instantReq,instantUids,typeTracking);
if(instantUids.length>0){
setTimeout(()=>{commandDeployedUnits(instantUids,typeTracking);},400);
}
if(delayedReq[1004]){
setTimeout(function(){
executeDeployBatch(delayedReq,delayedUids,typeTracking);
if(delayedUids.length>0){
setTimeout(()=>{commandDeployedUnits(delayedUids,typeTracking);},400);
}
},2000);
}
};
function deploy657Revert(){
var b=_0xc83aeb.get_Instance().GetActivePlatoonList(!0);
var p=b.find(function(x){return x._Name==="AIR"||x._name==="AIR"||x.name==="AIR"||x._platoonName==="AIR"});
if(!p){console.log('AIR not found');return;}
var idx=_0x3f69cc.getPlatoonIndex(b,b.indexOf(p));
if(idx===-1){console.log('No slot');return;}
var r=_0x3f69cc.SquadDeploy(idx,0);
console.log('Deploy result:',r);
setTimeout(function(){_0x3f69cc.SquadRetreat(idx,0);console.log('Reverted after 1 second');},1000);
}
const handler=function(e){
if(!e.altKey)return;
let k=e.key.toLowerCase();
if(k==="q"){e.preventDefault();window.airModLaunch(1103,8,1104,1,0,0);}
else if(k==="a"){e.preventDefault();window.airModLaunch(1040,6,1004,1,0,0);setTimeout(function(){deploy657Revert();},1000);}
else if(k==="f"){e.preventDefault();window.airModLaunch(1040,10,1050,1,0,0);}
else if(k==="r"){e.preventDefault();window.AIR_ACTIVE=0;document.removeEventListener("keydown",handler);console.log("[AIR] Module unloaded");}
};
document.addEventListener("keydown",handler);
console.log("[AIR] Deploy Mod loaded. Alt+Q/A/F = Deploy | Alt+R = Unload");
