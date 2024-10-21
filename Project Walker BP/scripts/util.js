/**
* Hello, u're looking to steal my code, good luck!
* If I were you I would at least ask permission before that,
* I would be happy instead of you stealing my code and having to take drastic measures.
* Well, thank you, Gabriel Aplok.
*/

import{EntityComponentTypes as e}from"@minecraft/server";export function random(e,t){return Math.floor(Math.random()*(t-e+1))+e}export function getItems(t){let n=t.getComponent(e.Inventory),o=n.container,r=[];for(let i=0;i<o.size;i++){let s=o.getItem(i);s&&r.push(s)}return{inventory:n,container:o,items:r}}export function queryItems(t,n){let o=t.getComponent(e.Inventory),r=o.container,i=[],s=0;for(let a=0;a<r.size;a++){let m=r.getItem(a);m&&n.includes(m.typeId)&&(s+=m.amount,i.push(m))}return{inventory:o,container:r,items:i,amount:s}}export function playSound(e,t,n={x:0,y:0,z:0},o=20,r={},i={}){if(e&&t)for(let s of e.getPlayers(Object.assign({location:n,minDistance:0,maxDistance:o},i)))s.playSound(t,Object.assign({location:n},r));else console.warn("playSound","Some params is missing.")}