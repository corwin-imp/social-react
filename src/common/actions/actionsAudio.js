import * as types from '../constants/ActionAudio'

export function onPlayerNext() {
  return {
    type: types.onPlayerNext,
  }
}
export function onPlayerPrev() {
  return {
    type: types.onPlayerPrev,
  }
}
export function handleToggle() {
  return {
    type: types.handleToggle,
  }
}
export function load(src) {
  return {
    type: types.load,
    src: src,
  }
}
export function setProgress(prog, sk) {
  return {
    type: types.SET_Progress,
    progress: prog,
    seek: sk,
  }
}
export function handleOnLoad(duration) {
  return {
    type: types.handleOnLoad,
    duration: duration,
  }
}
export function volume(index) {
  return {
    type: types.volume,
    volume: index,
  }
}
export function renderSeekPos(seek) {
  return {
    type: types.renderSeekPos,
    seek: seek,
  }
}
export function trigMount() {
  return {
    type: types.trigMount,
  }
}
/*
 export function onUpdate() {
 if (this.player) {
 if (!this.is_progress_dirty) {
 this.setState({
 progress: this.state.seek / this.state.duration
 });
 }

 if (this.player.ended && this.props.onDone) {
 this.props.onDone(this.state.src);
 }
 }
 }



 export function handleOnPlay() {
 this.setState({
 playing: true
 })
 this.renderSeekPr()
 this.renderSeekPos()
 }

 export function handleOnEnd() {
 this.setState({
 playing: false
 })
 this.clearRAF()
 }

 export function handleStop() {
 this.player.stop()
 this.setState({
 playing: false // Need to update our local state so we don't immediately invoke autoplay
 })
 this.renderSeekPos()
 this.renderSeekPr()
 }

 export function handleLoopToggle() {
 this.setState({
 loop: !this.state.loop
 })
 }

 export function handleMuteToggle() {
 this.setState({
 mute: !this.state.mute
 })
 }

 export function renderSeekPos() {

 var seek = Number(this.player.seek())
 if (!isNaN(seek)) {
 this.setState({

 seek: Number(this.player.seek())
 })
 if (this.state.playing) {
 this._raf = raf(this.renderSeekPos)
 }
 }

 }

 export function renderSeekPr() {
 this.setState({
 seekPr: this.player.seePr()
 })
 if (this.state.playing) {
 this._raf = raf(this.renderSeekPr)
 }
 }

 export function clearRAF() {
 raf.cancel(this._raf)
 }

 export function startSetProgress(evt) {
 this.setState({
 in_set_progress_mode: true
 });
 this.setProgress(evt);
 }

 export function stopSetProgress(evt) {
 this.setState({
 in_set_progress_mode: false
 });
 this.setProgress(evt);
 }
 export function unMount(src) {
 this.setState({
 type: types.unMount // Need to update our local state so we don't immediately invoke autoplay
 })

 }

 */
