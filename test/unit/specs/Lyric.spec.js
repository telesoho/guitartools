import mock from 'mock4xhr'
import Lyric from '@/class/Lyric.js'

describe('Lyric.js', () => {
  // replace the real XHR object with the mock XHR object before each test
  beforeEach(() => mock.setup())

  // put the real XHR object back and clear the mocks after each test
  afterEach(() => mock.teardown())

  it('parseUrl when status=200 ', async () => {
    mock.post('/mock/千住明-涙そうそう.lrc', (req, res) => {
      return res.status(200)
        .body('[00:00.00]Tab 3')
    })
    let lyr = new Lyric()
    var rst = await lyr.parseUrl('/mock/千住明-涙そうそう.lrc')
    expect(rst).deep.equal([[0, 'Tab 3']])
  })

  it('should parse lyric correct', () => {
    let lyr = new Lyric()
    var rst = null

    rst = lyr.parse('D古い Aアルバ Gムめく Dり')
    expect(rst.length).to.equal(0)

    rst = lyr.parse('[00:00.00]D古い Aアルバ Gムめく Dり')
    expect(rst[0][0]).to.equal(0)
    expect(rst[0][1]).to.equal('D古い Aアルバ Gムめく Dり')

    rst = lyr.parse('[00:00.10]')
    expect(rst[0][0]).to.equal(10 / 100)
    expect(rst[0][1]).to.equal('')

    rst = lyr.parse('[00:01.100]啊啊啊啊嗄哦哦哦哦')
    expect(rst[0][0]).to.equal(1 + 100 / 1000)
    expect(rst[0][1]).to.equal('啊啊啊啊嗄哦哦哦哦')

    rst = lyr.parse(`
      [00:01.00]啊啊啊啊嗄哦哦哦哦
      [01:00.00]This is my song
    `)
    expect(rst[0][0]).to.equal(1)
    expect(rst[0][1]).to.equal('啊啊啊啊嗄哦哦哦哦')
    expect(rst[1][0]).to.equal(60)
    expect(rst[1][1]).to.equal('This is my song')
    expect(rst.length).to.equal(2)
  })
})
