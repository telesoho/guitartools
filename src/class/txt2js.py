#!/usr/bin/python
# -*- coding: UTF-8 -*- 

# 'A:7': {
# name: 'A7',
# chord: [[1, 0], [2, 2], [3, 0], [4, 2], [5, 0], [6, 'x']],
# position: 0,
# bars: [{from_string: 6, to_string: 1, fret: 1}]
# },

with open('ukulele.txt', 'rt') as fp:
    for line in fp:
        name, seq = line.replace('\n', '').split('\t')
        keyShape = name.split(' ')
        key = keyShape[0]
        shape = 'maj'
        if len(keyShape) == 2:
            shape = keyShape[1]

        finger = seq.split(',')

        fingerPos = []
        for i, val in enumerate(finger):
            fingerPos.append([i, int(val)]) 

        keyName = "'{0}:{1}': {{name: '{2}', chord: {3}, position: 0, bars: [] }},".format(key, shape, name.replace(' ',''), fingerPos)
        
        print keyName


