/**
 * 歌词类
 *
 * @class Lyric
 */
class Lyric {
  lrc = []
  parseLrc (lrcLine) {
    var html = []
    const regex = /\$([a-zA-Z0-9#:]+)/g
    let lyricStartPos = 0
    let m
    while ((m = regex.exec(lrcLine)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }

      var lyric = lrcLine.substring(lyricStartPos, m.index)
      if (lyric.trim().length > 0) {
        html.push(`<span class="lyric">${lyric}</span>`)
      } else {
        if (lyricStartPos !== 0) {
          html.push(`<span class="lyric">&nbsp;</span>`)
        }
      }

      var chord = m[1]

      html.push(`
      <span class="chordWrap">
        <ruby>
          <span class="chord" chord="${chord}"></span>
          <span style="display: none;">${chord}</span>
        </ruby>
      </span>
      `)

      lyricStartPos = regex.lastIndex
    }

    if (lyricStartPos < lrcLine.length) {
      lyric = lrcLine.substring(lyricStartPos, lrcLine.length)
      if (lyric.trim().length > 0) {
        html.push(`<span class="lyric">${lyric}</span>`)
      } else {
        if (lyricStartPos !== 0) {
          html.push(`<span class="lyric">&nbsp;</span>`)
        }
      }
    }
    return html.join('')
  }
  /**
   * Parse lrc, suppose multiple time tag
   *
   * @param {String} lrcString - Format:
   * [mm:ss.xx]lyric
   * [mm:ss.xxx]lyric
   * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
   *
   * @return {String} [[time, text], [time, text], [time, text], ...]
   */
  parse (lrcString) {
    this.lrc = []
    const lyric = lrcString.split('\n')
    const lyricLen = lyric.length
    for (let i = 0; i < lyricLen; i++) {
      // match lrc time
      const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g)
      // match lrc text
      const lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '')

      if (lrcTimes != null) {
        // handle multiple time tag
        const timeLen = lrcTimes.length
        for (let j = 0; j < timeLen; j++) {
          const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j])
          const lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2]) +
            parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000)
          this.lrc.push({
            time: lrcTime,
            lrcHtml: this.parseLrc(lrcText)}
          )
        }
      }
    }
    // sort by time
    this.lrc.sort((a, b) => a[0] - b[0])
    return this.lrc
  }
}

export default new Lyric()
