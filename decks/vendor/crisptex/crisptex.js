/* crisptex 0.1.0, MIT; glyphs SIL OFL 1.1. Built by scripts/vendor.mjs. */
var Crisptex=(()=>{var ft=Object.create;var L=Object.defineProperty;var ht=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var wt=Object.getPrototypeOf,gt=Object.prototype.hasOwnProperty;var bt=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(r){throw e=0,r}},xt=(t,e)=>{for(var r in e)L(t,r,{get:e[r],enumerable:!0})},W=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of mt(e))!gt.call(t,n)&&n!==r&&L(t,n,{get:()=>e[n],enumerable:!(s=ht(e,n))||s.enumerable});return t};var Z=(t,e,r)=>(r=t!=null?ft(wt(t)):{},W(e||!t||!t.__esModule?L(r,"default",{value:t,enumerable:!0}):r,t)),yt=t=>W(L({},"__esModule",{value:!0}),t);var G=bt((Jt,U)=>{U.exports=globalThis.katex});var Vt={};xt(Vt,{COMMANDS:()=>B,MACROS:()=>A,METRICS:()=>E,SCRIPT_GLYPHS:()=>S,TEXT:()=>y,bitmapPath:()=>pt,bitmapSvg:()=>X,drawBitmap:()=>Dt,layout:()=>R,layoutNode:()=>x,mathml:()=>ut,parse:()=>P,rasterize:()=>lt,render:()=>D,toHtml:()=>Xt,toSvg:()=>Ht});var Y=Z(G(),1);function $(t){let e={};for(let r of t.trim().split(/\n\s*\n/)){let s=r.trim().split(`
`).map(d=>d.trim()),n=s[0],a=n.lastIndexOf(" "),o=n.slice(0,a),c=Number(n.slice(a+1)),l=s.slice(1),i=Math.max(...l.map(d=>d.length));if(l.some(d=>d.length!==i))throw new Error(`glyph ${o}: ragged rows`);if(!/^[#.\n]+$/.test(l.join(`
`)))throw new Error(`glyph ${o}: bad character`);if(Number.isNaN(c))throw new Error(`glyph ${o}: no top`);if(e[o])throw new Error(`glyph ${o}: drawn twice`);e[o]={rows:l.map(d=>[...d].map(u=>u==="#")),top:c,w:i,h:l.length}}return e}var Mt=`
A 6
.###.
#...#
#...#
#####
#...#
#...#
#...#

B 6
####.
#...#
#...#
####.
#...#
#...#
####.

C 6
.###.
#...#
#....
#....
#....
#...#
.###.

D 6
####.
#...#
#...#
#...#
#...#
#...#
####.

E 6
#####
#....
#....
####.
#....
#....
#####

F 6
#####
#....
#....
####.
#....
#....
#....

G 6
.###.
#...#
#....
#.###
#...#
#...#
.###.

H 6
#...#
#...#
#...#
#####
#...#
#...#
#...#

I 6
###
.#.
.#.
.#.
.#.
.#.
###

J 6
..###
...#.
...#.
...#.
...#.
#..#.
.##..

K 6
#...#
#..#.
#.#..
##...
#.#..
#..#.
#...#

L 6
#....
#....
#....
#....
#....
#....
#####

M 6
#...#
##.##
#.#.#
#.#.#
#...#
#...#
#...#

N 6
#...#
##..#
##..#
#.#.#
#..##
#..##
#...#

O 6
.####.
#....#
#....#
#....#
#....#
#....#
.####.

P 6
####.
#...#
#...#
####.
#....
#....
#....

Q 6
.###.
#...#
#...#
#...#
#.#.#
#..#.
.##.#

R 6
####.
#...#
#...#
####.
#.#..
#..#.
#...#

S 6
.###.
#...#
#....
.###.
....#
#...#
.###.

T 6
#####
..#..
..#..
..#..
..#..
..#..
..#..

U 6
#...#
#...#
#...#
#...#
#...#
#...#
.###.

V 6
#...#
#...#
#...#
#...#
.#.#.
.#.#.
..#..

W 6
#...#
#...#
#...#
#.#.#
#.#.#
##.##
#...#

X 6
#...#
#...#
.#.#.
..#..
.#.#.
#...#
#...#

Y 6
#...#
#...#
.#.#.
..#..
..#..
..#..
..#..

Z 6
#####
....#
...#.
..#..
.#...
#....
#####

a 4
.###.
....#
.####
#...#
.####

b 6
#....
#....
####.
#...#
#...#
#...#
####.

c 4
.###
#...
#...
#...
.###

d 6
....#
....#
.####
#...#
#...#
#...#
.####

e 4
.###.
#...#
#####
#....
.###.

f 6
..##
.#..
####
.#..
.#..
.#..
.#..

g 4
.####
#...#
#...#
.####
....#
.###.

h 6
#....
#....
####.
#...#
#...#
#...#
#...#

i 6
.#.
...
##.
.#.
.#.
.#.
###

j 6
..#
...
.##
..#
..#
..#
..#
#.#
.#.

k 6
#...
#...
#..#
#.#.
##..
#.#.
#..#

l 6
##.
.#.
.#.
.#.
.#.
.#.
..#

m 4
####.
#.#.#
#.#.#
#.#.#
#.#.#

n 4
####.
#...#
#...#
#...#
#...#

o 4
.###.
#...#
#...#
#...#
.###.

p 4
####.
#...#
#...#
#...#
####.
#....
#....

q 4
.####
#...#
#...#
#...#
.####
....#
....#

r 4
#.##
##..
#...
#...
#...

s 4
.###
#...
.##.
...#
###.

t 6
.#..
.#..
####
.#..
.#..
.#..
..##

u 4
#...#
#...#
#...#
#...#
.####

v 4
#...#
#...#
.#.#.
.#.#.
..#..

w 4
#...#
#...#
#.#.#
#.#.#
.#.#.

x 4
#...#
.#.#.
..#..
.#.#.
#...#

y 4
#...#
#...#
#...#
#...#
.####
....#
.###.

z 4
#####
...#.
..#..
.#...
#####
`,kt=`
\u{1D434} 6
...##.
..#..#
..#..#
.#####
.#..#.
#...#.
#...#.

\u{1D435} 6
..####.
..#...#
.#...#.
.####..
.#...#.
#...#..
####...

\u{1D436} 6
...###
..#...
.#....
.#....
#.....
#...#.
.###..

\u{1D437} 6
..####.
..#...#
.#....#
.#....#
.#...#.
#...#..
####...

\u{1D438} 6
..#####
..#....
.#.....
.####..
.#.....
#......
#####..

\u{1D439} 6
..#####
..#....
.#.....
.####..
.#.....
#......
#......

\u{1D43A} 6
...###.
..#...#
.#.....
.#..###
#....#.
#...#..
.###...

\u{1D43B} 6
..#...#
..#...#
.#...#.
.#####.
.#...#.
#...#..
#...#..

\u{1D43C} 6
..###
...#.
..#..
..#..
.#...
.#...
###..

\u{1D43D} 6
...###
....#.
...#..
...#..
..#...
#.#...
.#....

\u{1D43E} 6
..#...#
..#..#.
.#.##..
.##....
.#.#...
#...#..
#...#..

\u{1D43F} 6
..#...
..#...
.#....
.#....
#.....
#.....
#####.

\u{1D440} 6
..#...#
..##.##
.#.#.#.
.#.#.#.
.#...#.
#...#..
#...#..

\u{1D441} 6
..#...#
..##..#
.#.#.#.
.#.#.#.
.#..##.
#...#..
#...#..

\u{1D442} 6
...###.
..#...#
.#....#
.#....#
#....#.
#...#..
.###...

\u{1D443} 6
..####.
..#...#
.#...#.
.####..
.#.....
#......
#......

\u{1D444} 6
...###.
..#...#
.#....#
.#....#
#..#.#.
#...#..
.###.#.

\u{1D445} 6
..####.
..#...#
.#...#.
.####..
.#.#...
#...#..
#...#..

\u{1D446} 6
...###.
..#...#
..#....
...###.
.....#.
#...#..
.###...

\u{1D447} 6
..#####
....#..
...#...
...#...
..#....
..#....
..#....

\u{1D448} 6
..#...#
..#...#
.#...#.
.#...#.
#...#..
#...#..
.###...

\u{1D449} 6
.#...#
.#...#
.#..#.
.#..#.
.#.#..
.#.#..
..#...

\u{1D44A} 6
.#...#
.#...#
#...#.
#.#.#.
#.#.#.
##.##.
#...#.

\u{1D44B} 6
..#...#
..#...#
...#.#.
...##..
..#.#..
.#...#.
#...#..

\u{1D44C} 6
.#...#
.#...#
..#.#.
...#..
..#...
..#...
..#...

\u{1D44D} 6
..#####
.....#.
....#..
...#...
..#....
.#.....
#####..

\u{1D44E} 4
..##.#
.#..#.
#...#.
#..##.
.##.#.

\u{1D44F} 6
..#...
..#...
.####.
.#...#
#...#.
#...#.
####..

\u{1D450} 4
..###
.#...
#....
#....
.###.

\u{1D451} 6
.....#
.....#
..####
.#..#.
#...#.
#..##.
.##.#.

\u{1D452} 4
..###.
.#...#
#####.
#.....
.###..

\u{1D453} 6
...##
..#..
..#..
.####
.#...
.#...
.#...
#....
#....

\u{1D454} 4
..####
.#..#.
#...#.
.####.
...#..
###...

\u210E 6
..#...
..#...
.####.
.#...#
.#..#.
#...#.
#...#.

\u{1D456} 6
..#
...
.#.
.#.
#..
#..
.##

\u{1D457} 6
...#
....
..#.
..#.
.#..
.#..
.#..
.#..
#...

\u{1D458} 6
..#...
..#...
.#..#.
.#.#..
.##...
#.#...
#..#..

\u{1D459} 6
.##
..#
..#
.#.
.#.
.#.
..#

\u{1D45A} 4
.##.#.
#.#.#.
#.#.#.
#.#.#.
#.#.#.

\u{1D45B} 4
.###..
#...#.
#...#.
#...#.
#...#.

\u{1D45C} 4
..###.
.#...#
#....#
#...#.
.###..

\u{1D45D} 4
..####.
..#...#
.#....#
.#...#.
.####..
#......
#......

\u{1D45E} 4
..####
.#..#.
#...#.
#..##.
.##.#.
...#..
...#..

\u{1D45F} 4
.#.##
.##..
#....
#....
#....

\u{1D460} 4
..###
.#...
..##.
...#.
###..

\u{1D461} 6
..#..
..#..
.####
.#...
.#...
#....
.##..

\u{1D462} 4
.#...#
.#...#
#...#.
#..##.
.##.#.

\u{1D463} 4
#...#
#...#
#..#.
.#.#.
..#..

\u{1D464} 4
#....#
#....#
#..#.#
#.#.#.
.#.#..

\u{1D465} 4
##...#.
..#.#..
...#...
..#.#..
.#...##

\u{1D466} 4
.#...#
.#...#
#...#.
#..##.
.##.#.
...#..
###...

\u{1D467} 4
..####
....#.
..##..
.#....
####..
`,vt=`
0 6
.###.
#...#
#...#
#.#.#
#...#
#...#
.###.

1 6
..#..
.##..
#.#..
..#..
..#..
..#..
#####

2 6
.###.
#...#
....#
...#.
..#..
.#...
#####

3 6
.###.
#...#
....#
..##.
....#
#...#
.###.

4 6
...#.
..##.
.#.#.
#..#.
#####
...#.
...#.

5 6
#####
#....
####.
....#
....#
#...#
.###.

6 6
..##.
.#...
#....
####.
#...#
#...#
.###.

7 6
#####
....#
...#.
..#..
.#...
.#...
.#...

8 6
.###.
#...#
#...#
.###.
#...#
#...#
.###.

9 6
.###.
#...#
#...#
.####
....#
...#.
.##..

. 0
#

, 0
.#
#.

: 4
#
.
.
#

; 4
.#
..
..
.#
#.

! 6
#
#
#
#
#
.
#

? 6
.###.
#...#
....#
...#.
..#..
.....
..#..

' 6
#
#

" 6
#.#
#.#

- 3
###

/ 7
....#
....#
...#.
...#.
..#..
..#..
.#...
.#...
#....
#....

+ 5
..#..
..#..
#####
..#..
..#..

\u2212 3
#####

= 4
#####
.....
#####

\u2260 5
...#.
#####
..#..
#####
.#...

< 5
...##
.##..
#....
.##..
...##

> 5
##...
..##.
....#
..##.
##...

\u2264 6
...##
.##..
#....
.##..
...##
.....
#####

\u2265 6
##...
..##.
....#
..##.
##...
.....
#####

\u2261 5
#####
.....
#####
.....
#####

\u2248 5
.##..#
#..##.
......
.##..#
#..##.

\u223C 4
.##..#
#..##.

\u2245 6
.##..#
#..##.
......
######
......
######

\xB7 3
#

\u2026 0
#.#.#

\u22EF 3
#.#.#

\xD7 5
#...#
.#.#.
..#..
.#.#.
#...#

\xF7 5
..#..
.....
#####
.....
..#..

\xB1 6
..#..
..#..
#####
..#..
..#..
.....
#####

\u2213 6
#####
.....
..#..
..#..
#####
..#..
..#..

\u2217 5
..#..
#.#.#
.###.
#.#.#
..#..

\u2218 4
.#.
#.#
.#.

\u221E 4
.##.##.
#..#..#
.##.##.

\u2202 6
.##.
...#
...#
.###
#..#
#..#
.##.

\u2207 6
#######
#.....#
.#...#.
.#...#.
..#.#..
..#.#..
...#...

% 6
##...#
##..#.
...#..
..#...
.#....
#...##
#...##

\xAC 4
#####
....#
....#

\u2227 5
..#..
..#..
.#.#.
.#.#.
#...#

\u2228 5
#...#
.#.#.
.#.#.
..#..
..#..

\u2200 6
#...#
#...#
#####
.#.#.
.#.#.
..#..
..#..

\u2203 6
#####
....#
....#
#####
....#
....#
#####

\u2204 7
.....#.
######.
....##.
....#..
#####..
...#.#.
...#.#.
######.
.#.....

\u22A2 6
#....
#....
#....
#####
#....
#....
#....

\u22A8 6
#....
#....
#####
#....
#####
#....
#....

\u22A4 6
#####
..#..
..#..
..#..
..#..
..#..
..#..

\u22A5 6
..#..
..#..
..#..
..#..
..#..
..#..
#####

\u2208 5
.####
#....
#####
#....
.####

\u220B 5
####.
....#
#####
....#
####.

\u2209 6
...#.
.###.
#..#.
#####
#.#..
.####
.#...

\u2282 5
.####
#....
#....
#....
.####

\u2283 5
####.
....#
....#
....#
####.

\u2286 6
.####
#....
#....
#....
.####
.....
#####

\u2287 6
####.
....#
....#
....#
####.
.....
#####

\u228A 6
.####
#....
#....
#....
.####
...#.
#####

\u2284 6
...#.
.###.
#..#.
#.#..
#.#..
.####
.#...

\u222A 5
#...#
#...#
#...#
#...#
.###.

\u2229 5
.###.
#...#
#...#
#...#
#...#

\u2216 6
#....
#....
.#...
..#..
...#.
....#
....#

\\ 7
#....
#....
.#...
.#...
..#..
..#..
...#.
...#.
....#
....#

\u2205 7
......#
..###.#
.#...#.
.#..##.
.#.#.#.
.##..#.
.#...#.
#.###..

\u2192 5
....#..
.....#.
#######
.....#.
....#..

\u2190 5
..#....
.#.....
#######
.#.....
..#....

\u2194 5
..#...#..
.#.....#.
#########
.#.....#.
..#...#..

\u21A6 5
#...#..
#....#.
#######
#....#.
#...#..

\u27F6 5
.......#..
........#.
##########
........#.
.......#..

\u21D2 5
....#..
######.
......#
######.
....#..

\u21D0 5
..#....
.######
#......
.######
..#....

\u21D4 5
..#...#..
.#######.
#.......#
.#######.
..#...#..

\u2191 6
..#..
.###.
#.#.#
..#..
..#..
..#..
..#..

\u2193 6
..#..
..#..
..#..
..#..
#.#.#
.###.
..#..

\u25A1 6
#######
#.....#
#.....#
#.....#
#.....#
#.....#
#######

\u25C7 6
...#...
..#.#..
.#...#.
#.....#
.#...#.
..#.#..
...#...

\u25CB 6
..###..
.#...#.
#.....#
#.....#
#.....#
.#...#.
..###..

\u2294 3
#...#
#...#
#...#
#####

\u25BE 6
#######
#######
.#####.
..###..
...#...

\u25C2 5
...#
..##
.###
..##
...#

\u25B8 5
#...
##..
###.
##..
#...

\u2223 7
#
#
#
#
#
#
#
#
#
#

| 7
#
#
#
#
#
#
#
#
#
#

\u2016 7
#.#
#.#
#.#
#.#
#.#
#.#
#.#
#.#
#.#
#.#

( 7
..#
.#.
.#.
#..
#..
#..
#..
.#.
.#.
..#

) 7
#..
.#.
.#.
..#
..#
..#
..#
.#.
.#.
#..

[ 7
###
#..
#..
#..
#..
#..
#..
#..
#..
###

] 7
###
..#
..#
..#
..#
..#
..#
..#
..#
###

{ 7
..##
.#..
.#..
.#..
#...
.#..
.#..
.#..
.#..
..##

} 7
##..
..#.
..#.
..#.
...#
..#.
..#.
..#.
..#.
##..

\u27E8 6
...#
..#.
..#.
.#..
#...
.#..
..#.
..#.
...#

\u27E9 6
#...
.#..
.#..
..#.
...#
..#.
.#..
.#..
#...

\u230A 7
#..
#..
#..
#..
#..
#..
#..
#..
#..
###

\u230B 7
..#
..#
..#
..#
..#
..#
..#
..#
..#
###

\u2308 7
###
#..
#..
#..
#..
#..
#..
#..
#..
#..

\u2309 7
###
..#
..#
..#
..#
..#
..#
..#
..#
..#

\u2211 7
#######
#......
.#.....
..#....
...#...
..#....
.#.....
#......
#######

\u220F 7
#######
.#...#.
.#...#.
.#...#.
.#...#.
.#...#.
.#...#.
.#...#.
###.###

\u222B 7
...##
..#..
..#..
..#..
..#..
..#..
..#..
..#..
..#..
##...

\u22C3 7
#.....#
#.....#
#.....#
#.....#
#.....#
#.....#
#.....#
.#...#.
..###..

\u22C2 7
..###..
.#...#.
#.....#
#.....#
#.....#
#.....#
#.....#
#.....#
#.....#

\u2115 6
##...#
#.#..#
#.##.#
#.#.##
#.#..#
#.#..#
#.#..#

\u2124 6
######
...#.#
..#.#.
..#.#.
.#.#..
#.#...
######

\u211A 6
.####.
#.#..#
#.#..#
#.#..#
#.#.##
#.#..#
.#####

\u211D 6
#####.
#.#..#
#.#..#
#.###.
#.#.#.
#.#..#
#.#..#

\u2102 6
.#####
#.#...
#.#...
#.#...
#.#...
#.#...
.#####

\u2119 6
#####.
#.#..#
#.#..#
#.###.
#.#...
#.#...
#.#...

\u{1D539} 6
#####.
#.#..#
#.#..#
#.###.
#.#..#
#.#..#
#####.

\u{1D53C} 6
######
#.#...
#.#...
#.###.
#.#...
#.#...
######
`,$t=`
\u03B1 4
.##..#
#..#.#
#...#.
#..#.#
.##..#

\u03B2 6
.##.
#..#
#.#.
#..#
#..#
#..#
###.
#...
#...

\u03B3 4
#...#
.#..#
.#.#.
..#..
..#..
.#.#.
..#..

\u03B4 6
.###
#...
.##.
#..#
#..#
#..#
.##.

\u03B5 4
.###
#...
.##.
#...
.###

\u03B6 6
####
..#.
.#..
#...
#...
#...
.##.
...#
..#.

\u03B7 4
#.##.
##..#
#...#
#...#
#...#
....#
....#

\u03B8 6
.##.
#..#
#..#
####
#..#
#..#
.##.

\u03B9 4
#..
#..
#..
#..
.##

\u03BA 4
#..#
#.#.
##..
#.#.
#..#

\u03BB 6
##...
..#..
..#..
.#.#.
.#.#.
#...#
#...#

\u03BC 4
#..#.
#..#.
#..#.
#.##.
##.##
#....
#....

\u03BD 4
##..#
.#..#
.#.#.
.#.#.
..#..

\u03BE 6
.###
#...
.##.
#...
#...
.##.
...#
..#.

\u03C0 4
#####
.#.#.
.#.#.
.#.#.
.#..#

\u03C1 4
.##.
#..#
#..#
#..#
###.
#...
#...

\u03C3 4
.####
#..#.
#..#.
#..#.
.##..

\u03C2 4
.###
#...
#...
.##.
...#
..#.

\u03C4 4
#####
..#..
..#..
..#..
...##

\u03C5 4
#...#
#...#
#...#
#...#
.###.

\u03C6 5
..#..
.###.
#.#.#
#.#.#
#.#.#
.###.
..#..
..#..

\u03C7 4
#...#
.#.#.
.#.#.
..#..
.#.#.
.#.#.
#...#

\u03C8 5
..#..
#.#.#
#.#.#
#.#.#
#.#.#
.###.
..#..
..#..

\u03C9 4
.#.#.
#...#
#.#.#
#.#.#
.#.#.

\u0393 6
#####
#....
#....
#....
#....
#....
#....

\u0394 6
..#..
..#..
.#.#.
.#.#.
#...#
#...#
#####

\u0398 6
.###.
#...#
#...#
#####
#...#
#...#
.###.

\u039B 6
..#..
..#..
.#.#.
.#.#.
#...#
#...#
#...#

\u039E 6
#####
.....
.....
.###.
.....
.....
#####

\u03A0 6
#####
#...#
#...#
#...#
#...#
#...#
#...#

\u03A3 6
#####
#....
.#...
..#..
.#...
#....
#####

\u03A5 6
.#.#.
#.#.#
..#..
..#..
..#..
..#..
..#..

\u03A6 6
..#..
.###.
#.#.#
#.#.#
#.#.#
.###.
..#..

\u03A8 6
#.#.#
#.#.#
#.#.#
.###.
..#..
..#..
..#..

\u03A9 6
.###.
#...#
#...#
#...#
.#.#.
.#.#.
##.##
`,St=`
0 4
###
#.#
#.#
#.#
###

1 4
.#.
##.
.#.
.#.
###

2 4
##.
..#
.#.
#..
###

3 4
##.
..#
.#.
..#
##.

4 4
#.#
#.#
###
..#
..#

5 4
###
#..
##.
..#
##.

6 4
.##
#..
###
#.#
###

7 4
###
..#
.#.
.#.
.#.

8 4
###
#.#
###
#.#
###

9 4
###
#.#
###
..#
##.

A 4
.#.
#.#
###
#.#
#.#

B 4
##.
#.#
##.
#.#
##.

C 4
.##
#..
#..
#..
.##

D 4
##.
#.#
#.#
#.#
##.

E 4
###
#..
##.
#..
###

F 4
###
#..
##.
#..
#..

G 4
.##
#..
#.#
#.#
.##

H 4
#.#
#.#
###
#.#
#.#

I 4
###
.#.
.#.
.#.
###

J 4
..#
..#
..#
#.#
.#.

K 4
#.#
#.#
##.
#.#
#.#

L 4
#..
#..
#..
#..
###

M 4
#...#
##.##
#.#.#
#...#
#...#

N 4
#..#
##.#
#.##
#..#
#..#

O 4
.##.
#..#
#..#
#..#
.##.

P 4
##.
#.#
##.
#..
#..

Q 4
.#.
#.#
#.#
##.
.##

R 4
##.
#.#
##.
#.#
#.#

S 4
.##
#..
.#.
..#
##.

T 4
###
.#.
.#.
.#.
.#.

U 4
#.#
#.#
#.#
#.#
###

V 4
#.#
#.#
#.#
#.#
.#.

W 4
#...#
#...#
#.#.#
##.##
#...#

X 4
#.#
#.#
.#.
#.#
#.#

Y 4
#.#
#.#
.#.
.#.
.#.

Z 4
###
..#
.#.
#..
###

a 3
.##
#.#
#.#
.##

b 4
#..
##.
#.#
#.#
##.

c 3
.##
#..
#..
.##

d 4
..#
.##
#.#
#.#
.##

e 3
.#.
###
#..
.##

f 4
.##
.#.
###
.#.
.#.

g 3
.##
#.#
.##
..#
##.

h 4
#..
##.
#.#
#.#
#.#

i 4
#
.
#
#
#

j 4
.#
..
.#
.#
.#
#.

k 4
#..
#.#
##.
#.#
#.#

l 4
#.
#.
#.
#.
.#

m 3
##.#.
#.#.#
#.#.#
#.#.#

n 3
##.
#.#
#.#
#.#

o 3
.#.
#.#
#.#
.#.

p 3
##.
#.#
#.#
##.
#..

q 3
.##
#.#
#.#
.##
..#

r 3
#.#
##.
#..
#..

s 3
.##
##.
..#
##.

t 4
.#.
###
.#.
.#.
..#

u 3
#.#
#.#
#.#
.##

v 3
#.#
#.#
#.#
.#.

w 3
#...#
#...#
#.#.#
.#.#.

x 3
#.#
.#.
.#.
#.#

y 3
#.#
#.#
.##
..#
##.

z 3
###
..#
.#.
###

\u03B1 3
.#.#
#.#.
#.#.
.#.#

\u03B4 4
.##
#..
.#.
#.#
.#.

\u03B5 3
.##
##.
#..
.##

\u03B8 4
.#.
#.#
###
#.#
.#.

\u03BB 4
#..
.#.
.#.
#.#
#.#

\u03C0 3
####
.#.#
.#.#
.#.#

\u03C3 3
.###
#.#.
#.#.
.#..

\u03C9 3
.#.#.
#...#
#.#.#
.#.#.

\u03A3 4
###
#..
.#.
#..
###

+ 3
.#.
###
.#.

\u2212 2
###

= 3
###
...
###

\u2217 4
#.#.#
.###.
#.#.#

\u2032 3
.#
.#
#.

, 0
.#
#.

. 0
#

: 3
#
.
#

< 4
..#
.#.
#..
.#.
..#

> 4
#..
.#.
..#
.#.
#..

\u2264 4
.##
#..
.##
...
###

\u2208 4
.##
#..
###
#..
.##

\u2192 3
..#.
####
..#.

\u221E 3
.#.#.
#.#.#
.#.#.

( 5
.#
#.
#.
#.
#.
.#

) 5
#.
.#
.#
.#
.#
#.

| 5
#
#
#
#
#
#

{ 5
.#
.#
#.
.#
.#
.#

} 5
#.
#.
.#
#.
#.
#.
`,Et=`
\u{1D49C} 6
...##.
..#.#.
..#.#.
.#..#.
.####.
#...#.
#...##

\u212C 6
.####.
#.#..#
..#..#
..###.
..#..#
.##..#
#.###.

\u{1D49E} 6
...###
..#..#
.#....
#.....
#.....
#...#.
.###..

\u{1D49F} 6
.####.
#.#..#
..#..#
..#..#
..#..#
.##.#.
#.##..

\u2130 6
..###
.#..#
.#...
..##.
.#...
#...#
.###.

\u2131 6
.#####
#.#...
..#...
..###.
..#...
.##...
#.....

\u{1D4A2} 6
..###.
.#...#
#.....
#..###
#...#.
.#..#.
..##..

\u210B 6
.#..#.
#.#.#.
..#.#.
..###.
..#.#.
.##.#.
#...##

\u2110 6
.####
#.#..
..#..
..#..
..#..
..#..
.###.

\u{1D4A5} 6
..####
.#..#.
....#.
....#.
....#.
#..#..
.##...

\u{1D4A6} 6
.#..##
#.#.#.
..##..
..#...
..##..
.##.#.
#...##

\u2112 6
...##
..#.#
..#..
..#..
..#..
.##..
#.###

\u2133 6
.#...#.
#.#.##.
..##.#.
..#..#.
..#..#.
.##..#.
#....##

\u{1D4A9} 6
.#...#
#.#..#
..##.#
..#.##
..#..#
.##..#
#....#

\u{1D4AA} 6
..###.
.#...#
#....#
#....#
#....#
#...#.
.###..

\u{1D4AB} 6
.####.
#.#..#
..#..#
..###.
..#...
.##...
#.....

\u{1D4AC} 6
..###.
.#...#
#....#
#....#
#..#.#
#...#.
.###.#

\u211B 6
.####.
#.#..#
..#..#
..###.
..#.#.
.##..#
#....#

\u{1D4AE} 6
..####
.#....
.#....
..##..
....#.
#...#.
.###..

\u{1D4AF} 6
.#####
#..#..
...#..
...#..
...#..
..##..
.#....

\u{1D4B0} 6
.#...#
#.#..#
..#..#
..#..#
..#..#
..#.##
...#.#

\u{1D4B1} 6
.#...#
#.#..#
..#..#
..#..#
..#.#.
..#.#.
...#..

\u{1D4B2} 6
.#....#
#.#...#
..#...#
..#.#.#
..#.#.#
..##.##
..#...#

\u{1D4B3} 6
.#...#
#.#.#.
...#..
...#..
..#.#.
.#...#
#....#

\u{1D4B4} 6
.#...#
#.#..#
..#..#
...###
.....#
.#..#.
..##..

\u{1D4B5} 6
.#####
#...#.
...#..
..#...
.#....
#...#.
#####.
`,At=`
\u2032 7
.#
.#
#.

# 6
.#.#.
#####
.#.#.
.#.#.
#####
.#.#.

& 6
.##..
#..#.
.##..
.#..#
#.##.
#..#.
.##.#

_ -1
#####

$ 7
..#..
.####
#.#..
.###.
..#.#
####.
..#..

\u2113 6
..#.
.#.#
.#.#
.##.
.#..
##..
.###

\u0127 6
.#...
####.
.#...
.###.
.#..#
.#..#
.#..#

\u2135 6
#...#
.#..#
.##.#
#.#..
#..#.
#..#.
#...#

\u2220 6
....#
...#.
..#..
.#...
#....
#####

\u2225 7
#.#
#.#
#.#
#.#
#.#
#.#
#.#
#.#
#.#
#.#

\u226A 5
..#..#
.#..#.
#..#..
.#..#.
..#..#

\u226B 5
#..#..
.#..#.
..#..#
.#..#.
#..#..

\u221D 5
.##.##
#..#..
#..#..
#..#..
.##.##

\u22C6 5
..#..
#####
.###.
.#.#.
#...#

\u2022 4
.##.
####
####
.##.

\u2295 5
.###.
#.#.#
#####
#.#.#
.###.

\u2297 5
.###.
##.##
#.#.#
##.##
.###.

\u22EE 6
#
.
.
#
.
.
#

\u22F1 6
#.....
......
...#..
......
......
.....#

\u25B3 5
..#..
..#..
.#.#.
.#.#.
#####

\u227A 5
....#
..##.
##...
..##.
....#

\u227B 5
#....
.##..
...##
.##..
#....

\u2224 7
#..
#..
#.#
##.
#..
#..
#..
#..
#..
#..

\u03D1 6
.##..
#..#.
#..#.
.####
#..#.
#..#.
.##..

\u03D6 4
######
#....#
#.##.#
#.##.#
.#..#.

\u03F1 4
.##.
#..#
#..#
#..#
.##.
..#.
.###

\u27F9 5
......#..
########.
........#
########.
......#..

\u27FA 5
..#....#..
.########.
#........#
.########.
..#....#..

\u27F5 5
..#.......
.#........
##########
.#........
..#.......

\u27F8 5
..#......
.########
#........
.########
..#......

\u27FC 5
#......#..
#.......#.
##########
#.......#.
#......#..

\u21AA 5
.#...#..
#.....#.
.#######
......#.
.....#..

\u21CC 5
..#....
.#.....
#######
.......
#######
.....#.
....#..

\u2288 6
.####
#..#.
#..#.
#.#..
.####
.#...
#####

\u228B 6
####.
....#
....#
....#
####.
...#.
#####
`,y={...$(Mt),...$(kt),...$(vt),...$($t),...$(Et),...$(At)};for(let[t,e]of Object.entries({\u0391:"A",\u0392:"B",\u0395:"E",\u0396:"Z",\u0397:"H",\u0399:"I",\u039A:"K",\u039C:"M",\u039D:"N",\u039F:"O",\u03A1:"P",\u03A4:"T",\u03A7:"X",\u03BF:"o"}))y[t]??(y[t]=y[e]);var S=$(St),z=Object.fromEntries([..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"].map(t=>{if(t==="h")return[t,"\u210E"];let e=t<="Z"?119860+t.charCodeAt(0)-65:119886+t.charCodeAt(0)-97;return[t,String.fromCodePoint(e)]})),V=Object.fromEntries([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map(t=>{let e={B:8492,E:8496,F:8497,H:8459,I:8464,L:8466,M:8499,R:8475};return[t,String.fromCodePoint(e[t]??119964+t.charCodeAt(0)-65)]})),E={cap:7,xHeight:5,axis:3,desc:2,scriptCap:5,scriptX:4};function M(t,e,r){let s=Array.from({length:e},()=>Array(t).fill(!1));return{rows:s,set:(a,o)=>{a>=0&&a<t&&o>=0&&o<e&&(s[o][a]=!0)},glyph:()=>({rows:s,top:r,w:t,h:e})}}function T(t){return{...t,rows:t.rows.map(e=>[...e].reverse())}}function Ot(t,e){return{...t,top:e,rows:[...t.rows].reverse()}}function Ct(t){let e=3;for(;(e+1)*e<=.6*t;)e++;return e}function K(t,e,r){switch(t){case"(":case")":{let s=Ct(e),n=M(s,e,r),a=0;for(let o=1;o<s;o++)for(let c=0;c<o;c++)n.set(s-o,a),n.set(s-o,e-1-a),a++;for(let o=0;o<e;o++)n.rows[o].some(Boolean)||n.set(0,o);return t==="("?n.glyph():T(n.glyph())}case"[":case"]":case"\u230A":case"\u230B":case"\u2308":case"\u2309":{let s=M(3,e,r);for(let n=0;n<e;n++)s.set(0,n);return(t==="["||t==="]"||t==="\u2308"||t==="\u2309")&&(s.set(1,0),s.set(2,0)),(t==="["||t==="]"||t==="\u230A"||t==="\u230B")&&(s.set(1,e-1),s.set(2,e-1)),t==="["||t==="\u230A"||t==="\u2308"?s.glyph():T(s.glyph())}case"{":case"}":{let s=e>=20?5:4,n=M(s,e,r),a=Math.floor((e-1)/2),o=s-2;for(let c=o;c<s;c++)n.set(c,0),n.set(c,e-1);for(let c=1;c<e-1;c++)c!==a&&n.set(o-1,c);for(let c=0;c<o-1;c++)n.set(c,a);return t==="{"?n.glyph():T(n.glyph())}case"\u27E8":case"\u27E9":{let s=Math.floor((e-1)/2),n=Math.ceil(s/2)+1,a=M(n,e,r);for(let o=0;o<e;o++){let c=Math.abs(o-s);a.set(Math.min(n-1,Math.round(c*(n-1)/s)),o)}return t==="\u27E8"?a.glyph():T(a.glyph())}case"|":case"\u2223":{let s=M(1,e,r);for(let n=0;n<e;n++)s.set(0,n);return s.glyph()}case"\u2016":{let s=M(3,e,r);for(let n=0;n<e;n++)s.set(0,n),s.set(2,n);return s.glyph()}}}function J(t,e){let s=M(4,t,e);for(let n=0;n<t-1;n++)s.set(3,n);return s.set(2,t-1),s.set(1,t-2),s.set(0,t-3),s.set(3,0),s.glyph()}function Q(t,e){let s=e+6;switch(t){case"\u2211":{let a=M(9,13,s);for(let o=0;o<9;o++)a.set(o,0),a.set(o,12);a.set(8,1),a.set(8,11),a.set(0,1),a.set(0,11);for(let o=0;o<=5;o++)a.set(1+o,1+o),a.set(1+o,11-o);return a.glyph()}case"\u220F":{let a=M(9,13,s);for(let o=0;o<9;o++)a.set(o,0);for(let o=0;o<13;o++)a.set(1,o),a.set(7,o);return a.set(0,12),a.set(2,12),a.set(8,12),a.set(6,12),a.glyph()}case"\u222B":{let a=M(5,15,e+7);a.set(3,0),a.set(4,0),a.set(2,1);for(let o=1;o<14;o++)a.set(2,o);return a.set(2,13),a.set(0,14),a.set(1,14),a.glyph()}case"\u22C3":case"\u22C2":{let a=M(9,13,s);for(let o=0;o<11;o++)a.set(0,o),a.set(8,o);a.set(1,11),a.set(7,11);for(let o=2;o<7;o++)a.set(o,12);return t==="\u22C3"?a.glyph():Ot(a.glyph(),s)}}}function tt(t,e){let r=(...s)=>({rows:s.map(n=>[...n].map(a=>a==="#")),top:0,w:s[0].length,h:s.length});switch(t){case"overline":case"underline":return r("#".repeat(Math.max(1,e)));case"bar":return r("#".repeat(Math.max(3,Math.min(e,4))));case"hat":case"widehat":return e>=5?r("..#..",".#.#.","#...#"):r(".#.","#.#");case"check":return r("#.#",".#.");case"tilde":case"widetilde":return r(".#.#","#.#.");case"dot":return r("#");case"ddot":return r("#.#");case"vec":return r("..#.","####","..#.");case"acute":return r(".#","#.");case"grave":return r("#.",".#");case"breve":return r("#..#",".##.")}}var B={forall:"\u2200",exists:"\u2203",nexists:"\u2204",neg:"\xAC",lnot:"\xAC",land:"\u2227",wedge:"\u2227",lor:"\u2228",vee:"\u2228",to:"\u2192",rightarrow:"\u2192",leftarrow:"\u2190",gets:"\u2190",leftrightarrow:"\u2194",longrightarrow:"\u27F6",Rightarrow:"\u21D2",implies:"\u21D2",Leftarrow:"\u21D0",Leftrightarrow:"\u21D4",iff:"\u21D4",mapsto:"\u21A6",uparrow:"\u2191",downarrow:"\u2193",vdash:"\u22A2",models:"\u22A8",top:"\u22A4",bot:"\u22A5",in:"\u2208",notin:"\u2209",ni:"\u220B",subseteq:"\u2286",subset:"\u2282",supseteq:"\u2287",supset:"\u2283",subsetneq:"\u228A",not:"",cup:"\u222A",cap:"\u2229",emptyset:"\u2205",varnothing:"\u2205",times:"\xD7",setminus:"\u2216",backslash:"\\",neq:"\u2260",ne:"\u2260",leq:"\u2264",le:"\u2264",geq:"\u2265",ge:"\u2265",equiv:"\u2261",approx:"\u2248",sim:"\u223C",cong:"\u2245",cdot:"\xB7",div:"\xF7",pm:"\xB1",mp:"\u2213",ast:"\u2217",circ:"\u2218",infty:"\u221E",partial:"\u2202",nabla:"\u2207",ldots:"\u2026",dots:"\u2026",cdots:"\u22EF",prime:"\u2032",mid:"\u2223",vert:"|",lvert:"|",rvert:"|",Vert:"\u2016","|":"\u2016",lfloor:"\u230A",rfloor:"\u230B",lceil:"\u2308",rceil:"\u2309",langle:"\u27E8",rangle:"\u27E9","{":"{","}":"}",lbrace:"{",rbrace:"}","%":"%",sum:"\u2211",prod:"\u220F",int:"\u222B",bigcup:"\u22C3",bigcap:"\u22C2",sqcup:"\u2294",blank:"\u2294",head:"\u25BE",Lmove:"\u25C2",Rmove:"\u25B8",Box:"\u25A1",square:"\u25A1",Diamond:"\u25C7",lozenge:"\u25C7",bigcirc:"\u25CB",alpha:"\u03B1",beta:"\u03B2",gamma:"\u03B3",delta:"\u03B4",epsilon:"\u03B5",varepsilon:"\u03B5",zeta:"\u03B6",eta:"\u03B7",theta:"\u03B8",iota:"\u03B9",kappa:"\u03BA",lambda:"\u03BB",mu:"\u03BC",nu:"\u03BD",xi:"\u03BE",omicron:"\u03BF",pi:"\u03C0",rho:"\u03C1",sigma:"\u03C3",varsigma:"\u03C2",tau:"\u03C4",upsilon:"\u03C5",phi:"\u03C6",varphi:"\u03C6",chi:"\u03C7",psi:"\u03C8",omega:"\u03C9",Gamma:"\u0393",Delta:"\u0394",Theta:"\u0398",Lambda:"\u039B",Xi:"\u039E",Pi:"\u03A0",Sigma:"\u03A3",Upsilon:"\u03A5",Phi:"\u03A6",Psi:"\u03A8",Omega:"\u03A9",blacktriangledown:"\u25BE",blacktriangleleft:"\u25C2",blacktriangleright:"\u25B8",lbrack:"[",rbrack:"]",lt:"<",gt:">",colon:":",ldotp:".",cdotp:"\xB7",mathellipsis:"\u2026",lVert:"\u2016",rVert:"\u2016",lang:"\u27E8",rang:"\u27E9",leftrightarrows:"\u21D4",rightarrowtail:"\u2192",vartriangleright:"\u25B8",triangleright:"\u25B8",ell:"\u2113",hbar:"\u0127",aleph:"\u2135",angle:"\u2220",perp:"\u22A5",parallel:"\u2225",ll:"\u226A",gg:"\u226B",propto:"\u221D",star:"\u22C6",bullet:"\u2022",oplus:"\u2295",otimes:"\u2297",vdots:"\u22EE",ddots:"\u22F1",triangle:"\u25B3",leqslant:"\u2264",geqslant:"\u2265",prec:"\u227A",succ:"\u227B",nmid:"\u2224",vartheta:"\u03D1",varpi:"\u03D6",varrho:"\u03F1",Longrightarrow:"\u27F9",Longleftrightarrow:"\u27FA",longleftarrow:"\u27F5",Longleftarrow:"\u27F8",longmapsto:"\u27FC",hookrightarrow:"\u21AA",rightleftharpoons:"\u21CC",nsubseteq:"\u2288",supsetneq:"\u228B",textunderscore:"_",textdollar:"$",textbackslash:"\\",vartriangle:"\u25B3",varkappa:"\u03BA",bigtriangledown:"\u25BE",textasteriskcentered:"\u2217","#":"#","&":"&",_:"_",$:"$"},rt={N:"\u2115",Z:"\u2124",Q:"\u211A",R:"\u211D",C:"\u2102",P:"\u2119",B:"\u{1D539}",E:"\u{1D53C}"},st=new Set(["\u2211","\u220F","\u222B","\u22C3","\u22C2"]),b=(t="ord")=>({w:0,a:0,d:0,glyphs:[],bars:[],cls:t});function k(t,e){return{w:t.w,a:Math.max(0,t.top+1),d:Math.max(0,t.h-t.top-1),glyphs:[{g:t,x:0,y:0}],bars:[],cls:e}}function f(t,e,r,s){for(let n of e.glyphs)t.glyphs.push({g:n.g,x:n.x+r,y:n.y+s});for(let n of e.bars)t.bars.push({...n,x:n.x+r,y:n.y+s});t.w=Math.max(t.w,r+e.w),t.a=Math.max(t.a,e.a+s),t.d=Math.max(t.d,e.d-s)}var _=t=>t==="s"?2:E.axis,Lt=t=>t==="d"?"t":"s";function q(t,e){if(e==="s"){let r=Object.entries(z).find(([,s])=>s===t)?.[0];return S[r??t]??S[t]??y[t]}return y[t]}function Tt(t,e,r,s=!1){if(!t)return b(r);let n=t;!s&&/^[A-Za-z]$/.test(t)&&(n=z[t]);let a=q(n,e)??q("?",e);return k(a,r)}function qt(t,e,r){let s=b(r),n=0;for(let a of t){if(a===" "){n+=3;continue}let o=q(a,e)??q("?",e);f(s,k(o,"ord"),n,0),n+=o.w+1}return s.w=Math.max(0,n-1),s.cls=r,s}function Bt(t,e,r){let s=r==="s";return e==="punct"||t==="open"||e==="close"?0:t==="punct"?s?0:2:t==="rel"||e==="rel"?s?1:3:t==="bin"||e==="bin"?s?0:2:t==="op"&&(e==="ord"||e==="open"||e==="op")||e==="op"||t==="inner"||e==="inner"?1:0}function _t(t,e){let r=[];for(let c of t){if(c.t==="space"){r.push({...b("ord"),w:c.w,cls:"ord",glyphs:[],bars:[],a:0,d:0,space:!0});continue}r.push(x(c,e))}let s;for(let c of r)c.space||(c.cls==="bin"&&(s===void 0||["bin","op","rel","open","punct"].includes(s))&&(c.cls="ord"),s=c.cls);if(s==="bin"){for(let c=r.length-1;c>=0;c--)if(r[c].cls==="bin"){r[c].cls="ord";break}}let n=b(),a=0,o;for(let c of r){if(c.space){a+=c.w;continue}o&&(a+=1+Bt(o.cls,c.cls,e)),f(n,c,a,0),a+=c.w,o=c}return n.w=Math.max(0,a),r.length===1?n.cls=r[0].cls:r.length&&(n.cls="inner"),n}function Rt(t,e){let s=t.base,n=s.t==="op"||s.t==="word"&&s.cls==="op",a=n&&e==="d"&&(s.t==="op"?s.ch!=="\u222B":s.limits),o=x(s,e),c=t.sup?x(t.sup,"s"):void 0,l=t.sub?x(t.sub,"s"):void 0,i=b(o.cls);if(a){let g=Math.max(o.w,c?.w??0,l?.w??0);return f(i,o,Math.floor((g-o.w)/2),0),c&&f(i,c,Math.floor((g-c.w)/2),o.a+1+c.d),l&&f(i,l,Math.floor((g-l.w)/2),-(o.d+1+l.a)),i.w=g,i}f(i,o,0,0);let d=e==="s",u=o.w+(n&&s.t==="op"&&s.ch==="\u222B"?0:1),p=d?3:Math.max(4,o.a-3),h=d?1:Math.max(2,o.d-1);if(c&&l){let g=p-c.d-(-h+l.a-1);g<2&&(p+=2-g)}return c&&f(i,c,u,p),l&&f(i,l,u,-h),i.w=Math.max(o.w,u+Math.max(c?.w??0,l?.w??0)),i}function It(t,e){let r=t.size==="d"?"t":t.size==="t"?"s":Lt(e),s=x(t.num,r),n=x(t.den,r),a=_(e),o=e==="d"?2:1,c=Math.max(s.w,n.w)+2,l=b("inner");return l.bars.push({x:0,y:a,w:c,h:1}),l.w=c,l.a=a+1,l.d=0,f(l,s,Math.floor((c-s.w)/2),a+1+o+s.d),f(l,n,Math.floor((c-n.w)/2),a-o-n.a),l}function Pt(t,e){let r=x(t.body,e),s=Math.max(r.a,e==="s"?4:6),n=Math.max(r.d,0),a=s+1,o=a+n+1,c=J(o,a),l=b("ord");return f(l,k(c,"ord"),0,0),f(l,r,c.w+1,0),l.bars.push({x:c.w-1,y:a,w:r.w+3,h:1}),l.w=c.w+2+r.w,l.a=a+1,l}function Nt(t,e){let r=x(t.base,e),s=b(r.cls);f(s,r,0,0);let n=t.base.t==="sym"&&/^[a-zA-Z]$/.test(t.base.ch)&&!t.base.upright?1:0,a=t.kind==="overline"||t.kind==="underline"||t.kind==="widehat",o=tt(t.kind,a?r.w:Math.min(r.w,5));if(!o)return s;let c=Math.max(r.a,e==="s"?3:5);return t.kind==="underline"?f(s,k({...o,top:-r.d-2+o.h-1},"ord"),0,0):f(s,k({...o,top:c+o.h},"ord"),a?0:Math.floor((r.w-o.w)/2)+n,0),s}function et(t,e,r,s){if(!t)return;let n=_(s),o=(s==="s"?S[t]:void 0)??y[t];if(o&&e<=o.top+1&&r<=o.h-o.top-1)return o;let c=Math.max(e-1-n,r+n)+1;return K(t,2*c+1,n+c)??o}function ot(t,e,r,s){let n=b("inner"),a=0,o=et(t,r.a,r.d,s);o&&(f(n,k(o,"open"),0,0),a=o.w+1),f(n,r,a,0),a+=r.w;let c=et(e,r.a,r.d,s);return c&&(f(n,k(c,"close"),a+1,0),a+=1+c.w),n.w=a,n}function Gt(t,e){let r=t.rows.map(m=>m.map(w=>x(w,e==="d"?"t":e))),s=Math.max(...r.map(m=>m.length)),n=Array.from({length:s},(m,w)=>Math.max(0,...r.map(v=>v[w]?.w??0))),a=2,o=8,c=b("inner"),l=r.map(m=>Math.max(7,...m.map(w=>w.a))),i=r.map(m=>Math.max(2,...m.map(w=>w.d))),d=l.reduce((m,w,v)=>m+w+i[v],0)+a*(r.length-1),p=_(e)+Math.ceil(d/2),h=b("inner");if(r.forEach((m,w)=>{let v=p-l[w],H=0;m.forEach((N,O)=>{let j=t.align[O]??t.align[t.align.length-1]??"c",dt=j==="l"?0:j==="r"?n[O]-N.w:Math.floor((n[O]-N.w)/2);f(h,N,H+dt,v+1),H+=n[O]+(t.aligned&&O%2===0?0:o)}),p-=l[w]+i[w]+a}),h.w=n.reduce((m,w)=>m+w,0)+n.slice(1).reduce((m,w,v)=>m+(t.aligned&&v%2===0?0:o),0),!t.left&&!t.right)return h;let g=b("inner");f(g,h,1,0),g.w=h.w+2;let C=ot(t.left,t.right,g,e);return f(c,C,0,0),c}function x(t,e){switch(t.t){case"sym":return Tt(t.ch,e,t.cls,t.upright);case"list":{let r=_t(t.items,e);return t.cls&&(r.cls=t.cls),r}case"accent":return Nt(t,e);case"scripts":return Rt(t,e);case"frac":return It(t,e);case"sqrt":return Pt(t,e);case"op":{let r=e==="d"?Q(t.ch,_(e))??y[t.ch]:y[t.ch];return k(r,"op")}case"word":return qt(t.s,e,t.cls);case"delim":return ot(t.left,t.right,x(t.body,e),e);case"space":return{...b(),w:t.w};case"array":return Gt(t,e)}}function R(t,e=!1){let r=x(t,e?"d":"t");return r.a=Math.max(r.a,E.cap+1),r.d=Math.max(r.d,E.desc),r}var at=Z(G(),1);var A={"\\blank":"\\sqcup","\\head":"\\blacktriangledown","\\Lmove":"\\blacktriangleleft","\\Rmove":"\\blacktriangleright","\\qacc":"q_{\\text{acc}}","\\qrej":"q_{\\text{rej}}","\\qstart":"q_0","\\G":"\\mathbf{G}","\\F":"\\mathbf{F}","\\X":"\\mathbf{X}","\\U":"\\mathbin{\\mathbf{U}}","\\E":"\\mathbb{E}"},zt={bin:"bin",rel:"rel",open:"open",close:"close",punct:"punct",inner:"inner"},nt={mord:"ord",mbin:"bin",mrel:"rel",mopen:"open",mclose:"close",mpunct:"punct",minner:"inner",mop:"op"};function I(t){if(!t.startsWith("\\"))return t==="-"?"\u2212":t==="*"?"\u2217":t;let e=B[t.slice(1)];return e===void 0||e===""?void 0:e}function Yt(t){let e=t.unit==="mu"?t.number/18:t.unit==="em"?t.number:t.unit==="ex"?t.number*.45:t.number/10;return Math.round(e*11)}function P(t,e={}){let r=new Set,s=at.default.__parse(t,{strict:"ignore",macros:{...A,...e},throwOnError:!0}),n=(i,d)=>{let u=(i??[]).map(l).filter(p=>!!p);return u.length===1&&!d?u[0]:{t:"list",items:u,cls:d}},a=i=>{let d=Array.isArray(i)?i:i.type==="ordgroup"?i.body:[i],u="";for(let p of d)p.type==="spacing"?u+=" ":p.type==="textord"||p.type==="mathord"?u+=p.text.startsWith("\\")?I(p.text)??(r.add(p.text),"?"):p.text:p.type==="ordgroup"||p.type==="text"||p.type==="font"?u+=a(p.body):r.add(p.type);return u};function o(i,d,u=!1){let p=I(i);if(p===void 0){r.add(i);return}return st.has(p)?{t:"op",ch:p}:{t:"sym",ch:p,cls:d,upright:u}}function c(i,d){let u=d.type==="ordgroup"?d.body:[d],p=h=>n(u.map(g=>{let C=g.text&&h(g.text);return C?{type:"__sym",ch:C}:g}));switch(i){case"mathbb":return p(h=>rt[h]);case"mathcal":case"mathscr":return p(h=>V[h]);case"mathrm":case"mathbf":case"mathsf":case"mathtt":case"textrm":case"textbf":case"boldsymbol":return u.every(h=>h.type==="mathord"||h.type==="textord"||h.type==="spacing")?{t:"word",s:a(u),cls:"ord"}:n(u);case"mathit":case"mathnormal":return n(u)}return r.add("\\"+i),n(u)}function l(i){switch(i.type){case"__sym":return{t:"sym",ch:i.ch,cls:"ord",upright:!0};case"mathord":return o(i.text,"ord");case"textord":return o(i.text,"ord",!0);case"atom":return o(i.text,zt[i.family]??"ord",!0);case"spacing":return i.text==="\\allowbreak"||i.text==="\\nobreak"?void 0:{t:"space",w:3};case"kern":return{t:"space",w:Math.max(-1,Yt(i.dimension))};case"ordgroup":return n(i.body);case"styling":case"sizing":case"color":return n(i.body);case"htmlmathml":return n(i.mathml);case"mathchoice":return n(i.text);case"mclass":return n(i.body,nt[i.mclass]??"ord");case"text":return{t:"word",s:a(i.body),cls:"ord"};case"font":return c(i.font.replace(/^\\/,""),i.body);case"supsub":return{t:"scripts",base:(i.base&&l(i.base))??{t:"list",items:[]},sup:i.sup?l(i.sup):void 0,sub:i.sub?l(i.sub):void 0};case"genfrac":if(!i.hasBarLine){r.add("\\binom");return}return{t:"frac",num:l(i.numer),den:l(i.denom),size:i.size==="display"?"d":i.size==="text"?"t":void 0};case"sqrt":return i.index&&r.add("\\sqrt[n]"),{t:"sqrt",body:l(i.body)};case"op":return i.symbol?o(i.name,"op"):i.name?{t:"word",s:i.name.replace(/^\\/,""),cls:"op",limits:i.limits}:{t:"word",s:a(i.body),cls:"op",limits:i.limits};case"operatorname":return{t:"word",s:a(i.body),cls:"op",limits:i.limits};case"leftright":case"middle":{let d=i.left==="."?"":I(i.left),u=i.right==="."?"":I(i.right);(d===void 0||u===void 0)&&r.add(`${i.left} ${i.right}`);let p=n(i.body);return p.t==="array"&&!p.left&&!p.right?{...p,left:d??"",right:u??""}:{t:"delim",left:d??"",right:u??"",body:p}}case"array":{let d=(i.cols??[]).filter(p=>p.type==="align").map(p=>p.align).join(""),u=i.body.map(p=>p.map(h=>l(h)??{t:"list",items:[]}));return i.hLinesBeforeRow?.some(p=>p.length)&&r.add("\\hline"),{t:"array",rows:u,left:"",right:"",align:d||"c",aligned:i.colSeparationType==="align"}}case"accent":return{t:"accent",kind:i.label.replace(/^\\/,""),base:l(i.base)};case"overline":return{t:"accent",kind:"overline",base:l(i.body)};case"underline":return{t:"accent",kind:"underline",base:l(i.body)};case"delimsizing":return o(i.delim,nt[i.mclass]??"ord",!0);case"cr":return}r.add(i.type)}return{node:n(s),unsupported:[...r]}}function lt(t){let e=Math.max(1,t.w),r=t.a+t.d,s=new Uint8Array(e*r),n=(a,o)=>{let c=t.a-1-o;a>=0&&a<e&&c>=0&&c<r&&(s[c*e+a]=1)};for(let a of t.glyphs)a.g.rows.forEach((o,c)=>o.forEach((l,i)=>{l&&n(a.x+i,a.y+a.g.top-c)}));for(let a of t.bars)for(let o=0;o<a.h;o++)for(let c=0;c<a.w;c++)n(a.x+c,a.y-o);return{w:e,h:r,depth:t.d,bits:s}}function D(t,e={}){let r;try{r=P(t,e.macros)}catch(n){return{ok:!1,unsupported:[n.message]}}let s=lt(R(r.node,e.display));return{ok:r.unsupported.length===0,unsupported:r.unsupported,bitmap:s}}var F=t=>Math.max(1,Math.round(t??3));function pt(t){let e="";for(let r=0;r<t.h;r++){let s=0;for(;s<t.w;){if(!t.bits[r*t.w+s]){s++;continue}let n=s;for(;s<t.w&&t.bits[r*t.w+s];)s++;e+=`M${n} ${r}h${s-n}v1h${n-s}z`}}return e}function X(t,e=3){let r=F(e);return`<svg xmlns="http://www.w3.org/2000/svg" width="${t.w*r}" height="${t.h*r}" viewBox="0 0 ${t.w} ${t.h}" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true" focusable="false" style="vertical-align:${-t.depth*r}px;overflow:visible"><path d="${pt(t)}"/></svg>`}function Dt(t,e,r=0,s=0,n=1){let a=F(n);for(let o=0;o<e.h;o++){let c=0;for(;c<e.w;){if(!e.bits[o*e.w+c]){c++;continue}let l=c;for(;c<e.w&&e.bits[o*e.w+c];)c++;t.fillRect(r+l*a,s+o*a,(c-l)*a,a)}}}var ct=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function ut(t,e={}){return Y.default.renderToString(t,{output:"mathml",displayMode:!!e.display,throwOnError:!1,strict:"ignore",macros:{...A,...e.macros}})}var it=new Set,Ft=()=>globalThis.process?.env?.NODE_ENV!=="production";function Xt(t,e={}){let r=D(t,e),s=e.display?"div":"span";if(!r.ok||!r.bitmap){let c=r.unsupported.join(", ");Ft()&&!it.has(t)&&(it.add(t),console.warn(`[crisptex] KaTeX fallback for ${JSON.stringify(t)}: unsupported ${c}`));let l=Y.default.renderToString(t,{displayMode:!!e.display,throwOnError:!1,strict:"ignore",output:"htmlAndMathml",macros:{...A,...e.macros}});return`<${s} class="pxm pxm-fallback" data-unsupported="${ct(c)}">${l}</${s}>`}let n=F(e.scale),a=r.bitmap,o=e.display?`$$${t}$$`:`$${t}$`;return`<${s} class="pxm${e.display?" pxm-display":""}" style="${jt}${e.display?Wt:""}">`+X(a,n)+`<span class="pxm-mathml" style="${Zt}">${ut(t,e)}</span><span class="pxm-tex" aria-hidden="true" style="${Ut}">${ct(o)}</span></${s}>`}function Ht(t,e={}){let r=D(t,e);if(!r.bitmap)throw new Error(r.unsupported.join(", "));return X(r.bitmap,e.scale)}var jt="position:relative;display:inline-block;line-height:0;white-space:nowrap;",Wt="display:block;text-align:center;margin:1em 0;",Zt="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;user-select:none;-webkit-user-select:none;",Ut="position:absolute;inset:0;color:transparent;overflow:hidden;font-size:1px;line-height:1px;white-space:pre;user-select:all;-webkit-user-select:all;";return yt(Vt);})();
