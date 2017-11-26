<template>
<div class="chord-strip" ref='ChordStrip'>
  <div class="chord-strip--center-line"></div>
  <div class="chord-strip--chords" :style="chordStripStyle">
    <div class="strip-chord" :current='chord.start < position && position < chord.end' v-for="chord in chordHtml" :key="chord.start" :style="{width: chord.width + 'px'}">
        <span class="chord-name">{{chord.name}}</span>
    </div>
  </div>
</div>
</template>

<style>
@import url('http://fonts.googleapis.com/css?family=Gloria+Hallelujah');

.chord-strip {
    position: absolute;
    width: 100%;
    height: 2.5rem;
    bottom: 7rem;
    overflow: hidden;
    transition: all ease .1s;
    padding-top: 0rem;
    z-index: 800;
}

.chord-strip--center-line {
    width: 50%;
    border-right: 3px white solid;
    height: 3em;
    position: absolute;
    z-index: 900;
    opacity: .75;
    pointer-events: none;
}

.chord-strip--chords {
    position: absolute;
    left: 50%;
}

.chord-strip .strip-chord[current=true] .chord-name {
    color: #fff;
}

.chord-strip .strip-chord {
    float: left;
    width: 100px;
    height: 2em;
    position: relative;
    border-radius: 20px;
    text-align: left;
    font-size: 1.5em;
    font-family: "Gloria+Hallelujah", cursive;
    cursor: pointer;
    letter-spacing: .3px;
    display: flex;
    align-items: center;
    align-content: center;
    padding-left: 10px;
}

.chord-strip .strip-chord[current=true] {
    background: #d52b1e;
}

.chord-strip .strip-chord {
    background: #67221d;
}

.chord-strip .strip-chord .chord-name {
    color: #a0a0a0;
    position: relative;
}
</style>
<script src='./ChordStrip.js'></script>
