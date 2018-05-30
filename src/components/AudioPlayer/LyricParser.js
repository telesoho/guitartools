/**
 * Parse lyric and chord data and generate HTML
 *
 * @class LyricParser
 */
class LyricParser {
  /**
   * Parse lrc, suppose multiple time tag
   *
   * @param {any} lrcString  - Format:
   * [mm:ss.xx]lyric
   * [mm:ss.xxx]lyric
   * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
   *
   * @param {any} chordString
   * [{"end": 50(ms), "chord": "N", "start": 0}, {"end": 230,"chord": "F:maj","start": 50}, ...]
   * @return {list}
   * [{time: xxx, lrcHtml: xxx, focus:false} ...]
   * @memberof LyricParser
   */
  parse (lrcString, chordString, capo = 0) {
    try {
      var retObj = {
        title: '',
        artist: '',
        capo: capo,
        lyricData: []
      }

      var lyricData = []
      const lyric = lrcString.split('\n')

      for (let i = 0; i < lyric.length; i++) {
        const title = lyric[i].match(/\[ti:(.*?)\]/)
        if (title != null) {
          retObj.title = title[1]
        }

        const artist = lyric[i].match(/\[ar:(.*?)\]/)
        if (artist != null) {
          retObj.artist = artist[1]
        }

        const theCapo = lyric[i].match(/\[capo:(.*?)\]/)
        if (theCapo != null) {
          retObj.capo = parseInt(theCapo[1]) || capo
        }
        // const artist = lyric[i].match(/\[ar:(.*?)\]/g)

        // match lrc time
        const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g)
        // match lrc text
        const lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '')
        if (lrcTimes != null) {
          // handle multiple time tag
          const timeLen = lrcTimes.length
          for (let j = 0; j < timeLen; j++) {
            const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j])
            const lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000)
            lyricData.push({
              time: lrcTime,
              chords: [],
              lrcText: lrcText.replace(/<\d+>/g, ''),
              focus: false,
              endTime: lrcTime * 100
            })
          }
        }
      }
      // sort by time
      lyricData.sort((a, b) => {
        var ret = a.time - b.time
        return ret
      })

      var chordData = this.parseChordData(chordString, retObj.capo)

      var chordIndex = 0
      var newChordData = []
      var lyricIndex = 1

      if (chordIndex < chordData.length) {
        var chord = chordData[chordIndex]
        var data = lyricData[lyricIndex]
        var lastLrcTime = lyricData[lyricIndex - 1].time * 100
        var theLrcTime = data.time * 100

        while (lyricIndex < lyricData.length) {
          data = lyricData[lyricIndex]
          theLrcTime = data.time * 100
          lyricData[lyricIndex - 1].endTime = theLrcTime

          // 和弦小于歌词时间段，直接追加和弦
          if (chord.end < theLrcTime) {
            newChordData.push(chord)
            chordIndex++
            if (chordIndex >= chordData.length) {
              break
            }
            chord = chordData[chordIndex]
          } else if (lastLrcTime <= chord.start && chord.end <= theLrcTime) {
            // 和弦在歌词区域，不需要拆分，则追加
            newChordData.push(chord)
            chordIndex++
            if (chordIndex >= chordData.length) {
              break
            }
            chord = chordData[chordIndex]
          } else if (chord.start < theLrcTime && theLrcTime < chord.end) {
            // 拆分和弦
            var newChord1 = Object.assign({}, chord)
            newChord1.end = theLrcTime
            newChordData.push(newChord1)

            chord.start = theLrcTime
            lastLrcTime = theLrcTime
            lyricIndex++
          } else if (chord.start >= theLrcTime) {
            // 如果和弦大于该行歌词范围，直接读取下一行歌词
            lastLrcTime = theLrcTime
            lyricIndex++
          }
        }
        lyricData[lyricIndex - 1].endTime = 999999999
      }
      while (chordIndex < chordData.length) {
        newChordData.push(chordData[chordIndex++])
      }
      // console.log(newChordData)

      lyricData.forEach(data => {
        // 计算上句歌词的和弦列表
        var startLrcTime = data.time * 100
        newChordData.forEach((chord) => {
          if (chord.start >= startLrcTime && chord.start < data.endTime) {
            data.chords.push(chord)
          }
        })
      })

      retObj.lyricData = lyricData
      return retObj
    } catch (error) {
      console.log(error)
      return retObj
    }
  }

  /**
   * According to the capo position, calculate the corresponding chord
   * @param {string} key key = C    D     Fm
   * @param {number} capo 1
   * @returns B    C#    Em
   * @memberof LyricParser
   */
  getCapoKey (key, capo) {
    var ChordKey = ['C', 'C#/Bb', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
    var lens = ChordKey.length
    for (var i = 0; i < lens; i++) {
      if (key === ChordKey[i]) {
        break
      } else if (key.length === 2 && ChordKey[i].search(key) !== -1) {
        break
      }
    }
    i = i - capo
    if (i < 0) {
      i = lens + i
    }
    var retKey = ChordKey[i]
    return retKey.length === 1 ? retKey : retKey.substr(0, 2)
  }

  /**
   * Get short name of chord.
   * @param {any} chord C:maj A:min C:7 D#:min7 N
   * @param {number} [capo=0] 0
   * @returns C     Am    C7  D#m7    Intro
   * @memberof LyricParser
   */
  getShortNameOfChord (chord, capo = 0) {
    if (chord === 'N') {
      return 'Intro'
    }

    var chordArray = chord.split(':')
    var chordKey = this.getCapoKey(chordArray[0], capo)
    var chordShap = chordArray[1]
    chordShap = chordShap.replace('maj', '').replace('min', 'm')
    return chordKey + chordShap
  }

  /**
   * Parse chord data.
   * @param {any} content
   * @returns
   * @memberof LyricParser
   */
  parseChordData (content, capo = 0) {
    var jsonObj = null
    try {
      if (typeof content === 'string') {
        jsonObj = JSON.parse(content)
      } else {
        jsonObj = content
      }
      this.duration = 0
      for (var key in jsonObj) {
        var item = jsonObj[key]
        if (item.chord === 'N') {
          item.name = 'Intro'
        } else {
          var chordArray = item.chord.split(':')
          var chordKey = this.getCapoKey(chordArray[0], capo)
          var chordShap = chordArray[1]
          item.chord = `${chordKey}:${chordShap}`
          var shortChordShap = chordShap.replace('maj', '').replace('min', 'm')
          item.name = chordKey + shortChordShap
        }
        // item.width = item.end - item.start
        // this.duration += item.width
      }
      return jsonObj
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export default new LyricParser()
