#!/usr/bin/python
# -*- coding: UTF-8 -*- 
import json
import pprint

with open('ukulele.txt', 'rt') as fp:
    chords = []
    for line in fp:
        name, seq = line.replace('\n', '').split('\t')
        chords.append({
            'name': name,
            'seq': seq
        })

    chords = sorted(chords, key=lambda chord:chord['name'])
    pprint.pprint(chords)
    # print json.dumps(chords, indent=2)
