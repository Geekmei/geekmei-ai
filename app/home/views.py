#!/usr/bin/env python
# -*- coding:utf-8 -*-
# author:  zsxz
# name:    views 
# datetime:2021/1/19 11:10
# software:PyCharm
"""
描述：

"""
import urllib.request
from flask import request, jsonify, render_template
from . import home
from .forms import PostFrom

from app.libs.Aip import client_Ocr,client_ImageClassify,client_ImageProcess


@home.route("/")
def index():
    return render_template('home/index.html', )


@home.route("/img2word/", methods=['GET', 'POST'])
def img2word():
    if request.method == 'GET':
        return render_template('home/img2word.html')
    if request.method == 'POST':
        imgpath = request.form.get('imgpath')
        imgfile = request.files.get('file')

        if imgpath:
            response = client_Ocr.basicGeneralUrl(imgpath)
        if imgfile:
            data = imgfile.read()
            response = client_Ocr.basicGeneral(data)

        return jsonify({'code': 200,'data':response})


@home.route("/picture2color/", methods=['GET', 'POST'])
def picture2color():
    if request.method == 'GET':
        return render_template('home/picture2color.html', )
    if request.method == 'POST':
        imgpath = request.form.get('imgpath')
        imgfile = request.files.get('file')

        if imgpath:
            img = urllib.request.urlopen(imgpath)
            data = img.read()
            response = client_ImageProcess.colourize(data)
        if imgfile:
            data = imgfile.read()
            response = client_ImageProcess.colourize(data)

        return jsonify({'code': 200,'data':response})


@home.route("/recognition/", methods=['GET', 'POST'])
def recognition():
    if request.method == 'GET':
        return render_template('home/recognition.html', )
    if request.method == 'POST':
        imgpath = request.form.get('imgpath')
        imgfile = request.files.get('file')

        if imgpath:
            img = urllib.request.urlopen(imgpath)
            data = img.read()
            response = client_ImageClassify.advancedGeneral(data)
        if imgfile:
            data = imgfile.read()
            response = client_ImageClassify.advancedGeneral(data)

        return jsonify({'code': 200,'data':response})


@home.route("/test/", methods=['GET', 'POST'])
def test():
    return render_template('home/test.html', )
