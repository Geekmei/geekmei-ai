#!/usr/bin/env python
# -*- coding:utf-8 -*-
# author:  zsxz
# name:    AipOcr 
# datetime:2021/1/21 15:49
# software:PyCharm
"""
描述：

"""

from aip import AipOcr, AipImageClassify, AipImageProcess

APP_ID = '23499436'
API_KEY = 'Abtz8CvP6ZFH192CkhdPNBCj'
SECRET_KEY = '75T6TcAHnMgGpF5UFmeDKZA1jG0FhjKe'

client_Ocr = AipOcr(APP_ID, API_KEY, SECRET_KEY)
client_ImageClassify = AipImageClassify(APP_ID, API_KEY, SECRET_KEY)
client_ImageProcess = AipImageProcess(APP_ID, API_KEY, SECRET_KEY)
