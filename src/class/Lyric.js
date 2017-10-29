/**
 * 歌词类
 *
 * @class Lyric
 */
class Lyric {
  lrc = []

  constructor (option) {
    this.option = option
  }

  parseUrl (url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        console.log('xhr.onreadystatechange')
        console.log(XMLHttpRequest.DONE)
        if (xhr.readyState === XMLHttpRequest.DONE) {
          console.log(xhr.responseText)
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            resolve(xhr.responseText)
          } else {
            console.log('Request was unsuccessful: ' + xhr.status)
            reject(new Error('[00:00.00]Not available'))
          }
        }
      }
      xhr.open('POST', url)
      xhr.send(null)
    }).then(result => {
      this.lrc = this.parse(result)
      return this.lrc
    })
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
          this.lrc.push([lrcTime, lrcText])
        }
      }
    }
    // sort by time
    this.lrc.sort((a, b) => a[0] - b[0])
    return this.lrc
  }
}

module.exports = Lyric
